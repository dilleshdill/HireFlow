import React, { useEffect, useState } from "react";
import hireflow from "../../assets/hireflow.jpg";
import { PiTimerBold } from "react-icons/pi";
import Pagination from "@mui/material/Pagination";
import { GoDotFill } from "react-icons/go";
import { FaChevronLeft } from "react-icons/fa6";
import { FaChevronDown, FaChevronRight } from "react-icons/fa";
import Editor from "@monaco-editor/react";
import { MoonIcon, Play, Sun } from "lucide-react";
import axios from "axios";
import { FaChevronUp } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const codingQuestion = [
  {
    id: 1,
    title: "Longest Subarray With Given Sum",
    difficulty: "Hard",
    description: `
  Given an array of integers and an integer K,
  find the length of the longest subarray whose sum equals K.

  If no such subarray exists, return 0.
  Given an array of integers and an integer K,
  find the length of the longest subarray whose sum equals K.

  If no such subarray exists, return 0.

  Given an array of integers and an integer K,
  find the length of the longest subarray whose sum equals K.

  If no such subarray exists, return 0.
  Given an array of integers and an integer K,
  find the length of the longest subarray whose sum equals K.

  If no such subarray exists, return 0.

  
    `,
    constraints: [
      "1 <= N <= 10^5",
      "-10^9 <= arr[i] <= 10^9",
      "-10^14 <= K <= 10^14",
    ],
    sampleInput: "5 10\n1 2 3 4 5",
    sampleOutput: "4",
  },
];

const languages = [
  { id: 1, name: "Python", value: "python" },
  { id: 2, name: "Java", value: "java" },
  { id: 3, name: "C++", value: "cpp" },
  { id: 4, name: "JavaScript", value: "javascript" },
  { id: 5, name: "C", value: "c" },
];

const OnlineCoadingTest = () => {
  const [time, setTime] = useState(3590);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedLanguage, setSelectedLanguage] = useState("javascript");
  const [code, setCode] = useState("// Write your code here");
  const [theme,setTheme] = useState("light")
  const [result, setResult] = useState([]);
  const [loading,setLoading] = useState(false)
  const [showOutput,setShowOutput] = useState(false)
  const [showFinishModel,setFinishModel] = useState(false)
  const navigate = useNavigate()

  function handleEditorWillMount(monaco) {
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
  }

  const results = [
  {
    input: "5 10\n1 2 3 4 5",
    expected: "4",
    actual: "4",
    passed: true
  }
];

  const getRunCode = async() => {
    setLoading(true)
      try{
        // const response = await axios.post()

        setLoading(false)
        setShowOutput(true)
        setResult(results)
      }catch(err){

        console.log(err)
      }
  }


  const currentQuestion = codingQuestion[currentIndex];
  const minutes = Math.floor(time / 60 + (time % 3600) / 60);
  const seconds = Math.floor(time % 60);
  return (
    <div className="h-screen flex flex-col px-2 py-2 gap-5 bg-slate-50">
      <div className="flex flex-col bg-white shadow-xl px-4 rounded-lg ">
        <div className="flex justify-between  items-center">
          <img src={hireflow} className="h-20 w-20 " />
          <h1 className="text-gray-700 font-medium text-xl">
            Deloite National Test Assessment
          </h1>
          <div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1">
                <PiTimerBold size={20} className="text-gray-600" />
                <h1 className="text-lg text-gray-700 font-medium">
                  {minutes}{" "}
                  <span className="text-gray-600 font-normal">mins</span>{" "}
                  {seconds}{" "}
                  <span className="text-gray-600 font-normal">secs</span>
                </h1>
              </div>
              <button className="flex px-5 py-2 bg-indigo-700 text-white rounded-sm" onClick={()=>setFinishModel(true)}>
                Finish Test
              </button>
            </div>
          </div>
        </div>
        <div className="flex justify-between  items-center ">
          <h1 className="text-gray-800 text-md ">Question 2 </h1>
          <div className="flex">
            <Pagination count={10} shape="rounded" />
          </div>
          <div className="flex gap-3">
            <div className="flex flex-col items-center">
              <h1 className="text-lg">2</h1>
              <h1 className="flex items-center text-gray-600 ">
                <GoDotFill className="text-green-400" /> Answered
              </h1>
            </div>
            <div className="flex flex-col items-center">
              <h1 className="text-lg">2</h1>
              <h1 className="flex items-center text-gray-600 ">
                <GoDotFill className="text-yellow-400" />
                Not Answered
              </h1>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-row gap-3 flex-1 min-h-0">
        <div className="flex flex-col bg-white shadow-2xl max-w-3xl w-full p-5 gap-3 rounded-lg flex-1 overflow-y-auto pt-5">

          <h1 className="text-xl ">Question 1</h1>
          <hr />
          <p className="text-gray-700">{currentQuestion.description}</p>
          <h1 className="text-gray-900 font-sans">Sample input :</h1>
          <div className="bg-gray-100 w-full h-fit px-5 py-3 whitespace-pre-line">
            {currentQuestion.sampleInput}
          </div>
          <h1 className="text-gray-900 font-sans">Sample output :</h1>
          <div className="bg-gray-100 w-full h-fit px-5 py-3 whitespace-pre-line">
            {currentQuestion.sampleOutput}
          </div>
          <h1 className="text-gray-900 font-sans">Constraints :</h1>
          <div>
            {
              currentQuestion.constraints.map(eachItem => (
                <h1 className="text-gray-700">{eachItem}</h1>
              ))
            }
          </div>
          <div className="flex justify-end gap-5">
            <button className="flex items-center border border-gray-400 px-4 py-2">
              <FaChevronLeft size={15} />
              <h1>Previous</h1>
            </button>
            <button className="flex items-center border border-gray-400 px-6 py-2">
              <h1>Next</h1>
              <FaChevronRight size={15} />
            </button>
          </div>
        </div>
        <div className="flex flex-col bg-white shadow-2xl max-w-3xl w-full p-5 gap-3 rounded-lg">
          <div className="flex flex-row gap-5 justify-between items-center">
            <div className="flex gap-3 items-center">
              <h1 className="text-gray-600 font-medium text-md">Code Editor</h1>
              <select
                value={selectedLanguage}
                onChange={(e) => setSelectedLanguage(e.target.value)}
                className="border border-gray-400 px-3 py-1 rounded"
              >
                {languages.map((lang) => (
                  <option key={lang.id} value={lang.value}>
                    {lang.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex items-center gap-3">
              {
                theme === "light" ?<MoonIcon className="text-gray-500" onClick={()=>setTheme("dark")}/> : <Sun className="text-gray-500" onClick={()=>setTheme("light")}/>
              }
              <button className="flex items-center gap-1 border border-green-600 text-green-600 px-3 py-2 cursor-pointer hover:border-green-900 text-green-800" onClick={getRunCode}>
                <Play size={15} className="fill-green-500"/>
                {
                  loading ? "Running..." : "Code Run"
                }
              </button>
              <button className="bg-green-600 text-white px-3 py-2">
                Submit Code
              </button>

            </div>
          </div>
          <hr />
          <div className="flex flex-col h-full rounded-md overflow-hidden border border-gray-300">
            <Editor
              language={selectedLanguage}
              theme={`vs-${theme}`}
              beforeMount={handleEditorWillMount}
              value={code}
              onChange={(value) => setCode(value)}
              options={{
                fontSize: 14,
                fontFamily: "Fira Code, monospace",
                minimap: { enabled: false },
                automaticLayout: true,
                tabSize: 2,
                insertSpaces: true,
                detectIndentation: false,
                wordWrap: "on",
                scrollBeyondLastLine: false,
                formatOnPaste: true,
                formatOnType: true,
                cursorSmoothCaretAnimation: true,
              }}
            />
            {
            (showOutput) ?
            (
              <div className="flex flex-col w-full">
                <div className="flex justify-between items-center bg-gray-200 gap-10 px-5 py-2">
                  <div className="flex w-full items-center gap-5">
                    <h1 className="text-gray-700 font-medium">Enter Custom input</h1>
                    <h1 className="text-gray-700 font-medium">Output</h1>
                  </div>
                  <div>
                    <FaChevronDown className="text-gray-600" onClick={() => setShowOutput(false)}/>
                  </div>
                </div>
                <div className="flex flex-col bg-white px-5 py-2 gap-3">
                  <h1 className="text-gray-900 font-sans">Test Case</h1>
                  <div className="bg-gray-100 w-full h-fit px-5 py-3 whitespace-pre-line">
                    {result[0]?.input} 
                  </div>
                  <h1 className="text-gray-900 font-sans">Excepted Output</h1>
                  <div className="bg-gray-100 w-full h-fit px-5 py-3 whitespace-pre-line">
                    {result[0]?.expected} 
                  </div>
                  <h1 className="text-gray-900 font-sans">Actual Output</h1>
                  <div className="bg-gray-100 w-full h-fit px-5 py-3 whitespace-pre-line">
                    {result[0]?.actual} 
                  </div>
                </div>
            </div>
            )
            : 
            (
              <div className="flex justify-between items-center bg-gray-200 gap-10 px-5 py-2">
                  <div className="flex w-full items-center gap-5">
                    <h1 className="text-gray-700 font-medium">Enter Custom input</h1>
                    <h1 className="text-gray-700 font-medium">Output</h1>
                  </div>
                  <div>
                    <FaChevronUp className="text-gray-600" onClick={() => setShowOutput(true)}/>
                  </div>
                </div>
            )
          }
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
                onClick={() =>navigate("/feedback")}>
                    Confirm
                </button>
            </div>
        </div>
        </div>
        }
      </div>
    </div>
  );
};

export default OnlineCoadingTest;
