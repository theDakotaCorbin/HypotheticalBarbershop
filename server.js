process.env.NODE_ENV = process.env.NODE_ENV || 'development';


var port = process.env.PORT || 5000;


var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
var Passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var session = require('express-session');
var mongoose = require('mongoose');

var app = express();


Passport.use(new LocalStrategy(function(userName, password, done) {
    if(userName === user.userName) {
        if(password === user.password) {
            //Valid Credentials
            return done(null, {name: name, userName: userName});
        } else {
            //Invalid Password
            return done(null, false, {message: 'Invalid password'});
        }
    } else {
        //Invalid Username
        return done(null, false, {message: 'Invalid username.'});
    }   
}));


//Serialization
Passport.serializeUser(function(user, done) {
    done(null, user);
})

Passport.deserializeUser(function(obj, done) {
    done(null, obj);
})
//Exports
module.exports = {
    logout: function(req, res) {
        req.logout();
        res.send();
    },
    isAuthenticated: function (req, res, next) {
        if(!req.isAuthenticated()) {
            //Not Logged In!
            return res.sendStatus(401);
        }
        return next();
    }
}






//MIDDLEWARE
app.use(cors());
app.use(bodyParser.json());
app.use(session({
  secret: 'Barber',
  resave: false,
  saveUninitialized: true
}));
app.use(Passport.initialize());
app.use(Passport.session());






//MODELS
var Appt = require('./BackEnd/Models/newApptModel');
var User = require('./BackEnd/Models/userModel');




//CONTROLLERS
var newApptCtrl = require('./BackEnd/Controllers/newApptCtrl');
var userBackEndCtrl = require('./BackEnd/Controllers/userBackEndCtrl');





//DATABASE
var mongoUri = "mongodb://randomuser:abc123@ds027155.mongolab.com:27155/hypotheticalbarbershop";
mongoose.connect(mongoUri);
mongoose.connection.once('open', function() {
  console.log("Connected on " + mongoUri);
});






app.use(express.static(__dirname + '/Public'));

// views is directory for all template files

app.get('/', function(request, response) {
  response.render('pages/index');
});


// Custom middleware
function logout (req, res, next) {
   if (req.session || req.user) {
       req.logout();
   }
   next();
}


function isAuth(req, res, next) {
   // if user is authenticated in the session, carry on 
   if (req.user){
       next();
   } else {
      // if they aren't redirect them to the home page
       res.status(403).send('not allowed');
   }
}







//ENDPOINTS
app.post('/api/newAppt', newApptCtrl.createNewAppt);
app.get('/api/Appts', newApptCtrl.getAppt);
app.delete('/api/delete/:id', newApptCtrl.deleteAppt);
app.post('/api/newUser', userBackEndCtrl.createNewUser);
app.post('/api/Users', userBackEndCtrl.getUser);
app.get('/api/Barbers', userBackEndCtrl.getAllBarbers);

app.post('/login', Passport.authenticate('local-login'), function(req, res) {
    if(!req.user){
        res.redirect('/#/login');
    }
   res.json(req.user);
   // res.send(req.user); // redirect to the secure profile section
});






//PORT

app.listen(port);