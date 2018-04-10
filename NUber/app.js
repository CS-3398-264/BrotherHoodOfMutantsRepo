//
// app.js
//
var express = require('express');   // #include express
var db = require('./db');           // #include database
var app = express();                // Make app an express app.

// Uncomment "xxxxController after scheme has been created.


// var UserController = require('./user/UserController');
// app.use('/users', UserController);
//
// var AdminController = require('./admin/AdminController');
// app.use('/users', AdminController);
//
// var DriverController = require('./driver/DriverController');
// app.use('/users', DriverController);

module.exports = app;