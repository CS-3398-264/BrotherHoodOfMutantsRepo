//
// app.js
//
var express = require('express');   // #include express
var db = require('./db');           // #include database
var app = express();              // Make app an express app.

//
// GET: Homepage for NUber Network
//
var message =
    "Welcome To The NUber Network API!\n\n" +
    "[GET] /users - To find all NUber Users.\n" +
    "[GET] /drivers - To find all NUber Drivers.\n" +
    "[GET] /admins - To find all NUber Admins.\n";
app.get('/', function (req, res) {
    res.send(message);
});

var UserController = require('./user/UserController');
app.use('/users', UserController);

var AdminController = require('./admin/AdminController');
app.use('/admins', AdminController);

var DriverController = require('./driver/DriverController');
app.use('/drivers', DriverController);

var TripController = require('./trip/TripController');
app.use('/trips', TripController);

var SuperAdminController = require('./superadmin/SuperAdminController');
app.use('/superadmins', SuperAdminController);

module.exports = app;
