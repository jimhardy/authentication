// REQUIRES
const   express = require('express'),
        mongoose = require('mongoose'),
        passport = require('passport'),
        bodyParser = require('body-parser'),
        LocalStrategy = require('passport-local'),
        passportLocalMongoose = require('passport-local-mongoose');

// APP CONFIG
const app = express();
app.set('view engine' , 'ejs');
require('dotenv').config();

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