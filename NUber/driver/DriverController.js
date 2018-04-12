//
// UserController.js
//
var express = require('express');                       // #include express
var bodyParser = require('body-parser');                // #include body-parser
var Driver = require('./Driver');                        // #include user object (Driver.js)
var router = express.Router();                          // Get a new express router
router.use(bodyParser.urlencoded({ extended: true }));


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// DRIVER CONTROLLER FUNCTIONS
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


//////////////////////////////
// POST
/////////////////////////////

// CREATES A NEW USER
router.post('/', function (req, res) {
    Driver.create({
            status: req.body.status,
            driver_type: req.body.driver_type,
            service_type: req.body.service_type,
            username: req.body.username,
            email: req.body.email,
            password: req.body.password,
            current_lat: req.body.current_lat,
            current_long: req.body.current_long
        },
        function (err, driver) {
            if (err) return res.status(500).send("There was a problem adding the driver to the database.");
            res.status(200).send(driver);
        });
});

//////////////////////////////
// GET
/////////////////////////////

// RETURNS ALL DRIVERS IN THE DATABASE
router.get('/all/', function (req, res) {
    Driver.find({}, function (error, drivers) {
        console.log("Error: " + error);
        if (error) return res.status(500).send("There was a problem retrieving all NUber drivers.");
        res.status(200).send("The drivers of the NUber Network are:\n\n" + drivers);
    });
});

//RETURNS SPECIFIC DRIVER IN THE DATABASE BY ID
router.get('/id/:id', function (req, res) {
    Driver.findById(req.params.id, function (err, driver) {
        if (err) return res.status(500).send("There was a problem finding the specified NUber driver.");
        if (!driver) return res.status(404).send(driver.id + " does not match any drivers in the NUber Network.");
        res.status(200).send("SUCCESS! NUber driver "+ driver.id + " has been found! \n\n" + driver);
    });
});


// RETURNS ALL DRIVERS IN THE DATABASE BY SERVICE TYPE
router.get('/st/:service_type', function (req, res) {
    Driver.find({service_type : req.params.service_type}, function (error, drivers) {
        if (error) return res.status(500).send("There was a problem retrieving a list of "+req.params.service_type+" drivers on the NUber Network.");
        res.status(200).send("The NUber network has the following "+req.params.service_type+" drivers:\n\n" + drivers);
    });
});

// RETURNS ALL DRIVERS IN THE DATABASE BY DRIVER TYPE
router.get('/dt/:driver_type', function (req, res) {
    Driver.find({driver_type : req.params.driver_type}, function (error, drivers) {
        if (error) return res.status(500).send("There was a problem retrieving a list of "+req.params.driver_type+" style drivers on the NUber Network.");
        res.status(200).send("The NUber network has the following "+req.params.driver_type+" style drivers:\n\n" + drivers);
    });
});

//////////////////////////////
// DELETE
/////////////////////////////

// DELETE SPECIFIC DRIVER IN THE DATABASE
router.delete('/id/:id', function(req,res){

    Driver.findByIdAndRemove(req.params.id, function(err,driver){
        if(err) return res.status(500).send("There was a problem deleting " + driver.id + " from the NUber network.");
        if (!driver) return res.status(404).send(driver.id + " does not match any users in the NUber Network.");
        res.status(200).send("SUCCESS! NUber driver " + driver.id + " has been deleted from the NUber Network.");
    });

});

//////////////////////////////
// UPDATE
/////////////////////////////

// UPDATE SPECIFIC DRIVERS INFORMATION IN THE DATABASE
router.put('/id/:id', function(req,res){

    Driver.findByIdAndUpdate(req.params.id, req.body, {new: true}, function(err,driver){
        if(err) return res.status(500).send("There was an error updating the information.");
        if (!driver) return res.status(404).send(driver.id + " does not match any users in the NUber Network.");
        res.status(200).send("SUCCESS! NUber driver " + driver.id + " has been updated.");
    });

});

// UPDATE STATUS OF SPECIFIC DRIVER IN THE DATABASE
router.put('/id/:id/status/:status', function(req,res){

    Driver.findByIdAndUpdate(req.params.id, { status: req.params.status }, {new: true}, function(err,driver){
        if(err) return res.status(500).send("There was an error updating the information.");
        if (!driver) return res.status(404).send(driver.id + " does not match any users in the NUber Network.");
        res.status(200).send("SUCCESS! NUber driver " + driver.id + " has been updated.");
    });

});


module.exports = router;