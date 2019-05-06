// REQUIRES
const express = require("express"),
  mongoose = require("mongoose"),
  passport = require("passport"),
  bodyParser = require("body-parser"),
  LocalStrategy = require("passport-local"),
  passportLocalMongoose = require("passport-local-mongoose"),
  User = require("./models/user");
  
  // set local env
  require("dotenv").config();

// APP CONFIG
const app = express();
app.set("view engine", "ejs");
// required for passport
  app.use(
    require("express-session")({
      secret: process.env.SECRET, //  used for encoding and decoding session
      resave: false,
      saveUninitialized: false
    })
  );
app.use(passport.initialize());
app.use(passport.session());
app.use(bodyParser.urlencoded({extended: true}));

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// DB CONNECT
mongoose.connect(process.env.MONGO, { useNewUrlParser: true }, err => {
  if (err) {
    console.log(err);
  } else {
    console.log("mongo connected");
  }
});

// ROUTES
app.get("/", (req, res) => {
  res.render("home");
});

// uses middleware - runs function to check if authenticated, then continues if return = next
app.get("/secret", isLoggedIn,  (req, res) => {
  console.log('secret route');
  res.render("secret");
});

app.get("/register", (req, res) => {
  res.render("register");
});

// handle user signup
app.post("/register", (req, res) => {
// pass User object that we want to create, and password separately
// User.register will then hash the password
User.register(new User({username: req.body.username}), req.body.password, (err , user) => {
    if(err){
      console.log(err);
      return res.render('register');
    } 
    passport.authenticate('local')(req , res , () => {
      console.log('password authenticated');
      res.redirect('/secret');
    });
  });
});

// LOGIN
// render login form
app.get('/login' , (req , res) => {
  res.render('login');
})

//middleware
// when code gets a post request to login, code is run immediately (passport.auth...etc)
// passport automatically takes username and passord from post request and runs auth on it
app.post('/login' , passport.authenticate('local' , {
    successRedirect: '/secret', 
    failureRedirect: '/login'
  }) , (req, res) => {
});

// LOGOUT
// destroy userdata for this session
app.get('/logout' , (req , res) => {
  req.logout();
  res.redirect('/');
});

// MIDDLEWARE checks if authenticated - runs on secret route
function isLoggedIn(req , res , next){
  if(req.isAuthenticated()) {
    console.log('authenticated');
    return next();
  } 
  console.log('not logged in');
  res.redirect('/login');
}

// START SERVER
app.listen(process.env.PORT, process.env.IP, () => {
  console.log("====================");
  console.log("SERVER STARTED");
  console.log("====================");
});
