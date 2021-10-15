const { validationResult } = require("express-validator");
const User = require('../models/User');
const path = require('path');
const fs = require('fs');

module.exports = {
    // Affiche la page d'inscription
    getSignupPage: (req, res) => {
        res.render('signup');
    },
    // Affiche la page de connexion
    getSigninPage: (req, res) => {
        res.render('signin');
    },
    // Inscrit un nouvel utilisateur et l'ajoute en base de données
    signupUser: (req, res) => {
        const errors = validationResult(req);
        if (errors.isEmpty() === false) {
            res.status(500).json({ errors: errors.array() });
            return;
        }

        if (req.file) {
            const date = new Date();
            const fileDate = date.getFullYear().toString() + (date.getMonth() + 1).toString() + date.getDate().toString(); //20211015
            const fileNameArray = req.file.filename.split('.'); // monFichier.pdf => ['monFichier', 'pdf']; => 2 - 1
            const newFileName = req.body.firstName + '_' + fileDate + '.' + fileNameArray[fileNameArray.length - 1];
            fs.rename(
                path.join(__dirname, '../uploads/' + req.file.filename),
                path.join(__dirname, '../uploads/' + newFileName),
                (err) => {
                    if (err) {
                        return res.status(500).json(new Error('Problème lors du renommage du fichier').message);
                    }

                }
            );
            // fs.renameSync(req.file.path, path.join(req.file.destination, req.file.originalname))

            const user = new User({...req.body, photo: req.file ? '/' + newFileName : ''});
            user.save()
            .then(response => {
                res.render('signin');
            }).catch(error => {
                console.error(error);
                res.status(500).json({ error });
            });

        }
    },
    // Connecte un utilisateur
    signinUser: (req, res) => {
        // Récupération d'un utilisateur par son email
        User.findOne({ email: req.body.email })
            .then((user) => {
                // Condition de vérification du mot de passe
                if (user.password === req.body.password) {
                    // Définition de la session
                    req.session.loggedIn = true;
                    req.session.user = user;

                    const expiresAt = Date.now() + (1000 * 60 * 60 * 24 * 30); // Date d'expiration du cookie
                    // Ajout du cookie de connection
                    res.setHeader('Set-Cookie', 'loggedIn=true; path=/; Expires=' + new Date(expiresAt).toUTCString());
                    return res.redirect('/');
                }
                return res.status(500).json(new Error('Wrong password').message);
            }).catch(error => {
                console.error(error);
                res.status(404).json({ error: error });
            });
    },
    // Déconnecte l'utilisateur
    logoutUser: (req, res) => {
        req.session.destroy(err => {
            if (err) {
                return res.status(500).json({ error });
            }
            res.clearCookie('loggedIn');
            res.redirect('/users/signin');
        })
    },
    // Affiche la page d'un utilisateur
    getUserPage: (req, res) => {
        const username = req.params.username;
        const user = users.find(user => user.username === username);

        


        res.render('user', { user });
    },
    getAdminPage: (req, res) => {
        User.find().lean().then(users => {
            res.render('admin', {users})
        });
    },
    uploadUserProfilePhoto: (req, res) => {
        if (req.file) {
            const userId = req.params.id;
            User.updateOne({_id: userId}, {
                $set: {
                    photo: '/' + req.file.filename
                }
            }).then(response => {
                res.render('admin');
            }).catch(error => {
                console.error(error);
                res.status(500).json({error});
            });
        } else {
            console.log('ERR');
            res.status(500).json(new Error('Vous devez envoyer une photo').message);
        }
    }
}