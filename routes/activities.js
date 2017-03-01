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
router.get("/", (req, res, next) => {
    // TODO: fix code below
    db.activies.find( (err,data) => {
        if (err) {
            res.send(err);
        }
        res.render("list", {title: "List Activities", data:data});
    });
});

// display a create form 
router.get("/create", (req, res, next) => {
    // TODO: fix code below
    res.render("create", {title: "Add a Student"});
});

// create a student
router.post("/create", (req, res, next) => {
    // TODO: fix code below
    var student = req.body;
    if (!student.StartDate) {
        student.StartDate = new Date();
    }

    if (!student.FirstName || !student.LastName || !student.School) {
        res.status(400);
        res.json(
            {error: "Bad data, could not insert in database"}
        );
    } else {
        db.students.save(student, (err, data) => {
            if (err) {
                res.send(err)
            }
            res.redirect("/forms/list");
        });
    }
});

// display delete student page
router.get("/delete/:id", (req, res, next) => {
    // TODO: fix code below
    db.students.findOne({_id: mongojs.ObjectId(req.params.id)},
        function(err,data){
            if(err){
                res.send(err);
            }
            res.render("delete",{title:"Delete a student", data:data})
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
        res.redirect("/forms/list");
    });
});

// display edit activity form
router.get("/edit/:id", (req, res, next) => {
    // TODO: fix code below
    db.activities.findOne({_id: mongojs.ObjectId(req.params.id)},
        function(err,data){
            if(err){
                res.send(err);
            }
            res.render("edit",{title:"Delete a student", data:data})
        }
    )
});

// edit a activity
router.post("/edit", (req, res, next) => {
    var activity = req.body;
    // TODO: implement edit activity
});

module.exports = router;