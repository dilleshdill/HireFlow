import Job from "../model/job.js"
import { RecruiterProfile } from "../model/recruiterProfileModel.js"
import User from "../model/user.js"


// post a job
export const postJob = async (req , res) => {
    try {
        const {payload} = req.body
        const userId = req.user.id

        const user = await User.findById({_id:userId})
        if (!user){
            return res.status(400).json({message:"user was not found"})
        }

        const newJob = await Job.create({
            postedBy:userId,
            ...payload
        })

        return res.status(200).json({job:newJob,message:"successfully posted the job"})
    } catch (error) {
        return res.status(500).json({message:"server error"})
    }
}

// get all the jobs
export const getAllJobs = async (req,res) => {
    try {
        // const userId = req.user.id
        // console.log("userId",userId)
        const allJobs = await Job.find({isActive:true}).populate("postedBy","name email").sort({createdAt:-1})
        if(!allJobs){
            return res.status(400).json({message:"no jobs are found"})
        }
        return res.status(200).json({message:"all jobs are fetched",jobs:allJobs})
    } catch (error) {
        return res.status(500).json({message:error.message})
    }
}

// get job by id
export const getJobById = async (req,res) => {
    try {
        const {jobId} = req.params.id
        
        const job = await Job.find(jobId)
        if(!job){
            return res.status(400).json({message:"no jobs is found"})
        }
        return res.status(200).json({message:"job is fetched",job})
    } catch (error) {
        return res.status(500).json({message:error.message})
    }
}

// get my jobs
export const getMyJobs = async (req,res) =>{
    
    try {
        const userId = req.user.id
        const myJobs = await Job.find({postedBy:userId})
        if(!myJobs){
            return res.status(400).json({message:"no jobs are found"})
        }
        console.log(myJobs)
        return res.status(200).json({message:"my jobs are fetched",jobs:myJobs})
    } catch (error) {
        return res.status(500).json({message:error.message})
    }
}

// delete my job
export const deletejob = async (req , res) => {
    try {
        const jobId = req.params.id
        const job = await Job.findById(jobId)

        if (!job){
            return res.status(400).json({message:"job not found"})
        }
        
        job.isActive = false;
        await job.save()
        return res.status(200).json({message:"job removed"})
    } catch (error) {
        return res.status(500).json({message:error.message})
    }
}

// toggle job status
export const toggleJob = async (req , res) => {
    try {
        const jobId = req.params.id
        const job = await Job.findById(jobId)
        if(!job){
            return res.status(400).json({message:"job not found"})
        }

        job.isActive = !job.isActive
        await job.save()

        return res.status(200).json({job,message:"job is toggled"})
    } catch (error) {
        return res.status(500).json({message:error.message})
    }
}

// get all the comapanies
export const getComapanies = async (req , res) => {

    try {
        const allCompanies = await RecruiterProfile.find()
        if (!allCompanies){
            return res.status(400).json({message:"no companies found"})
        }

        return res.status(200).json({companies:allCompanies,message:"all company details"})
    } catch (error) {
        return res.status(500).json({message:error.message})
    }
}

// get all jobs for the specified company
export const getCompanyJobs = async (req , res) => {
    try {
        const {postedBy} = req.params;
        if (!postedBy){
            return res.status(400).json({message:"postedby is invalid"})
        }
        const allJobs = await Job.find({postedBy})
        if (!allJobs){
            return res.status(400).json({message:"no jobs are found"})
        }
        return res.status(200).json({jobs:allJobs,message:"jobs are fetched"})
    } catch (error) {
        return res.status(500).json({message:error.message})
    }
}