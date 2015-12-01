var mongoose = require('mongoose');



var apptSchema = new mongoose.Schema({
    "Name": String,
    "service": String,
    "date": String,
    "time": String,
    "barber": String
    
});//BLOG SCHEMA END


module.exports = mongoose.model('Service', blogSchema);