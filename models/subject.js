
const {Schema, model } = require('mongoose')

const subjectSchema = Schema({
    name:{
        type:String,
        required:true
    }
}, {timestamps:true});

module.exports = model('Subject', subjectSchema);