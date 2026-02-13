import express from 'express'
import { getChangeUserPassword, login, otpVerification, signup } from '../controllers/authControllers.js'
import { protectUser } from '../middleware/protectUser.js';

const authRoute = express.Router()

authRoute.post('/signup',signup);
authRoute.post('/login',login)
authRoute.post('/otp-verification',protectUser,otpVerification)
authRoute.post("/change-password",protectUser,getChangeUserPassword)

export default authRoute