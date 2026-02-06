import express from 'express'
import { protectUser } from '../middleware/protectUser.js'
import { applyJob } from '../controllers/applicationController.js'

const applicationRoute = express.Router()

applicationRoute.post('/apply',protectUser,applyJob)

export default applicationRoute;