var mongoose = require('mongoose');
var User = require('../Models/userModel.js');



var apptSchema = new mongoose.Schema({
    "firstName": String,
    "lastName": String,
    "date": Date,
    "serviceType": String,
    "barber": { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
});//APPT SCHEMA END





module.exports = mongoose.model('Appt', apptSchema);
