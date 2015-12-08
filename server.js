var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
var passport = require('passport');
LocalStrategy =	require('passport-local').Strategy,
 	port = 8080;
var session = require('express-session');
var mongoose = require('mongoose');
var app = express();






//MIDDLEWARE


app.use(cors());
app.use(bodyParser.json());
app.use(session({
   secret: 'Barber', 
   resave: false,
   saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

//MODELS
var Appt = require('./BackEnd/Models/newApptModel');
var Login = require('./BackEnd/Models/loginModel');
//var Barber = require('./Models/barberModel');

//CONTROLLERS
var newApptCtrl = require('./BackEnd/Controllers/newApptCtrl');
//var userInfo = require('./Public/Controllers/loginCtrl');
// 



//DATABASE
var mongoUri = "mongodb://localhost:27017/Hypothetical";
mongoose.connect(mongoUri);
mongoose.connection.once('open', function() {
   console.log("Connected on " + mongoUri);
});

//PORT
//var port = 8080; 
//app.listen(port, function(){
//   console.log("Listening on port ", port); 
//});




app.set('port', (process.env.PORT || 8080));

app.use(express.static(__dirname + '/Public'));

// views is directory for all template files


app.get('/', function(request, response) {
  response.render('pages/index');
});

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});


//LOGIN


app.post('/login',
  passport.authenticate('local', {
    successRedirect: '/loginSuccess',
    failureRedirect: '/loginFailure'
  })
);

app.get('/loginFailure', function(req, res, next) {
  res.send('Failed to authenticate');
});

app.get('/loginSuccess', function(req, res, next) {
  res.send('Successfully authenticated');
});


passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  done(null, user);
});




passport.use(new LocalStrategy(function(username, password, done) {
  process.nextTick(function() {
    UserDetails.findOne({
      'username': username, 
    }, function(err, user) {
      if (err) {
        return done(err);
      }

      if (!user) {
        return done(null, false);
      }

      if (user.password != password) {
        return done(null, false);
      }

      return done(null, user);
    });
  });
}));
 









//STATIC
//app.use(express.static(__dirname+'/Public'));


//ENDPOINTS
app.post('/api/newAppt', newApptCtrl.createNewAppt);
app.get('/api/Appts', newApptCtrl.getAppt);
//app.post('/api/todayAppts', newApptCtrl.getApptToday);
app.delete('/api/delete/:id', newApptCtrl.deleteAppt);
app.get('/login', function(req, res) {
  res.sendfile('Views/loginView.html');
});
    
