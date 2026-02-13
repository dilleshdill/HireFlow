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
export const savedJobs = async (req, res) => {
  try {
    const userId = req.user.id;

    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 5;
    const skip = (page - 1) * limit;

    const totalJobs = await Favorite.countDocuments({ userId });

    const favorites = await Favorite.find({ userId })
      .populate({
        path: "jobId",
        select: "title role jobType location salary expirationDate isActive",
        match: {
          isActive: true,
          expirationDate: { $gte: new Date() }
        }
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
