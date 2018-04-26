//
// Driver.js
//
let mongoose = require('mongoose');
let driverType = ['chauffeur','amateur','baby_driver', 'betty_white'];
let serviceType = ['nuber_x','nuber_xl', 'number_select','nuber_black','nuber_suv','nuber_lux'];

///////////////////////////////////////
// DEFINE DRIVER
///////////////////////////////////////
let DriverSchema = new mongoose.Schema({
    available: {type:Boolean, default: false},
    username: {type: String, default: 'null'},
    password: {type: String, default: 'null'},
    email: {type: String, default: 'no-reply@bomb.com'},
    latitude: {type: Number, default: 0},
    longitude: {type: Number, default: 0},
    serviceType: {type: String, enum: serviceType, default: 'nuber_x'},
    driverType: {type: String, enum: driverType, default: 'amateur'}
});

// EXPORT MODEL SCHEMA.
mongoose.model('Driver', DriverSchema);
module.exports = mongoose.model('Driver');
