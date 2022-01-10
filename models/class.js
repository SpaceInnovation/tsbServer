const mongoose = require('mongoose')

const classSchema = mongoose.Schema({
    
    name:{
        type:String,
        // required:true,
        // unique: true
    }
    
}, {timestamps:true});

  module.exports = mongoose.model('Class', classSchema);