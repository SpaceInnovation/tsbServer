const mongoose = require('mongoose')

const qualificationSchema = mongoose.Schema({
   
    name:{
        type:String,
        required:true
    }
    
}, {timestamps:true});

module.exports = mongoose.model('Qualification', qualificationSchema);