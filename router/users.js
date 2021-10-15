const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const expressValidator = require('express-validator');
const passwordValidator = require('password-validator');
const {validateConfirmPassword} = require('../middlewares/validateConfirmPassword')
const authGuard = require('../middlewares/auth-guard');
const path = require('path');
const multer = require('multer');
const crypto = require('crypto');

const storage = multer.diskStorage({
    destination: './uploads/',
    filename: (req, file, cb) => {
        crypto.pseudoRandomBytes(16, (err, raw) => {
            if (err) return cb(err);
            cb(null, raw.toString('hex') + '-' + path.basename(file.originalname).replace(/\s/g,'')); //
        });
    }
});

const upload = multer({storage});

router.post(
    '/upload-photo/:id',
    upload.single('file'),
    userController.uploadUserProfilePhoto
);

router.get('/signup', userController.getSignupPage);
router.get('/signin', userController.getSigninPage);
router.post(
    '/signup',
    upload.single('file'),
    expressValidator.body('email').isEmail(),
    [validateConfirmPassword],
    userController.signupUser
);
router.post('/signin', userController.signinUser);
router.get('/username/:username', userController.getUserPage);
router.get('/logout', userController.logoutUser);
router.get('/admin', authGuard, userController.getAdminPage);
module.exports = router;