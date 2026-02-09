import axios from "axios";
import { useEffect } from "react";

const DOMAIN = import.meta.env.VITE_DOMAIN

const myRounds = [
  {
    id: 1,
    company: "TCS",
    jobRole: "Software Engineer",
    roundType: "Aptitude",
    date: "12 Jan 2026",
    status: "Cleared",
    score: "78%",
  },
  {
    id: 2,
    company: "Infosys",
    jobRole: "System Engineer",
    roundType: "Technical",
    date: "18 Jan 2026",
    status: "Pending",
    score: "-",
  },
  {
    id: 3,
    company: "Wipro",
    jobRole: "Project Engineer",
    roundType: "HR",
    date: "22 Jan 2026",
    status: "Rejected",
    score: "-",
  },
  {
    id: 4,
    company: "Google",
    jobRole: "SDE 2",
    roundType: "Coding",
    date: "28 Jan 2026",
    status: "Pending",
    score: "85%",
  },
  {
    id: 5,
    company: "Microsoft",
    jobRole: "Software Engineer",
    roundType: "Technical",
    date: "5 Feb 2026",
    status: "Cleared",
    score: "92%",
  },
];

const statusStyles = {
  Cleared: "bg-green-50 text-green-700 border border-green-200",
  Pending: "bg-gray-50 text-gray-700 border border-gray-300",
  Rejected: "bg-red-50 text-red-700 border border-red-200",
};



const MyRounds = () => {
  const clearedCount = myRounds.filter(r => r.status === "Cleared").length;
  const pendingCount = myRounds.filter(r => r.status === "Pending").length;
  const rejectedCount = myRounds.filter(r => r.status === "Rejected").length;
  
  const fetchData = async() => {
    try{
      const response = await axios.get(DOMAIN + `/api/test/get-rounds`,{
        withCredentials:true
      })
      if (response.status === 200){
        console.log(response.data)
      }
    }catch(err){
      console.log(err)
    }
  }

  useEffect(() => {
    fetchData()
  })

  return (
    <div className="p-6 bg-white">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900">Interview Rounds</h2>
        <p className="text-gray-600 mt-1">Track your interview progress across companies</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        <div className="border border-gray-200 rounded-lg p-4">
          <div className="flex items-center">
            <div className="w-3 h-3 rounded-full bg-green-500 mr-3"></div>
            <div>
              <p className="text-sm text-gray-600">Cleared</p>
              <p className="text-xl font-semibold text-gray-900">{clearedCount}</p>
            </div>
          </div>
        </div>
        <div className="border border-gray-200 rounded-lg p-4">
          <div className="flex items-center">
            <div className="w-3 h-3 rounded-full bg-gray-400 mr-3"></div>
            <div>
              <p className="text-sm text-gray-600">Pending</p>
              <p className="text-xl font-semibold text-gray-900">{pendingCount}</p>
            </div>
          </div>
        </div>
        <div className="border border-gray-200 rounded-lg p-4">
          <div className="flex items-center">
            <div className="w-3 h-3 rounded-full bg-red-500 mr-3"></div>
            <div>
              <p className="text-sm text-gray-600">Rejected</p>
              <p className="text-xl font-semibold text-gray-900">{rejectedCount}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {myRounds.map((round) => (
          <div
            key={round.id}
            className="border border-gray-200 rounded-lg hover:border-gray-300 transition-colors bg-white"
          >

            <div className="p-5 border-b border-gray-100">
              <div className="flex justify-between items-start mb-3">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">{round.company}</h3>
                  <p className="text-sm text-gray-600 mt-1">{round.jobRole}</p>
                </div>
                <span
                  className={`px-3 py-1 text-xs font-medium rounded-full ${statusStyles[round.status]}`}
                >
                  {round.status}
                </span>
              </div>
              
              <div className="inline-block px-3 py-1 bg-gray-100 text-gray-700 text-xs font-medium rounded">
                {round.roundType}
              </div>
            </div>


            <div className="p-5">
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Date</span>
                  <span className="text-sm font-medium text-gray-900">{round.date}</span>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Score</span>
                  <span className={`text-sm font-medium ${round.score !== "-" ? "text-gray-900" : "text-gray-500"}`}>
                    {round.score}
                  </span>
                </div>

                {round.score !== "-" && (
                  <div className="pt-2">
                    <div className="flex justify-between text-xs text-gray-500 mb-1">
                      <span>Performance</span>
                      <span>{round.score}</span>
                    </div>
                    <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                      <div 
                        className={`h-full rounded-full ${
                          parseFloat(round.score) >= 80 ? "bg-green-500" :
                          parseFloat(round.score) >= 60 ? "bg-blue-500" : "bg-gray-400"
                        }`}
                        style={{ width: round.score }}
                      ></div>
                    </div>
                  </div>
                )}
              </div>

              <div className="mt-6 pt-4 border-t border-gray-100">
                <button className="w-full py-2 text-sm font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50 border border-gray-300 rounded transition-colors">
                  View Details
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>


      
    </div>
  );
};

export default MyRounds