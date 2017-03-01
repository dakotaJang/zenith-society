var express = require("express");
var router = express.Router();

router.get("/", (req, res, next) => {
    res.redirect("/activities/list");
});

module.exports = router;