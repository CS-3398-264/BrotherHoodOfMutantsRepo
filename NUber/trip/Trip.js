// Trip.js
let mongoose = require('mongoose');         // Import Mongoose
let conciergeType = ['none','hunk','hottie','average_joe','average_jane','below_average_jones']

///////////////////////////////////////
// DEFINE TRIP
///////////////////////////////////////

var TripSchema = new mongoose.Schema({
    customerID: String,
    driverID: String,
    tripDuration: Number,
    tripDirectionsURL: String,
    conciergeType: {type: String, enum: conciergeType, default: 'none'}
},{
    // FUNCTION: timestamps - (true) gives access to trip.createdat and trip.updatedat
    // REFERENCE: http://mongoosejs.com/docs/guide.html#timestamps
    timestamps: true
});
mongoose.model('Trip', TripSchema);
module.exports = mongoose.model('Trip');
