import mongoose from "mongoose";

const favoriteSchema = mongoose.Schema({
    userId:{
        type:mongoose.Schema.ObjectId,
        ref:"User",
        required:true
    },
    jobId:{
        type:mongoose.Schema.ObjectId,
        ref:"Job",
        required:true
    }
},{timestamp:true})

const Favorite = mongoose.model("Favorite",favoriteSchema)
export default Favorite;