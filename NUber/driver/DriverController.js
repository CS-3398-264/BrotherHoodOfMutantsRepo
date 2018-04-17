//
// UserController.js
//
let express = require('express');                       // #include express
let bodyParser = require('body-parser');                // #include body-parser
let Driver = require('./Driver');                        // #include user object (Driver.js)
let url = require('url');
let router = express.Router();                          // Get a new express router
router.use(bodyParser.urlencoded({ extended: true }));


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// DRIVER CONTROLLER FUNCTIONS
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//////////////////////////////
// POST
/////////////////////////////

// CREATES A DRIVER
router.post('/', function (request, response) {
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
            if (error) return response.status(500).send("Theere was a problem adding the driver to the NUber Network.");
            response.status(200).send(driver);
        });
});

//////////////////////////////
// GET
/////////////////////////////

// RETURNS ALL DRIVERS IN THE DATABASE
router.get('/', function (request, response) {
    Driver.find({}, function (error, drivers) {
        if (error) return response.status(500).send("There was a problem retrieving the list of all NUber drivers.");
        response.status(200).send("The NUber Network contains the following drivers:\n\n" + drivers);
    });
});

//RETURNS SPECIFIC DRIVER BY ID IN THE DATABASE
router.get('/:id', function (request, response) {
    Driver.findById(request.params.id, function (error, driver) {
        if (error) return response.status(500).send("There was a problem finding the specified NUber driver.");
        if (!driver) return response.status(404).send(driver.id + " does not match any drivers in the NUber Network.");
        response.status(200).send("SUCCESS! NUber driver "+ driver.id + " has been found! \n\n" + driver);
    });
});

//////////////////////////////
// DELETE
/////////////////////////////

// DELETE SPECIFIC DRIVER BY ID IN THE DATABASE
router.delete('/:id', function(request,response){
    Driver.findByIdAndRemove(request.params.id, function(error,driver){
        if(error) return response.status(500).send("There was a problem deleting the specified driver from the NUber network.");
        if (!driver) return response.status(404).send(driver.id + " does not match any users in the NUber Network.");
        response.status(200).send("SUCCESS! NUber driver " + driver.id + " has been deleted from the NUber Network.");
    });
});

//////////////////////////////
// UPDATE
/////////////////////////////

// UPDATE SPECIFIC DRIVERS INFORMATION BY ID IN THE DATABASE
router.put('/:id', function(request,response){
    Driver.findByIdAndUpdate(request.params.id, request.body, {new: true}, function(error,driver){
        if(error) return response.status(500).send("There was an error updating the specified NU");
        if (!driver) return response.status(404).send(driver.id + " does not match any users in the NUber Network.");
        response.status(200).send("SUCCESS! NUber driver " + driver.id + " has been updated.");
    });
});

//UPDATE STATUS OF SPECIFIC DRIVER IN THE DATABASE
router.put('/:id/status', function(request,response){
    Driver.findByIdAndUpdate(request.params.id, { status: request.query.available }, {new: true}, function(error,driver){
        if(error) return response.status(500).send("There was an error updating the specified NUber driver.");
        if (!driver) return response.status(404).send(driver.id + " does not match any drivers in the NUber Network.");
        response.status(200).send("SUCCESS! NUber driver " + driver.id + " has been updated.");
    });
});

module.exports = router;