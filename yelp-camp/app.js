var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var mongoose = require("mongoose");

mongoose.connect("mongodb://localhost/yelp_camp", {useMongoClient: true});
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");

// var tmpCampgrounds = [
//   {name: "name1", image: "https://upload.wikimedia.org/wikipedia/commons/f/fe/Camp_4.jpg", desc: "Welcome"},
//   {name: "name2", image: "http://www.travelbirbilling.com/wp-content/uploads/camp-pic1.jpg", desc: "Welcome"},
//   {name: "name3", image: "http://www.camping.hr/cmsmedia/katalog/724/140-camp-turist-indian-tents.jpg", desc: "Welcome"}
  
// ];
    
var campgroundSchema = new mongoose.Schema({
    name: String,
    image: String,
    desc: String
});

var Campground = mongoose.model("Campground", campgroundSchema);

// tmp add data
// tmpCampgrounds.forEach(function(c) {
//   createCampground(c); 
// });

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
            res.render("index", {campgrounds: campgrounds});
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
    res.render("new.ejs");    
});

//SHOW
app.get("/campgrounds/:id", function(req, res) {
    var id = req.params.id;
    Campground.findById(id, function(err, foundCamp) {
        if (err) {
            console.log(err);
        } else {
            console.log("Find a record");
            res.render("show", {campground: foundCamp});
        }
    });
});

app.listen(process.env.PORT, process.env.IP, function() {
    console.log("App started...");
});