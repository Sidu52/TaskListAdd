const mongoose = require('mongoose');

const user = new mongoose.Schema({
    "username": {
        "type": String,
        "required": true,
        "trim": true
    },
    "email": {
        "type": String,
        "required": true,
        "unique": true,
        "trim": true
    },
    "password": {
        "type": String,
        "required": true,
        "trim": true
    },
    "createdAt": {
        "type": Date,
        "default": Date.now
    },
    "updatedAt": {
        "type": Date,
        "default": Date.now
    }
}, {
    timestamps: true
})

const User = mongoose.model('user', user);
module.exports = User;