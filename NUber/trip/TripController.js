//TripController
var express = require('express');
var bodyParser = require('body-parser');
var Trip = require('./Trip');
var router = express.Router();
router.use(bodyParser.urlencoded({ extended: true }));

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// TRIP CONTROLLER FUNCTIONS
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//////////////////////////////
// POST
/////////////////////////////

// CREATE A TRIP IN TEH DATABASE
router.post('/', function(request, response){
  Trip.create({
          customerID: request.body.customerID,
          driverID: request.body.driverID,
          tripDuration: request.body.tripDuration,
          tripDistance: request.body.tripDistance,
          tripDirectionsURL: request.body.tripDirectionsURL,
          conciergeType: request.body.conciergeType
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
    Trip.findById(request.params.id, function (error, user) {
        if (error) return response.status(500).send("There was a problem finding the specified trip record.");
        if (!user) return response.status(404).send(user.id + " does not match any trip records in the NUber Network.");
        response.status(200).send("SUCCESS! NUber trip record "+ user.id +" has been found! \n\n" + user);
    });
});
//////////////////////////////
// DELETE
/////////////////////////////

// DELETE A TRIP BY ID IN THE DATABASE
router.delete('/:id', function(request,response){
    Trip.findAndRemove(request.params.id, function(error,trips){
        if(error) return response.status(500).send("There was a problem deleting " + Trip.id + " from the NUber Network trip record.");
        if (!trips) return response.status(404).send(Trip.id + " does not match any trips in the NUber Network trip record..");
        response.status(200).send("SUCCESS! The trip " + Trip.id + " was deleted from the NUber Network trip record.");
    });
});
module.exports = router;