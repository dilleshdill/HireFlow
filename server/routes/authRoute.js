import express from 'express'
import { otpVerification, signup } from '../controllers/authControllers.js'

const authRoute = express.Router()

authRoute.post('/signup',signup);
authRoute.post('/otp-verification',otpVerification)

export default authRoute