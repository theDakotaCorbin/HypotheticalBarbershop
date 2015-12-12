process.env.NODE_ENV = process.env.NODE_ENV || 'development';

var port = process.env.PORT || 5000;




var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
var Passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var session = require('express-session');
var mongoose = require('mongoose');
var userModel = require('./BackEnd/Models/userModel');
var app = express();




//MIDDLEWARE
app.use(cors());
app.use(bodyParser.json());
app.use(session({
  secret: 'Barber',
  resave: true,
  saveUninitialized: true
}));
app.use(Passport.initialize());
app.use(Passport.session());

Passport.use(new LocalStrategy(function(username, password, done) {

  console.log('logging in with passport');
  userModel.findOne({
    userName: username
  }).exec(function(err, result) {

    if (err) {
      console.log('Database Error:', err);
      return done(null, false, {
        message: err
      });
    } else {
      if (!result) {
        console.log('Invalid Username');
        return done(null, false, {
          message: 'Invalid Username'
        })
      } else {
        if (result.password === password) {
          delete result.password;
          console.log('Login Successful');
          done(null, result);
        } else {
          console.log('Invalid Password');
          return done(null, false, {
            message: 'Invalid Password'
          });
        }

      }

    }

  })

}));




//Serialization
Passport.serializeUser(function(user, done) {
  done(null, user);
})

Passport.deserializeUser(function(obj, done) {
  done(null, obj);
})




//Exports
var authFunctions = {
  logout: function(req, res) {
    req.logout();
    res.send();
  },
  isAuthenticated: function(req, res, next) {
    if (!req.isAuthenticated()) {
      //Not Logged In!
      return res.sendStatus(401);
    }
    return next();
  },
  currentuser: function(req, res) {
    if (req.user) {
      res.send(req.user);

    } else {
      res.status(401).send(null);

    }

  }
}




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




//ENDPOINTS
app.post('/api/newAppt', newApptCtrl.createNewAppt);
app.get('/api/Appts', newApptCtrl.getAppt);
app.delete('/api/delete/:id', newApptCtrl.deleteAppt);
app.post('/api/newUser', userBackEndCtrl.createNewUser);
app.post('/api/Users', userBackEndCtrl.getUser);
app.get('/api/Barbers', userBackEndCtrl.getAllBarbers);
app.put('/login', Passport.authenticate('local'), function(req, res) {
  //yay login successful
  res.json('good to go');
});
app.get('/logout', authFunctions.logout);
app.get('/currentuser', authFunctions.currentuser);




//PORT

app.listen(port);