//
// User.js
//
let mongoose = require('mongoose'); // #include mongoose

///////////////////////////////////////
// DEFINE USER
///////////////////////////////////////
var UserSchema = new mongoose.Schema({
    username: {type: String, default: 'null'},
    password: {type: String, default: 'null'},
    email: {type: String, default: 'no-reply@bomb.com'},
    latitude: {type: Number, default: 0},
    longitude: {type: Number, default: 0}
});
mongoose.model('User', UserSchema);
module.exports = mongoose.model('User');
