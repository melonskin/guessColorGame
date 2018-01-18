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
app.use(bodyParser.urlencoded({extended: true}));

// initialize passport
app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(User.authenticate()));
// encode and put in session; decode and get from session
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.get("/", function(req, res) {
   res.render("home"); 
});

app.get("/secret", isLoggedIn, function(req, res) {
    res.render("secret");
})

// auth routes
// show sign up form
app.get("/register", function(req, res) {
    res.render("register");
});

// create new user
app.post("/register", function(req, res) {
    // pass password as the second arg
    User.register(new User({username: req.body.username}), 
                req.body.password, function(err, user) {
                    if (err) {
                        console.log(err);
                        res.render("register");
                    } else {
                        passport.authenticate("local")(req, res, function() {
                            res.redirect("/secret");
                        });
                    }
                })
});

app.get("/login", function(req, res) {
    res.render("login");
});

//middleware, codes run before final call back. run immediately
app.post("/login", passport.authenticate("local", {
    successRedirect: "/secret",
    failureRedirect: "/login"
    }), function(req, res) {
    
});

app.get("/logout", function(req, res) {
    req.logout();
    res.redirect("/");
});

// for middleware
function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect("login");
}

app.listen(process.env.PORT, process.env.IP, function(){
    console.log("App started...");
});