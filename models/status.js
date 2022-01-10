const {Schema, model} = require("mongoose")


const statusSchema = new Schema({
    name : {
        required:true,
        type:String
    }
}, {timestamps:true})

module.exports = model("Status", statusSchema)