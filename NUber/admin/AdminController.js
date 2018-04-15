//
// AdminController.js
//
var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var Admin = require('./Admin');
var router = express.Router();
router.use(bodyParser.urlencoded({ extended: true }));

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// ADMIN CONTROLLER FUNCTIONS
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//////////////////////////////
// POST
/////////////////////////////

// CREATE A NEW ADMIN IN THE DATABASE
router.post('/', function (request, response) {
    Admin.create({
            username: request.body.username,
            password: request.body.password,
            email: request.body.email
        },
        function (error, admin) {
            if (error) return response.status(500).send("There was a problem adding "+ admin.username +" to the NUber Network.");
            response.status(200).send(admin);
        });
});

//////////////////////////////
// GET
/////////////////////////////

// GET ALL ADMINS IN THE DATABASE
router.get('/', function (request, response) {
    Admin.find({}, function (error, admins) {
        if (error) return response.status(500).send("There was a problem retrieving a list of admin users from the NUber Network.");
        response.status(200).send("The NUBer Network has the following admins:\n\n" + admins);
    });
});

// GET AN ADMIN BY ID IN THE DATABASE
router.get('/:id', function (request, response) {
    Admin.findById(request.params.id, function (error, admins) {
        if (error) return response.status(500).send("There was a problem retrieving the specified NUber admin from the NUber Network.");
        response.status(200).send("SUCCESS! The NUber admin " + request.params.id + " was found!\n\n" + admins);
    });
});

//////////////////////////////
// DELETE
/////////////////////////////

// DELETE SPECIFIC DRIVER BY ID IN THE DATABASE
router.delete('/:id', function(request,response){
    addDriver.findByIdAndRemove(request.params.id, function(error,admin){
        if(error) return response.status(500).send("There was a problem deleting the specified NUber admin from the NUber Network.");
        if(!driver) return response.status(404).send(admin.id + " does not match any users in the NUber Network.");
        response.status(200).send("SUCCESS! The NUber admin " + admin.id + " was deleted from the NUber Network.");
    });
});

//////////////////////////////
// PUT
/////////////////////////////

// UPDATE SPECIFIC USER IN THE DATABASE
router.put('/:id', function(request,response){
    User.findByIdAndUpdate(request.params.id, request.body, {new: true}, function(error,admin){
        if(error) return response.status(500).send("There was an error updating the specified NUber admin.");
        if (!admin) return response.status(404).send(admin.id + " does not match any users in the NUber Network.");
        response.status(200).send("SUCCESS! NUber admin " + admin.id + " has been updated.");
    });
});

module.exports = router;
