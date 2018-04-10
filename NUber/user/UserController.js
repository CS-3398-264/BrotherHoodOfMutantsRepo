///
// UserController.js
//
var express = require('express');                       // #include express
var bodyParser = require('body-parser');                // #include body-parser
var User = require('./User');                           // #include user object (user.js)
var router = express.Router();                          // Get a new express router
router.use(bodyParser.urlencoded({ extended: true }));


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// USER CONTROLLER FUNCTIONS
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//
// CREATES A NEW USER
//
router.post('/', function (req, res) {
    User.create({
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
        function (err, user) {
            if (err) return res.status(500).send("There was a problem adding the "+ user.username +" to the database.");
            res.status(200).send(user);
        });
});

//
// RETURNS ALL THE USERS IN THE DATABASE
//
router.get('/', function (req, res) {
    User.find({}, function (error, users) {
        console.log("Error: " + error);
        if (error) return res.status(500).send("There was a problem retrieving all NUber users.");
        res.status(200).send("The users of the NUber Network are:\n\n" + users);
    });
});

//
// RETURNS SPECIFIC USER IN THE DATABASE
//
router.get('/:id', function (req, res) {
    User.findById(req.params.id, function (err, user) {
        if (err) return res.status(500).send("There was a problem finding the specified NUber user.");
        if (!user) return res.status(404).send(user.id + " does not match any users in the NUber Network.");
        res.status(200).send("SUCCESS! NUber user "+ user.id + " has been found! \n\n" + user);
    });
});

//
// DELETE SPECIFIC USER IN THE DATABASE
//
router.delete('/:id', function(req,res){

    User.findByIdAndRemove(req.params.id, function(err,user){

        if(err) return res.status(500).send("There was a problem deleting " + user.id + " from the NUber network.");
        if (!user) return res.status(404).send(user.id + " does not match any users in the NUber Network.");
        res.status(200).send("SUCCESS! NUber user " + user.id + " was deleted from the NUber Network.");
    });

});

//
// UPDATE SPECIFIC USER IN THE DATABASE
//
router.put('/:id', function(req,res){

    User.findByIdAndUpdate(req.params.id, req.body, {new: true}, function(err,user){
        if(err) return res.status(500).send("There was an error updating the information.");
        if (!user) return res.status(404).send(user.id + " does not match any users in the NUber Network.");
        res.status(200).send("SUCCESS! NUber user " + user.id + " has been updated.");
    });

});

module.exports = router;