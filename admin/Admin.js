//
// Admin.js
//
let mongoose = require('mongoose');

///////////////////////////////////////
// DEFINE USER
///////////////////////////////////////
var AdminSchema = new mongoose.Schema({
    username: {type: String, default: 'null', required: true},
    password: {type: String, default: 'null', required: true},
    email: {type: String, default: 'no-reply@bomb.com'},
});
mongoose.model('Admin', AdminSchema);
module.exports = mongoose.model('Admin');
