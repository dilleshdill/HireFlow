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
    console.log(data)
    const existingProfile = await UserProfile.findOne({
      userId: req.user.id,
    });

    const updateFields = {};

    if (data.title) updateFields.title = data.title;
    if (data.location) updateFields.location = data.location;
    if (data.phone) updateFields.phoneNo = data.phone;
    if (data.resumeUrl) updateFields.resumeUrl = data.resumeUrl;  
    if (data.websiteUrl) updateFields.websiteUrl = data.websiteUrl;
    if (data.dateOfBirth) updateFields.dateOfBirth = data.dateOfBirth;

    if (data.experience) updateFields.experience = data.experience;
    if (data.education) updateFields.education = data.education;

    if (data.martinalStatus) updateFields.maritalStatus = data.martinalStatus;
    if (data.nationalitie) updateFields.nationality = data.nationalitie;
    if (data.gender) updateFields.gender = data.gender;

    if (data.resumeUrl) updateFields.resumeUrl = data.resumeUrl;

    if (data.facebook) updateFields.facebook = data.facebook;
    if (data.instagram) updateFields.instagram = data.instagram;
    if (data.twitter) updateFields.twitter = data.twitter;
    if (data.youtube) updateFields.youtube = data.youtube;
    if (data.linkedin) updateFields.linkedin = data.linkedin;

    if (data.description) updateFields.biography = data.description;

    if (existingProfile) {
      await UserProfile.updateOne(
        { userId: req.user.id },
        updateFields
      );
      return res.json({ message: "Profile Updated" });
    }

    await UserProfile.create(updateFields);
    res.json({ message: "Profile Created" });

  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err.message });
  }
};


export const getUserProfile = async(req,res) => {
  try{
    const {id} = req.user

    const user = await UserProfile.findById(id)
    if(!user){
      return res.status(400).json({msg:"User not Found"})
    }

    res.status(200).json({userData:user})

  }catch(err){
    res.status(500).json({msg:"internal server error"})
  }
}