const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');

const UserSchema = new mongoose.Schema({
    username: String,
    password: String
});

// adds methods from passportLocalMongoose into schema
UserSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model('User' , UserSchema);