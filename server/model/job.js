import mongoose from 'mongoose'

const jobSchema = new mongoose.Schema({
    postedBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref: "User",
        required:true
    },

    title:{
        type:String,
        required:true,
        trim:true
    },

    role:{
        type:String,
        required:true
    },

    tags:[{
        type:String,
        trim:true
    }],

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
        enum: ["Hourly", "Monthly", "Yearly"],
        required: true
      }
    },

    education: {
      type: String,
      required: true
    },

    experience: {
      type: String,
      enum: ["Fresher", "1-3 Years", "3-5 Years", "5+ Years"],
      required: true
    },

    jobType: {
      type: String,
      enum: ["Full-Time", "Part-Time", "Internship", "Contract"],
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
      enum: ["Intern", "Junior", "Mid", "Senior", "Lead"],
      required: true
    },

    description: {
      type: String,
      required: true
    },

    responsibilities: [{
        type:String,
        trim:true
    }],

    isActive: {
      type: Boolean,
      default: true
    },
},{timestamps:true})

const Job = mongoose.model("Job",jobSchema);
export default Job