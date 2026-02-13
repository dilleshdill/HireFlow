import mongoose from "mongoose";

const testAttemptSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },

    jobId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Job",
      required: true
    },

    roundType: {
      type: String,
      enum: ["APTITUDE", "CORE", "CODING"],
      required: true
    },

    jobScore:{
      type: Number,
      default: 0
    },

    codingAnswers: [
      {
        questionId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Question",
          required: true
        },

        selectedAnswer: String, // for MCQ

        codeSubmission: String, // for coding round

        markAsPreview:{type:Boolean,default:false},
        score: {
          type: Number,
          default: 0
        }
      }
    ],

    aptitudeAnswers: [
      {
        questionId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Question",
          required: true
        },

        selectedAnswer: String, // for MCQ

        codeSubmission: String, // for coding round

        markAsPreview:{type:Boolean,default:false},
        score: {
          type: Number,
          default: 0
        }
      }
    ],

    coreAnswers: [
      {
        questionId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Question",
          required: true
        },

        selectedAnswer: String, // for MCQ

        codeSubmission: String, // for coding round

        markAsPreview:{type:Boolean,default:false},
        score: {
          type: Number,
          default: 0
        }
      }
    ],

    totalScore: {
      type: Number,
      default: 0
    },

    roundScores: {
      aptitude: { type: Number, default: 0 },
      core: { type: Number, default: 0 },
      coding: { type: Number, default: 0 }
    },


    isPassed: {
      type: Boolean,
      default: false
    },

    currentRound:{
        type:String,
        enum: ["APTITUDE", "CORE", "CODING"],
        default:'APTITUDE'
    },

    status: {
      type: String,
      enum: ["STARTED", "SUBMITTED", "EVALUATED"],
      default: "STARTED"
    },

    startedAt: {
      type: Date,
      default: Date.now
    },

    startTime:{
      type: Date,
      default: Date.now
    },
    
    submittedAt: Date
  
},{ timestamps: true }
);

const TestAttempt = mongoose.model("TestAttempt", testAttemptSchema);
export default TestAttempt;
