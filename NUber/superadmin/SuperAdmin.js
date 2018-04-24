//
// SuperAdmin.js
//
let mongoose = require('mongoose');

///////////////////////////////////////
// DEFINE USER
///////////////////////////////////////
var SuperAdminSchema = new mongoose.Schema({
    username: {type: String, default: 'null', required: true}
});

mongoose.model('SuperAdmin', SuperAdminSchema);
module.exports = mongoose.model('SuperAdmin');
