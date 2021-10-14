const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    firstName: String,
    surname: String,
    photo: String,
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
        index: true
    },
    password: {
        type: String,
        required: true,
    },
    birthDate: Date
});

const userModel = mongoose.model('User', userSchema);

module.exports = userModel;