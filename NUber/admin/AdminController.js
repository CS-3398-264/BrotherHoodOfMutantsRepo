// AdminController.js
var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var addDriver = require('D:/BrotherHoodOfMutantsRepo-master/NUber/driver/Driver.js');
var Admin = require('./Admin');
var router = express.Router();
router.use(bodyParser.urlencoded({ extended: true }));

//
// CREATES A NEW DRIVER
//
router.post('/', function (req, res) {
    addDriver.create({
            status: req.body.status,
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
// CREATES A NEW ADMIN
router.post('/:userID', function(req, res){
	Admin.create({
		username: req.body.username,
		Role: req.body.role,
		curr_address: req.body.curr_address,
		curr_latitude: req.body.curr_latitude,
		curr_longitude:  req.body.curr_longitude
			
	},
	 function (err, admins) {
            if (err) return res.status(500).send("There was a problem adding the "+ admins.username +" to the database.");
            res.status(200).send(admins);
	 });
	
	
	
});

//
// GETS A LIST OF ADMINS
//

router.get('/', function (req, res) {
    Admin.find({}, function (error, admins) {
        console.log("Error: " + error);
        if (error) return res.status(500).send("There was a problem retrieving all NUber admins.");
        res.status(200).send("The admins of the NUber Network are:\n\n" + admins);
    });
});


//
// DELETE SPECIFIC DRIVER IN THE DATABASE
//
router.delete('/:id', function(req,res){

    addDriver.findByIdAndRemove(req.params.id, function(err,driver){
        if(err) return res.status(500).send("There was a problem deleting " + driver.id + " from the NUber network.");
        if (!driver) return res.status(404).send(driver.id + " does not match any users in the NUber Network.");
        res.status(200).send("SUCCESS! NUber driver " + driver.id + " was deleted from the NUber Network.");
    });

});

module.exports = router;
