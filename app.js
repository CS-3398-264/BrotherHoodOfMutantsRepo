//
// app.js
//
let express = require('express');
let db = require('./db');
let app = express();

//////////////////////////////
// GET HOMEPAGE
/////////////////////////////

let message = "Welcome To The NUber Network API!";

app.get('/', function (req, res) {
    res.send(message);
});

//////////////////////////////
// CONTROLLERS
/////////////////////////////

let UserController = require('./user/UserController');
app.use('/users', UserController);

let AdminController = require('./admin/AdminController');
app.use('/admins', AdminController);

let DriverController = require('./driver/DriverController');
app.use('/drivers', DriverController);

let TripController = require('./trip/TripController');
app.use('/trips', TripController);

let SuperAdminController = require('./superadmin/SuperAdminController');
app.use('/superadmins', SuperAdminController);

module.exports = app;
