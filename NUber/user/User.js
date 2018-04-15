//
// User.js
//
var mongoose = require('mongoose'); // #include mongoose

///////////////////////////////////////
// DEFINE USER
///////////////////////////////////////
var UserSchema = new mongoose.Schema({
    username: String,
    password: String,
    email: String,
    latitude: Number,
    longitude: Number
});
mongoose.model('User', UserSchema);
module.exports = mongoose.model('User');
