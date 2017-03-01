(function(database){
    var mongojs = require("mongojs");
    // const MONGO_URL = "institutedb";
    // const MONGO_URL = "mongodb://bcit:Mang0@ds151108.mlab.com:51108/institutedb";
    const COLLECTION = "activities"

    var db = null;

    database.getDb = function(next){
        if(!db){
            // let us connect to the the database
            var db = mongojs(MONGO_URL, [COLLECTION]);
        }
        next(null,db);
    }
})(module.exports)