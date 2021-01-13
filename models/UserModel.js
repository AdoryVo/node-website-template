const mongoose = require('mongoose');

const UserModel = new mongoose.Schema({
    name: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('UserModel', UserModel);