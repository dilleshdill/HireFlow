import express from 'express'
import { protectUser } from '../middleware/protectUser.js'
import { postJob } from '../controllers/jobsController.js';


const jobRoute = express.Router()
jobRoute.post('/post-job',protectUser,postJob)

export default jobRoute;