import express from 'express'
import { protectUser } from '../middleware/protectUser.js'
import { uploadImage,uploadDetailes } from '../controllers/recruiterController.js';
import upload from '../middleware/upload.js';

const recruiterRoute = express.Router()

recruiterRoute.post("/upload-image",protectUser,upload.single("resume"),uploadImage);
recruiterRoute.post("/recruiter-detailes",protectUser,uploadDetailes)

export default recruiterRoute