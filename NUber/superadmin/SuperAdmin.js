//
// SuperAdmin.js
//
let mongoose = require('mongoose');

///////////////////////////////////////
// DEFINE USER
///////////////////////////////////////
let SuperAdminSchema = new mongoose.Schema({
    username: {type: String, default: 'null', required: true}
});

// EXPORT MODEL SCHEMA.
mongoose.model('SuperAdmin', SuperAdminSchema);
module.exports = mongoose.model('SuperAdmin');
