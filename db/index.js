(function(database){
    var mongojs = require("mongojs");
    const MONGO_URL = "mongodb://dj:123456@ds113680.mlab.com:13680/activitydb";
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