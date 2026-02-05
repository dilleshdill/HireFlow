import { UserProfile } from "../model/UserProfileModel.js";
import cloudinary from "../config/cloudinary.js";


export const UploadResume = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    const result = await new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        {
          folder: "resumes",
          resource_type: "auto",
        },
        (error, result) => {
          if (error) reject(error);
          else resolve(result);
        }
      );

      stream.end(req.file.buffer); 
    });

    console.log(result)
    return res.status(200).json({
      resumeUrl: result.secure_url,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Upload failed" });
  }
};

export const AddUserProfile = async (req, res) => {
  try {
    const data = req.body.userProfileData; 
    console.log("all details",data)
    
    const existingProfile = await UserProfile.findOne({
      userId: req.user.id,
    });

    let resumeUrl = ""

    const profileData = {
      userId: req.user.id,
      title: data.title,
      location: data.location,
      phoneNo: data.phone,
      websiteUrl: data.websiteUrl,
      dateOfBirth: data.dateOfBirth,
      maritalStatus: data.martinalStatus,
      nationality: data.nationalitie,
      resumeUrl:  resumeUrl, 
      experience: data.experience,
      education: data.education,
    };

    if (existingProfile) {
      await UserProfile.updateOne(
        { userId: req.user.id },
        profileData
      );
      return res.json({ message: "Profile Updated" });
    }

    await UserProfile.create(profileData);
    res.json({ message: "Profile Created" });

  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err.message });
  }
};
