import Application from "../model/application.js";
import Job from "../model/job.js";


// apply job
export const applyJob = async (req,res) =>{
    console.log('enter to the apply section')

    try {
        const {jobId} = req.body;
        console.log(jobId)
        if(!jobId){
            return res.status(400).json({message:"missing fields"})
        }

        const job = await Job.findById({_id:jobId})
        console.log(job)
        if(!job){
            return res.status(400).json({message:"no job id found"})
        }
        const recruiterId = job.postedBy
        const userId = req.user.id 

        const alreadyApplied = await Application.findOne({
            userId,
            jobId
        })

        if(alreadyApplied){
            return res.status(400).json({message:"you have already applied for this job"})
        }

        const application = await Application.create({
            userId,
            recruiterId,
            jobId:job._id
        })

        job.applications.push(userId)
        await job.save();


        return res.status(200).json({message:"applied successfully",application:application})

    } catch (error) {
        return res.status(500).json({message:error.message})
    }
}

// get applied jobs
export const getAppliedJobs = async (req,res) => {
    try {
        const userId = req.user.id
        const jobs = await Application.find({ userId })
            .populate("jobId", "title jobType vacancies location role");

        if (!jobs){
            return res.status(400).json({message:"no jobs are found"})
        }
        return res.status(200).json({jobs,message:"applied jobs fetched"})
    } catch (error) {
        return res.status(500).json({message:error.message})
    }
}