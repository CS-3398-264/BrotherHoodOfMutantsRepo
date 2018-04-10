//
// db.js
//
var mongoose = require('mongoose'); // #include mongoose

// Mongo DB Credentials.
let password = "teambomb.com1964";  // MongoDB admin password
let username = "bomadmin";          // MongoDB admin username
let database_url = "mongodb://"+ username +":"+ password +"@nubernetwork-shard-00-00-7ug64.mongodb.net:27017,nubernetwork-shard-00-01-7ug64.mongodb.net:27017,nubernetwork-shard-00-02-7ug64.mongodb.net:27017/test?ssl=true&replicaSet=NUberNetwork-shard-0&authSource=admin";


// Attempt to connect to MongoDB via provided credentials.
mongoose.connect(database_url).then(function (data) {console.log(data);
    }).catch(function (error) {
    console.log("Mongodb connection failed.  Error is: " + error)
});
