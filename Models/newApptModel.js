var mongoose = require('mongoose');



var apptSchema = new mongoose.Schema({
    "firstName": String,
    "lastName": String,
    "date": Date,
    "time": String,
    "serviceType": String,
    "barber": String
});//BLOG SCHEMA END





module.exports = mongoose.model('Appt', apptSchema);