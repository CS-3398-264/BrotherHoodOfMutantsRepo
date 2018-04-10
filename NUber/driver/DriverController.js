//
// UserController.js
//
var express = require('express');                       // #include express
var bodyParser = require('body-parser');                // #include body-parser
var Driver = require('./Driver');                        // #include user object (Driver.js)
var router = express.Router();                          // Get a new express router
router.use(bodyParser.urlencoded({ extended: true }));


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// USER CONTROLLER FUNCTIONS
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//
// CREATES A NEW USER
//
router.post('/', function (req, res) {
    Driver.create({
            driver_type: req.body.driver_type,
            service_type: req.body.service_type,
            concierge_type: req.body.concierge_type,
            username : req.body.username,
            firstName : req.body.firstName,
            lastName : req.body.lastName,
            email : req.body.email,
            password : req.body.password,
            curr_address : req.body.curr_address,
            curr_latitude : req.body.curr_latitude,
            curr_longitude : req.body.curr_longitude,
            dest_address : req.body.dest_address,
            dest_latitude : req.body.dest_latitude,
            dest_longitude : req.body.dest_longitude
        },
        function (err, driver) {
            if (err) return res.status(500).send("There was a problem adding the "+ driver.username +" to the database.");
            res.status(200).send(driver);
        });
});

//
// RETURNS ALL THE DRIVER IN THE DATABASE
//
router.get('/', function (req, res) {
    Driver.find({}, function (error, drivers) {
        console.log("Error: " + error);
        if (error) return res.status(500).send("There was a problem retrieving all NUber drivers.");
        res.status(200).send("The drivers of the NUber Network are:\n\n" + drivers);
    });
});

//
// RETURNS SPECIFIC DRIVER IN THE DATABASE
//
router.get('/:id', function (req, res) {
    Driver.findById(req.params.id, function (err, driver) {
        if (err) return res.status(500).send("There was a problem finding the specified NUber driver.");
        if (!driver) return res.status(404).send(driver.id + " does not match any drivers in the NUber Network.");
        res.status(200).send("SUCCESS! NUber driver "+ driver.id + " has been found! \n\n" + driver);
    });
});

//
// DELETE SPECIFIC DRIVER IN THE DATABASE
//
router.delete('/:id', function(req,res){

    Driver.findByIdAndRemove(req.params.id, function(err,driver){
        if(err) return res.status(500).send("There was a problem deleting " + driver.id + " from the NUber network.");
        if (!driver) return res.status(404).send(driver.id + " does not match any users in the NUber Network.");
        res.status(200).send("SUCCESS! NUber driver " + driver.id + " was deleted from the NUber Network.");
    });

});

//
// UPDATE SPECIFIC DRIVER IN THE DATABASE
//
router.put('/:id', function(req,res){

    Driver.findByIdAndUpdate(req.params.id, req.body, {new: true}, function(err,driver){
        if(err) return res.status(500).send("There was an error updating the information.");
        if (!driver) return res.status(404).send(driver.id + " does not match any users in the NUber Network.");
        res.status(200).send("SUCCESS! NUber driver " + driver.id + " has been updated.");
    });

});

module.exports = router;