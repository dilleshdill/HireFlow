import mongoose from "mongoose";

const jobSchema = new mongoose.Schema(
  {
    postedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "RecruiterProfile",
      required: true
    },

    title: {
      type: String,
      required: true,
      trim: true
    },

    role: {
      type: String,
      required: true
    },

    tags: [
      {
        type: String,
        trim: true
      }
    ],

    location: {
        type:String,
        required:true
    },

    applications:[{
        userId:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"UserProfile",
        }
    }],

    qualifyingScore: { type: Number, default: 60 },

    salary: {
      min: {
        type: Number,
        required: true
      },
      max: {
        type: Number,
        required: true
      },
      currency: {
        type: String,
        default: "USD"
      },
      type: {
        type: String,
        enum: [
          "Hourly",
          "Daily",
          "Weekly",
          "Monthly",
          "Yearly",
          "Contract-Based",
          "Fixed + Incentives"
        ],
        required: true
      }
    },

    education: {
      type: String,
      required: true
    },

    experience: {
      type: String,
      enum: [
        "Fresher",
        "0 - 1 year",
        "1 - 2 years",
        "2 - 3 years",
        "3 - 5 years",
        "5 - 7 years",
        "7+ years"
      ],
      required: true
    },

    jobType: {
      type: String,
      enum: [
        "Full-Time",
        "Part-Time",
        "Internship",
        "Contract",
        "Remote",
        "Hybrid"
      ],
      required: true
    },

    vacancies: {
      type: Number,
      required: true,
      min: 1
    },

    expirationDate: {
      type: Date,
      required: true
    },

    jobLevel: {
      type: String,
      enum: [
        "Intern",
        "Entry Level",
        "Junior",
        "Mid Level",
        "Senior",
        "Lead",
        "Manager"
      ],
      required: true
    },

    description: {
      type: String,
      required: true
    },

    responsibilities: {
      type: [String],
      required: true
    },

    isActive: {
      type: Boolean,
      default: true
    },

    aptitudeTime:{
      type:Number,
      required:true,
      default: 30,
    },
    coreTime:{
      type:Number,
      required:true,
      default: 30,
    },
    codingTime:{
      type:Number,
      required:true,
      default: 60,
    }
  },
  { timestamps: true }
);


const Job = mongoose.model("Job", jobSchema);
export default Job;
