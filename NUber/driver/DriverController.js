//
// UserController.js
//
let express = require('express');
let bodyParser = require('body-parser');
let Driver = require('./Driver');
let User = require('../user/User.js');
let url = require('url');
let router = express.Router();
let jwt = require('jsonwebtoken');
router.use(bodyParser.urlencoded({ extended: true }));


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// DRIVER CONTROLLER FUNCTIONS
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//////////////////////////////
// POST
/////////////////////////////

// CREATES A DRIVER
router.post('/', verifyToken, function (request, response) {
  jwt.verify(request.token, 'secretadminkey', function(error,authData){
    if(error) {
      response.sendStatus(403);
    } else {

        Driver.create({
                available: request.body.available,
                username: request.body.username,
                password: request.body.password,
                email: request.body.email,
                latitude: request.body.latitude,
                longitude: request.body.longitude,
                serviceType: request.body.serviceType,
                driverType: request.body.driverType
            },
            function (error, driver) {
                if (error) return response.status(500).send({error:"There was a problem adding the driver to the NUber Network."});
                response.status(200).send(driver);
            });
          }
    });
});

//////////////////////////////
// GET
/////////////////////////////

// RETURNS ALL DRIVERS IN THE DATABASE
router.get('/', function (request, response) {
    Driver.find({}, function (error, drivers) {
        if (error) return response.status(500).send({error:"There was a problem retrieving the list of all NUber drivers."});
        response.status(200).send(drivers);
    });
});

//RETURNS SPECIFIC DRIVER BY ID IN THE DATABASE
router.get('/:id', function (request, response) {
    Driver.findById(request.params.id, function (error, driver) {
        if (error) return response.status(500).send({error:"There was a problem finding the specified NUber driver."});
        if (!driver) return response.status(404).send({error:driver.id + " does not match any drivers in the NUber Network."});
        response.status(200).send(driver);
    });
});

// RETURNS ALL DRIVERS OF SPECIFIED SERVICE TYPE IN THE DATABASE
router.get('/service/:type', function(request,response){
    Driver.find({serviceType: request.params.type}, function (error, drivers){
        if (error) return response.status(500).send({error:"There was a problem retrieving the list of all NUber drivers."});
        if (!Array.isArray(drivers) || !drivers.length) return response.status(404).send({error:"No drivers of service type "+request.params.type+ " found!"});
        response.status(200).send(drivers);
    });
});

// RETURNS ALL DRIVERS OF SPECIFIED DRIVER TYPE IN THE DATABASE
router.get('/type/:type', function(request,response){
    Driver.find({driverType: request.params.type}, function (error, drivers){
        if (error) return response.status(500).send({error:"There was a problem retrieving the list of all NUber drivers."});
        if (!Array.isArray(drivers) || !drivers.length) return response.status(404).send({error:"No drivers of driver type "+request.params.type+ " found!"});
        response.status(200).send(drivers);
    });
});

//RETURNS LIST OF ALL DRIVERS IN SPECIFIED RANGE
router.get('/:id/range', function(request, response){
var userID = request.params.id;

    User.findById(userID).exec()
        .then(function (user) {
            var person = [];
            return Driver.find({}).exec()
                .then(function (drivers) {
                    return [user, drivers];
                });
        })
        .then(function (person) {
            let customerLatitude = person[0].latitude;
            let customerLongitude = person[0].longitude;
            let drivers = person[1];
            var driversInRange = [];
            var desiredDistance = request.query.distance;

            drivers.forEach(function (driver) {

                var driverLatitude = driver.latitude;
                var driverLongitude = driver.longitude;

                var distance = getDistanceFromLatLonInMiles(customerLatitude, customerLongitude, driverLatitude, driverLongitude);

                if(distance <= desiredDistance){
                    driversInRange.push(driver);
                }
            });
            if(!Array.isArray(driversInRange) || !driversInRange.length){
                response.status(404).send({error:"No drivers found within " + desiredDistance +" miles."});
            } else {
                response.status(200).send(driversInRange);
            }
        }).then(undefined, function(error){
        console.log(error)
    });
});

// FUNCTION TO CALCULATE DISTANCE BETWEEN TWO LAT/LONGS
function getDistanceFromLatLonInMiles(lat1,lon1,lat2,lon2) {
    var R = 3595; // Radius of the earth in mi
    var dLat = deg2rad(lat2-lat1);  // deg2rad below
    var dLon = deg2rad(lon2-lon1);
    var a =
        Math.sin(dLat/2) * Math.sin(dLat/2) +
        Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
        Math.sin(dLon/2) * Math.sin(dLon/2)
    ;
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    var d = R * c; // Distance in mi
    return d;
}

// FUNCTION TO CONVERT DEGREES TO RADIANS
function deg2rad(deg) {
    return deg * (Math.PI/180)
}

//////////////////////////////
// DELETE
/////////////////////////////

// DELETE SPECIFIC DRIVER BY ID IN THE DATABASE
router.delete('/:id', verifyToken, function(request,response){
  jwt.verify(request.token, 'secretadminkey', function(error,authData){
    if(error) {
      response.sendStatus(403);
    } else {

        Driver.findByIdAndRemove(request.params.id, function(error,driver){
            if(error) return response.status(500).send({error:"There was a problem deleting the specified driver from the NUber network."});
            if (!driver) return response.status(404).send({error:"No matching users in the NUber Network."});
            response.status(200).send({success:"Success!"});
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
            Driver.remove({}, function (error, trip) {
                console.log(error);
                if (error) return response.status(500).send({error:"There was a problem deleting the specified user from the NUber Network trip record."});
                if (!trip) return response.status(404).send({error:"No trips in the NUber Network."});
                response.status(200).send("SUCCESS!");
            });
        }
    })
});

//////////////////////////////
// UPDATE
/////////////////////////////

// UPDATE SPECIFIC DRIVERS INFORMATION BY ID IN THE DATABASE
router.put('/:id', function(request,response){
    Driver.findByIdAndUpdate(request.params.id, request.body, {new: true}, function(error,driver){
        if(error) return response.status(500).send({error:"There was an error updating the specified NU"});
        if (!driver) return response.status(404).send({error:"No matching users in the NUber Network."});
        response.status(200).send(driver.id);
    });
});

//UPDATE STATUS OF SPECIFIC DRIVER IN THE DATABASE
router.put('/:id/status', function(request,response){
    Driver.findByIdAndUpdate(request.params.id, { available: request.query.available }, {new: true}, function(error,driver){
        if(error) return response.status(500).send();
        if (!driver) return response.status(404);
        response.status(200).send(driver.id);
    });
});

// VERIFYTOKEN
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
