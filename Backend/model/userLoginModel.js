import mongoose from "mongoose";

const userLoginSchema = new mongoose.Schema({
    name:{
        type:String,
    },
    email:{
        type:String,
        unique:true,

    },
    password:{
        type:String,
    },

})

export const UserSchema = mongoose.model("UserSchema",userLoginSchema)