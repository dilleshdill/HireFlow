import express from 'express';
import { protectUser } from '../middleware/protectUser.js';
import { autoEvaluate, changeRound, submitCodingAnswer, exceuteCode, getAllAnswers, getTestDetails, getTime, getAllTestsHistory, getTestById, getChatAi } from '../controllers/testController.js';

const testRoute = express.Router()

testRoute.post('/evaluate-test',protectUser,autoEvaluate);
testRoute.post('/get-time',protectUser,getTime);
testRoute.post('/get-allAnswers',protectUser,getAllAnswers);
testRoute.get('/change-round',protectUser,changeRound);
testRoute.post("/code-run",protectUser,exceuteCode);
testRoute.get('/test-details',protectUser , getTestDetails);
testRoute.post('/run-alltestcases',protectUser,submitCodingAnswer);
testRoute.get("/get-rounds",protectUser,getTestDetails);
testRoute.get("/get-history",protectUser,getAllTestsHistory);
testRoute.get("get-testbyid",protectUser,getTestById);
testRoute.post("/send-message",getChatAi)

export default testRoute    