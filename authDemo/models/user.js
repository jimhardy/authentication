const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    username: String,
    password: String
});

mondule.exports = mongoose.model('User' , UserSchema);