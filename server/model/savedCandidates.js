import mongoose from "mongoose";

const savedCandidateSchema = mongoose.Schema({
    recruiterId:{
        type:mongoose.Schema.ObjectId,
        ref:"User",
        required:true
    },
    userId:{
        type:mongoose.Schema.ObjectId,
        ref:"UserProfile",
        required:true
    }
    
},{timestamps:true})

const SavedCandidates = mongoose.model("SavedCandidates",savedCandidateSchema)
export default SavedCandidates;