var express = require("express");
var path = require("path");
var bodyParser = require("body-parser");

var index = require("./routes/index");

var app = express();
app.set('port', (process.env.PORT) || 3000)

// view engine
var viewEngine = require("ejs-locals");
app.engine("ejs", viewEngine);
app.set("view engine", "ejs");

// set folder for static content
app.use(express.static(path.join(__dirname, "client")));

// body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use("/", index);

app.listen(app.get('port'), () => {
    console.log("Server started on port number " + app.get('port'));
});