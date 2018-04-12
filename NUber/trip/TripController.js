//TripController
var express = require('express');                       // #include express
var bodyParser = require('body-parser');                // #include body-parser
var Driver = require('D:/BrotherHoodOfMutantsRepo-master/NUber/driver/Driver.js');
var Trip = require('./Trip');                      // #include user object (Driver.js)
var router = express.Router();                          // Get a new express router
router.use(bodyParser.urlencoded({ extended: true }));
var dateStart = new Date();
var dateEnd = new Date();


router.post('/', function(req, res){
  Trip.create({
    tripStart: dateStart,
    tripEnd: dateEnd,
    totalCost: req.body.totalCost,
    driverID: req.body.driverID,
    concierge_type: req.body.concierge_type,
    startLocation: req.body.startLocation,
    endLocation: req.body.endLocation

  },
  function(err, trip){
    if(err) return res.status(500).send("Error starting trip.");
    res.status(200).send(trip);
  });
});

router.get('/', function (req, res) {
    Trip.find({}, function (error, trips) {
        console.log("Error: " + error);
        if (error) return res.status(500).send("There was a problem retrieving trip data.");
        res.status(200).send("The trips of the NUber Network are:\n\n" + trips);
    });
});


router.delete('/', function(req,res){

    Trip.findAndRemove(req.params.id, function(err,trips){
        if(err) return res.status(500).send("There was a problem deleting " + Trip.id + " from the NUber network.");
        if (!trips) return res.status(404).send(Trip.id + " does not match any users in the NUber Network.");
        res.status(200).send("SUCCESS! NUber driver " + Trip.id + " was deleted from the NUber Network.");
    });

});
module.exports = router;
