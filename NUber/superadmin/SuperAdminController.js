//
// AdminController.js
//
var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var SuperAdmin = require('./SuperAdmin');
var jwt = require('jsonwebtoken');
var router = express.Router();
router.use(bodyParser.urlencoded({ extended: true }));

////////////////////
//GET
///////////////////
//RETURNS THE SUPERADMIN DATA + A SUPERADMIN AUTHORIZATION KEY

router.get('/:id', function (request, response) {
  
    if(request.params.id === 'jasondiaz') {
        jwt.sign({SuperAdmin: SuperAdmin}, 'secretkey', function (err, token) {
            SuperAdmin.find({}, function (error, superadmins) {
                if (error) return response.status(500).send("There was a problem retrieving the list of all NUber SuperAdmins.");
                var superAdminData = superadmins;
                response.json({
                    superadmins: superAdminData,
                    token: token
                });
            });


        });
    }
    else return response.status(500).send();
    });
//////////////////////////////////
//POST
//////////////////////////////////
//ADDS SUPERADMIN JASON DIAZ TO DATABASE

router.post('/', function(request, response){

  var adminData = {
    "username": "Jason Diaz"
  }
  SuperAdmin.create(adminData, function(err,adminData){
      if(err) return response.status(500).send();
      else
          return response.status(200).send();

  })


});

  router.delete('/:id', function(request,response){
      SuperAdmin.findByIdAndRemove(request.params.id, function(error,superadmin){
          if(error) return response.status(500).send("There was a problem deleting the specified Super admin from the NUber network.");
          if (!superadmin) return response.status(404).send(SuperAdmin.id + " does not match any super admins in the NUber Network.");
          response.status(200).send("SUCCESS! NUber super admin " + SuperAdmin.id + " has been deleted from the NUber Network.");
      });
  });


module.exports = router;
