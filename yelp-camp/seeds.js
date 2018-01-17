var mongoose = require("mongoose");
var Campground = require("./models/campground");
var Comment = require("./models/comment");

var tmpCampgrounds = [
  {name: "name1", image: "https://upload.wikimedia.org/wikipedia/commons/f/fe/Camp_4.jpg", desc: "Welcome Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam sodales eget nisi non vehicula. Suspendisse est magna, sodales sit amet efficitur ac, congue bibendum justo. Donec ac placerat mauris, scelerisque accumsan metus. Praesent ac dapibus nisl. Vivamus ac suscipit massa. Nam maximus nunc ut enim ultrices congue. Integer sit amet urna in lectus rhoncus pellentesque. Aenean vehicula, ligula ut finibus luctus, magna ex maximus eros, eu facilisis enim quam nec sapien. Vestibulum pulvinar tristique dolor, sit amet auctor quam fermentum a."},
  {name: "name2", image: "http://www.travelbirbilling.com/wp-content/uploads/camp-pic1.jpg", desc: "Welcome Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam sodales eget nisi non vehicula. Suspendisse est magna, sodales sit amet efficitur ac, congue bibendum justo. Donec ac placerat mauris, scelerisque accumsan metus. Praesent ac dapibus nisl. Vivamus ac suscipit massa. Nam maximus nunc ut enim ultrices congue. Integer sit amet urna in lectus rhoncus pellentesque. Aenean vehicula, ligula ut finibus luctus, magna ex maximus eros, eu facilisis enim quam nec sapien. Vestibulum pulvinar tristique dolor, sit amet auctor quam fermentum a."},
  {name: "name3", image: "http://www.camping.hr/cmsmedia/katalog/724/140-camp-turist-indian-tents.jpg", desc: "Welcome Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam sodales eget nisi non vehicula. Suspendisse est magna, sodales sit amet efficitur ac, congue bibendum justo. Donec ac placerat mauris, scelerisque accumsan metus. Praesent ac dapibus nisl. Vivamus ac suscipit massa. Nam maximus nunc ut enim ultrices congue. Integer sit amet urna in lectus rhoncus pellentesque. Aenean vehicula, ligula ut finibus luctus, magna ex maximus eros, eu facilisis enim quam nec sapien. Vestibulum pulvinar tristique dolor, sit amet auctor quam fermentum a."}
  
];
    
// TODO duplicate
function createCampground(item) {
    Campground.create(item, function(err, campground) {
        if (err) {
            console.log(err);
        } else {
            console.log("Created new record");
            console.log(campground);
            Comment.create(
                {
                    text: "In aliquam suscipit magna, eu dignissim magna finibus ultrices. Fusce placerat nibh placerat erat vulputate aliquet. Curabitur sed volutpat nibh. Nam eleifend eleifend elit, quis pellentesque leo sollicitudin et. Etiam euismod ipsum eu ante imperdiet pretium. Donec ullamcorper leo et arcu tincidunt, vel aliquam libero eleifend. Integer volutpat, orci in lobortis semper, augue massa aliquet purus, a efficitur justo massa id sapien.",
                    author: "sally"
                }, function(err, comment) {
                    if (err) {
                        console.log(err);
                    } else {
                        campground.comments.push(comment._id);
                        campground.save();
                        console.log("create comment");
                    }
                });
        }
    });
}

function seedDB() {
    Campground.remove({}, function(err) {
        if (err) {
            console.log(err);
        }
        console.log("remove all campgrounds");
        // add camps
        tmpCampgrounds.forEach(function(c) {
            createCampground(c); 
        });
    });
    
    
}

module.exports = seedDB;

