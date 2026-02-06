import cloudinary from "../config/cloudinary.js";
import { RecruiterProfile } from "../model/recruiterProfileModel.js";

export const uploadImage = async (req, res) => {
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

export const uploadDetailes = async (req, res) => {
  try {
    const data = req.body.userProfileData; 
    console.log(data)
    const existingProfile = await RecruiterProfile.findOne({
      userId: req.user.id,
    });

    const updateFields = {};

    if (data.location) updateFields.location = data.location;
    if (data.phone) updateFields.phoneNo = data.phoneNo;
    if (data.companyName) updateFields.companyName = data.companyName;
    if (data.aboutUs) updateFields.aboutUs = data.aboutUs;
    if (data.organizationType) updateFields.organizationType = data.organizationType;
    if (data.industryTypes) updateFields.industryTypes = data.industryTypes;

    if (data.teamSizes) updateFields.teamSize = data.teamSizes;
    if (data.yearOfEstablishment) updateFields.yearOfEstablishment = data.yearOfEstablishment;

    if (data.companyWebsite) updateFields.companyWebsite = data.companyWebsite;
    if (data.vision) updateFields.vision = data.vision;

    if (data.facebook) updateFields.facebook = data.facebook;
    if (data.instagram) updateFields.instagram = data.instagram;
    if (data.twitter) updateFields.twitter = data.twitter;
    if (data.youtube) updateFields.youtube = data.youtube;
    if (data.linkedin) updateFields.linkedin = data.linkedin;

    if (existingProfile) {
      await RecruiterProfile.updateOne(
        { userId: req.user.id },
        updateFields
      );
      return res.json({ message: "Profile Updated" });
    }

    await RecruiterProfile.create(updateFields);
    res.json({ message: "Profile Created" });

  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err.message });
  }
};
