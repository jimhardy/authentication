// REQUIRES
const   express = require('express'),
        mongoose = require('mongoose'),
        passport = require('passport'),
        bodyParser = require('body-parser'),
        LocalStrategy = require('passport-local'),
        passportLocalMongoose = require('passport-local-mongoose'),
        User = require('./models/user');

// APP CONFIG
const app = express();
app.set('view engine' , 'ejs');
// required for passport
app.use(passport.initialize());
app.use(passport.session());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// set local env
require('dotenv').config();

app.use(require('express-session')({
  secret: process.env.SECRET, // used for encoding and decoding session
  resave: false,
  saveUninitialized: false
}));


// DB CONNECT
mongoose.connect(process.env.MONGO, { useNewUrlParser: true }, err => {
    if (err) {
      console.log(err);
    } else {
      console.log("mongo connected");
    }
  });

// ROUTES
app.get('/' , (req , res) => {
    res.render('home');
});

app.get('/secret' , (req , res) => {
    res.render('secret');
});

// START SERVER
app.listen(process.env.PORT , process.env.IP ,() => {
        console.log('====================');        
        console.log('SERVER STARTED');
        console.log('====================');
});