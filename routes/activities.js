var express = require("express");
var router = express.Router();

var mongojs = require("mongojs");

var db = null;
var myMongo = require("../db");
myMongo.getDb((err,mydb)=>{
    if(err){
        console.log("Failed to get database" + err);
    }else{
        db=mydb;
    }
});

// list all the students
router.get("/list", (req, res, next) => {
    // TODO: fix code below
    db.activies.find( (err,data) => {
        if (err) {
            res.send(err);
        }
        res.render("index", {title: "List Activities", data:data});
    });
});

// display a create form 
router.get("/create", (req, res, next) => {
    // TODO: fix code below
    res.render("create", {title: "Add an activity"});
});

// create a student
router.post("/create", (req, res, next) => {
    // TODO: fix code below
    var activity = req.body;
    if (!activity.StartDate) {
        activity.StartDate = new Date();
    }

    if (!activity.FirstName || !activity.LastName || !activity.School) {
        res.status(400);
        res.json(
            {error: "Bad data, could not insert in database"}
        );
    } else {
        db.activities.save(activity, (err, data) => {
            if (err) {
                res.send(err)
            }
            res.redirect("/activies/list");
        });
    }
});

// display delete student page
router.get("/delete/:id", (req, res, next) => {
    // TODO: fix code below
    db.activities.findOne({_id: mongojs.ObjectId(req.params.id)},
        function(err,data){
            if(err){
                res.send(err);
            }
            res.render("delete",{title:"Delete an activity", data:data})
        }
    )
});

// delete a student
router.post("/delete", (req, res, next) => {
    // TODO: fix code below
    var student = req.body;
    db.students.remove( {_id: mongojs.ObjectId(student._id)}, (err,data) => {
        if (err) {
            res.send(err);
        }
        res.redirect("/activies/list");
    });
});

// display edit activity form (UI)
router.get("/edit/:id", (req, res, next) => {
    db.activities.findOne({_id: mongojs.ObjectId(req.params.id)},
        function(err,data){
            if(err){
                res.send(err);
            }
            res.render("edit",{title:"Edit An Activity", data:data})
        }
    )
});

//edit an activity (action)
router.post("/edit", (req, res, next) => { 
    var activity = req.body;
    var changedActivity = {};

    if (student.Description) {
        changedActivity.Description = activity.Description;
    }

    if (!changedActivity) {
        res.status(400);
        res.json( {error: "Bad data"});
    } else {
        db.activities.update(
            {_id: mongojs.ObjectId(activity._id)},
            changedActivity, {}, (err,data) => {
                if (err) {
                    res.send(err);
                }
                res.redirect("/activities/list");
            }
        );
    }
});

module.exports = router;