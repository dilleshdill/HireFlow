import mongoose from "mongoose";

const applicationSchema = mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },

    jobId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Job",
        required:true
    },

    recruiterId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },

    matchPercentage: { type: Number},

    status: {
      type: String,
      enum: [
        "APPLIED",
        "TEST_PENDING",
        "TEST_SUBMITTED",
        "QUALIFIED",
        "REJECTED"
      ],
      default: "APPLIED"
    }
},{ timestamps: true })

const Application = mongoose.model("Application",applicationSchema)

export default Application