import Favorite from "../model/favorite.js";



// add to favorite
export const addToFavorite = async (req , res) => {
    try {
        const userId = req.user.id;
        const {jobId} = req.body
        
        if(!jobId){
            return res.status(400).json({message:"jobId is not found"})
        }
        const existed = await Favorite.findOne({userId,jobId})

        if(existed){
            return res.status(400).json({message:"job already in favorites"})
        }
        const favorite = await Favorite.create({
            userId,
            jobId
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
        const existed = await Favorite.findOne({userId,jobId})
        
        if(!existed){
            return res.status(400).json({message:"job not in favorite"})
        }
        const job = await Favorite.findOneAndDelete({userId,jobId})

        return res.status(200).json({job,message:"job removed form favorites"})

    } catch (error) {
        return res.status(500).json({message:error.message})
    }
}

// get saved jobs
export const savedJobs = async (req , res) => {
    try {
        const userId = req.user.id
        const savedJobs = await Favorite.find({ userId })
        .populate("jobId", "title role jobType location salary expirationDate")
        .sort({ createdAt: -1 });
        if(!savedJobs){
            return res.status(400).json({message:"no favorite jobs found"})
        }
        
        return res.status(200).json({
            message: "Saved jobs fetched",
            jobs: savedJobs,
        });
    } catch (error) {
        return res.status(500).json({message:error.message})
    }
}