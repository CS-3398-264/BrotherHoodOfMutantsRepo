//
// Admin.js
//
var mongoose = require('mongoose');

///////////////////////////////////////
// DEFINE USER
///////////////////////////////////////
var AdminSchema = new mongoose.Schema({
        username: String,
        password: String,
    	email: String
});
mongoose.model('Admin', AdminSchema);
module.exports = mongoose.model('Admin');