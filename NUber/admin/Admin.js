// Admin.js

var mongoose = require('mongoose');
const role = ['Admin'];
var AdminSchema = new mongoose.Schema({
	
	userID: String,
	username: String,
	Role: {type: String, enum: role, default: 'Admin'},
	curr_address: String,
    curr_latitude: String,
    curr_longitude: String
	
});

mongoose.model('Admin', AdminSchema);
module.exports = mongoose.model('Admin');