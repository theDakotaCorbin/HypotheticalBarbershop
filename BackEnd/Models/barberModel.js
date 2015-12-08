var mongoose = require('mongoose');



var barberSchema = new mongoose.Schema({
    "name": String
});//BLOG SCHEMA END





module.exports = mongoose.model('Barber', barberSchema);