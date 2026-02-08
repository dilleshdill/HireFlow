import express from 'express';
import { protectUser } from '../middleware/protectUser.js';
import { autoEvaluate, getAllAnswers, getTime } from '../controllers/testController.js';

const testRoute = express.Router()

testRoute.post('/evaluate-test',protectUser,autoEvaluate);
testRoute.post('/get-time',protectUser,getTime);
testRoute.post('/get-allAnswers',protectUser,getAllAnswers);

export default testRoute