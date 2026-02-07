import express from 'express'
import { protectUser } from '../middleware/protectUser.js'
import { uploadImage,uploadDetailes, saveCandidate, removeCandidate, getSavedCandidates, fetchSavedCandidates } from '../controllers/recruiterController.js';
import upload from '../middleware/upload.js';

const recruiterRoute = express.Router()

recruiterRoute.post("/upload-image",protectUser,upload.single("resume"),uploadImage);
recruiterRoute.post("/recruiter-detailes",protectUser,uploadDetailes)
recruiterRoute.post("/save-candidate",protectUser,saveCandidate);
recruiterRoute.get('/get-all-savedCandidates',protectUser,fetchSavedCandidates)
recruiterRoute.post("/remove-candidate",protectUser,removeCandidate);
recruiterRoute.get("/getsaved-candidates",protectUser,getSavedCandidates);

export default recruiterRoute