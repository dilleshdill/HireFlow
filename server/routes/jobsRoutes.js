import express from 'express'
import { protectUser } from '../middleware/protectUser.js'
import { deletejob, getAllJobs, getJobById, getMyJobs, postJob, toggleJob } from '../controllers/jobsController.js';
import { applyJob, getAppliedJobs } from '../controllers/applicationController.js';
import { addToFavorite, removeFavorite, savedJobs } from '../controllers/favoriteController.js';


const jobRoute = express.Router()
jobRoute.post('/post-job',protectUser,postJob)
jobRoute.get('/my-jobs',protectUser,getMyJobs)
// jobRoute.put('/update/:id',protectUser,updateJob)
jobRoute.delete('/delete/:id',protectUser,deletejob)
jobRoute.patch('/toggle',protectUser,toggleJob)
jobRoute.get('/all-jobs',getAllJobs)

jobRoute.post('/apply',protectUser,applyJob)
jobRoute.get('/applied-jobs',protectUser,getAppliedJobs)

jobRoute.post('/addto-favorite',protectUser,addToFavorite)
jobRoute.post('/remove-favorite',protectUser,removeFavorite)
jobRoute.get('/get-favorite',protectUser,savedJobs)

jobRoute.get('/:id',getJobById)

export default jobRoute;