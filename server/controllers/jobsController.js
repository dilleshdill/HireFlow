import Job from "../model/job.js"
import Questions from "../model/questionsSchema.js"
import { RecruiterProfile } from "../model/recruiterProfileModel.js"
import TestAttempt from "../model/testAttemptSchema.js"
import User from "../model/user.js"
import { UserProfile } from "../model/UserProfileModel.js"


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
        const {id} = req.params;
        if (!id){
            return res.status(400).json({message:"postedby is invalid"})
        }
        const allJobs = await Job.find({postedBy:id})
        if (!allJobs){
            return res.status(400).json({message:"no jobs are found"})
        }
        return res.status(200).json({jobs:allJobs,message:"jobs are fetched"})
    } catch (error) {
        return res.status(500).json({message:error.message})
    }
}

// get all candidates for the particular jobId
export const getCandidatesByJobId = async (req,res) => {
    
    try {
        const {id} = req.params;
        if(!id){
            return res.status(400).json({message:"no jobId is found"})
        }
        const job = await Job.findById({_id:id}).select("applications").populate({
            path:"applications.userId",
            select:"-password -otp -otpExpiry"
        })
        if(!job){
            return res.status(400).json({message:"no jobs found"})
        }

        const userIds = job.applications.map(app => app.userId._id)

        const profiles = await UserProfile.find({
            userId: {$in: userIds}
        })

        const candidates = job.applications.map(app => {
            const profile = profiles.find(
                p => p.userId.toString() === app.userId._id.toString()
            );

            return{
                ...app.userId.toObject(),
                profile:profile || null
            }
        })

        return res.status(200).json({candidates,message:"candidates are fetched"})
    } catch (error) {
        return res.status(500).json({message:error.message})
    }
}


//fetch the questions of the respectie job\
export const getJobQuestions = async (req , res) =>{
    
    try {
        const {jobId} = req.query;
        const userId = req.user.id;
        
        if(!jobId){
            return res.status(400).json({message:"missing jobId"})
        }
        const job = await Job.findById({_id:jobId})

        if(!job){
            return res.status(400).json({message:"no job is found"})
        }

        const curRoundType = await TestAttempt.findOne({userId})
        console.log(curRoundType)

        if (!curRoundType){
            return res.status(400).json({message:"testSchema is not found"})
        }

        const questions = await Questions.find({jobId,roundType:curRoundType.currentRound})

        if (!questions){
            if(curRoundType.currentRound === 'APTITUDE'){
                curRoundType.currentRound = 'CORE'
            }
            if(curRoundType.currentRound === 'CORE'){
                curRoundType.currentRound = 'CODING'
            }
            if(curRoundType.currentRound === 'CODING'){
                curRoundType.status = 'SUBMITTED'
            }
            await curRoundType.save()
            return res.status(400).json({message:"no question found for this jobId"})
        }

        return res.status(200).json({questions,message:""})
    } catch (error) {
        return res.status(500).json({message:error.message})
    }
}

// update answer
export const updateAnswer = async (req , res) => {
    try {
        const {jobId,questionId , score , markAsPreview , selectedAnswer , codeSubmission} = req.body;
        const userId = req.userId;

        if (!jobId || !questionId || !score || !markAsPreview || !selectedAnswer || !codeSubmission){
            return res.status(400).json({message:"missing all the required fields"})
        }

        const test = await TestAttempt.findOne({jobId,userId})

        if(!test){
            return res.status(400).json({message:"no test data was found"})
        }

        const updatedData = test.answers.filter((ans) => String(ans.questionId) === String(questionId))
        if(updatedData){
            updatedData.markAsPreview = markAsPreview
            updatedData.selectedAnswer = selectedAnswer
            updatedData.codeSubmission = codeSubmission

            await updatedData.save()
            return res.status(200).json({question,message:"updated sucessfully"})
        }

        const newAnswer = {
            questionId,
            selectedAnswer,
            score,
            markAsPreview,
            codeSubmission,
        }

        test.answers.push({newAnswer})

        return res.status(200).json({answer:newAnswer , message:"updated successfully"})


    } catch (error) {
        return res.status(500).json({message:error.message})
    }
}

// add to test schema
export const addToTestSchema = async (req , res) => {
    
    try {
        const {jobId} = req.body;
        const userId = req.user.id;

        if (!jobId){
            return res.status(400).json({message:"missing jobId"})
        }

        const job = await Job.findById(jobId)
        
        if(!job){
            return res.status(400).json({message:"no jobId found"})
        }
        
        const existed = await TestAttempt.findOne({jobId,userId})
        if(existed){
            return res.status(400).json({message:"test already existed"})
        }

        const newTest = await TestAttempt.create({
            jobId,
            userId,
            roundType:"APTITUDE",
            startedAt: new Date(),
            totalScore: 0,
            answers: []
        });

        return res.status(200).json({newTest,message:"test Added successfully"})
    } catch (error) {
        return res.status(500).json({message:error.message})   
    }
}


