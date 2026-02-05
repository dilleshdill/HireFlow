import mongoose from 'mongoose';

const ResumeSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      default: "Untitled Resume",
    },

    professional_summary: {
      type: String,
      default: "",
    },

    skills: [
      {
        type: String,
      },
    ],

    personal_info: {
      image: { type: String, default: "" },
      full_name: { type: String, default: "" },
      profession: { type: String, default: "" },
      email: { type: String, default: "" },
      phone: { type: String, default: "" },
      location: { type: String, default: "" },
      linkedin: { type: String, default: "" },
      website: { type: String, default: "" },
    },

    experience: [
      {
        company: { type: String, default: "" },
        position: { type: String, default: "" },
        start_date: { type: String, default: "" },
        end_date: { type: String, default: "" },
        description: { type: String, default: "" },
        is_current: { type: Boolean, default: false },
      },
    ],

    project: [
      {
        name: { type: String, default: "" },
        type: { type: String, default: "" },
        description: { type: String, default: "" },
      },
    ],

    education: [
      {
        institution: { type: String, default: "" },
        degree: { type: String, default: "" },
        field: { type: String, default: "" },
        graduation_date: { type: String, default: "" },
        gpa: { type: String, default: "" },
      },
    ],
  },
  { timestamps: true, minimize:false }
)

const UserProfileSchema = new mongoose.scheam(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    title: {
      type: String,
      default: "User Detailes",
    },

    gender:{
        type:String,
        required:true
    },

    public: {
      type: Boolean,
      default: false,
    },

    experience:{
        type:String,
        default:"0"
    },
    education:{
        type:String,
        default:"BTech"
    },
    resumeUrl: {
        type:String,

    },
    websiteUrl:{
        type:String,

    },
    dateOfBirth:{
        type:String,
        require:true
    },
    bioGraphy:{
        type:String,

    },  
    facebook:{
        type:String,
    },
    instagram:{
        type:String
    },
    youtube:{
        type:String
    },
    twitter:{
        type:String
    },
    location:{
        type:String
    },
    phoneNo:{
        type:String
    },

    martinalStatus : {
        type:String, 
    },

    nationality  : {
        type:String,
    },
    resume:[ResumeSchema]
  },
  { timestamps: true, minimize:false }
)

export const UserProfile  = mongoose.model("UserProfile",UserProfileSchema)