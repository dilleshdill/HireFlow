import express from 'express';
import { protectUser } from '../middleware/protectUser.js';
import { autoEvaluate, changeRound, exceuteCode, getAllAnswers, getTestDetails, getTime } from '../controllers/testController.js';

const testRoute = express.Router()

testRoute.post('/evaluate-test',protectUser,autoEvaluate);
testRoute.post('/get-time',protectUser,getTime);
testRoute.post('/get-allAnswers',protectUser,getAllAnswers);
testRoute.get('/change-round',protectUser,changeRound);
testRoute.post("/code-run",protectUser,exceuteCode)
testRoute.get('/test-details',protectUser , getTestDetails)

export default testRoute