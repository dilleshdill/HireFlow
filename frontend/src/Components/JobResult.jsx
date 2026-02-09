import { useState } from 'react';

const testResults = [
  {
    id: 1,
    company: "TCS",
    testName: "Aptitude Assessment",
    date: "12 Jan 2026",
    time: "10:00 AM",
    duration: "90 mins",
    totalQuestions: 60,
    correctAnswers: 47,
    score: "78.3%",
    percentile: "85",
    status: "Cleared",
    sectionBreakdown: [
      { name: "Quantitative", score: "82%", correct: 16, total: 20 },
      { name: "Logical", score: "76%", correct: 19, total: 25 },
      { name: "Verbal", score: "75%", correct: 12, total: 15 }
    ]
  },
  {
    id: 2,
    company: "Infosys",
    testName: "Technical Assessment",
    date: "18 Jan 2026",
    time: "2:30 PM",
    duration: "120 mins",
    totalQuestions: 45,
    correctAnswers: 32,
    score: "71.1%",
    percentile: "78",
    status: "Pending",
    sectionBreakdown: [
      { name: "Programming", score: "70%", correct: 14, total: 20 },
      { name: "DSA", score: "72%", correct: 13, total: 18 },
      { name: "DBMS", score: "75%", correct: 6, total: 8 }
    ]
  },
  {
    id: 3,
    company: "Wipro",
    testName: "Online Assessment",
    date: "22 Jan 2026",
    time: "11:00 AM",
    duration: "100 mins",
    totalQuestions: 50,
    correctAnswers: 28,
    score: "56.0%",
    percentile: "45",
    status: "Rejected",
    sectionBreakdown: [
      { name: "Aptitude", score: "60%", correct: 15, total: 25 },
      { name: "Technical", score: "52%", correct: 13, total: 25 }
    ]
  },
  {
    id: 4,
    company: "Google",
    testName: "Coding Challenge",
    date: "28 Jan 2026",
    time: "9:00 AM",
    duration: "180 mins",
    totalQuestions: 4,
    correctAnswers: 3,
    score: "85.0%",
    percentile: "92",
    status: "Pending",
    sectionBreakdown: [
      { name: "Problem Solving", score: "80%", correct: 2, total: 2 },
      { name: "Algorithms", score: "90%", correct: 2, total: 2 }
    ]
  }
];

export const JobResult = () => {
  const [selectedResult, setSelectedResult] = useState(null);
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'list'

  const getScoreColor = (score) => {
    const numericScore = parseFloat(score);
    if (numericScore >= 80) return "text-green-600";
    if (numericScore >= 60) return "text-blue-600";
    return "text-gray-600";
  };

  const getStatusBadge = (status) => {
    const styles = {
      Cleared: "bg-green-50 text-green-700 border border-green-200",
      Pending: "bg-gray-50 text-gray-700 border border-gray-300",
      Rejected: "bg-gray-50 text-gray-600 border border-gray-300"
    };
    return (
      <span className={`px-3 py-1 text-xs font-medium rounded ${styles[status]}`}>
        {status}
      </span>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Test Results Dashboard</h1>
          <p className="text-gray-600 mt-2">Comprehensive overview of your assessment performance</p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white border border-gray-200 rounded-lg p-4">
            <p className="text-sm text-gray-600">Total Tests</p>
            <p className="text-2xl font-semibold text-gray-900">{testResults.length}</p>
          </div>
          <div className="bg-white border border-gray-200 rounded-lg p-4">
            <p className="text-sm text-gray-600">Average Score</p>
            <p className="text-2xl font-semibold text-gray-900">72.6%</p>
          </div>
          <div className="bg-white border border-gray-200 rounded-lg p-4">
            <p className="text-sm text-gray-600">Tests Cleared</p>
            <p className="text-2xl font-semibold text-gray-900">1</p>
          </div>
          <div className="bg-white border border-gray-200 rounded-lg p-4">
            <p className="text-sm text-gray-600">Avg Percentile</p>
            <p className="text-2xl font-semibold text-gray-900">75</p>
          </div>
        </div>

        {/* View Toggle */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <button 
              onClick={() => setViewMode('grid')}
              className={`px-4 py-2 text-sm font-medium ${viewMode === 'grid' ? 'bg-gray-900 text-white' : 'bg-white text-gray-700 border'} border-gray-300 rounded-l-lg`}
            >
              Grid View
            </button>
            <button 
              onClick={() => setViewMode('list')}
              className={`px-4 py-2 text-sm font-medium ${viewMode === 'list' ? 'bg-gray-900 text-white' : 'bg-white text-gray-700 border'} border-gray-300 border-l-0 rounded-r-lg`}
            >
              List View
            </button>
          </div>
          <button className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50">
            Export Results
          </button>
        </div>

        {/* Results Grid/List */}
        {viewMode === 'grid' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {testResults.map((result) => (
              <div 
                key={result.id}
                className="bg-white border border-gray-200 rounded-lg hover:border-gray-300 transition-colors"
              >
                <div className="p-6">
                  {/* Result Header */}
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="font-semibold text-gray-900">{result.company}</h3>
                      <p className="text-sm text-gray-600 mt-1">{result.testName}</p>
                    </div>
                    {getStatusBadge(result.status)}
                  </div>

                  {/* Test Info */}
                  <div className="space-y-3 mb-6">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Date & Time</span>
                      <span className="text-gray-900">{result.date}, {result.time}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Duration</span>
                      <span className="text-gray-900">{result.duration}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Questions</span>
                      <span className="text-gray-900">{result.totalQuestions}</span>
                    </div>
                  </div>

                  {/* Score Card */}
                  <div className="border-t border-gray-100 pt-4">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-gray-700 font-medium">Overall Score</span>
                      <span className={`text-lg font-semibold ${getScoreColor(result.score)}`}>
                        {result.score}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm mb-4">
                      <span className="text-gray-600">Correct: {result.correctAnswers}/{result.totalQuestions}</span>
                      <span className="text-gray-600">Percentile: {result.percentile}</span>
                    </div>
                    
                    {/* Score Bar */}
                    <div className="w-full h-2 bg-gray-100 rounded-full mb-4">
                      <div 
                        className={`h-full rounded-full ${
                          parseFloat(result.score) >= 80 ? 'bg-green-500' :
                          parseFloat(result.score) >= 60 ? 'bg-blue-500' : 'bg-gray-400'
                        }`}
                        style={{ width: result.score }}
                      ></div>
                    </div>

                    {/* Section Breakdown */}
                    <div className="space-y-2">
                      {result.sectionBreakdown.map((section, idx) => (
                        <div key={idx} className="flex justify-between text-sm">
                          <span className="text-gray-600">{section.name}</span>
                          <span className="text-gray-900 font-medium">{section.score}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Action Button */}
                  <button 
                    onClick={() => setSelectedResult(result)}
                    className="w-full mt-6 py-2 text-sm font-medium text-gray-700 bg-gray-50 hover:bg-gray-100 border border-gray-300 rounded transition-colors"
                  >
                    View Detailed Analysis
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* List View */
          <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Company & Test</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Score</th>
                  <th className="px6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Percentile</th>
                  <th className="px6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {testResults.map((result) => (
                  <tr key={result.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div>
                        <div className="font-medium text-gray-900">{result.company}</div>
                        <div className="text-sm text-gray-600">{result.testName}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900">{result.date}</td>
                    <td className="px-6 py-4">
                      <span className={`font-semibold ${getScoreColor(result.score)}`}>
                        {result.score}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900">{result.percentile}</td>
                    <td className="px-6 py-4">{getStatusBadge(result.status)}</td>
                    <td className="px-6 py-4">
                      <button 
                        onClick={() => setSelectedResult(result)}
                        className="text-sm font-medium text-gray-700 hover:text-gray-900"
                      >
                        View Details →
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Detailed Result Modal */}
        {selectedResult && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <h2 className="text-xl font-bold text-gray-900">{selectedResult.company}</h2>
                    <p className="text-gray-600">{selectedResult.testName}</p>
                  </div>
                  <button 
                    onClick={() => setSelectedResult(null)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    ✕
                  </button>
                </div>

                {/* Detailed Info */}
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="border border-gray-200 rounded p-4">
                    <p className="text-sm text-gray-600">Test Date</p>
                    <p className="font-medium">{selectedResult.date}</p>
                  </div>
                  <div className="border border-gray-200 rounded p-4">
                    <p className="text-sm text-gray-600">Test Time</p>
                    <p className="font-medium">{selectedResult.time}</p>
                  </div>
                  <div className="border border-gray-200 rounded p-4">
                    <p className="text-sm text-gray-600">Duration</p>
                    <p className="font-medium">{selectedResult.duration}</p>
                  </div>
                  <div className="border border-gray-200 rounded p-4">
                    <p className="text-sm text-gray-600">Total Questions</p>
                    <p className="font-medium">{selectedResult.totalQuestions}</p>
                  </div>
                </div>

                {/* Score Summary */}
                <div className="border border-gray-200 rounded-lg p-6 mb-6">
                  <h3 className="font-semibold text-gray-900 mb-4">Performance Summary</h3>
                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <p className="text-4xl font-bold text-gray-900 mb-2">{selectedResult.score}</p>
                      <p className="text-gray-600">Overall Score</p>
                    </div>
                    <div>
                      <p className="text-4xl font-bold text-gray-900 mb-2">{selectedResult.percentile}</p>
                      <p className="text-gray-600">Percentile Rank</p>
                    </div>
                  </div>
                </div>

                {/* Section Breakdown */}
                <div>
                  <h3 className="font-semibold text-gray-900 mb-4">Section-wise Performance</h3>
                  <div className="space-y-4">
                    {selectedResult.sectionBreakdown.map((section, idx) => (
                      <div key={idx} className="border border-gray-200 rounded p-4">
                        <div className="flex justify-between items-center mb-2">
                          <span className="font-medium text-gray-900">{section.name}</span>
                          <span className="text-lg font-semibold text-gray-900">{section.score}</span>
                        </div>
                        <div className="flex justify-between text-sm text-gray-600 mb-2">
                          <span>Correct: {section.correct}/{section.total}</span>
                        </div>
                        <div className="w-full h-2 bg-gray-100 rounded-full">
                          <div 
                            className="h-full rounded-full bg-gray-600"
                            style={{ width: section.score }}
                          ></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex justify-end space-x-3 mt-8 pt-6 border-t border-gray-200">
                  <button className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded hover:bg-gray-50">
                    Download Report
                  </button>
                  <button className="px-4 py-2 text-sm font-medium text-white bg-gray-900 border border-gray-900 rounded hover:bg-gray-800">
                    Share Results
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};