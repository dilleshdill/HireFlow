import React, { useEffect,useState } from "react";
import hireflow from "../../assets/hireflow.jpg";
import { Clock, ShieldCheck, Monitor } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const DOMAIN = import.meta.env.VITE_DOMAIN

const OnlineTestDetailes = () => {
  const navigate = useNavigate()
  const {id} = useParams()
  const [rounds,setRounds] = useState({})

  const fetchData = async() => {
    try{
        const response = await axios.get(DOMAIN + `/api/test/test-details?jobId=${id}`,{
          withCredentials:true
        })
        if(response.status === 200){
          const groupedByRoundType = response.data.testDetails.reduce((acc, item) => {
          const key = item.roundType;

          if (!acc[key]) {
            acc[key] = [];
          }

          acc[key].push(item);
          return acc;
        }, {});
        setRounds(groupedByRoundType)
        }
    }catch(err){
      console.log(err)
    }
  }

  useEffect(() => {
    fetchData()
  },[])


  const getNavigate = async() => {
    try{
      const response = await axios.post(DOMAIN + `/api/job/create-test`,{
          jobId :id
      },{
        withCredentials:true
      })
      if (response.status === 200){
        console.log(response.data)
        navigate(`/job/test/exam/${id}`)
      }
      if (response.status === 201){
        console.log(response.data)
        navigate(`/job/test/exam/${id}`)
      }
    }catch(error){
      console.log(error)
    }
  }

  const getRoundTime = (roundType, job) => {
  switch (roundType) {
    case "APTITUDE":
      return job?.aptitudeTime || 0;
    case "CORE":
      return job?.coreTime || 0;
    case "CODING":
      return job?.codingTime || 0;
    default:
      return 0;
  }
};

  const totalTime = Object.entries(rounds).reduce(
  (sum, [roundType, items]) =>
    sum + getRoundTime(roundType, items[0]?.jobId),
  0
);
console.log(totalTime)

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
              
                
                  <p className="text-lg font-semibold text-gray-800 gap-3">

                    {
                      totalTime 
                    }
                    <span className="ml-2 text-gray-500">minutes</span>
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
            <h2 className="text-lg font-semibold text-gray-800 mb-3 flex items-center gap-2">
              <ShieldCheck size={18} />
              3.0 Compliance & Test Conduct Guidelines
            </h2>

            {Object.entries(rounds).map(([roundType, items]) => {
  const job = items[0]?.jobId;

  const time =
    roundType === "APTITUDE"
      ? job?.aptitudeTime
      : roundType === "CORE"
      ? job?.coreTime
      : roundType === "CODING"
      ? job?.codingTime
      : null;

  return (
    <div
      key={roundType}
      style={{
        border: "1px solid #e0e0e0",
        borderRadius: "12px",
        padding: "16px",
        marginBottom: "16px",
        background: "#ffffff",
        boxShadow: "0 2px 6px rgba(0,0,0,0.05)"
      }}
    >
      <h3 style={{ marginBottom: "8px" }}>
        {roundType} Round
      </h3>

      <div
        style={{
          display: "inline-block",
          background: "#f5f7fa",
          padding: "8px 14px",
          borderRadius: "8px",
          fontWeight: 600
        }}
      >
        ⏱ Time Limit: {time} minutes
      </div>
    </div>
  );
})}
          
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
