// routes/userRoute.js
import express from "express";
import { AddUserProfile, UploadResume , getUserById, getUserProfile } from "../controllers/userProfileController.js";
import upload from "../middleware/upload.js";
import { protectUser } from "../middleware/protectUser.js";

const userRoute = express.Router();

userRoute.post(
  "/upload-resume",
  protectUser,
  upload.single("resume"),
  UploadResume
);

userRoute.post("/user-detailes", protectUser, AddUserProfile);
userRoute.get("/get-profile",protectUser,getUserProfile)
userRoute.get("/get-user",protectUser,getUserById)


export default userRoute;
