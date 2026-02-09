import Job from "../model/job.js";
import Questions from "../model/questionsSchema.js";
import TestAttempt from "../model/testAttemptSchema.js";
import { runCode } from "../services/codeRunner.service.js";

// auto evaluate the score
export const autoEvaluate = async (req , res) => {
    try {
        const {jobId,roundType} = req.body;
        const userId = req.user.id;

        const test = await TestAttempt.findOne({jobId,userId})

        const questions = await Questions.find({jobId,roundType})

        const job = await Job.findById({_id:jobId})

        let totalScore = 0;

        if(roundType === 'APTITUDE'){
            const evaluatedAnswers = test.aptitudeAnswers.map(answer => {
                const question = questions.find(
                    q => q._id.toString() === answer.questionId.toString()
                );

                let score = 0

                if(question && question.correctAnswer === answer.selectedAnswer){
                    score = question.marks
                    totalScore += score
                }

                return{
                    questionId:answer.questionId,
                    selectedAnswer:answer.selectedAnswer,
                    score
                }
            });


            test.aptitudeAnswers = evaluatedAnswers;
            test.status = "EVALUATED";
            test.submittedAt = new Date();
            test.totalScore = totalScore;
            test.isPassed = totalScore >= job.qualifyingScore;

            await test.save()
            return res.status(200).json({testDetails: evaluatedAnswers, message:"Evalution Done"})

        }
        else if(roundType === 'CORE'){
            const evaluatedAnswers = test.coreAnswers.map(answer => {
                const question = questions.find(
                    q => q._id.toString() === answer.questionId.toString()
                );

                let score = 0

                if(question && question.correctAnswer === answer.selectedAnswer){
                    score = question.marks
                    totalScore += score
                }

                return{
                    questionId:answer.questionId,
                    selectedAnswer:answer.selectedAnswer,
                    score
                }
            });


            test.coreAnswers = evaluatedAnswers;
            test.status = "EVALUATED";
            test.submittedAt = new Date();
            test.totalScore = totalScore;
            test.isPassed = totalScore >= job.qualifyingScore;

            await test.save()
            return res.status(200).json({testDetails: evaluatedAnswers, message:"Evalution Done"})

        }
        else{
            const evaluatedAnswers = test.codingAnswers.map(answer => {
                const question = questions.find(
                    q => q._id.toString() === answer.questionId.toString()
                );

                let score = 0

                if(question && question.correctAnswer === answer.selectedAnswer){
                    score = question.marks
                    totalScore += score
                }

                return{
                    questionId:answer.questionId,
                    selectedAnswer:answer.selectedAnswer,
                    score
                }
            });


            test.codingAnswers = evaluatedAnswers;
            test.status = "EVALUATED";
            test.submittedAt = new Date();
            test.totalScore = totalScore;
            test.isPassed = totalScore >= job.qualifyingScore;

            await test.save()
            return res.status(200).json({testDetails: evaluatedAnswers, message:"Evalution Done"})

        }

        
    } catch (error) {
        return res.status(500).json({message:error.message})
    }
}

// for evalution round by round
const evaluateRound = async (jobId,roundType , userId) => {
    try {

        const test = await TestAttempt.findOne({jobId,userId})

        const questions = await Questions.find({jobId,roundType})

        const job = await Job.findById({_id:jobId})

        let totalScore = 0;

        if(roundType === 'APTITUDE'){
            const evaluatedAnswers = test.aptitudeAnswers.map(answer => {
                const question = questions.find(
                    q => q._id.toString() === answer.questionId.toString()
                );

                let score = 0

                if(question && question.correctAnswer === answer.selectedAnswer){
                    score = question.marks
                    totalScore += score
                }

                return{
                    questionId:answer.questionId,
                    selectedAnswer:answer.selectedAnswer,
                    score
                }
            });


            test.aptitudeAnswers = evaluatedAnswers;
            test.status = "EVALUATED";
            test.submittedAt = new Date();
            test.totalScore += totalScore;
            test.isPassed = totalScore >= job.qualifyingScore;

            await test.save()
            

        }
        else if(roundType === 'CORE'){
            const evaluatedAnswers = test.coreAnswers.map(answer => {
                const question = questions.find(
                    q => q._id.toString() === answer.questionId.toString()
                );

                let score = 0

                if(question && question.correctAnswer === answer.selectedAnswer){
                    score = question.marks
                    totalScore += score
                }

                return{
                    questionId:answer.questionId,
                    selectedAnswer:answer.selectedAnswer,
                    score
                }
            });


            test.coreAnswers = evaluatedAnswers;
            test.status = "EVALUATED";
            test.submittedAt = new Date();
            test.totalScore += totalScore;
            test.isPassed = totalScore >= job.qualifyingScore;

            await test.save()
            

        }
        else{
            const evaluatedAnswers = test.codingAnswers.map(answer => {
                const question = questions.find(
                    q => q._id.toString() === answer.questionId.toString()
                );

                let score = 0

                if(question && question.correctAnswer === answer.selectedAnswer){
                    score = question.marks
                    totalScore += score
                }

                return{
                    questionId:answer.questionId,
                    selectedAnswer:answer.selectedAnswer,
                    score
                }
            });


            test.codingAnswers = evaluatedAnswers;
            test.status = "EVALUATED";
            test.submittedAt = new Date();
            test.totalScore += totalScore;
            test.isPassed = totalScore >= job.qualifyingScore;

            await test.save()
            

        }
    } catch (error) {
        console.log(error.message)
    }
}

// show time for the respective round
export const getTime = async (req , res) => {
    
    try {
        const {jobId,roundType} = req.body;
        const userId = req.user.id;

        if (!jobId || !roundType){
            return res.status(400).json({message:"missing fields"})
        }

        let remainingSeconds;

        const roundTimeMap = {
            APTITUDE: "aptitudeTime",
            CORE: "coreTime",
            CODING: "codingTime",
        };

        const curRoundTime = roundTimeMap[roundType];

        const test = await TestAttempt.findOne({jobId,userId}).populate("jobId",curRoundTime)

        if(!test){
            return res.status(400).json({message:"no test details found"})
        }

        const difference = Date.now() - test.startTime.getTime();

        const elapsedSeconds = Math.floor(difference / 1000);

        const totalSeconds = test.jobId[curRoundTime] * 60;

        remainingSeconds = totalSeconds - elapsedSeconds;
        

        if(remainingSeconds <= 0){ 
            
            if(roundType !== 'CODING'){
                await evaluateRound(jobId , roundType , userId)
            }
            
    
            if(roundType === 'APTITUDE'){
                test.roundType = 'CORE'
                test.currentRound = 'CORE'
                test.startTime = Date.now()
                
            }
            else if(roundType === 'CORE'){
                test.roundType = 'CODING'
                test.currentRound = 'CODING'
                test.startTime = Date.now()
            }
            else{
                test.status = 'SUBMITTED'
                test.startTime = Date.now()
                return res.status(201).json({message:"test completed"})
            }
            await test.save()
        }

        console.log("time",remainingSeconds)

        return res.status(200).json({time:remainingSeconds , message:"time fetched successfully"})

    } catch (error) {
        return res.status(500).json({message:error.message})
    }
}

// get all the answers for the respective job test
export const getAllAnswers = async (req , res) => {
    try {
        const {jobId,roundType} = req.body;
        const userId = req.user.id;

        if (!jobId){
            return res.status(400).json({message:"job id is missing"})
        }
        const test = await TestAttempt.findOne({jobId,userId})

        if(!test){
            return res.status(400).json({message:"no test is found"})
        }

        if(roundType === 'APTITUDE'){
            return res.status(200).json({answers:test.aptitudeAnswers , message:"answers fetched"})
        }
        else if(roundType === 'CORE'){
            return res.status(200).json({answers:test.coreAnswers , message:"answers fetched"})
        }
        else{
            return res.status(200).json({answers:test.codingAnswers , message:"answers fetched"})
        }

        
    } catch (error) {
        return res.status(500).json({message:error.message})   
    }
}

//change round
export const changeRound = async (req , res) => {

    try {
        const {jobId} = req.query;
        const userId = req.user.id;

        if(!jobId){
            return res.status(400).json({message:"fissing jobId"})
        }

        const test = await TestAttempt.findOne({jobId,userId})
        if(!test){
            return res.status(400).json({message:"no test is found"})
        }

        await evaluateRound(jobId , test.roundType , userId)

        if(test.roundType === 'APTITUDE'){
            
            test.roundType = 'CORE';
            test.currentRound = 'CORE';
            test.startTime = Date.now()
        }
        else if(test.roundType === 'CORE'){
            test.roundType = 'CODING';
            test.currentRound = 'CODING'
            test.startTime = Date.now()
        }
        else{
            test.status = 'SUBMITTED'
            test.startTime = Date.now()
            await test.save()
            return res.status(201).json({message:"test completed"})
        }

        await test.save()
        return res.status(200).json({round:test.roundType , message:"switch to next round"})
    } catch (error) {
        return res.status(500).json({message:error.message})
    }
}




export const exceuteCode = async(req,res) => {
    try {
    const { language, code, input } = req.body;
    console.log("language",language)
    console.log("code",code)
    console.log("input",input)
    
    if (!language || !code) {
      return res.status(400).json({ message: "language and code are required" });
    }

    const result = await runCode(language, code, input || "");
    console.log(result)
    res.status(200).json({ message: result });

  } catch (err) {
    res.status(400).json({ message: err.toString() });
  }
}








