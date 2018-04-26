//
// server.js
//
let app = require('./app');
let port = process.env.PORT || 8080;

// CONFIRM SERVER IS RUNNING.
let server = app.listen(port, function(){
    console.log("Express Server listening on port " + port + ".");
});
