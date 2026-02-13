import express from 'express'
import { login, otpVerification, signup } from '../controllers/authControllers.js'
import { protectUser } from '../middleware/protectUser.js';

const authRoute = express.Router()

authRoute.post('/signup',signup);
authRoute.post('/login',login)
authRoute.post('/otp-verification',protectUser,otpVerification)


export default authRoute