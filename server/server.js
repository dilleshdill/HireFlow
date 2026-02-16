import './config/env.js'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import express from 'express'
import authRoute from './routes/authRoute.js'
import { connectDB } from './config/db.js'
import jobRoute from './routes/jobsRoutes.js'
import userRoute from './routes/userRoute.js'
import recruiterRoute from './routes/recruiterRoute.js'

import './config/cloudinary.js';
import testRoute from './routes/testRoute.js'
const app = express()

// cors setUp
app.use(
    cors({
        origin:[
            'http://localhost:5173','https://hire-flow-zeta.vercel.app',
                process.env.FRONTEND_DOMAIN
        ],
        credentials:true,
        methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
        allowedHeaders: ["Content-Type", "Authorization"],
    })
);

app.use(express.json());
app.use(cookieParser())

// checking  Route
app.get('/api/check',(req,res)=>{
    console.log("Server is Live")
    res.status(200).json({success:true,message:"server is live"})
})

app.use('/api/auth',authRoute)
app.use('/api/job',jobRoute)
app.use('/api/user',userRoute)
app.use('/api/recruiter',recruiterRoute)
app.use('/api/test',testRoute);

await connectDB();

const PORT = process.env.PORT || 5000;
app.listen(PORT,()=>{
    console.log(`server running on port ${PORT}`)
})