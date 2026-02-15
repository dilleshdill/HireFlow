import mongoose from "mongoose";

const RecruiterProfileSchema = new mongoose.Schema(
  {
    recruiterId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    companyName: {
      type: String,
      default: "Hire Flow",
    },

    aboutUs : {
        type:String,
    },

    organizationType: {
        type:String
    },
    industryType: {
        type:String
    },
    teamsize: {
        type:String
    },
    yearofEstablishment:{
        type:Date
    },

    public: {
      type: Boolean,
      default: false,
    },

    companyWebSite: {
        type:String
    },
    logoUrl : {
        type:String
    },
    bannerUrl :{
        type:String
    },
    vision:{
        type:String
    },
    facebook: {
        type:String
    },
    instagram: {
        type:String
    },
    youtube: {
        type:String
    },
    twitter: {
        type:String
    },

    location: {
        type:String
    },
    phoneNo: {
        type:String
    },

  },
  { timestamps: true, minimize: false }
);

export const RecruiterProfile = mongoose.model("RecruiterProfile", RecruiterProfileSchema);
