// config/cloudinary.js
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

// DEBUG (remove after test)
console.log("Cloudinary:", {
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY ? "LOADED" : "MISSING",
  api_secret: process.env.API_SECRET ? "LOADED" : "MISSING",
});

export default cloudinary;
