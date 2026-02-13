import React, { useEffect, useState, useCallback } from "react";
import hireflow from "../../assets/hireflow.jpg";
import { PiTimerBold } from "react-icons/pi";
import Pagination from "@mui/material/Pagination";
import { GoDotFill } from "react-icons/go";
import { FaChevronLeft, FaChevronRight, FaChevronUp, FaChevronDown } from "react-icons/fa";
import Editor from "@monaco-editor/react";
import { MoonIcon, Play, Sun } from "lucide-react";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";

const DOMAIN = import.meta.env.VITE_DOMAIN;

const languages = [
  { id: 1, name: "Python", value: "python" },
  { id: 2, name: "Java", value: "java" },
  { id: 3, name: "C++", value: "cpp" },
  { id: 4, name: "JavaScript", value: "javascript" },
  { id: 5, name: "C", value: "c" },
];

const Constraints = [
  "1 <= N <= 10^5",
  "-10^9 <= arr[i] <= 10^9",
  "-10^14 <= K <= 10^14",
];

const OnlineCodingTest = () => {
  const [time, setTime] = useState(3590);
  const [selectedLanguage, setSelectedLanguage] = useState("javascript");
  const [code, setCode] = useState("// Write your code here");
  const [codeMap, setCodeMap] = useState({});
  const [theme, setTheme] = useState("light");
  const [result, setResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showOutput, setShowOutput] = useState(false);
  const [showFinishModel, setFinishModel] = useState(false);
  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [testCases, setTestCases] = useState([]);
  const [currentTestCaseIndex, setCurrentTestCaseIndex] = useState(0);
  const [length, setLength] = useState(1);
  const [editorHeight, setEditorHeight] = useState("100%");
  const [showSubmittedOutput,setSubmittedOutput] = useState(false)
  const [showErrorOutput,setErrorOutput] = useState(false)
 

  const navigate = useNavigate();
  const { id } = useParams();
  const jobId = id;

  const handleEditorWillMount = useCallback((monaco) => {
    monaco.editor.defineTheme("hireflowTheme", {
      base: "vs-dark",
      inherit: true,
      rules: [
        { token: "keyword", foreground: "FF7B72" },
        { token: "string", foreground: "A5D6FF" },
        { token: "number", foreground: "79C0FF" },
        { token: "comment", foreground: "8B949E", fontStyle: "italic" },
        { token: "identifier", foreground: "D2A8FF" },
        { token: "type.identifier", foreground: "FFA657" },
      ],
      colors: {
        "editor.background": "#0D1117",
        "editorLineNumber.foreground": "#6E7681",
        "editorCursor.foreground": "#FFFFFF",
        "editorIndentGuide.background": "#30363D",
      },
    });
  }, []);

  const getRunCode = async () => {
    setLoading(true);
    try {
      const response = await axios.post(
        DOMAIN + "/api/test/code-run",
        {
          code,
          input: testCases[currentTestCaseIndex]?.input || "",
          language: selectedLanguage,
        },
        {
          withCredentials: true,
        },
      );

      if (response.status === 200) {
        setResult((prev) => {
          const newData = [...prev];
          newData[currentTestCaseIndex] = response.data.message;
          return newData;
        });
        // Auto show output when code runs
        setShowOutput(true);
      }
    } catch (err) {
      console.log(err);
      setResult((prev) => {
        const newData = [...prev];
        newData[currentTestCaseIndex] = "Error running code";
        return newData;
      });
      setShowOutput(true);
    } finally {
      setLoading(false);
    }
  };

  const fetchData = async () => {
    try {
      const response = await axios.get(
        DOMAIN + `/api/job/get-questions?jobId=${jobId}`,
        {
          withCredentials: true,
        },
      );
      if (response.status === 200) {
        console.log(response.data)
        const fetchedQuestions = response.data.questions || [];
        setQuestions(fetchedQuestions);
        setLength(fetchedQuestions.length);
        
        const storedIndex = parseInt(sessionStorage.getItem("currentCodingIndex") || "0");
        const validIndex = Math.min(storedIndex, fetchedQuestions.length - 1);
        setCurrentIndex(validIndex);
        
        if (fetchedQuestions[validIndex]?.testCases) {
          setTestCases(fetchedQuestions[validIndex].testCases);
        }
      }
    } catch (err) {
      toast.error("Something went wrong");
      console.error(err);
    }
  };

  const getSubmit = async() => {
    try{
      const response = await axios.post(DOMAIN + '/api/test/run-alltestcases',{
        jobId,
      code,
      questionId:questions[currentIndex]?._id,
      language: selectedLanguage,

    },{
      withCredentials:true
    })
    if (response.status === 200){
      if(response.data.score === response.data.codingTotal){
        setSubmittedOutput(true)
      }
      else{
        setErrorOutput(true)
      }
    }
    }catch(err){

      console.log(err)
    }
  }

  const fetchTime = async () => {
    try {
      const response = await axios.post(
        DOMAIN + `/api/test/get-time`,
        {
          jobId,
          roundType: "Coding",
        },
        {
          withCredentials: true,
        },
      );
      if (response.status === 200 && response.data.time) {
        setTime(response.data.time);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchData();
    fetchTime();
    
    const intervalId = setInterval(() => {
      setTime((prevTime) => {
        if (prevTime <= 1) {
          getSubmit()
          clearInterval(intervalId);
          ;
        }
        return prevTime - 1;
      });
    }, 1000);
    
    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    const savedCode = sessionStorage.getItem(`code_${currentIndex}_${selectedLanguage}`);
    
    if (savedCode !== null) {
      setCode(savedCode);
    } else {
      const defaultCode = codeMap[`${currentIndex}_${selectedLanguage}`] || 
                         `// Write your ${selectedLanguage} code here\n// Question ${currentIndex + 1}`;
      setCode(defaultCode);
    }
    
    setCurrentTestCaseIndex(0);
    
    if (questions[currentIndex]?.testCases) {
      setTestCases(questions[currentIndex].testCases);
    }
  }, [selectedLanguage, currentIndex, questions]);

  useEffect(() => {
    if (code && currentIndex !== undefined) {
      sessionStorage.setItem(`code_${currentIndex}_${selectedLanguage}`, code);
      setCodeMap(prev => ({
        ...prev,
        [`${currentIndex}_${selectedLanguage}`]: code
      }));
    }
  }, [code, currentIndex, selectedLanguage]);

  useEffect(() => {
    setEditorHeight(showOutput ? "60%" : "100%");
  }, [showOutput]);

  const handlePrevious = () => {
    if (currentIndex > 0) {
      const newIndex = currentIndex - 1;
      setCurrentIndex(newIndex);
      sessionStorage.setItem("currentCodingIndex", newIndex.toString());
    }
  };

  const handleNext = () => {
    if (currentIndex < length - 1) {
      const newIndex = currentIndex + 1;
      setCurrentIndex(newIndex);
      sessionStorage.setItem("currentCodingIndex", newIndex.toString());
    }
  };

  const handlePageChange = (event, value) => {
    const newIndex = value - 1;
    setCurrentIndex(newIndex);
    setCurrentTestCaseIndex(0);
    sessionStorage.setItem("currentCodingIndex", newIndex.toString());
  };

  const currentQuestion = questions[currentIndex] || {};
  const currentTestCase = testCases[currentTestCaseIndex] || {};

  const hours = Math.floor(time / 3600);
  const minutes = Math.floor((time % 3600) / 60);
  const seconds = time % 60;

  return (
    <div className="h-screen flex flex-col px-2 py-2 gap-5 bg-slate-50 overflow-hidden">
      <div className="flex flex-col bg-white shadow-xl px-4 rounded-lg">
        <div className="flex justify-between items-center">
          <img src={hireflow} className="h-20 w-20" alt="Hireflow Logo" />
          <h1 className="text-gray-700 font-medium text-xl">
            Deloitte National Test Assessment
          </h1>
          <div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1">
                <PiTimerBold size={20} className="text-gray-600" />
                <h1 className="text-lg text-gray-700 font-medium">
                  {hours > 0 && `${hours}:`}
                  {minutes.toString().padStart(2, '0')}:
                  {seconds.toString().padStart(2, '0')}
                </h1>
              </div>
              <button
                className="flex px-5 py-2 bg-indigo-700 text-white rounded-sm hover:bg-indigo-800 transition-colors"
                onClick={() => setFinishModel(true)}
              >
                Finish Test
              </button>
            </div>
          </div>
        </div>
        <div className="flex justify-between items-center py-3">
          <h1 className="text-gray-800 text-md">
            Question {currentIndex + 1} of {length}
          </h1>
          <div className="flex">
            <Pagination
              count={length}
              shape="rounded"
              page={currentIndex + 1}
              onChange={handlePageChange}
              color="primary"
            />
          </div>
          <div className="flex gap-3">
            <div className="flex flex-col items-center">
              <h1 className="text-lg">2</h1>
              <h1 className="flex items-center text-gray-600 text-sm">
                <GoDotFill className="text-green-400" /> Answered
              </h1>
            </div>
            <div className="flex flex-col items-center">
              <h1 className="text-lg">2</h1>
              <h1 className="flex items-center text-gray-600 text-sm">
                <GoDotFill className="text-yellow-400" />
                Not Answered
              </h1>
            </div>
          </div>
        </div>
      </div>
      
      <div className="flex flex-row gap-3 flex-1 overflow-hidden">
        {/* Left Panel - Question */}
        <div className="flex flex-col bg-white shadow-2xl w-full p-5 gap-3 rounded-lg overflow-y-auto">
          <h1 className="text-xl font-semibold">Question {currentIndex + 1}</h1>
          <hr />
          <p className="text-gray-700 whitespace-pre-line">
            {currentQuestion?.questionText || "Loading question..."}
          </p>
          
          {currentTestCase && (
            <>
              <h1 className="text-gray-900 font-sans mt-4">Sample Input:</h1>
              <div className="bg-gray-100 w-full h-fit px-5 py-3 whitespace-pre-line font-mono text-sm">
                {currentTestCase.input || "No input provided"}
              </div>
              
              <h1 className="text-gray-900 font-sans mt-4">Sample Output:</h1>
              <div className="bg-gray-100 w-full h-fit px-5 py-3 whitespace-pre-line font-mono text-sm">
                {currentTestCase.expectedOutput || "No output provided"}
              </div>

              <h1 className="text-gray-900 font-sans mt-4">Constraints:</h1>
              <div>
            {Constraints?.map((eachItem) => (
              <h1 className="bg-gray-100 w-full h-fit px-5 py-3 whitespace-pre-line font-mono text-sm">{eachItem}</h1>
            ))}
          </div>
               
            </>
          )}
          
          <div className="flex justify-end gap-5 mt-auto pt-4">
            <button
              className="flex items-center border border-gray-400 px-4 py-2 rounded hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              onClick={handlePrevious}
              disabled={currentIndex === 0}
            >
              <FaChevronLeft size={15} />
              <h1>Previous</h1>
            </button>
            <button
              className="flex items-center border border-gray-400 px-6 py-2 rounded hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              onClick={handleNext}
              disabled={currentIndex === length - 1}
            >
              <h1>Next</h1>
              <FaChevronRight size={15} />
            </button>
          </div>
        </div>
        
        {/* Right Panel - Code Editor */}
        <div className="flex flex-col bg-white shadow-2xl w-full p-5 gap-3 rounded-lg overflow-hidden">
          <div className="flex flex-row gap-5 justify-between items-center">
            <div className="flex gap-3 items-center">
              <h1 className="text-gray-600 font-medium text-md">Code Editor</h1>
              <select
                value={selectedLanguage}
                onChange={(e) => setSelectedLanguage(e.target.value)}
                className="border border-gray-400 px-3 py-1 rounded bg-white"
              >
                {languages.map((lang) => (
                  <option key={lang.id} value={lang.value}>
                    {lang.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex items-center gap-3">
              {theme === "light" ? (
                <MoonIcon
                  className="text-gray-500 cursor-pointer hover:text-gray-700"
                  onClick={() => setTheme("dark")}
                  size={20}
                />
              ) : (
                <Sun
                  className="text-gray-500 cursor-pointer hover:text-gray-700"
                  onClick={() => setTheme("light")}
                  size={20}
                />
              )}
              <button
                className="flex items-center gap-1 border border-green-600 text-green-600 px-3 py-2 rounded hover:border-green-700 hover:text-green-700 disabled:opacity-50 disabled:cursor-not-allowed"
                onClick={getRunCode}
                disabled={loading}
              >
                <Play size={15} className={loading ? "animate-pulse" : ""} />
                {loading ? "Running..." : "Run Code"}
              </button>
              <button className="bg-green-600 text-white px-3 py-2 rounded hover:bg-green-700" onClick={getSubmit}>
                Submit Code
              </button>
            </div>
          </div>
          <hr />
          
          <div className="flex flex-col flex-1 overflow-hidden border border-gray-300 rounded-md">
            {/* Editor with dynamic height */}
            <div style={{ height: editorHeight, transition: "height 0.3s ease" }}>
              <Editor
                language={selectedLanguage}
                theme={theme === "dark" ? "hireflowTheme" : "vs-light"}
                value={code}
                onChange={(value = "") => setCode(value)}
                beforeMount={handleEditorWillMount}
                options={{
                  fontSize: 14,
                  fontFamily: "Fira Code, monospace",
                  minimap: { enabled: false },
                  automaticLayout: true,
                  tabSize: 2,
                  insertSpaces: true,
                  wordWrap: "on",
                  scrollBeyondLastLine: false,
                  formatOnPaste: true,
                  formatOnType: true,
                }}
              />
            </div>
            
            {/* Output Section */}
            <div className="border-t flex flex-col flex-1 min-h-0">
              <div 
                className="flex justify-between items-center bg-gray-100 px-5 py-3 cursor-pointer hover:bg-gray-200 border-b"
                onClick={() => setShowOutput(!showOutput)}
              >
                <div className="flex items-center gap-2">
                  <h1 className="text-gray-700 font-medium">Output</h1>
                  {result.length > 0 && (
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      result[currentTestCaseIndex]?.trim() === testCases[currentTestCaseIndex]?.expectedOutput?.trim()
                        ? "bg-green-100 text-green-800"
                        : "bg-red-100 text-red-800"
                    }`}>
                      {result[currentTestCaseIndex]?.trim() === testCases[currentTestCaseIndex]?.expectedOutput?.trim()
                        ? "Passed"
                        : "Failed"}
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-2">
                  {showOutput ? (
                    <>
                      <span className="text-sm text-gray-500">Click to collapse</span>
                      <FaChevronDown className="text-gray-600" />
                    </>
                  ) : (
                    <>
                      <span className="text-sm text-gray-500">Click to expand</span>
                      <FaChevronUp className="text-gray-600" />
                    </>
                  )}
                </div>
              </div>
              
              {/* Output Content - Animated */}
              <div 
                className={`
                  overflow-y-auto transition-all duration-300 ease-in-out
                  ${showOutput ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'}
                `}
              >
                <div className="p-4 space-y-4">
                  {/* Test Case Navigation */}
                  {testCases.length > 1 && (
                    <div className="flex flex-wrap items-center gap-3">
                      <h2 className="text-gray-700 font-medium">Test Cases:</h2>
                      <div className="flex flex-wrap gap-2">
                       
                          <button
                            key={currentTestCaseIndex}
                            className={`px-3 py-1.5 rounded-md text-sm transition-colors ${
                              currentTestCaseIndex === currentTestCaseIndex
                                ? 'bg-indigo-600 text-white'
                                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                            }`}
                            onClick={() => setCurrentTestCaseIndex(currentTestCase)}
                          >
                            Case {currentTestCaseIndex + 1}
                          </button>
                        
                      </div>
                    </div>
                  )}
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Input */}
                    <div>
                      <h3 className="text-gray-700 font-medium mb-2">Input:</h3>
                      <div className="bg-gray-50 p-3 rounded-md border font-mono text-sm whitespace-pre-wrap min-h-[80px]">
                        {testCases[currentTestCaseIndex]?.input || "No input provided"}
                      </div>
                    </div>
                    
                    {/* Expected Output */}
                    <div>
                      <h3 className="text-gray-700 font-medium mb-2">Expected Output:</h3>
                      <div className="bg-gray-50 p-3 rounded-md border font-mono text-sm whitespace-pre-wrap min-h-[80px]">
                        {testCases[currentTestCaseIndex]?.expectedOutput || "No expected output"}
                      </div>
                    </div>
                  </div>
                  
                  {/* Actual Output */}
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-gray-700 font-medium">Actual Output:</h3>
                      {loading && (
                        <div className="flex items-center gap-2 text-sm text-gray-500">
                          <div className="animate-spin rounded-full h-3 w-3 border-b-2 border-gray-500"></div>
                          Running...
                        </div>
                      )}
                    </div>
                    <div className={`
                      p-3 rounded-md border font-mono text-sm whitespace-pre-wrap min-h-[100px]
                      ${result[currentTestCaseIndex]?.trim() === testCases[currentTestCaseIndex]?.expectedOutput?.trim()
                        ? "bg-green-50 border-green-200 text-green-800"
                        : "bg-red-50 border-red-200 text-red-800"
                      }
                    `}>
                      {result[currentTestCaseIndex] || "Run code to see output"}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Finish Test Modal */}
      {showFinishModel && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
          <div className="flex flex-col items-center bg-white shadow-md rounded-xl py-6 px-5 h-fit md:w-[460px] w-[370px] border border-gray-200">
            <div className="flex items-center justify-center p-4 bg-red-100 rounded-full">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M2.875 5.75h1.917m0 0h15.333m-15.333 0v13.417a1.917 1.917 0 0 0 1.916 1.916h9.584a1917 1.917 0 0 0 1.916-1.916V5.75m-10.541 0V3.833a1.917 1.917 0 0 1 1.916-1.916h3.834a1.917 1.917 0 0 1 1.916 1.916V5.75m-5.75 4.792v5.75m3.834-5.75v5.75"
                  stroke="#DC2626"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <h2 className="text-gray-900 font-semibold mt-4 text-xl">
              Are you sure?
            </h2>
            <p className="text-sm text-gray-600 mt-2 text-center">
              Do you really want to finish the test? This action
              <br />
              cannot be undone.
            </p>
            <div className="flex items-center justify-center gap-4 mt-5 w-full">
              <button
                type="button"
                className="w-full md:w-36 h-10 rounded-md border border-gray-300 bg-white text-gray-600 font-medium text-sm hover:bg-gray-100"
                onClick={() => setFinishModel(false)}
              >
                Cancel
              </button>
              <button
                type="button"
                className="w-full md:w-36 h-10 rounded-md text-white bg-red-600 font-medium text-sm hover:bg-red-700"
                onClick={() => navigate("/feedback")}
              >
                Finish Test
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Success Modal */}
{showSubmittedOutput && (
  <div 
    className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4"
    onClick={() => setSubmittedOutput(false)}
  >
    <div 
      className="bg-white rounded-3xl shadow-2xl max-w-md w-full p-8 transform transition-all animate-slideUp"
      onClick={(e) => e.stopPropagation()}
    >
      <div className="flex flex-col items-center text-center">
        {/* Animated Success Icon */}
        <div className="relative mb-6">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center animate-pulse">
            <svg 
              className="w-10 h-10 text-green-500 animate-check" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
              strokeWidth="3"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                d="M5 13l4 4L19 7"
                className="animate-draw"
              />
            </svg>
          </div>
          {/* Sparkle effects */}
          <div className="absolute -top-1 -right-1 w-6 h-6 bg-yellow-300 rounded-full animate-bounce opacity-75"></div>
          <div className="absolute -bottom-1 -left-1 w-4 h-4 bg-green-300 rounded-full animate-ping opacity-50"></div>
        </div>
        
        <h3 className="text-2xl font-bold text-gray-800 mb-2">Success!</h3>
        <p className="text-gray-600 mb-8 text-lg">Your changes have been saved successfully.</p>
        
        <button
          onClick={() => setSubmittedOutput(false)}
          className="group relative w-full bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white font-semibold py-3 px-4 rounded-xl transition-all transform hover:scale-[1.02] active:scale-[0.98] shadow-lg hover:shadow-xl overflow-hidden"
        >
          <span className="relative z-10">Done</span>
          <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
        </button>
        
        {/* Close button */}
        <button 
          onClick={() => setSubmittedOutput(false)}
          className="mt-4 text-gray-400 hover:text-gray-600 text-sm transition-colors"
        >
          Click anywhere to close
        </button>
      </div>
    </div>
  </div>
)}

{/* Error Modal */}
{showErrorOutput && (
  <div 
    className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4"
    onClick={() => setErrorOutput(false)}
  >
    <div 
      className="bg-white rounded-3xl shadow-2xl max-w-md w-full p-8 transform transition-all animate-slideUp"
      onClick={(e) => e.stopPropagation()}
    >
      <div className="flex flex-col items-center text-center">
        {/* Animated Error Icon */}
        <div className="relative mb-6">
          <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center animate-shake">
            <svg 
              className="w-10 h-10 text-red-500" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
              strokeWidth="3"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </div>
          {/* Warning dots */}
          <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-400 rounded-full animate-ping"></div>
          <div className="absolute -bottom-1 -left-1 w-3 h-3 bg-orange-400 rounded-full animate-ping delay-100"></div>
        </div>
        
        <h3 className="text-2xl font-bold text-gray-800 mb-2">Oops!</h3>
        <p className="text-gray-600 mb-8 text-lg">Something went wrong. Please try again.</p>
        
        <div className="flex flex-col sm:flex-row gap-3 w-full">
          <button
            onClick={() => setErrorOutput(false)}
            className="group relative flex-1 bg-gradient-to-r from-red-500 to-rose-500 hover:from-red-600 hover:to-rose-600 text-white font-semibold py-3 px-4 rounded-xl transition-all transform hover:scale-[1.02] active:scale-[0.98] shadow-lg hover:shadow-xl overflow-hidden"
          >
            <span className="relative z-10">Try Again</span>
            <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
          </button>
          
          <button
            onClick={() => setErrorOutput(false)}
            className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold py-3 px-4 rounded-xl transition-all transform hover:scale-[1.02] active:scale-[0.98]"
          >
            Cancel
          </button>
        </div>
        
        {/* Close button */}
        <button 
          onClick={() => setErrorOutput(false)}
          className="mt-4 text-gray-400 hover:text-gray-600 text-sm transition-colors"
        >
          Click anywhere to close
        </button>
      </div>
    </div>
  </div>
)}

{/* Add these animations to your global CSS or style tag */}
<style jsx>{`
  @keyframes slideUp {
    from {
      opacity: 0;
      transform: translateY(30px) scale(0.95);
    }
    to {
      opacity: 1;
      transform: translateY(0) scale(1);
    }
  }
  
  @keyframes shake {
    0%, 100% { transform: translateX(0); }
    10%, 30%, 50%, 70%, 90% { transform: translateX(-4px); }
    20%, 40%, 60%, 80% { transform: translateX(4px); }
  }
  
  @keyframes draw {
    from {
      stroke-dashoffset: 100;
      stroke-dasharray: 100;
    }
    to {
      stroke-dashoffset: 0;
      stroke-dasharray: 100;
    }
  }
  
  .animate-slideUp {
    animation: slideUp 0.4s cubic-bezier(0.16, 1, 0.3, 1);
  }
  
  .animate-shake {
    animation: shake 0.5s ease-in-out;
  }
  
  .animate-draw {
    stroke-dashoffset: 100;
    stroke-dasharray: 100;
    animation: draw 0.6s ease-out forwards;
  }
  
  .delay-100 {
    animation-delay: 0.1s;
  }
`}</style>

    </div>
  );
};

export default OnlineCodingTest;