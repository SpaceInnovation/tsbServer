const mongoose = require('mongoose')

const gradeLevelSchema = mongoose.Schema({
    
    name:{
        type:String,
        required:true,
        unique: true
    }
    
}, {timestamps:true});

  module.exports = mongoose.model('GradeLevel', gradeLevelSchema);