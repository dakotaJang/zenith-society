var connection = new Mongo( "ds113580.mlab.com:13580" );
var db = connection.getDB( "zenithdb" );
var authentication = db.auth( "user", "123456" );
if(authentication){
    db.activities.remove({});
    print( "activities collection has been reset." );

    var creationDate = new Date();
    // var creationDate = new Date("2017-03-01T08:30:00.00Z");
    db.activities.insertMany(
    [{
        "Description":"Senior’s  Golf Tournament",
        "CreationDate": creationDate
    },
    {
        "Description":"Leadership General Assembly Meeting",
        "CreationDate": creationDate
    },
    {
        "Description":"Youth Bowling Tournament",
        "CreationDate": creationDate
    },
    {
        "Description":"Young ladies cooking lessons",
        "CreationDate": creationDate
    },
    {
        "Description":"Youth craft lessons",
        "CreationDate": creationDate
    },
    {
        "Description":"Youth choir practice",
        "CreationDate": creationDate
    },
    {
        "Description":"Lunch",
        "CreationDate": creationDate
    },
    {
        "Description":"Pancake Breakfast",
        "CreationDate": creationDate
    },
    {
        "Description":"Swimming Lessons for the youth",
        "CreationDate": creationDate
    },

    {
        "Description":"Swimming Exercise for parents",
        "CreationDate": creationDate
    },
    {
        "Description":"Bingo Tournament",
        "CreationDate": creationDate
    },
    {
        "Description":"BBQ Lunch",
        "CreationDate": creationDate
    },
    {
        "Description":"Garage Sale",
        "CreationDate": creationDate
    }
    ]);
    print( "activities collection has been repopulated." );
}