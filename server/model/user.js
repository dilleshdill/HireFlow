import mongoose from "mongoose";
import validator from "validator";


const userSchema = mongoose.Schema({
    name: { type: String, required: true },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      validate: {
        validator: (value) => validator.isEmail(value),
        message: "Invalid email address"
      }
    },

    password: { type: String, required: true },
    role: {
      type: String,
      enum: ["USER", "RECRUITER", "ADMIN"],
      required: true,
      default: "USER",
    },
    otp:Number,
    otpExpiry:Number,
    isActive : {type: Boolean , default:true}
},{ timestamps: true })

const User = mongoose.model("User",userSchema);
export default User