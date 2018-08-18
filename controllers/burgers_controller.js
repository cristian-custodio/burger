var express = require("express");
var router = express.Router();

// Import the model (burger.js) to use its database functions.
var burger = require("../models/burger.js");

//This Code will be handling the routes of the website (Controller)

// Create all our routes and set up logic within those routes where required.
router.get("/", function(req, res) {
    burger.selectAll(function(data) {
      var hbsObject = {
        burgers: data
      };
      res.render("index", hbsObject);
    });
  });
  
  router.post("/", function(req, res) {
    burger.insertOne([
      "burger_name", "devoured"
    ], [
      req.body.burger_name, req.body.devoured
    ], function() {
      res.redirect("/");
    });
  });
  
  router.put("/:id", function(req, res) {
    var condition = "id = " + req.params.id;
  
    console.log("condition", condition);
  
    burger.updateOne({
      devoured: req.body.devoured
    }, condition, function() {
      res.redirect("/");
    });
  });
  
  router.delete("/:id", function(req, res) {
    var condition = "id = " + req.params.id;
  
    burger.delete(condition, function() {
      res.redirect("/");
    });
  });


module.exports = router;