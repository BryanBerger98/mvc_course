const { validationResult } = require("express-validator");

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
    signupUser: (req, res) => {
        const errors = validationResult(req);
        if (errors.isEmpty() === false) {
            res.status(500).json({errors: errors.array()});
            return;
        }
        users.push(req.body);
        console.log(users);
        res.render('signup', {users, title: 'Liste de nos supers utilisateurs'});
    },
    getUserPage: (req, res) => {
        const username = req.params.username;
        const user = users.find(user => user.username === username);
        res.render('user', {user});
    }
}