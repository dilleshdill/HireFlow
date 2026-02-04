import mongoose from "mongoose";

const userLoginSchema = mongoose.Schema({
    name:{
        type:String,
    },
    password:{
        type:String,
        
    }

})