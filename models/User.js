const mongoose = require('mongoose');

const User = new mongoose.Schema({
    name: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('User', User);