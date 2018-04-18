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


function getPerson(id, schemaType){
   return schemaType.findById(id);
}


// CREATE A TRIP IN TEH DATABASE
// POSS: trips/new?customerid=<id>&driverid=<id>&concierge=<type>
router.post('/new', function(request, response){
    var userID = request.query.customerid;
    var driverID = request.query.driverid;

    User.findById(userID).exec()
        .then(function (user) {
            var person = [];
            return Driver.findById(driverID).exec()
                .then(function (driver) {
                    return [user, driver];
                });
        
    })
        .then(function (person) {
        let customerLatitude = person[0].latitude;
        let customerLongitude = person[0].longitude;
        let driverLatitude = person[1].latitude;
        let driverLongitude = person[1].longitude;
        let directionsURL = 'https://www.google.com/maps/dir/?api=1&origin=' +customerLatitude+ ',' +customerLongitude+ '&destination=' +driverLatitude+ ',' +driverLongitude+ '&travelmode=driving';

        Trip.create({
                userID: userID,
                driverID: driverID,
                tripDuration: request.body.tripDuration,
                tripDistance: request.body.tripDistance,
                tripDirectionsURL: directionsURL,
                conciergeType: request.query.concierge
            },
            function (error, trip) {
                if (error) return response.status(500).send("Error creating trip in the NUber Network.");
                response.status(200).send(trip);
            });
    })
        .then(undefined, function(error){
        console.log(error);
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