// Trip.js
var mongoose = require('mongoose');         // Import Mongoose
var conciergeType = require('./ConciergeType'); // Import ServiceType.js

///////////////////////////////////////
// DEFINE TRIP
///////////////////////////////////////

var TripSchema = new mongoose.Schema({
    customerID: String,
    driverID: String,
    tripDuration: Number,
    tripDirectionsURL: String,
    conciergeType: [{type: mongoose.Schema.ObjectId, ref: 'ConciergeType'}]
},{
    // FUNCTION: timestamps - (true) gives access to trip.createdat and trip.updatedat
    // REFERENCE: http://mongoosejs.com/docs/guide.html#timestamps
    timestamps: true
});
mongoose.model('Trip', TripSchema);
module.exports = mongoose.model('Trip');
