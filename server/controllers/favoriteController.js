import Favorite from "../model/favorite.js";
import Job from "../model/job.js";
import { UserProfile } from "../model/UserProfileModel.js";



// add to favorite
export const addToFavorite = async (req , res) => {
    console.log("enter")
    try {
        const userId = req.user.id;
        const {jobId} = req.body

        if(!jobId){
            return res.status(400).json({message:"jobId is not found"})
        }
        
        const profile = await UserProfile.findOne({userId})
        if(!profile){
            return res.status(400).json({message:"complete profile first"})
        }
        const job = await Job.findById(jobId)

        const existed = await Favorite.findOne({userId:profile._id,jobId , recruiterId:job.postedBy})

        if(existed){
            return res.status(400).json({message:"job already in favorites"})
        }
        const favorite = await Favorite.create({
            userId:profile._id,
            jobId ,
            recruiterId:job.postedBy
        })

        return res.status(200).json({favorite,message:"added to the favorite"})
    } catch (error) {
        return res.status(500).json({message:error.message})
    }
}

// remove from favorite
export const removeFavorite = async (req , res) => {
    try {
        const {jobId} = req.body;
        const userId = req.user.id

        if(!jobId){
            return res.status(400).json({message:"jobId is not found"})
        }
        const profile = await UserProfile.findOne({userId})
        if(!profile){
            return res.status(400).json({message:"complete profile first"})
        }
        const jobDetails = await Job.findById(jobId)

        const existed = await Favorite.findOne({userId:profile._id,jobId , recruiterId:jobDetails.postedBy})
        
        if(!existed){
            return res.status(400).json({message:"job not in favorite"})
        }
        const favorite = await Favorite.findOneAndDelete({
            userId: profile._id,
            jobId: jobId,
            recruiterId: jobDetails.postedBy
        });


        return res.status(200).json({job,message:"job removed form favorites"})

    } catch (error) {
        return res.status(500).json({message:error.message})
    }
}

// get saved jobs
export const savedJobs = async (req, res) => {
  try {
    const userId = req.user.id;

    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 5;
    const skip = (page - 1) * limit;

    const profile = await UserProfile.findOne({userId})
    if(!profile){
        return res.status(400).json({message:"complete profile first"})
    }

    const totalJobs = await Favorite.countDocuments({ userId:profile._id });

    const favorites = await Favorite.find({ userId:profile._id })
        .populate({
            path: "jobId",
            select: "title role jobType location salary expirationDate isActive",
            match: {
            isActive: true,
            expirationDate: { $gte: new Date() }
            }
        })
        .populate({
            path: "recruiterId",
            select: "logoUrl"
        })
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit);


    // Remove favorites where jobId became null (due to match filter)
    const validFavorites = favorites.filter(fav => fav.jobId !== null);

    return res.status(200).json({
      message: "Saved jobs fetched successfully",
      jobs: validFavorites,
      totalJobs,
      totalPages: Math.ceil(totalJobs / limit),
      currentPage: page
    });

  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
