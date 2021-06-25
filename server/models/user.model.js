const mongoose=require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');

const UserSchema=new mongoose.Schema({
    UserName:{
        type:String,
        required:[true,'Name is required'],
        minlength:[3,'The name must be at least of 3 characters'],
        unique:true
    },
    Message:{
        type:String,
        
        
    },

   
  
},{timestamps:true});

module.exports.User = mongoose.model('User',UserSchema);