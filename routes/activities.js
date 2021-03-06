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

// list all the activities (UI)
router.get("/list", (req, res, next) => {
    db.activities.find( (err,data) => {
        if (err) {
            res.send(err);
        }
        res.render("index", {title: "List Activities", data:data});
    });
});

// display a create form (UI)
router.get("/create", (req, res, next) => {
    res.render("create", {title: "Add an activity"});
});

// create an activity (action)
router.post("/create", (req, res, next) => {
    var activity = req.body;
    if (!activity.CreationDate) {
        activity.CreationDate = new Date();
    }
    if (!activity.Description) {
        res.status(400);
        res.json(
            {error: "Bad data, could not insert in database"}
        );
    } else {
        db.activities.findOne({Description:activity.Description},
            function(err,data){
                if(err){
                    res.send(err);
                }
                if(data){
                    // duplicate detected go back to form
                    res.render("create", {title: "Add an activity",data:data});
                }else{
                    db.activities.save(activity, (err, data) => {
                        if (err) {
                            res.send(err)
                        }
                        res.redirect("/activities/list");
                    });
                }
            });
    }
});

// display delete activity page (UI)
router.get("/delete/:id", (req, res, next) => {
    db.activities.findOne({_id: mongojs.ObjectId(req.params.id)},
        function(err,data){
            if(err){
                res.send(err);
            }
            res.render("delete",{title:"Delete an activity", data:data})
        }
    )
});

// delete a activity (action)
router.post("/delete", (req, res, next) => {
    var activity = req.body;
    db.activities.remove( {_id: mongojs.ObjectId(activity._id)}, (err,data) => {
        if (err) {
            res.send(err);
        }
        res.redirect("/activities/list");
    });
});

// display edit activity form (UI)
router.get("/edit/:id", (req, res, next) => {
    db.activities.findOne({_id: mongojs.ObjectId(req.params.id)},
        function(err,data){
            if(err){
                res.send(err);
            }
            res.render("edit",{title:"Edit an activity", data:data})
        }
    )
});

//edit an activity (action)
router.post("/edit", (req, res, next) => { 
    var activity = req.body;
    var changedActivity = {};

    if (activity.Description) {
        changedActivity.Description = activity.Description;
    }

    if (!changedActivity) {
        res.status(400);
        res.json( {error: "Bad data"});
    } else {
        db.activities.update(
            {_id: mongojs.ObjectId(activity._id)},
            {$set:changedActivity}, {}, (err,data) => {
                if (err) {
                    res.send(err);
                }
                res.redirect("/activities/list");
            }
        );
    }
});

module.exports = router;