//
// server.js
//
var app = require('./app');             // #include application (app.js)

var port = process.env.PORT || 8080;    // Setup port using port #8080

// Confirm port is up and running on specified port.
var server = app.listen(port, function(){
    console.log("Express Server listening on port " + port + ".");
});
