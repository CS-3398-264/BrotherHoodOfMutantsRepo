//TripController
var express = require('express');
var bodyParser = require('body-parser');
var Trip = require('./Trip');
var Driver = require('../driver/Driver.js');
var User = require('../user/User.js');
let url = require('url');
var router = express.Router();
router.use(bodyParser.urlencoded({ extended: true }));

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// TRIP CONTROLLER FUNCTIONS
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//////////////////////////////
// POST
/////////////////////////////

function getLatitude(id, schemaType){
    schemaType.findById();
}
function getLongitude(id, schemaType){
    schemaType.findById();
}


// CREATE A TRIP IN TEH DATABASE
// POSS: trips/new?customerid=<id>&driverid=<id>&concierge=<type>
router.post('/new', function(request, response){
    //var customerLatitude = getLatitude(request.query.customerid, User);
    //var customerLongitude = getLongitude(request.query.customerid, User);
    //var driverLatitude = getLatitude(request.query.driverid, Driver);
    //var driverLongitude = getLongitude(request.query.driverid, Driver);

    var customerLatitude = 29.8688495;
    var customerLongitude = -97.9970412;
    var driverLatitude = 30.3080553;
    var driverLongitude = -98.0335944;

    var directionsURL = 'https://www.google.com/maps/dir/?api=1&origin='+customerLatitude+','+customerLongitude+'&destination='+driverLatitude+','+driverLongitude+'&travelmode=driving';
  Trip.create({
          userID: request.query.customerid,
          driverID: request.query.driverid,
          tripDuration: request.body.tripDuration,
          tripDistance: request.body.tripDistance,
          tripDirectionsURL: directionsURL,
          conciergeType: request.query.concierge
  },
  function(error, trip){
    if(error) return response.status(500).send("Error creating trip in the NUber Network.");
    response.status(200).send(trip);
  });
});

//////////////////////////////
// GET
/////////////////////////////

// GET ALL TRIPS IN THE DATABASE
router.get('/', function (request, response) {
    Trip.find({}, function (error, trips) {
        console.log("Error: " + error);
        if (error) return response.status(500).send("There was a problem retrieving a list of trips in the NUber Network.");
        response.status(200).send("NUber Network has the following trips record:\n\n" + trips);
    });
});

// GET A TRIP BY ID IN THE DATABASE
router.get('/:id', function (request, response) {
    Trip.findById(request.params.id, function (error, trip) {
        if (error) return response.status(500).send("There was a problem finding the specified trip record.");
        if (!trip) return response.status(404).send(trip.id + " does not match any trip records in the NUber Network.");
        response.status(200).send("SUCCESS! NUber trip record "+ trip.id +" has been found! \n\n" + trip);
    });
});
//////////////////////////////
// DELETE
/////////////////////////////

// DELETE A TRIP BY ID IN THE DATABASE
router.delete('/:id', function(request,response){
    Trip.findByIdAndRemove(request.params.id, function(error,trip){
        if(error) return response.status(500).send("There was a problem deleting " + trip.id + " from the NUber Network trip record.");
        if (!trip) return response.status(404).send(trip.id + " does not match any trips in the NUber Network trip record..");
        response.status(200).send("SUCCESS! The trip " + trip.id + " was deleted from the NUber Network trip record.");
    });
});
module.exports = router;