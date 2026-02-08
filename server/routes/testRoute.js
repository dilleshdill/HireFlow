import express from 'express';
import { protectUser } from '../middleware/protectUser.js';
import { autoEvaluate, changeRound, getAllAnswers, getTime } from '../controllers/testController.js';

const testRoute = express.Router()

testRoute.post('/evaluate-test',protectUser,autoEvaluate);
testRoute.post('/get-time',protectUser,getTime);
testRoute.post('/get-allAnswers',protectUser,getAllAnswers);
testRoute.get('/change-round',protectUser,changeRound)

export default testRoute