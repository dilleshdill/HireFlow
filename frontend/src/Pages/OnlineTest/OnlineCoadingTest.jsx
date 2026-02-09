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
        const fetchedQuestions = response.data.questions || [];
        setQuestions(fetchedQuestions);
        setLength(fetchedQuestions.length);
        
        const storedIndex = parseInt(localStorage.getItem("currentCodingIndex") || "0");
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
      
      navigate("/feedback")
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
      localStorage.setItem("currentCodingIndex", newIndex.toString());
    }
  };

  const handleNext = () => {
    if (currentIndex < length - 1) {
      const newIndex = currentIndex + 1;
      setCurrentIndex(newIndex);
      localStorage.setItem("currentCodingIndex", newIndex.toString());
    }
  };

  const handlePageChange = (event, value) => {
    const newIndex = value - 1;
    setCurrentIndex(newIndex);
    setCurrentTestCaseIndex(0);
    localStorage.setItem("currentCodingIndex", newIndex.toString());
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
                        {testCases.map((_, index) => (
                          <button
                            key={index}
                            className={`px-3 py-1.5 rounded-md text-sm transition-colors ${
                              currentTestCaseIndex === index
                                ? 'bg-indigo-600 text-white'
                                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                            }`}
                            onClick={() => setCurrentTestCaseIndex(index)}
                          >
                            Case {index + 1}
                          </button>
                        ))}
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
    </div>
  );
};

export default OnlineCodingTest;