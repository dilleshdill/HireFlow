import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import dotenv from 'dotenv'
import authRoute from './routes/authRoute.js'
import { connectDB } from './config/db.js'

dotenv.config()
const app = express()

// cors setUp
app.use(
    cors({
        origin:[
            'http://localhost:5173',
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

await connectDB();

const PORT = process.env.PORT || 5000;
app.listen(PORT,()=>{
    console.log(`server running on port ${PORT}`)
})