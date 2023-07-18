const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const config = require('../config/database');

const UserSchema = mongoose.Schema({
    name: {
        type: String
    },
    email: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
});

const User = module.exports = mongoose.model('User', UserSchema);

module.exports.getUserById = function(id, callback) {
    callback(false, User.findById(id));
}

module.exports.getUserByIdNoCallBacks = async function (id, callback) {
    const query = {_id: id};
    return User.findOne(query);
}

module.exports.getUserByUsername = async function(username, callback) {
    const query = {username: username};
    callback(false, await User.findOne(query));
}

module.exports.addUser = function(newUser, callback) {
    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, async (err, hash) => {
            if (err) throw err;

            newUser.password = hash.toString();
            newUser.save();
            return await callback.call();
        });
    });
}

// let result;
            // result = await (async () => {
            //    result = await newUser.save();
            // }).call(result);

module.exports.comparePassword = function(candidatePassword, hash, callback) {
    bcrypt.compare(candidatePassword, hash, (err, isMatch) => {
        if (err) throw err;
        callback(null, isMatch);
    });
}