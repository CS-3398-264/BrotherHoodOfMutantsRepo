//
// User.js
//
var mongoose = require('mongoose'); // #include mongoose

// Define user Schema
var UserSchema = new mongoose.Schema({
    username: String,
    email: String,
    password: String,
    current_address: String,
    destination_address: String,
});

mongoose.model('User', UserSchema);

module.exports = mongoose.model('User');
