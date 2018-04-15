// Trip.js
var mongoose = require('mongoose');
const conciergeType = ['None','Hunk', 'Hottie', 'Average Joe','Average Jane','Below Average Jones'];


var TripSchema = new mongoose.Schema({
    tripStart: String,
    tripEnd: String,
    totalCost: String,
    driverID: String,
    userID: String,
    concierge_type String,
    startLocation: String,
    endLocation: String
});

mongoose.model('Trip', TripSchema);

module.exports = mongoose.model('Trip');
