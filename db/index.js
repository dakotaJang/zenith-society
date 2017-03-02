(function(database){
    var mongojs = require("mongojs");
    const MONGO_URL = "mongodb://user:123456@ds113580.mlab.com:13580/zenithdb";
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