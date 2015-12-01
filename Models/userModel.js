var mongoose = require('mongoose');



var userSchema = new mongoose.Schema({
    "name": String,
    "appts": [{type: mongoose.Schema.Types.ObjectId, ref: 'Appt'}]
});//PERSON SCHEMA END


module.exports = mongoose.model('User', userSchema);