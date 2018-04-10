//
// Driver.js
//
var mongoose = require('mongoose'); // #include mongoose
const driverType = ['Amateur', 'Baby Driver', 'Chauffeur','Betty White'];
const serviceType = ['NUber X', 'NUber XL', 'NUber SELECT', 'NUber BLACK', 'NUber SUV', 'NUber LUX'];
const conciergeType = ['None','Hunk', 'Hottie', 'Average Joe','Average Jane','Below Average Jones'];


// Define user Schema
var DriverSchema = new mongoose.Schema({
    driver_type:{type: String, enum: driverType, default: 'Amateur'},
    service_type:{type: String, enum: serviceType, default: 'NUber X'},
    concierge_type:{type: String, enum: conciergeType, default: 'None'},
    username: String,
    firstName: String,
    lastName: String,
    email: String,
    password: String,
    curr_address: String,
    curr_latitude: String,
    curr_longitude: String,
    dest_address: String,
    dest_latitude: String,
    dest_longitude: String
});

mongoose.model('Driver', DriverSchema);

module.exports = mongoose.model('Driver');
