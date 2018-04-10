//
// User.js
//
var mongoose = require('mongoose'); // #include mongoose

// Define user Schema
var UserSchema = new mongoose.Schema({
    username: String,
    firstName: String,
    lastName: String,
    email: String,
    password: String,
    curr_address: String,
    curr_latitude: String,
    curr_longitude: String,
    dest_address: String,
    dest_latitude: String,
    dest_longitude: String
});

mongoose.model('User', UserSchema);

module.exports = mongoose.model('User');
