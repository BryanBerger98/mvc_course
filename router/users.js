const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const expressValidator = require('express-validator');
const passwordValidator = require('password-validator');
const {validateConfirmPassword} = require('../middlewares/validateConfirmPassword')


router.get('/signup', userController.getSignupPage);
router.get('/signin', userController.getSigninPage);
router.post(
    '/signup',
    expressValidator.body('email').isEmail(),
    [validateConfirmPassword],

    userController.signupUser
);
router.post('/signin', userController.signinUser);
router.get('/username/:username', userController.getUserPage);
router.get('/logout', userController.logoutUser);
router.get('/admin', userController.getAdminPage)
module.exports = router;