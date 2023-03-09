var mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
var bcrypt = require('bcryptjs');

// User Schema
var UserSchema = mongoose.Schema({
    name: {
        type: String
    },
    email: {
        type: String,
        unique: true
    },
    password: {
        type: String
    }
});

UserSchema.plugin(uniqueValidator);

const User = mongoose.model('user', UserSchema);

// create user
const createUser = (newUser, callback) => {

    bcrypt.genSalt(10, function (err, salt) {
        bcrypt.hash(newUser.password, salt, function (err, hash) {
            newUser.password = hash;
            User.create(newUser, callback);
        });
    });

}

// get single user
const getSingleUser = (query, callback) => {
    User.findOne(query, callback)
}

// Compare Password
comparePassword = function (password, hash, callback) {
    bcrypt.compare(password, hash, function (err, isMatch) {
        console.log(password);
        console.log(hash)
        // if (err) throw err;
        callback(null, isMatch);
    });
}

// delete user
const removeUser = (query, callback) => {
    User.remove(query, callback)
}

// update user
const updateUser = (query, data, callback) => {
    User.findOneAndUpdate(query, data, callback)
}

// get all users
const getUsers = (query, callback) => {
    User.find(query, { password: 0 }, callback);
}


module.exports = {
    createUser,
    getSingleUser,
    comparePassword,
    removeUser,
    updateUser,
    getUsers
}