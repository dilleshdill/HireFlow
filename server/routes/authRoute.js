import express from 'express'
import { checkEmail, forgetOtpVerification, getChangeUserPassword, getUserDetails, login, logout, otpSendByForget, otpVerification, resetPassword, signup } from '../controllers/authControllers.js'
import { protectUser } from '../middleware/protectUser.js';

const authRoute = express.Router()

authRoute.post('/signup',signup);
authRoute.post('/login',login)
authRoute.post('/logout',logout);
authRoute.get('/get-user',protectUser,getUserDetails);
authRoute.post('/otp-verification',protectUser,otpVerification)
authRoute.post("/change-password",protectUser,getChangeUserPassword)
authRoute.get("/check-email",checkEmail)
authRoute.get("/sendOtp-forget",otpSendByForget)
authRoute.post("/forget-otpVerfiaction",forgetOtpVerification)
authRoute.post("/reset-password",resetPassword)

export default authRoute