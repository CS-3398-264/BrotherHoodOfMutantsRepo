//TripController
let express = require('express');
let bodyParser = require('body-parser');
let mongoose = require('mongoose');
let Trip = require('./Trip');
let Driver = require('../driver/Driver.js');
let User = require('../user/User.js');
let url = require('url');
let jwt = require('jsonwebtoken');
let router = express.Router();
let googleDistance = require('google-distance');
router.use(bodyParser.urlencoded({ extended: true }));

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// TRIP CONTROLLER FUNCTIONS
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//////////////////////////////
// POST
/////////////////////////////

// CREATE A TRIP IN THE DATABASE
router.post('/new', verifyToken, function(request, response){

    let userID = request.query.userid;
    let driverID = request.query.driverid;

    jwt.verify(request.token, 'secretadminkey', function(error,authData) {
        if (error) {
            response.sendStatus(403);
        } else {
            User.findById(userID).exec().then(
                function (user) {
                    let person = [];
                    return Driver.findById(driverID).exec().then(
                        function (driver) {
                            return [user, driver];
                        });
                }).then(function (person) {

                let customerLatitude = person[0].latitude;
                let customerLongitude = person[0].longitude;
                let driverLatitude = person[1].latitude;
                let driverLongitude = person[1].longitude;
                let directionsURL = 'https://www.google.com/maps/dir/?api=1&origin=' + customerLatitude + ',' + customerLongitude + '&destination=' + driverLatitude + ',' + driverLongitude + '&travelmode=driving';

                googleDistance.get({
                    origin: driverLatitude + ',' + driverLongitude,
                    destination: customerLatitude + ',' + customerLongitude
                }, function (error, data) {
                    Trip.create({
                        userID: userID,
                        driverID: driverID,
                        tripDuration: Math.round((data.durationValue / 60) * 100) / 100,
                        tripDistance: Math.round((data.distanceValue / 1609.34) * 100) / 100,
                        tripDirectionsURL: directionsURL,
                        conciergeType: request.query.concierge
                    }, function (error, trip) {
                        if (error) return response.status(500).send("Error creating trip in the NUber Network.");
                        response.status(200).send(trip);
                    });
                });
            }).then(undefined, function (error) {
                console.log(error);
            });
        }
    });
});

//////////////////////////////
// GET
/////////////////////////////

// GET ALL TRIPS IN THE DATABASE
router.get('/', function (request, response) {
    Trip.find({}, function (error, trips) {
        console.log("Error: " + error);
        if (error) return response.status(500).send("There was a problem retrieving all trips records in the NUber Network.");
        response.status(200).send(trips);
    });
});

// GET A TRIP BY ID IN THE DATABASE
router.get('/:id', function (request, response) {
    Trip.findById(request.params.id, function (error, trip) {
        if (error) return response.status(500).send("There was a problem finding the specified trip record.");
        if (!trip) return response.status(404).send(trip.id + " does not match any trip records in the NUber Network.");
        response.status(200).send(trip);
    });
});
// GET A TRIP BY ID IN THE DATABASE AND RETURN DIRECTIONS
router.get('/:id/directions', function (request, response) {
    Trip.findById(request.params.id, function (error, trip) {
        if (error) return response.status(500).send("There was a problem finding the specified trip record.");
        if (!trip) return response.status(404).send(trip.id + " does not match any trip records in the NUber Network.");
        response.status(200).send(trip.tripDirectionsURL);
    });
});

// GET A TRIP BY ID IN THE DATABASE AND RETURN DIRECTIONS
router.get('/:id/duration', function (request, response) {
    Trip.findById(request.params.id, function (error, trip) {
        if (error) return response.status(500).send("There was a problem finding the specified trip record.");
        if (!trip) return response.status(404).send(trip.id + " does not match any trip records in the NUber Network.");
        console.log(trip.tripDuration);
        response.status(200).send((trip.tripDuration).toString());
    });
});

// GET ALL TRIPS TAKEN BY SPECIFIED USER ID
router.get('/user/:id', function (request, response) {
    Trip.find({userID: request.params.id}, function (error, trips) {
        if (error) return response.status(500).send("There was a problem finding the trips for the specified user.");
        if (!trips) return response.status(404).send("Specified user does not have any trip records in the NUber Network.");
        response.status(200).send(trips);
    });
});
// GET ALL TRIPS TAKEN BY SPECIFIED DRIVER ID
router.get('/driver/:id', function (request, response) {
    Trip.find({driverID: request.params.id}, function (error, trips) {
        if (error) return response.status(500).send("There was a problem finding the trips for the specified driver.");
        if (!trips) return response.status(404).send("Specified driver does not have any trip records in the NUber Network.");
        response.status(200).send(trips);
    });
});

//////////////////////////////
// DELETE
/////////////////////////////

// DELETE A TRIP BY ID IN THE DATABASE
router.delete('/:id', verifyToken,  function(request,response){

    jwt.verify(request.token, 'secretadminkey', function(error,authData) {
        if (error) {
            response.sendStatus(403);
        } else {
            Trip.findByIdAndRemove(request.params.id, function (error, trip) {
                if (error) return response.status(500).send("There was a problem deleting " + trip.id + " from the NUber Network trip record.");
                if (!trip) return response.status(404).send(trip.id + " does not match any trips in the NUber Network trip record..");
                response.status(200).send("SUCCESS!");
            });
        }
    });
});

// DELETE A TRIP BY ID IN THE DATABASE
router.delete('/removeall', verifyToken, function(request,response){

    jwt.verify(request.token, 'secretadminkey', function(error,authData){
        if(error) {
            response.sendStatus(403);
        } else {
            Trip.remove({}, function (error, trip) {
                console.log(error);
                if (error) return response.status(500).send("There was a problem deleting " + trip.id + " from the NUber Network trip record.");
                if (!trip) return response.status(404).send(trip.id + " does not match any trips in the NUber Network trip record..");
                response.status(200).send("SUCCESS!");
            });
        }
    })
});

//VERIFYTOKEN
function verifyToken(request,response,next) {
    //get the auth Header value
    const bearerHeader = request.headers['authorization'];
    if(typeof bearerHeader !== 'undefined') {
        const bearer = bearerHeader.split(' ');
        const bearerToken = bearer[1];
        request.token = bearerToken;
        next();

    } else {
        response.sendStatus(403);
    }
}

module.exports = router;