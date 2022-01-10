const {Schema, model} = require("mongoose")


const LGAOriginSchema = new Schema({
    name : {
        required:true,
        type:String
    }
}, {timestamps:true})

module.exports = model("LGAOrigin", LGAOriginSchema)