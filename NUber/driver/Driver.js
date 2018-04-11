//
// Driver.js
//
var mongoose = require('mongoose'); // #include mongoose

// Define driver Schema
var DriverSchema = new mongoose.Schema({
    status:{
        type: String,
        default: 'available'
    },
    driver_type:{type: String, default: 'amateur'},
    service_type:{
        type: String,
        default: 'nuberx'
    },
    username: String,
    email: String,
    password: String,
    current_lat: String,
    current_long: String
});

mongoose.model('Driver', DriverSchema);

module.exports = mongoose.model('Driver');
