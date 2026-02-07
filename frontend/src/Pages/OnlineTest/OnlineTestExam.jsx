import { ArrowRight } from "lucide-react";
import { FaRegDotCircle } from "react-icons/fa";
import React, { useEffect } from "react";
import { useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";
const questions = [
  {
    question: "1. What is 15% of 200?",
    options: ["20", "25", "30", "35"],
    correctAnswer: "30",
    markReview: false,
  },
  {
    question: "2. If 5x = 45, what is x?",
    options: ["5", "9", "10", "8"],
    correctAnswer: "9",
    markReview: false,
  },
  {
    question: "3. What is the square root of 144?",
    options: ["10", "11", "12", "14"],
    correctAnswer: "12",
    markReview: false,
  },
  {
    question: "4. A train travels 60 km in 1 hour. What is its speed?",
    options: ["50 km/h", "60 km/h", "70 km/h", "80 km/h"],
    correctAnswer: "60 km/h",
    markReview: false,
  },
  {
    question: "5. What is 25% of 80?",
    options: ["10", "15", "20", "25"],
    correctAnswer: "20",
    markReview: false,
  },
  {
    question: "6. If a = 5 and b = 3, what is a² + b²?",
    options: ["25", "34", "30", "28"],
    correctAnswer: "34",
    markReview: false,
  },
  {
    question: "7. What is the next number in series: 2, 4, 8, 16, ?",
    options: ["18", "24", "32", "30"],
    correctAnswer: "32",
    markReview: false,
  },
  {
    question:
      "8. If 10 workers complete a job in 5 days, how many days will 5 workers take?",
    options: ["5", "10", "15", "20"],
    correctAnswer: "10",
    markReview: false,
  },
  {
    question: "9. What is 7 × 8?",
    options: ["54", "56", "58", "60"],
    correctAnswer: "56",
    markReview: false,
  },
  {
    question: "10. What is 100 ÷ 4?",
    options: ["20", "25", "30", "40"],
    correctAnswer: "25",
  },
  {
    question: "11. What is 18% of 50?",
    options: ["7", "8", "9", "10"],
    correctAnswer: "9",
  },
  {
    question:
      "12. If the ratio of boys to girls is 3:2 and total is 25, how many boys?",
    options: ["10", "12", "15", "18"],
    correctAnswer: "15",
  },
  {
    question: "13. What is the cube of 3?",
    options: ["6", "9", "27", "18"],
    correctAnswer: "27",
  },
  {
    question: "14. What is 45 + 55?",
    options: ["90", "95", "100", "110"],
    correctAnswer: "100",
  },
  {
    question: "15. If a car travels 150 km in 3 hours, what is speed?",
    options: ["40 km/h", "50 km/h", "60 km/h", "70 km/h"],
    correctAnswer: "50 km/h",
  },
  {
    question: "16. What is 9²?",
    options: ["72", "81", "90", "99"],
    correctAnswer: "81",
  },
  {
    question: "17. What is 5! (5 factorial)?",
    options: ["60", "100", "120", "150"],
    correctAnswer: "120",
  },
  {
    question: "18. What is the simple interest on ₹1000 at 10% for 1 year?",
    options: ["₹50", "₹100", "₹150", "₹200"],
    correctAnswer: "₹100",
  },
  {
    question: "19. What is 0.5 × 0.2?",
    options: ["0.1", "0.2", "0.3", "0.4"],
    correctAnswer: "0.1",
  },
  {
    question: "20. If 3x + 2 = 11, what is x?",
    options: ["2", "3", "4", "5"],
    correctAnswer: "3",
  },
];

const OnlineTestExam = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [review, setReview] = useState({});
  const currentQuestion = questions[currentIndex];
  const [time, setTime] = useState(3590);

  const hours = Math.floor(time / 3600);
  const minutes = Math.floor((time % 3600) / 60);
  const seconds = Math.floor(time % 60);

  const handleOptionChange = (e) => {
    setAnswers({
      ...answers,
      [currentIndex]: e.target.value,
    });
  };

  const getPrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const getNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const getPreview = () => {
    questions[currentIndex].markReview = true;
  };

  const fetchData = async () => {
    try {
      // console.log("enter into this ")
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchData();
  });

  return (
    <div className="flex flex-col lg:flex-row max-w-10xl ">
      <div className="flex flex-col w-full lg:w-11/12">
        <h1 className="text-xl font-semibold text-center bg-gray-200 p-5">
          Online Test - CAT Preparation
        </h1>

        <div className="flex flex-col p-10 gap-5 ">
          <h1 className="text-2xl font-normal mt-5">
            Quant- Question {currentIndex + 1}
          </h1>

          <div className="border border-b-0 border-gray-400"></div>
          <div className="flex flex-col min-h-[70vh] justify-between">
            <div>
              <p className="text-xl font-normal text-gray-700">
                {currentQuestion.question}
              </p>

              <div className="space-y-5 mt-6">
                {currentQuestion.options.map((option, index) => (
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
          {questions.map((eachQuestion, index) => {
            const isCurrent = index === currentIndex;
            const isAnswered = answers[index];
            const isReview = eachQuestion.markReview;

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
                onClick={() => setCurrentIndex(index)}
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
    </div>
  );
};

export default OnlineTestExam;
