///
// UserController.js
//
var express = require('express');                       // #include express
var bodyParser = require('body-parser');                // #include body-parser
var User = require('./User');                           // #include user object (User.js)
var router = express.Router();                          // Define an express router
router.use(bodyParser.urlencoded({ extended: true }));

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// USER CONTROLLER FUNCTIONS
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//////////////////////////////
// POST
/////////////////////////////

// CREATES A NEW USER
router.post('/', function (request, response) {
    User.create({
            username : request.body.username,
            password : request.body.password,
            email : request.body.email,
            latitude : request.body.latitude,
            longitude : request.body.longitude
        },
        function (error, user) {
            if (error) return response.status(500).send("There was a problem adding the "+ user.username +" to the NUber Network.");
            response.status(200).send(user);
        });
});

//////////////////////////////
// GET
/////////////////////////////

// RETURNS ALL THE USERS IN THE DATABASE
router.get('/', function (request, response) {
    User.find({}, function (error, users) {
        if (error) return response.status(500).send("There was a problem retrieving a list of all NUber users.");
        response.status(200).send("The NUber Network has the following users:\n\n" + users);
    });
});

// RETURNS SPECIFIC USER IN THE DATABASE
router.get('/:id', function (request, response) {
    User.findById(request.params.id, function (error, user) {
        if (error) return response.status(500).send("There was a problem finding the specified NUber user.");
        if (!user) return response.status(404).send(user.id + " does not match any users in the NUber Network.");
        response.status(200).send("SUCCESS! NUber user "+ user.id +" has been found! \n\n" + user);
    });
});

//////////////////////////////
// DELETE
/////////////////////////////

// DELETE SPECIFIC USER IN THE DATABASE
router.delete('/:id', function(request,response){
    User.findByIdAndRemove(request.params.id, function(error,user){
        if(error) return response.status(500).send("There was a problem deleting " + user.id + " from the NUber network.");
        if (!user) return response.status(404).send(user.id + " does not match any users in the NUber Network.");
        response.status(200).send("SUCCESS! NUber user " + user.id + " was deleted from the NUber Network.");
    });
});

//////////////////////////////
// PUT
/////////////////////////////

// UPDATE SPECIFIC USER IN THE DATABASE
router.put('/:id', function(req,res){
    User.findByIdAndUpdate(req.params.id, req.body, {new: true}, function(error,user){
        if(error) return res.status(500).send("There was an error updating the information.");
        if (!user) return res.status(404).send(user.id + " does not match any users in the NUber Network.");
        res.status(200).send("SUCCESS! NUber user " + user.id + " has been updated.");
    });
});
module.exports = router;