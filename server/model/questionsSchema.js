import mongoose from 'mongoose';

const questionSchema = new mongoose.Schema({
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

  questionText: {
    type: String,
    required: true
  },

  options: [
    {
      type: String
    }
  ],

  correctAnswer: String,

  marks: {
    type: Number,
    default: 1
  },

  difficulty: {
    type: String,
    enum: ["EASY", "MEDIUM", "HARD"]
  },

  // For coding round
  testCases: [
    {
      input: String,
      expectedOutput: String
    }
  ],

  roundTime: Number   // optional, or move this to Job
},
{ timestamps: true });


const Questions = mongoose.model("Question",questionSchema)
export default Questions;