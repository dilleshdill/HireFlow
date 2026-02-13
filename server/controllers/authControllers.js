import validator from "validator";
import User from "../model/user.js";
import bcrypt from 'bcrypt'
import nodemailer from 'nodemailer'
import generateUserToken from "../utils/generateUserToken.js";

const sendOtpEmail = async (email, otp) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL,
      pass: process.env.EMAIL_PASSWORD
    }
  });

  await transporter.sendMail({
    from: `"Hireflow" <${process.env.EMAIL}>`,
    to: email,
    subject: "Login OTP - Hireflow",
    html: `
        <div style="font-family: Arial, Helvetica, sans-serif; background-color: #f4f6f8; padding: 30px;">
            <div style="max-width: 520px; margin: 0 auto; background-color: #ffffff; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.05); overflow: hidden;">
            
            <!-- Header -->
            <div style="background-color: #2563eb; padding: 20px; text-align: center;">
                <h1 style="color: #ffffff; margin: 0; font-size: 22px;">
                Hireflow
                </h1>
            </div>

            <!-- Body -->
            <div style="padding: 24px; color: #333333;">
                <p style="font-size: 16px; margin-bottom: 12px;">
                Hello,
                </p>

                <p style="font-size: 15px; line-height: 1.6;">
                Use the following One-Time Password (OTP) to complete your login.
                </p>

                <!-- OTP Box -->
                <div style="margin: 24px 0; text-align: center;">
                <span style="
                    display: inline-block;
                    font-size: 28px;
                    letter-spacing: 6px;
                    font-weight: bold;
                    color: #2563eb;
                    background-color: #f0f5ff;
                    padding: 12px 24px;
                    border-radius: 6px;
                ">
                    ${otp}
                </span>
                </div>

                <p style="font-size: 14px; color: #555555;">
                This OTP is valid for <strong>30 minutes</strong>. Please do not share it with anyone.
                </p>

                <p style="font-size: 14px; color: #555555; margin-top: 16px;">
                If you did not request this, you can safely ignore this email.
                </p>
            </div>

            <!-- Footer -->
            <div style="background-color: #f4f6f8; padding: 16px; text-align: center; font-size: 12px; color: #777777;">
                © ${new Date().getFullYear()} Hireflow. All rights reserved.
            </div>

            </div>
        </div>
        `

  });
};

const sendOtp = async (email) => {
  const normalizedEmail = validator.normalizeEmail(email);
  const user = await User.findOne({ email: normalizedEmail });

  if (!user) {
    throw new Error("User not found");
  }

  const currentTimestamp = Math.floor(Date.now() / 1000);

  if (user.otpExpiry && user.otpExpiry > currentTimestamp) {
    throw new Error("OTP already sent. Please wait.");
  }

  const otp = Math.floor(1000 + Math.random() * 9000);
  const otpExpiry = currentTimestamp + 1800;

  user.otp = otp;
  user.otpExpiry = otpExpiry;
  await user.save();

  await sendOtpEmail(normalizedEmail, otp);
};

const verifyOtp = async (email, otp) => {
    
    const normalizedEmail = validator.normalizeEmail(email)
    const user = await User.findOne({email:normalizedEmail})
    if(!user){
        throw new Error("User not found");
    }

    const currentTimestamp = Math.floor(Date.now() / 1000);
    console.log(currentTimestamp)
    if (user.otpExpiry && user.otpExpiry < currentTimestamp){
        throw new Error("otp is expired")
    }

    if (user.otp !== Number(otp)){
        throw new Error("invalid otp")
    }

    user.otp = null
    user.otpExpiry = null
    await user.save()

}

export const otpVerification = async (req , res) => {

    try {
        const {otp} = req.body;
        const email = req.user.email

        const normalizedEmail = validator.normalizeEmail(email)
        
        await verifyOtp(normalizedEmail,otp)
        return res.status(200).json({message:"otp verification successfully"})
    } catch (error) {
        console.log("error occured",error.message)
        return res.status(500).json({message:error.message})
    }
}

export const signup = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    if (!name || !email || !password || !role) {
      return res.status(400).json({
        message: "All fields are required"
      });
    }

    if (!validator.isEmail(email)) {
      return res.status(400).json({
        message: "Invalid email format"
      });
    }

    const normalizedEmail = validator.normalizeEmail(email);

    const userExists = await User.findOne({ email: normalizedEmail });
    if (userExists) {
      return res.status(409).json({
        message: "User already exists"
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      name,
      email: normalizedEmail,
      password: hashedPassword,
      role
    });

    const token = generateUserToken(newUser._id,newUser.email)

    res.cookie("token",token,{
      httpOnly: true,
      secure: true,       // REQUIRED on HTTPS (Vercel)
      sameSite: "none",   // REQUIRED for cross-origin
      maxAge: 7 * 24 * 60 * 60 * 1000,
    })
    await sendOtp(normalizedEmail);

    return res.status(201).json({
      message: "Signup successful. OTP sent to email."
    });


  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: error.message || "Server error"
    });
  }
};

export const login = async (req , res) => {
  try {
    const {email , password} = req.body;

    if(!email || !password){
      return res.status(400).json({message:"all fields are required"})
    }
    const normalizedEmail = validator.normalizeEmail(email);
    const user = await User.findOne({ email: normalizedEmail });
 
    if (!user){
      return res.status(400).json({message:"no user found"})
    }

    if (!user.isActive) {
      return res.status(403).json({
        message: "Please verify your account first"
      });
    }

    const ispasswordCorrect = await bcrypt.compare(password,user.password)
    if(!ispasswordCorrect){
      return res.status(400).json({message:"password is incorrect"})
    }

    const token = generateUserToken(user._id,user.email)

    res.cookie("token",token,{
      httpOnly: true,
      secure: true,       // REQUIRED on HTTPS (Vercel)
      sameSite: "none",   // REQUIRED for cross-origin
      maxAge: 7 * 24 * 60 * 60 * 1000,
    })

    return res.status(200).json({
      message: "Login successful",
      user: {
        id: user._id,
        email: user.email,
        role: user.role
      }
    });

  } catch (error) {
    return res.status(500).json({
      message: error.message || "Server error"
    });
  }
}

export const getChangeUserPassword = async(req,res) => {
  try{
    const {id} = req.user
    const {currentPassword,newPassword,confirmNewPassword} = req.body

    console.log(currentPassword,newPassword,confirmNewPassword)

    const user = await User.findById(id)
    console.log(user)

    if(!user){
      return res.status(204).json({msg:"User Not Found"})
    }

    const isHash = await bcrypt.compare(currentPassword,user.password)
    
    if(!isHash){
      return res.status(204).json({msg:"current Password Not Match"})
    }

    user.password =  newPassword
    await user.save()

    res.status(200).json({msg:"Password Successfully Updated"})

  }catch(err){
    res.status(500).json({msg:err.msg})
  }
}