var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
var passport = require('passport');
var session = require('express-session');
var mongoose = require('mongoose');
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

//MODELS
var Appt = require('./Models/newApptModel');

//CONTROLLERS
var newApptCtrl = require('./Public/Controllers/newApptCtrl');




//DATABASE
var mongoUri = "mongodb://localhost:27017/HypotheticalBarberShop";
mongoose.connect(mongoUri);
mongoose.connection.once('open', function() {
   console.log("Connected on " + mongoUri);
});

//PORT
var port = 8080; 
app.listen(port, function(){
   console.log("Listening on port ", port); 
});


//STATIC
app.use(express.static(__dirname+'/Public'));


//ENDPOINTS
app.post('/api/newAppt', newApptCtrl.createNewAppt);
app.get('/api/Appts', newApptCtrl.getAppt);
app.delete('/api/delete/:id', newApptCtrl.deleteAppt); 