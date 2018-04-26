//
// Admin.js
//
let mongoose = require('mongoose');

///////////////////////////////////////
// DEFINE USER
///////////////////////////////////////
let AdminSchema = new mongoose.Schema({
    username: {type: String, default: 'null', required: true},
    password: {type: String, default: 'null', required: true},
    email: {type: String, default: 'no-reply@bomb.com'},
});

// EXPORT MODEL SCHEMA.
mongoose.model('Admin', AdminSchema);
module.exports = mongoose.model('Admin');
