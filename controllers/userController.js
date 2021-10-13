const { validationResult } = require("express-validator");
const User = require('../models/User');

const users = [
    {
        username: 'Toto',
        city: 'Paris',
        password: 'demo1234'
    },
    {
        username: 'Patrick',
        city: 'Tokyo',
        password: 'patrickleboss'
    }
];

module.exports = {
    getSignupPage: (req, res) => {
        res.render('signup');
    },
    getSigninPage: (req, res) => {
        res.render('signin');
    },
    signupUser: (req, res) => {
        const errors = validationResult(req);
        if (errors.isEmpty() === false) {
            res.status(500).json({errors: errors.array()});
            return;
        }
        const user = new User(req.body);
        user.save()
        .then(response => {
            res.render('signup', {user: response.toObject(), title: 'Liste de nos supers utilisateurs'});
        }).catch(error => {
            console.error(error);
            res.status(500).json({error});
        })
    },
    signinUser: (req, res) => {
        User.findOne({username: req.body.username})
        .then((user) => {
            if (user.password === req.body.password) {
                req.session.loggedIn = true;
                req.session.user = user;
                const expiresAt = Date.now() + (1000 * 60 * 60 * 24 * 30);
                res.setHeader('Set-Cookie', 'loggedIn=true; path=/; Expires=' + new Date(expiresAt).toUTCString());
                return res.redirect('/');
            }
            return res.status(500).json(new Error('Wrong password').message);
        }).catch(error => {
            console.error(error);
            res.status(404).json({error: error});
        });
    },
    logoutUser: (req, res) => {
        req.session.destroy(err => {
            if (err) {
                return res.status(500).json({error});
            }
            res.clearCookie('loggedIn');
            res.redirect('/users/signin');
        })
    },
    getUserPage: (req, res) => {
        const username = req.params.username;
        const user = users.find(user => user.username === username);
        res.render('user', {user});
    }
}