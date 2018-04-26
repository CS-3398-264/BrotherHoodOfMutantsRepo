//
// db.js
//
let mongoose = require('mongoose');
let password = "teambomb.com1964";
let username = "bomadmin";
let database_url = "mongodb://"+ username +":"+ password +"@nubernetwork-shard-00-00-7ug64.mongodb.net:27017,nubernetwork-shard-00-01-7ug64.mongodb.net:27017,nubernetwork-shard-00-02-7ug64.mongodb.net:27017/test?ssl=true&replicaSet=NUberNetwork-shard-0&authSource=admin";

// CONNECT TO MONGO DATABASE
mongoose.connect(database_url).then(function (data) {console.log(data);
    }).catch(function (error) {
    console.log("Mongodb connection failed.  Error is: " + error)
});
