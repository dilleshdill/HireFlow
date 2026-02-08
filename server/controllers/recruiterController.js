import cloudinary from "../config/cloudinary.js";
import Questions from "../model/questionsSchema.js";
import { RecruiterProfile } from "../model/recruiterProfileModel.js";
import SavedCandidates from "../model/savedCandidates.js";
import { UserProfile } from "../model/UserProfileModel.js";

export const uploadImage = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    const result = await new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        {
          folder: "resumes",
          resource_type: "auto",
        },
        (error, result) => {
          if (error) reject(error);
          else resolve(result);
        }
      );

      stream.end(req.file.buffer); 
    });

    console.log(result)

    return res.status(200).json({
      resumeUrl: result.secure_url,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Upload failed" });
  }
};

export const uploadDetailes = async (req, res) => {
  try {
    const data = req.body.userProfileData; 
    console.log(data)
    const existingProfile = await RecruiterProfile.findOne({
      userId: req.user.id,
    });

    const updateFields = {};

    if (data.location) updateFields.location = data.location;
    if (data.phone) updateFields.phoneNo = data.phoneNo;
    if (data.companyName) updateFields.companyName = data.companyName;
    if (data.aboutUs) updateFields.aboutUs = data.aboutUs;
    if (data.organizationType) updateFields.organizationType = data.organizationType;
    if (data.industryTypes) updateFields.industryTypes = data.industryTypes;

    if (data.teamSizes) updateFields.teamSize = data.teamSizes;
    if (data.yearOfEstablishment) updateFields.yearOfEstablishment = data.yearOfEstablishment;

    if (data.companyWebsite) updateFields.companyWebsite = data.companyWebsite;
    if (data.vision) updateFields.vision = data.vision;

    if (data.facebook) updateFields.facebook = data.facebook;
    if (data.instagram) updateFields.instagram = data.instagram;
    if (data.twitter) updateFields.twitter = data.twitter;
    if (data.youtube) updateFields.youtube = data.youtube;
    if (data.linkedin) updateFields.linkedin = data.linkedin;

    if (existingProfile) {
      await RecruiterProfile.updateOne(
        { userId: req.user.id },
        updateFields
      );
      return res.json({ message: "Profile Updated" });
    }

    await RecruiterProfile.create(updateFields);
    res.json({ message: "Profile Created" });

  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err.message });
  }
};


// save the candidates
export const saveCandidate = async (req , res) => {
  
  try {
    const recruiterId = req.user.id;
    const {userId} = req.body;
    console.log(userId,recruiterId)
    if(!userId){
      return res.status(400).json({message:"all fields are required"})
    }
    const existed = await SavedCandidates.findOne({recruiterId,userId})

    if(existed){
      return res.status(400).json({message:"candidate was already in saved"})
    }

    const candidate = await SavedCandidates.create({
      recruiterId,
      userId
    })

    return res.status(200).json({candidate,message:"saved successfully"})
  } catch (error) {
    return res.status(500).json({message:error.message})
  }
}

// remove saved candidates
export const removeCandidate = async (req , res) => {
  try {
    const recruiterId = req.user.id;
    const {userId} = req.body;
    
    if(!userId){
      return res.status(400).json({message:"all fields are required"})
    }
    const existed = await SavedCandidates.findOne({recruiterId,userId})

    if(!existed){
      return res.status(400).json({message:"no candidates was found"})
    }

    const candidate = await SavedCandidates.findOneAndDelete({recruiterId,userId})

    return res.status(200).json({candidate,message:"candidate removed form savedCandidates"})

  } catch (error) {
    return res.status(500).json({message:error.message})
  }
}

//fetch saved candidates 
export const fetchSavedCandidates = async (req , res) => {
  try {
    const recruiterId = req.user.id
    const savedCandidates = await SavedCandidates.find({recruiterId})

    if(!saveCandidate){
      return res.status(400).json({message:"no saved candidates"})
    }

    return res.status(200).json({savedCandidates,message:"fetch successfully"})
  } catch (error) {
    return res.status(500).json({message:error.message})
  }
}

// get saved candidates
export const getSavedCandidates = async (req, res) => {
  try {
    const recruiterId = req.user.id;

    // 1️⃣ Get saved candidates with user populated
    const saved = await SavedCandidates.find({ recruiterId })
      .populate("userId", "-password -otp -otpExpiry")
      .sort({ createdAt: -1 });

    // 2️⃣ Extract user ids
    const userIds = saved.map(s => s.userId._id);

    // 3️⃣ Get profiles of those users
    const profiles = await UserProfile.find({
      userId: { $in: userIds }
    });

    // 4️⃣ Merge user + profile
    const result = saved.map(s => {
      const profile = profiles.find(
        p => String(p.userId) === String(s.userId._id)
      );

      return {
        ...s.toObject(),
        profile: profile || null
      };
    });

    return res.status(200).json({
      message: "Saved candidates fetched",
      savedCandidates: result
    });

  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: error.message });
  }
};


// add question to the particular jobId
export const addQuestion = async (req , res) => {
    try {
        const {
            jobId,
            roundType,
            questionText,
            options,
            correctAnswer,
            marks,
            difficulty,
            testCases
          } = req.body;

        if(!jobId || !roundType || !questionText){
            return res.status(400).json({message:"missing required fields"})
        }

        if(roundType !== 'CODING'){
          if(!options || options.length < 2 || !correctAnswer){
            return res.status(400).json({message: "MCQ requires options and correctAnswer"})
          }
        }

        if(roundType === 'CODING'){
          if(!testCases || testCases.length === 0){
            return res.status(400).json({message:"coding question need test cases"})
          }
        }

        const newQuestion = await Questions.create({
          jobId,
          roundType,
          questionText,
          options,
          correctAnswer,
          marks,
          difficulty,
          testCases
        })

        return res.status(200).json({question:newQuestion , message:"Question added successfully"})
    } catch (error) {
        return res.status(500).json({message:error.message})
    }
}

// update question by the question Id
export const updateQuestion = async (req , res) => {
  try {
    const {
            questionId,
            questionText,
            options,
            correctAnswer,
            marks,
            difficulty,
            testCases
        } = req.body;
      
    if(!questionId){
      return res.status(400).json({message:"missing questionId"})
    }

    const question = await Questions.findById({_id:questionId})

    if(!question){
      return res.status(400).json({message:"Question not found"})
    }

    if(questionText) question.questionText = questionText;
    if (marks) question.marks = marks;
    if (difficulty) question.difficulty = difficulty;

    if (question.roundType !== 'CODING'){
      if (options) question.options = options;
      if (correctAnswer) question.correctAnswer = correctAnswer;
    }

    if (question.roundType === 'CODING'){
      if(testCases) question.testCases = testCases;
    }

    await question.save()

    return res.status(200).json({question,message:"updated successfully"})
  } catch (error) {
    return res.status(500).json({message:error.message})
  }
}

// delete Question by the question Id
export const deleteQuestion = async (req , res) => {
  try {
    const {questionId} = req.body;
    if (!questionId){
      return res.status(400).json({message:"no questionId found"})
    }

    const question = await Questions.findByIdAndDelete({_id:questionId})
    
    return res.status(200).json({question,message:"deleted successfully"})
  } catch (error) {
    return res.status(500).json({message:error.message})
  }
}

// fetch all the question for the particular jobId
export const getAllQuestions = async (req,res) => {
  console.log("enter")
  try {
    const {jobId} = req.query;
    console.log(jobId)

    if (!jobId){
      return res.status(400).json({message:"no jobId found"})
    }

    const questions = await Questions.find({jobId})

    if(!questions){
      return res.status(400).json({message:"no questions found for this jobId"})
    }

    return res.status(200).json({questions,message:"fetched successfully"})
  } catch (error) {
    return res.status(500).json({message:error.message})
  }
}