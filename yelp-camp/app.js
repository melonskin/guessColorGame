var express = require("express");
var app = express();
var bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");

// tmp
var campgrounds = [
   {name: "name1", image: "https://upload.wikimedia.org/wikipedia/commons/f/fe/Camp_4.jpg"},
   {name: "name2", image: "http://www.travelbirbilling.com/wp-content/uploads/camp-pic1.jpg"},
   {name: "name3", image: "http://www.camping.hr/cmsmedia/katalog/724/140-camp-turist-indian-tents.jpg"},
   {name: "name1", image: "https://upload.wikimedia.org/wikipedia/commons/f/fe/Camp_4.jpg"},
   {name: "name2", image: "http://www.travelbirbilling.com/wp-content/uploads/camp-pic1.jpg"},
   {name: "name3", image: "http://www.camping.hr/cmsmedia/katalog/724/140-camp-turist-indian-tents.jpg"},
   {name: "name1", image: "https://upload.wikimedia.org/wikipedia/commons/f/fe/Camp_4.jpg"},
   {name: "name2", image: "http://www.travelbirbilling.com/wp-content/uploads/camp-pic1.jpg"},
   {name: "name3", image: "http://www.camping.hr/cmsmedia/katalog/724/140-camp-turist-indian-tents.jpg"}
];
    
app.get("/", function(req, res) {
    res.render("landing");
});


app.get("/campgrounds", function(req, res) {
    res.render("campgrounds", {campgrounds: campgrounds});
});

app.post("/campgrounds", function(req, res) {
    var name = req.body.name;
    var image = req.body.image;
    campgrounds.push({name: name, image: image});
    res.redirect("/campgrounds");
});

app.get("/campgrounds/new", function(req, res) {
    res.render("new.ejs");    
});

app.listen(process.env.PORT, process.env.IP, function() {
    console.log("App started...");
});