

// post a job
export const postJob = async (req , res) => {
    try {
        const {formData} = req.body
        const userId = req.user.id
        console.log("userId",userId)
        return res.status(200).json({message:"successfully posted the job"})
    } catch (error) {
        return res.status(500).json({message:"server error"})
    }
}