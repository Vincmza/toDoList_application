const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const userSchema = mongoose.Schema({
    email: {
        type: String, 
        required: true, 
        unique: true, 
        trim: true, 
        minlength: 15, 
        maxlength: 100
    },
    password: {
        type: String, 
        required: true, 
        trim: true, 
        minlength: 10, 
        maxlength: 100
    },
    answerToSecretQuestion : {
        type: String, 
        required: false, 
        trim: true,
        minlength: 10, 
        maxlength: 100
    },
    creationDate: {
        type: Date, 
        default: Date.now()
    }
})

userSchema.plugin(uniqueValidator);

module.exports = mongoose.model('User', userSchema);