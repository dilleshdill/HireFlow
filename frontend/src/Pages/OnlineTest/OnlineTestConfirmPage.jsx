import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import hireflow from "../../assets/hireflow.jpg"
import { Dot } from "lucide-react";

const OnlineTestConfirmPage = () => {
  const [agree, setAgree] = useState(false);
  const navigate = useNavigate();

  const handleStart = () => {
    if (agree) {
      navigate("/test");
    }
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-4">

      
      <div className="w-full max-w-5xl bg-white/80 backdrop-blur-xl shadow-2xl rounded-3xl p-6 md:p-10">

        
        <div className="flex flex-col md:flex-row items-center justify-between mb-8">

          
          <div className="flex items-center gap-4">
            <img 
              src={hireflow}
              alt="HireFlow Logo"
              className="w-14 h-14 rounded-xl shadow-md"
            />
            <div>
              <h1 className="text-3xl font-bold text-gray-800">
                HireFlow Assessment
              </h1>
              <p className="text-gray-500 text-sm">
                Secure & Monitored Coding Test
              </p>
            </div>
          </div>

          <div className="flex flex-row gap-3">
            <div className="mt-4 md:mt-0 bg-gray-100 px-4 py-2 rounded-xl shadow-sm">
              
              <p className="text-lg font-semibold text-gray-800">60 Minutes </p>
            </div>
            <div className="flex bg-blue-700 text-white px-4 py-2 rounded-xl shadow-sm">
              <h1 className="text-lg font-medium text-white">Proceed</h1>
            </div>
          </div>
        </div>

        

        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-600 mb-4">
            Important Instructions
          </h2>

          <div className="flex flex-col gap-1">
              <p className="flex text-md text-gray-700 mb-3">To enjoy the best experience on our platform, please ensure that</p>
              <p className="flex text-md text-gray-700">1.The operating system on your computer is one of the 3 mentioned below:</p>
              <ul className=" text-gray-600">
                <li className="flex items-center"><span><Dot className="text-green-600" size={35}/></span>Windows 7 and above</li>
                <li className="flex items-center"><span><Dot className="text-green-600" size={35}/></span>Linux distributions or</li>
                <li className="flex items-center"><span><Dot className="text-green-600" size={35}/></span>Mac OS X 10.6 and above</li>
              </ul>
              <p className="flex text-md text-gray-700">2.You are opening the assessment in the latest versions of one of the browsers mentioned below:</p>
              <ul className=" text-gray-600">
                <li className="flex items-center"><span><Dot className="text-green-600" size={35}/></span>Chrome/Chromium</li>
                <li className="flex items-center"><span><Dot className="text-green-600" size={35}/></span>Mozilla Firefox</li>
                <li className="flex items-center"><span><Dot className="text-green-600" size={35}/></span>Microsoft Edge</li>
                <li className="flex items-center"><span><Dot className="text-green-600" size={35}/></span>Apple Safari</li>
              </ul>
              <p className="flex text-md text-gray-700">3.You have disabled all the browser extensions and enabled Add-ons:</p>
              <p className="flex text-md text-gray-700">4.You open the assessment in incognito mode:</p>
          </div>
        </div>

        
        <div className="bg-red-100 border border-red-300 text-red-700 p-4 rounded-xl mb-8 text-sm">
          This test is actively monitored. Ensure stable internet connection before proceeding.
        </div>

      </div>
    </div>
  );
};

export default OnlineTestConfirmPage;
