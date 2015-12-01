var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
var passport = require('passport');
var session = require('express-session');
var mongoose = require('mongoose');
var FacebookStrategy = require('passport-facebook').Strategy;
var keys = require('./keys');
var app = express();




//MIDDLEWARE


app.use(cors());
app.use(bodyParser.json());
app.use(session({
   secret: 'Hypothetical', 
   resave: false,
   saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());



passport.use(new FacebookStrategy({
  clientID: keys.facebookID,
  clientSecret: keys.facebookSecret,
  callbackURL: 'http://localhost:3000/auth/facebook/callback'
}, function(token, refreshToken, profile, done) {
  return done(null, profile);
}));



//MODELS
//var Appt = require('./Models/newApptModel');
//
////CONTROLLERS
var newApptCtrl = require('./Public/Controllers/newApptCtrl');




//DATABASE
//var mongoUri = "mongodb://localhost:27017/HypotheticalBarberShop";
//mongoose.connect(mongoUri);
//mongoose.connection.once('open', function() {
//   console.log("Connected on " + mongoUri);
//});

//PORT
var port = 3000; 
app.listen(port, function(){
   console.log("Listening on port ", port); 
});


//STATIC
app.use(express.static(__dirname+'/Public'));


//ENDPOINTS
//app.post('/api/newAppt', newApptCtrl.createNewAppt);
//app.get('/api/Appts', newApptCtrl.getAppt);
//app.delete('/api/delete/:id', newApptCtrl.deleteAppt); 

app.get('/auth/facebook', passport.authenticate('facebook'));
app.get('/auth/facebook/callback', passport.authenticate('facebook', {
   successRedirect: '/#/home',
   failureRedirect: '/login'
}), function(req, res) {
   console.log(req.session);
});

app.get('/new', function(req, res){
   res.send("Winning")
});


passport.serializeUser(function(user, done) {
 done(null, user);
});

passport.deserializeUser(function(obj, done) {
 done(null, obj);
});

app.get('/#/home', function(req, res){
   console.log(req.user);
   res.send(req.user);
});
    

