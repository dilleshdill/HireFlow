import mongoose from "mongoose";

const favoriteSchema = mongoose.Schema({
    userId:{
        type:mongoose.Schema.ObjectId,
        ref:"UserProfile",
        required:true
    },
    jobId:{
        type:mongoose.Schema.ObjectId,
        ref:"Job",
        required:true
    },
    recruiterId:{
        type:mongoose.Schema.ObjectId,
        ref:"RecruiterProfile",
        required:true
    },
},{timestamps:true})

const Favorite = mongoose.model("Favorite",favoriteSchema)
export default Favorite;