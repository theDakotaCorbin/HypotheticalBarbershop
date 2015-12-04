var mongoose = require('mongoose');



var barberSchema = new mongoose.Schema({
    
    "barber": String
    
});//BARBER SCHEMA END





module.exports = mongoose.model('Barber', barberSchema);