const mongoose = require('mongoose');

var signupSchema = new mongoose.Schema({
    fname: {
        type: String,
        required: true
    },
    lname: {
        type: String,
        required: true
    },
    uname: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    confirmPassword: {
        type: String,
        required: true
    },
    email: {
        type: String,
        require: true
    },
    phone: {
        type: Number,
        required: true
    },
    phoneAlt: {
        type: Number,
        required: true
    },
    age: {
        type: Number,
        required: true
    },
    cname: {
        type: String,
        required: true
    },
    locality: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    }
});

const signupModel = mongoose.model('signup',signupSchema);
module.exports = {signupModel};