//
// AdminController.js
//
let express = require('express');
let mongoose = require('mongoose');
let bodyParser = require('body-parser');
let SuperAdmin = require('./SuperAdmin');
let jwt = require('jsonwebtoken');
let router = express.Router();
router.use(bodyParser.urlencoded({ extended: true }));

//////////////////////////////////
// GET
//////////////////////////////////

// RETURNS THE SUPERADMIN DATA + A SUPERADMIN AUTHORIZATION KEY
router.get('/:id', function (request, response) {
  
    if(request.params.id === 'jasondiaz') {
        jwt.sign({SuperAdmin: SuperAdmin}, 'secretkey', function (err, token) {
            SuperAdmin.find({}, function (error, superadmins) {
                if (error) return response.status(500).send({error:"There was a problem retrieving the list of all NUber SuperAdmins."});
                let superAdminData = superadmins;
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
// POST
//////////////////////////////////

// ADDS SUPERADMIN JASON DIAZ TO DATABASE
router.post('/', function(request, response){

    let adminData = {"username": "Jason Diaz"};
    SuperAdmin.create(adminData, function(err,adminData){
          if(err) return response.status(500).send();
            else
          return response.status(200).send({success:"Created!"});
  });

});

//////////////////////////////////
// DELETE
//////////////////////////////////

// DELETES SUPER ADMIN FROM THE DATABASE
router.delete('/:id', function(request,response){
    SuperAdmin.findByIdAndRemove(request.params.id, function(error,superadmin){
        if(error) return response.status(500).send({error:"There was a problem deleting the specified Super admin from the NUber network."});
        if (!superadmin) return response.status(404).send({error:"No matching super admins in the NUber Network."});
        response.status(200).send({success:"Removed!"});
      });
});

module.exports = router;
