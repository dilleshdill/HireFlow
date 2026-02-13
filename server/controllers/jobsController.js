import Job from "../model/job.js"
import Questions from "../model/questionsSchema.js"
import { RecruiterProfile } from "../model/recruiterProfileModel.js"
import TestAttempt from "../model/testAttemptSchema.js"
import User from "../model/user.js"
import { UserProfile } from "../model/UserProfileModel.js"


// post a job
export const postJob = async (req , res) => {
    
    try {
        const payload = req.body;
        console.log(payload)
        // const userId = req.user.id

        const user = await User.findById({_id:payload.postedBy})
        if (!user){
            return res.status(400).json({message:"user was not found"})
        }

        const newJob = await Job.create({
            postedBy:payload.postedBy,
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
        const page = Number(req.query.page) || 1
        const limit = Number(req.query.limit) || 5

        const skip = (page - 1) * limit

        const totalJobs  = await Job.countDocuments({isActive:true});

        const jobs = await Job.find({isActive:true})
        .populate("postedBy","name email")
        .sort({createdAt:-1})
        .skip(skip)
        .limit(limit);


        if(jobs.length === 0){
            return res.status(400).json({message:"no jobs are found"})
        }

        return res.status(200).json({message:"jobs fetched successfully",jobs,
            totalPages:Math.ceil(totalJobs / limit),
            currentPage:page
        })
    } catch (error) {
        return res.status(500).json({message:error.message})
    }
}

// get job by id
export const getJobById = async (req,res) => {
    try {
        const {jobId} = req.query;
        console.log("jobid",jobId)
        const job = await Job.findById({_id:jobId}).populate('postedBy','name ')
        console.log('job',job)
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

        const curRoundType = await TestAttempt.findOne({userId,jobId})

        if (!curRoundType){
            return res.status(400).json({message:"testSchema is not found"})
        }

        const questions = await Questions.find({jobId,roundType:curRoundType.currentRound})

        if (!questions){
            if(curRoundType.currentRound === 'APTITUDE'){
                curRoundType.currentRound = 'CORE'
                curRoundType.startTime = Date.now()
            }
            else if(curRoundType.currentRound === 'CORE'){
                curRoundType.currentRound = 'CODING'
                curRoundType.startTime = Date.now()
            }
            else{
                curRoundType.status = 'SUBMITTED'
                curRoundType.startTime = Date.now()
            }
            await curRoundType.save()
            return res.status(400).json({message:"no question found for this jobId"})
        }

        return res.status(200).json({questions,message:"questions fetched"})
    } catch (error) {
        return res.status(500).json({message:error.message})
    }
}

// update answer
export const updateAnswer = async (req, res) => {
    console.log("enter")
  try {
    const {
      jobId,
      questionId,
      score,
      markAsPreview,
      selectedAnswer,
      codeSubmission,
      roundType
    } = req.body;

    const userId = req.user.id;

    if (
      !jobId || !questionId || score === undefined || markAsPreview === undefined || !roundType) {
        return res.status(400).json({
            message: "Missing required fields"
        });
    }

    const test = await TestAttempt.findOne({
      jobId,
      userId,
    });

    if (!test) {
      return res.status(400).json({
        message: "No test data found"
      });
    }

    let existingAnswer;

    if(roundType === 'APTITUDE'){
        existingAnswer = test.aptitudeAnswers.find(
            (ans) => String(ans.questionId) === String(questionId)
        );
    }
    else if(roundType === 'CORE'){
        existingAnswer = test.coreAnswers.find(
            (ans) => String(ans.questionId) === String(questionId)
        );
    }
    else{
        existingAnswer = test.codingAnswers.find(
            (ans) => String(ans.questionId) === String(questionId)
        );
    }

    
    if (existingAnswer) {
      existingAnswer.markAsPreview = markAsPreview;
      existingAnswer.selectedAnswer = selectedAnswer;
      existingAnswer.codeSubmission = codeSubmission;
      existingAnswer.score = score;

      await test.save();

      return res.status(200).json({
        message: "Answer updated successfully"
      });
    }

    if(roundType === 'APTITUDE'){
        test.aptitudeAnswers.push({
            questionId,
            selectedAnswer,
            score,
            markAsPreview,
            codeSubmission,
        });
    }
    else if(roundType === 'CORE'){
        test.coreAnswers.push({
            questionId,
            selectedAnswer,
            score,
            markAsPreview,
            codeSubmission,
        });
    }
    else{
        test.codingAnswers.push({
            questionId,
            selectedAnswer,
            score,
            markAsPreview,
            codeSubmission,
        });
    }

    await test.save();

    return res.status(200).json({
      message: "Answer added successfully"
    });

  } catch (error) {
    return res.status(500).json({
      message: error.message
    });
  }
};

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
            return res.status(201).json({test:existed,message:"test already existed so navigate to test"})
        }

        const questions = await Questions.find({jobId})
        console.log("questions",questions)
        let score = 0;

        questions.forEach((q) => {
        score += q.marks || 0;
        });

        console.log("score",score);


        const newTest = await TestAttempt.create({
            jobId,
            userId,
            roundType:"APTITUDE",
            jobScore:score,
            startedAt: new Date(),
            startTime : new Date(),
            totalScore: 0,
            answers: []
        });

        return res.status(200).json({newTest,message:"test Added successfully"})
    } catch (error) {
        return res.status(500).json({message:error.message})   
    }
}

export const getUserTests = async(req,res) => {
    try{
        const {id} = req.user

        const jobs = await TestAttempt.find({ jobId: id });
        
        if(!jobs){
            return res.status(202).json({msg:"No Tests Found"})
        }
        return res.status(200).json({msg:"jobs successfully fetched",jobs:jobs})
    }catch(err){
        res.status(500).json({msg:err.msg})
    }
}



