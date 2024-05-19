const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    username : 
    {
        type:String,
        unique:true,
        required:true
    },
    password : 
    {
        type:String,
        required:true
    },
    savedReciepes:
    [{
        type : mongoose.Schema.Types.ObjectId,ref: "reciepes"
    }]
})

const userModel = mongoose.model("users",userSchema)
module.exports={userModel,userSchema}