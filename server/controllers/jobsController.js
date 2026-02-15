import Job from "../model/job.js"
import Questions from "../model/questionsSchema.js"
import { RecruiterProfile } from "../model/recruiterProfileModel.js"
import TestAttempt from "../model/testAttemptSchema.js"
import User from "../model/user.js"
import { UserProfile } from "../model/UserProfileModel.js"
import ai from "../config/ai.js";
import mongoose from "mongoose";


// post a job
export const postJob = async (req, res) => {
  try {
    const { payload } = req.body;
    const userId = req.user.id

    console.log("Job Data:", payload);

    const user = await User.findById(userId);

    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    const postedBy = await RecruiterProfile.findOne({recruiterId:userId})

    if(!postedBy){
        return res.status(400).json({message:"complete profile first"})
    }

    const newJob = await Job.create({
      ...payload,
      postedBy:postedBy._id
    });

    return res.status(200).json({
      job: newJob,
      message: "Successfully posted the job"
    });

  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
};


// get all the jobs
export const getAllJobs = async (req, res) => {
  try {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 5;

    const skip = (page - 1) * limit;

    const filter = {
      isActive: true,
      expirationDate: { $gte: new Date() }
    };

    const totalJobs = await Job.countDocuments(filter);

    const jobs = await Job.find(filter)
      .populate("postedBy", "logoUrl")
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    return res.status(200).json({
      message: "Jobs fetched successfully",
      jobs,
      totalJobs,
      totalPages: Math.ceil(totalJobs / limit),
      currentPage: page
    });

  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// get job by id
export const getJobById = async (req,res) => {
    try {
        const {jobId} = req.query;

        const job = await Job.findById({_id:jobId}).populate('postedBy','logoUrl phoneNo companyWebSite ')

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
        const profile = await RecruiterProfile.findOne({recruiterId:userId})
        if(!profile){
            return res.status(400).json({message:"complete profile first"})
        }
        const myJobs = await Job.find({postedBy:profile._id}).populate("postedBy","logoUrl")
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

        console.log("id",id)
        if (!id){
            return res.status(400).json({message:"postedby is invalid"})
        }
        
        const profile = await RecruiterProfile.findOne({recruiterId:id})
        console.log("profile",profile)
        const allJobs = await Job.find({postedBy:profile._id}).populate("postedBy","logoUrl")
        if (!allJobs){
            return res.status(400).json({message:"no jobs are found"})
        }
        return res.status(200).json({jobs:allJobs,message:"jobs are fetched"})
    } catch (error) {
        return res.status(500).json({message:error.message})
    }
}

// get all candidates for the particular jobId
export const getCandidatesByJobId = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ message: "No jobId provided" });
    }

    const job = await Job.findById(id)
      .select("applications")
      .populate({
        path: "applications.userId",
        select: "title education experience location phoneNo websiteUrl userId _id",
        populate: {
          path: "userId",
          select: "name email"
        }
      });

    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }

    const candidates = job.applications
      .filter(app => app.userId)
      .map(app => ({
        profile: app.userId,
        user: app.userId.userId
      }));

    return res.status(200).json({
      message: "Candidates fetched successfully",
      candidates
    });

  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};


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



export const recommendedList = async (req, res) => {
  try {
    const { jobId } = req.body;

    if (!mongoose.Types.ObjectId.isValid(jobId)) {
      return res.status(400).json({ message: "Invalid Job ID" });
    }

    const currentJob = await Job.findById(jobId);

    if (!currentJob) {
      return res.status(404).json({ message: "Job not found" });
    }

    const relatedJobs = await Job.aggregate([
      {
        $match: {
          _id: { $ne: currentJob._id },
          isActive: true
        }
      },
      {
        $addFields: {
          score: {
            $add: [
              { $size: { $setIntersection: ["$tags", currentJob.tags] } },
              { $cond: [{ $eq: ["$role", currentJob.role] }, 2, 0] },
              { $cond: [{ $eq: ["$jobLevel", currentJob.jobLevel] }, 1, 0] }
            ]
          }
        }
      },
      {
        $match: {
          score: { $gt: 0 }
        }
      },
      {
        $sort: { score: -1, createdAt: -1 }
      },
      {
        $limit: 5
      }
    ]);

    return res.status(200).json({
      success: true,
      relatedJobs
    });

  } catch (err) {
    console.error(err);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch related jobs"
    });
  }
};



