//
// AdminController.js
//
let express = require('express');
let mongoose = require('mongoose');
let bodyParser = require('body-parser');
let Admin = require('./Admin');
let jwt = require('jsonwebtoken');
let router = express.Router();
router.use(bodyParser.urlencoded({ extended: true }));

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// ADMIN CONTROLLER FUNCTIONS
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//////////////////////////////
// POST
/////////////////////////////

var message;
// CREATES A NEW ADMIN IN THE DATABASE
router.post('/', verifyToken, function (request, response) {
    let adminAuth = {
        'username': request.body.username,
        'password': request.body.password,
        'email': request.body.email
     };

    jwt.verify(request.token, 'secretkey', function(error,authData){
        if(error) {
            response.sendStatus(403);
        } else {
            Admin.create(adminAuth,function (error, admin) {
                if (error) return response.status(500).send({error:"There was a problem adding the user to the NUber Network."});
            });
        }

        jwt.sign({adminAuth: adminAuth}, 'secretadminkey', function(err,token){
            response.json({adminAuth: adminAuth, token: token});
        });
    });
});

//////////////////////////////
// GET
/////////////////////////////

// GET ALL ADMINS IN THE DATABASE
router.get('/', function (request, response) {
    Admin.find({}, function (error, admins) {
        if (error) return response.status(500).send({error:"There was a problem retrieving a list of admin users from the NUber Network."});
        response.status(200).send(admins);
    });
});

// GET AN ADMIN BY ID IN THE DATABASE
router.get('/:id', function (request, response) {
    Admin.findById(request.params.id, function (error, admins) {
        if (error) return response.status(500).send({error:"There was a problem retrieving the specified NUber admin from the NUber Network."});
        response.status(200).send(request.params.id + admins);
    });
});

//////////////////////////////
// DELETE
/////////////////////////////

// DELETE SPECIFIC ADMIN BY ID IN THE DATABASE
router.delete('/:id', verifyToken, function(request,response){
  jwt.verify(request.token, 'secretkey', function(error,authData){
    if(error) {
      response.sendStatus(403);
    } else {
      Admin.findByIdAndRemove(request.params.id, function(error,admin){
          if(error) return response.status(500).send({error:"There was a problem deleting the specified NUber admin from the NUber Network."});
          if(!admin) return response.status(404).send({error:"No matching users in the NUber Network."});
          response.status(200).send({success:"Removed!"});
      });
    }
  });
});

//////////////////////////////
// PUT
/////////////////////////////

// UPDATE SPECIFIC USER IN THE DATABASE
router.put('/:id', function(request,response){
    User.findByIdAndUpdate(request.params.id, request.body, {new: true}, function(error,admin){
        if(error) return response.status(500).send({error:"There was an error updating the specified NUber admin."});
        if (!admin) return response.status(404).send({error:"No matching users in the NUber Network."});
        response.status(200).send(admin.id);
    });
});

// VERIFY TOKEN
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
