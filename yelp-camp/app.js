var express = require("express");
var app = express();

app.set("view engine", "ejs");

app.get("/", function(req, res) {
    res.render("landing");
});

app.get("/campgrounds", function(req, res) {
   var campgrounds = [
       {name: "name1", image: "https://upload.wikimedia.org/wikipedia/commons/f/fe/Camp_4.jpg"},
       {name: "name2", image: "http://www.travelbirbilling.com/wp-content/uploads/camp-pic1.jpg"},
       {name: "name3", image: "http://www.camping.hr/cmsmedia/katalog/724/140-camp-turist-indian-tents.jpg"}
    ];
    
    res.render("campgrounds", {campgrounds: campgrounds});
});
app.listen(process.env.PORT, process.env.IP, function() {
    console.log("App started...");
});