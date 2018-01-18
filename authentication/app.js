var express                 = require("express"),
    mongoose                = require("mongoose"),
    passport                = require("passport"),
    bodyParser              = require("body-parser"),
    LocalStrategy           = require("passport-local"),
    passportLocalMongoose   = require("passport-local-mongoose"),
    User                    = require("./models/user");
    

mongoose.connect("mongodb://localhost/auth_demo_app");
var app = express();

// use session
app.use(require("express-session")({
    secret: "my secret word",
    resave: false,
    saveUninitialized: false
}));

app.set("view engine", "ejs");

// initialize passport
app.use(passport.initialize());
app.use(passport.session());

// encode and put in session; decode and get from session
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.get("/", function(req, res) {
   res.render("home"); 
});

app.get("/secret", function(req, res) {
    res.render("secret");
})

app.listen(process.env.PORT, process.env.IP, function(){
    console.log("App started...");
});