import express from 'express'
import { protectUser } from '../middleware/protectUser.js'
import { deletejob, getAllJobs, getCandidatesByJobId, getComapanies, getCompanyJobs, getJobById, getMyJobs, postJob, toggleJob,getJobQuestions,updateAnswer, addToTestSchema, recommendedList } from '../controllers/jobsController.js';
import { applyJob, getAppliedJobs } from '../controllers/applicationController.js';
import { addToFavorite, removeFavorite, savedJobs } from '../controllers/favoriteController.js';


const jobRoute = express.Router()
jobRoute.post('/post-job',postJob)
jobRoute.get('/my-jobs',protectUser,getMyJobs)
// jobRoute.put('/update/:id',protectUser,updateJob)
jobRoute.delete('/delete/:id',protectUser,deletejob)
jobRoute.patch('/toggle',protectUser,toggleJob)
jobRoute.get('/all-jobs',getAllJobs)
jobRoute.get('/get-companies',getComapanies);
jobRoute.get('/company-jobs/:id',getCompanyJobs)
jobRoute.get('/get-candidates/:id',protectUser,getCandidatesByJobId)
jobRoute.get("/get-questions",protectUser,getJobQuestions)
jobRoute.post("/update-answer",protectUser,updateAnswer)
jobRoute.post("/create-test",protectUser,addToTestSchema)
jobRoute.post("/recommended-list",protectUser,recommendedList)


jobRoute.post('/apply',protectUser,applyJob)
jobRoute.get('/applied-jobs',protectUser,getAppliedJobs)

jobRoute.post('/addto-favorite',protectUser,addToFavorite)
jobRoute.post('/remove-favorite',protectUser,removeFavorite)
jobRoute.get('/get-favorite',protectUser,savedJobs)


jobRoute.get('/job-detailes',getJobById)

export default jobRoute;