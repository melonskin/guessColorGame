var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var mongoose = require("mongoose");

var Campground = require("./models/campground");
var Comment = require("./models/comment");

var seedDB = require("./seeds");

mongoose.connect("mongodb://localhost/yelp_camp");
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + "/public"));
app.set("view engine", "ejs");

// reset
seedDB();

function createCampground(item) {
    Campground.create(item, function(err, campground) {
        if (err) {
            console.log(err);
        } else {
            console.log("Created new record");
            console.log(campground);
        }
    });
}

app.get("/", function(req, res) {
    res.render("landing");
});

//INDEX
app.get("/campgrounds", function(req, res) {
    Campground.find({}, function(err, campgrounds) {
        if (err) {
            console.log(err);
        } else {
            console.log("Find records");
            res.render("campgrounds/index", {campgrounds: campgrounds});
        }
    });
});

//CREATE
app.post("/campgrounds", function(req, res) {
    var name = req.body.name;
    var image = req.body.image;
    var desc = req.body.desc;
    createCampground({name: name, image: image, desc: desc});
    res.redirect("/campgrounds");
});

//NEW, before show
app.get("/campgrounds/new", function(req, res) {
    res.render("campgrounds/new.ejs");    
});

//SHOW
app.get("/campgrounds/:id", function(req, res) {
    var id = req.params.id;
    Campground.findById(id).populate("comments").exec(function(err, foundCamp) {
        if (err) {
            console.log(err);
        } else {
            console.log(foundCamp);
            res.render("campgrounds/show", {campground: foundCamp});
        }
    });
});

// comments routes ---------------------------

// new
app.get("/campgrounds/:id/comments/new", function(req, res) {
    Campground.findById(req.params.id, function(err, campground) {
        if (err) {
            console.log(err);
        } else {
            res.render("comments/new", {campground: campground});
        }
    });
});

// create
app.post("/campgrounds/:id/comments", function(req, res) {
    Campground.findById(req.params.id, function(err, foundCamp) {
       if (err) {
           console.log(err);
       } else {
           Comment.create(req.body.comment, function(err, createdComment) {
               if (err) {
                   console.log(err);
               } else {
                   foundCamp.comments.push(createdComment._id);
                   foundCamp.save();
                   res.redirect("/campgrounds/" + req.params.id);
               }
           });
       }
    });  
});

app.listen(process.env.PORT, process.env.IP, function() {
    console.log("App started...");
});