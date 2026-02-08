import Job from "../model/job.js";
import Questions from "../model/questionsSchema.js";
import TestAttempt from "../model/testAttemptSchema.js";



// auto evaluate the score
export const autoEvaluate = async (req , res) => {
    try {
        const {jobId,roundType} = req.body;
        const userId = req.user.id;

        const test = await TestAttempt.findOne({jobId,userId,roundType})

        const questions = await Questions.find({jobId,roundType})

        const job = await Job.findById({_id:jobId})

        let totalScore = 0;

        const evaluatedAnswers = test.answers.map(answer => {
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


        test.answers = evaluatedAnswers;
        test.status = "EVALUATED";
        test.submittedAt = new Date();
        test.totalScore = totalScore;
        test.isPassed = totalScore >= job.qualifyingScore;

        await test.save()

        return res.status(200).json({testDetails:updateTest , message:"Evalution Done"})
    } catch (error) {
        return res.status(500).json({message:error.message})
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

        const test = await TestAttempt.findOne({jobId,userId,roundType})
        if(!test){
            return res.status(400).json({message:"no test details found"})
        }

        const difference = Date.now() - new Date(test.startedAt).getTime();

        return res.status(200).json({time:difference , message:"time fetched successfully"})

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
        const test = await TestAttempt.findOne({jobId,userId,roundType})

        if(!test){
            return res.status(400).json({message:"no test is found"})
        }

        return res.status(200).json({answers:test.answers , message:"answers fetched"})
    } catch (error) {
        return res.status(500).json({message:error.message})   
    }
}