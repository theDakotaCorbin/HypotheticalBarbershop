process.env.NODE_ENV = process.env.NODE_ENV || 'development';


var port = process.env.PORT || 5000;


var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
var session = require('express-session');
var mongoose = require('mongoose');
var app = express();





//MIDDLEWARE
app.use(cors());
app.use(bodyParser.json());
app.use(session({
  secret: 'Barber',
  resave: false,
  saveUninitialized: true
}));






//MODELS
var Appt = require('./BackEnd/Models/newApptModel');




//CONTROLLERS
var newApptCtrl = require('./BackEnd/Controllers/newApptCtrl');





//DATABASE
var mongoUri = "mongodb://localhost:27017/Hypothetical";
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
//app.post('/api/todayAppts', newApptCtrl.getApptToday);
app.delete('/api/delete/:id', newApptCtrl.deleteAppt);
app.get('/login', function(req, res) {
  res.sendfile('Views/loginView.html');
});





//PORT

app.listen(port);