var connection = new Mongo( "ds113580.mlab.com:13580" );
var db = connection.getDB( "activitydb" );
db.auth( "user", "123456" );

db.activities.remove({});
print( "activities collection has been reset." );
db.activities.insert(
[{
    "Description":"Senior’s  Golf Tournament",
    "CreationDate": {"$date": "2017-03-01T08:30:00.000Z"}
 },
{
    "Description":"Leadership General Assembly Meeting",
    "CreationDate": {"$date": "2017-03-01T08:30:00.000Z"}
 },
{
    "Description":"Youth Bowling Tournament",
    "CreationDate": {"$date": "2017-03-01T08:30:00.000Z"}
 },
{
    "Description":"Young ladies cooking lessons",
    "CreationDate": {"$date": "2017-03-01T08:30:00.000Z"}
 },
{
    "Description":"Youth craft lessons",
    "CreationDate": {"$date": "2017-03-01T08:30:00.000Z"}
 },
{
    "Description":"Youth choir practice",
    "CreationDate": {"$date": "2017-03-01T08:30:00.000Z"}
 },
{
    "Description":"Lunch",
    "CreationDate": {"$date": "2017-03-01T08:30:00.000Z"}
 },
{
    "Description":"Pancake Breakfast",
    "CreationDate": {"$date": "2017-03-01T08:30:00.000Z"}
 },
{
    "Description":"Swimming Lessons for the youth",
    "CreationDate": {"$date": "2017-03-01T08:30:00.000Z"}
 },

{
    "Description":"Swimming Exercise for parents",
    "CreationDate": {"$date": "2017-03-01T08:30:00.000Z"}
 },
{
    "Description":"Bingo Tournament",
    "CreationDate": {"$date": "2017-03-01T08:30:00.000Z"}
 },
{
    "Description":"BBQ Lunch",
    "CreationDate": {"$date": "2017-03-01T08:30:00.000Z"}
 },
{
    "Description":"Garage Sale",
    "CreationDate": {"$date": "2017-03-01T08:30:00.000Z"}
 }
]);
print( "activities collection has been repopulated." );