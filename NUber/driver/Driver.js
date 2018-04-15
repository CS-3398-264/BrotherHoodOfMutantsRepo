//
// Driver.js
//
var mongoose = require('mongoose'); // #include mongoose
const driverType = ['chauffeur','amateur','babydriver', 'bettywhite'];

///////////////////////////////////////
// DEFINE DRIVER
///////////////////////////////////////
var DriverSchema = new mongoose.Schema({
    available: {type:Boolean, default: false},
    username: String,
    password: String,
    email: String,
    latitude: Number,
    longitude: Number,
    //serviceType: [{type: mongoose.Schema.ObjectId, ref: 'ServiceType'}],
    driverType: {type: String, enum: driverType, default: 'amateur'}
});
mongoose.model('Driver', DriverSchema);
module.exports = mongoose.model('Driver');
