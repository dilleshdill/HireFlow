import React from "react";
import hireflow from "../../assets/hireflow.jpg";
import { Clock, ShieldCheck, Monitor } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const DOMAIN = import.meta.env.VITE_DOMAIN

const OnlineTestDetailes = () => {
  const navigate = useNavigate()
  const {id} = useParams()


  const getNavigate = async() => {
    try{
      const response = await axios.post(DOMAIN + `/api/job/create-test`,{
          jobId :id
      },{
        withCredentials:true
      })
      if (response.status === 200){
        navigate(`/job/test/exam/${id}`)
      }
    }catch(error){
      console.log(error)
    }
  }
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-6xl bg-white rounded-2xl shadow-xl overflow-hidden">

        <div className="border-b border-gray-200 px-8 py-6 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div className="flex items-center gap-4">
            <img
              src={hireflow}
              alt="HireFlow Logo"
              className="w-14 h-14 rounded-lg shadow-sm"
            />
            <div>
              <h1 className="text-2xl font-semibold text-gray-800">
                HireFlow Online Assessment
              </h1>
              <p className="text-sm text-gray-500 mt-1">
                Candidate Evaluation & Technical Screening
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 bg-gray-50 px-5 py-3 rounded-lg border border-gray-200">
            <Clock size={18} className="text-gray-600" />
            <div>
              <p className="text-xs text-gray-500 uppercase tracking-wide">
                Assessment Duration
              </p>
              <p className="text-lg font-semibold text-gray-800">
                60 Minutes
              </p>
            </div>
          </div>
        </div>

        <div className="px-8 py-10 space-y-10">


          <section>
            <h2 className="text-lg font-semibold text-gray-800 mb-3">
              1.0 Assessment Overview
            </h2>
            <p className="text-gray-600 text-sm leading-relaxed">
              This online assessment is designed to evaluate your technical
              proficiency, problem-solving capabilities, and coding standards.
              The test environment is secure and actively monitored to ensure
              fairness and compliance with organizational hiring policies.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
              <Monitor size={18} />
              2.0 System & Browser Requirements
            </h2>

            <div className="grid md:grid-cols-2 gap-8 text-sm text-gray-600">

              <div>
                <h3 className="font-medium text-gray-700 mb-2">
                  2.1 Supported Operating Systems
                </h3>
                <ul className="list-disc list-inside space-y-1">
                  <li>Windows 7 or later</li>
                  <li>macOS 10.6 or later</li>
                  <li>Any stable Linux distribution</li>
                </ul>
              </div>

              <div>
                <h3 className="font-medium text-gray-700 mb-2">
                  2.2 Supported Browsers (Latest Version Only)
                </h3>
                <ul className="list-disc list-inside space-y-1">
                  <li>Google Chrome / Chromium</li>
                  <li>Mozilla Firefox</li>
                  <li>Microsoft Edge</li>
                  <li>Apple Safari</li>
                </ul>
              </div>

            </div>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-gray-800 mb-3 flex items-center gap-2">
              <ShieldCheck size={18} />
              3.0 Compliance & Test Conduct Guidelines
            </h2>

            <div className="text-gray-600 text-sm space-y-3 leading-relaxed">
              <p>3.1 All browser extensions and add-ons must be disabled prior to starting the assessment.</p>
              <p>3.2 The assessment must be accessed in Incognito / Private browsing mode.</p>
              <p>3.3 Candidates are prohibited from switching tabs, opening external resources, or using unauthorized tools.</p>
              <p>3.4 Ensure a stable internet connection throughout the test duration.</p>
              <p>3.5 Any suspicious activity may result in immediate termination of the assessment.</p>
            </div>
          </section>

          <div className="bg-red-50 border border-red-300 text-red-700 p-5 rounded-lg text-sm">
            <strong>Important Notice:</strong> This assessment session is actively
            monitored using automated proctoring mechanisms. Violations of the
            guidelines may lead to disqualification from the recruitment process.
          </div>

        </div>

        <div className="border-t border-gray-200 bg-gray-50 px-8 py-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-gray-600">
            By proceeding, you acknowledge that you have read and agreed to the assessment terms.
          </p>

          <button className="bg-black text-white px-8 py-3 rounded-lg text-sm font-medium hover:bg-gray-800 transition duration-300"
          onClick={() => getNavigate()}>
            Take A Test
          </button>
        </div>

      </div>
    </div>
  );
};

export default OnlineTestDetailes;
