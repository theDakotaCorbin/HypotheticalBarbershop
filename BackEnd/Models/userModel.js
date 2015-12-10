var mongoose = require('mongoose');



var userSchema = new mongoose.Schema({
    "userName": {type:String, required:true, unique:true},
    "password": {type:String, required:true},
    "name": {type:String, required:true, unique:true}
});//USER SCHEMA END





module.exports = mongoose.model('User', userSchema);