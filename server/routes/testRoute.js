import express from 'express';
import { protectUser } from '../middleware/protectUser.js';
import { autoEvaluate, getTime } from '../controllers/testController.js';

const testRoute = express.Router()

testRoute.post('/evaluate-test',protectUser,autoEvaluate);
testRoute.get('/get-time',protectUser,getTime);

export default testRoute