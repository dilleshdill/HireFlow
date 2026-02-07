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

    answers: [
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

    isPassed: {
      type: Boolean,
      default: false
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

    submittedAt: Date
  
},{ timestamps: true }
);

const TestAttempt = mongoose.model("TestAttempt", testAttemptSchema);
export default TestAttempt;
