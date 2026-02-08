import { ArrowRight } from "lucide-react";
import { FaRegDotCircle } from "react-icons/fa";
import React, { useEffect } from "react";
import { useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import useAntiCheat from "./useAntiCheating";

const DOMAIN = import.meta.env.VITE_DOMAIN

const OnlineTestExam = () => {
  const {id} = useParams()
  const jobId = id
  const [currentIndex, setCurrentIndex] = useState(0);
  const [question,setQuestion] = useState([])
  const [answers, setAnswers] = useState([]);
  const [review, setReview] = useState([]);
  const [loading,setLoading] = useState(false)
  const [showFinishModel,setFinishModel] = useState(false)
  const navigate = useNavigate()

  const [time, setTime] = useState(0);

  const hours = Math.floor(time / 3600);
  const minutes = Math.floor((time % 3600) / 60);
  const seconds = Math.floor(time % 60);

  const submitTest = (reason) => {
    toast.error("Max Tab Switches Are Occured",reason)
  };

  useAntiCheat({
    maxTabSwitch: 3,
    onCheat: submitTest,
  });

  const handleOptionChange = (e) => {
    setAnswers(prev => {
      const updated = [...prev];
      updated[currentIndex] = e.target.value;
      return updated;
    });
  };

  const getPrevious = async() => {
    try{
      const response = await axios.post(DOMAIN + "/api/job/update-answer",{
        jobId,
        roundType:question[currentIndex].roundType,
        questionId:question[currentIndex]._id,
        score:question[currentIndex].marks,
        selectedAnswer : answers[currentIndex] ?? "",
        markAsPreview : review[currentIndex] ?? "false" ,
        codeSubmission : "code"
      },{
        withCredentials:true
      })
      if(response.status === 200){
        if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
      localStorage.setItem("currentIndex",currentIndex -1 )
      
    }
      }
    }catch(err){
      console.log(err)
      toast.error(err.msg)
    }

  };

  const getNext = async () => {
    try{
      const response = await axios.post(DOMAIN + "/api/job/update-answer",{
        jobId,
        roundType:question[currentIndex].roundType,
        questionId:question[currentIndex]._id,
        score:question[currentIndex].marks,
        selectedAnswer : answers[currentIndex] ?? "",
        markAsPreview :  false ,
        codeSubmission : "code"
      },{
        withCredentials:true
      })
      if(response.status === 200){
        if (currentIndex < question.length - 1) {
          setCurrentIndex(currentIndex + 1);
          localStorage.setItem("currentIndex",currentIndex +1 )
    }
      }
    }catch(err){
      console.log(err)
      toast.error(err.msg)
    }

    
  };

  const getPreview = async () => {

    setReview(prev => {
      const updated = [...prev];
      updated[currentIndex] = true;
      return updated;
    });

    try{
      const response = await axios.post(DOMAIN + "/api/job/update-answer",{
        jobId,
        roundType:question[currentIndex].roundType,
        questionId:question[currentIndex]._id,
        score:question[currentIndex].marks,
        selectedAnswer : answers?.[currentIndex]  ?? " ",
        markAsPreview : answers[currentIndex]?.markAsPreview ?? "true" ,
        codeSubmission : "code"
      },{
        withCredentials:true
      })
      if(response.status === 200){
        if(currentIndex < question.length - 1){
            setCurrentIndex(currentIndex +1)
            localStorage.setItem("currentIndex",currentIndex +1 )
        }
      }
    }catch(err){
      console.log(err)
      toast.error(err.msg)
    }
  };

  const fetchTime = async() => {
    try{
    const response = await axios.post(DOMAIN + "/api/test/get-time",
      {
        jobId,
        roundType:question[0]?.roundType ?? "APTITUDE"
      },{
        withCredentials:true
      }
    )  
    if(response.status === 200){
      console.log(response.data)
      setTime(response.data.time)
    }
    }catch(err){
      console.log(err)
    }
  }

  const changeRound = async() => {
    try{
      const response = await axios.get(DOMAIN + `/api/test/change-round?jobId=${jobId}`,{
        withCredentials:true
      })
      if (response.status === 200){
        fetchData()
        setFinishModel(false)
      }
      if (response.status === 201){
        navigate("/feedback")
      }
    }catch(err){
      console.log(err.msg)
    }
  }

  const fetchData = async () => {
    setLoading(true)

    try {
      const response = await axios.get(DOMAIN + `/api/job/get-questions?jobId=${jobId}`,{
        withCredentials:true
      })
      if(response.status === 200){
        
        const questions = response.data.questions

        if (questions.length === 0 ){
          if (questions.roundType === "CODING"){
            navigate("/feedback")
          }
          else{
            changeRound()
          }
        }
        else{
          if (questions.roundType === "CODING"){
            navigate(`/job/test/coading-test/${jobId}`)
          }
        }
        setQuestion(questions)
        fetchTime()
        fetchAllAnswers(questions)
        setLoading(false)
      }
    } catch (err) {
      setLoading(false)
      console.log(err);
    }
  };

  const fetchAllAnswers = async(questions) => {
    if(!questions){
      toast.error("question not there ")
    }
    try{
      const response = await axios.post(DOMAIN + "/api/test/get-allAnswers",{
        jobId,
        roundType:question[0]?.roundType ?? "APTITUDE"
      },{
        withCredentials:true
      })

      if (response.status === 200){
        
          response.data.answers.forEach(eachItem => {
            const index = questions.findIndex(q => (
              eachItem.questionId === q._id
            ))
          
          setAnswers(prev => {
            const updated = [...prev];
            updated[index] = eachItem.selectedAnswer;
            return updated;
          });

          if(eachItem.markAsPreview) {
            setReview(prev => {
              const updated = [...prev];
              updated[index] = true;
              return updated;
            });
          }
        })

      }

    }catch(err){
      console.log(err)
      toast.error(err.msg)
    }
  }

  

  useEffect(() => {
    
    fetchData();
    
    const localIndex = localStorage.getItem("currentIndex")
    if (localIndex){
      setCurrentIndex(parseInt(localIndex))
    }
  },[]);

  useEffect(() => {

  if (time <= 0) fetchData();
  const intervalId = setInterval(() => {
    setTime(prev => prev - 1);
  }, 1000);
  return () => clearInterval(intervalId);
  }, [time]);

  const currentQuestion = question?.[currentIndex];

  return (
    <div className="flex flex-col lg:flex-row max-w-10xl ">
      <div className="flex flex-col w-full lg:w-11/12">
        <h1 className="text-xl font-semibold text-center bg-gray-200 p-5">
          Online Test - CAT Preparation
        </h1>

        <div className="flex flex-col p-10 gap-5 ">
          <div className="flex justify-between items-center-safe">
            <h1 className="text-2xl font-normal mt-5">
              Quant- Question {currentIndex + 1}
            </h1>
            <button className="text-white bg-cyan-800 px-7 py-2.5 rounded-lg" onClick={() => setFinishModel(true)}>
              Finish Test
            </button>
          </div>

          <div className="border border-b-0 border-gray-400"></div>
          {
            loading ? <h1>Loading .....</h1> :
            <div className="flex flex-col min-h-[70vh] justify-between">
            <div>
              <p className="text-xl font-normal text-gray-700">
                {currentQuestion?.questionText ?? ""}
              </p>

              <div className="space-y-5 mt-6">
                {currentQuestion?.options?.map((option, index) => (
                  <label
                    key={index}
                    className="flex items-center gap-4 cursor-pointer transition-all duration-200"
                  >
                    <input
                      type="radio"
                      name={`question-${currentIndex}`}
                      value={option}
                      checked={answers[currentIndex] === option}
                      onChange={handleOptionChange}
                      className="w-5 h-5 accent-blue-600"
                    />

                    <span
                      className={`text-lg transition-all duration-200 ${
                        answers[currentIndex] === option
                          ? "text-blue-600 font-semibold"
                          : "text-gray-700"
                      }`}
                    >
                      {option}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            <div className="pt-6 flex flex-col gap-5">
              <div className="flex justify-between items-center">
                <button
                  className="bg-purple-900 text-white px-5 py-2 rounded-3xl"
                  onClick={getPreview}
                >
                  Mark As Review
                </button>
                <div className="flex gap-4">
                  <button
                    className="bg-gray-400 px-5 py-2 rounded-3xl text-white"
                    onClick={getPrevious}
                  >
                    Previous
                  </button>
                  <button
                    className="flex items-center bg-cyan-600 px-5 py-2 rounded-3xl text-white"
                    onClick={getNext}
                  >
                    Next
                    <ArrowRight />
                  </button>
                </div>
              </div>
            </div>
          </div>
          }
        </div>
      </div>

      <div className="w-full lg:w-1/3 ">
        <h1 className="text-xl font-medium text-center bg-gray-300 p-5">
          Time Left
        </h1>

        <div className="flex items-center gap-8 justify-center mt-5">
          <div className="flex flex-col gap-2 items-center">
            <p className="text-3xl font-normal font-mono text-gray-500">
              {String(hours).padStart(2, "0")}
            </p>
            <p className="text-xl font-normal text-gray-400">hours</p>
          </div>
          <div className="flex flex-col gap-2 items-center">
            <p className="text-3xl font-normal font-mono text-gray-500">
              {String(minutes).padStart(2, "0")}
            </p>
            <p className="text-xl font-normal text-gray-400">minutes</p>
          </div>
          <div className="flex flex-col gap-2 items-center">
            <p className="text-3xl font-normal font-mono text-gray-500">
              {String(seconds).padStart(2, "0")}
            </p>
            <p className="text-xl font-normal text-gray-400">seconds</p>
          </div>
        </div>

        <h1 className="text-xl font-medium text-center bg-gray-300 p-5 mt-10">
          Quant
        </h1>

        <div className="cursor-pointer flex flex-wrap px-15 py-5 gap-3  justify-center">
          {
          question.map((eachQuestion, index) => {
            const isCurrent = index === currentIndex;
            const isAnswered = answers[index];
            const isReview = review[index] ;

            let bgColor = "bg-white text-gray-500 border-gray-400";

            if (isCurrent) {
              bgColor = "bg-blue-600 text-white border-blue-600";
            } else if (isReview) {
              bgColor = "bg-purple-600 text-white border-purple-600";
            } else if (isAnswered) {
              bgColor = "bg-green-600 text-white border-green-600";
            }

            return (
              <div
                key={index}
                className={`flex h-10 w-10 border items-center justify-center rounded-lg cursor-pointer ${bgColor}`}
                onClick={() => {
                  localStorage.setItem("currentIndex",index)
                  setCurrentIndex(index)
                }}
              >
                {index + 1}
              </div>
            );
          })}
        </div>
        <div className="flex justify-center">
          <div className="grid grid-cols-2 gap-5">
            <div className="flex items-center gap-1">
              <FaRegDotCircle
                className="text-gray-500 fill-gray-600"
                size={20}
              />
              <p className="text-gray-600 text-md">Not Seen</p>
            </div>
            <div className="flex items-center gap-1">
              <FaRegDotCircle
                className="text-green-500 fill-green-600"
                size={20}
              />
              <p className="text-gray-600 text-md">Attempted</p>
            </div>
            <div className="flex items-center gap-1">
              <FaRegDotCircle
                className="text-blue-500 fill-blue-600"
                size={20}
              />
              <p className="text-gray-600 text-md">current</p>
            </div>
            <div className="flex items-center gap-1">
              <FaRegDotCircle
                className="text-purple-500 fill-purple-600"
                size={20}
              />
              <p className="text-gray-600 text-md">Review</p>
            </div>
          </div>
        </div>
      </div>

      {
        showFinishModel && 
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 ">
          <div className="flex flex-col items-center bg-white shadow-md rounded-xl py-6 px-5 h-fit md:w-[460px] w-[370px] border border-gray-200">
            <div className="flex items-center justify-center p-4 bg-red-100 rounded-full">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M2.875 5.75h1.917m0 0h15.333m-15.333 0v13.417a1.917 1.917 0 0 0 1.916 1.916h9.584a1.917 1.917 0 0 0 1.916-1.916V5.75m-10.541 0V3.833a1.917 1.917 0 0 1 1.916-1.916h3.834a1.917 1.917 0 0 1 1.916 1.916V5.75m-5.75 4.792v5.75m3.834-5.75v5.75" stroke="#DC2626" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
            </div>
            <h2 className="text-gray-900 font-semibold mt-4 text-xl">Are you sure?</h2>
            <p className="text-sm text-gray-600 mt-2 text-center">
                Do you really want to continue? This action<br />cannot be undone.
            </p>
            <div className="flex items-center justify-center gap-4 mt-5 w-full">
                <button type="button" className="w-full md:w-36 h-10 rounded-md border border-gray-300 bg-white text-gray-600 font-medium text-sm hover:bg-gray-100 active:scale-95 transition" 
                onClick={() => setFinishModel(false)}>
                    Cancel
                </button>
                <button type="button" className="w-full md:w-36 h-10 rounded-md text-white bg-red-600 font-medium text-sm hover:bg-red-700 active:scale-95 transition" 
                onClick={changeRound}>
                    Confirm
                </button>
            </div>
        </div>
        </div>
      }
    </div>
  );
};

export default OnlineTestExam;
