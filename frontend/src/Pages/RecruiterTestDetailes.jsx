import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const QuestionsManager = () => {
    const {id} = useParams()
const jobId = id
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("APTITUDE");
  const [editingId, setEditingId] = useState(null);

  const initialQuestion = {
    jobId: id,
    roundType: "APTITUDE",
    questionText: "",
    options: ["", ""],
    correctAnswer: "", // Empty string initially
    marks: 1,
    difficulty: "MEDIUM",
    testCases: [{ input: "", expectedOutput: "" }],
    roundTime: 30
  };

  const [newQuestion, setNewQuestion] = useState({ ...initialQuestion });

  // Fetch questions for this job
  useEffect(() => {
    if (jobId) {
      fetchQuestions();
    }
  }, [jobId]);

  const fetchQuestions = async () => {
    try {
      setLoading(true);
    
    } catch (error) {
      console.log(error)
        
    } finally {
      setLoading(false);
    }
  };

  // Reset form to initial state
  const resetForm = () => {
    setNewQuestion({ ...initialQuestion, roundType: activeTab });
    setEditingId(null);
  };

  // Handle input changes
  const handleInputChange = (field, value) => {
    setNewQuestion(prev => ({
      ...prev,
      [field]: value
    }));
  };

  // Handle MCQ options
  const handleOptionChange = (index, value) => {
    const updatedOptions = [...newQuestion.options];
    updatedOptions[index] = value;
    setNewQuestion(prev => ({
      ...prev,
      options: updatedOptions
    }));
  };

  const addOption = () => {
    setNewQuestion(prev => ({
      ...prev,
      options: [...prev.options, ""]
    }));
  };

  const removeOption = (index) => {
    if (newQuestion.options.length > 2) {
      const updatedOptions = newQuestion.options.filter((_, i) => i !== index);
      
      let updatedCorrectAnswer = newQuestion.correctAnswer;
      
      // Adjust correct answer if needed
      if (newQuestion.correctAnswer === index.toString()) {
        // If removing the correct answer, reset to empty
        updatedCorrectAnswer = "";
      } else if (newQuestion.correctAnswer && parseInt(newQuestion.correctAnswer) > index) {
        // If correct answer index is after the removed index, decrement it
        updatedCorrectAnswer = (parseInt(newQuestion.correctAnswer) - 1).toString();
      }
      
      setNewQuestion(prev => ({
        ...prev,
        options: updatedOptions,
        correctAnswer: updatedCorrectAnswer
      }));
    }
  };

  // Handle test cases for coding questions
  const handleTestCaseChange = (index, field, value) => {
    const updatedTestCases = [...newQuestion.testCases];
    updatedTestCases[index] = {
      ...updatedTestCases[index],
      [field]: value
    };
    setNewQuestion(prev => ({
      ...prev,
      testCases: updatedTestCases
    }));
  };

  const addTestCase = () => {
    setNewQuestion(prev => ({
      ...prev,
      testCases: [...prev.testCases, { input: "", expectedOutput: "" }]
    }));
  };

  const removeTestCase = (index) => {
    if (newQuestion.testCases.length > 1) {
      const updatedTestCases = newQuestion.testCases.filter((_, i) => i !== index);
      setNewQuestion(prev => ({
        ...prev,
        testCases: updatedTestCases
      }));
    }
  };

  // Set correct answer
  const setCorrectAnswer = (index) => {
    setNewQuestion(prev => ({
      ...prev,
      correctAnswer: index.toString() // Store as string
    }));
  };

  // Validation
  const validateQuestion = () => {
    const errors = [];

    if (!newQuestion.questionText.trim()) {
      errors.push("Question text is required");
    }

    if (newQuestion.roundType === "APTITUDE" || newQuestion.roundType === "CORE") {
      // Validate MCQ questions
      const emptyOptions = newQuestion.options.filter(opt => !opt.trim());
      if (emptyOptions.length > 0) {
        errors.push(`All options must be filled. ${emptyOptions.length} empty option(s) found.`);
      }
      if (newQuestion.options.length < 2) {
        errors.push("At least 2 options are required");
      }
      if (!newQuestion.correctAnswer && newQuestion.correctAnswer !== "0") {
        errors.push("Please select a correct answer");
      }
    } else if (newQuestion.roundType === "CODING") {
      // Validate coding questions
      const emptyTestCases = newQuestion.testCases.filter(tc => !tc.input.trim() || !tc.expectedOutput.trim());
      if (emptyTestCases.length > 0) {
        errors.push(`All test cases must be filled. ${emptyTestCases.length} incomplete test case(s) found.`);
      }
      if (newQuestion.roundTime < 1) {
        errors.push("Round time must be at least 1 minute");
      }
    }

    return errors;
  };

  // Save/Update question
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const errors = validateQuestion();
    if (errors.length > 0) {
      alert("Please fix the following errors:\n\n" + errors.join("\n"));
      return;
    }

    try {
      setLoading(true);
      
      // Prepare data based on round type
      const submissionData = {
        jobId: newQuestion.jobId,
        roundType: newQuestion.roundType,
        questionText: newQuestion.questionText,
        marks: newQuestion.marks,
        difficulty: newQuestion.difficulty,
        roundTime: newQuestion.roundTime
      };

      // Add type-specific fields
      if (newQuestion.roundType === "APTITUDE" || newQuestion.roundType === "CORE") {
        submissionData.options = newQuestion.options;
        submissionData.correctAnswer = newQuestion.correctAnswer; // String index
      } else if (newQuestion.roundType === "CODING") {
        submissionData.testCases = newQuestion.testCases;
      }

    

      resetForm();
      fetchQuestions();
      alert(editingId ? "Question updated successfully!" : "Question added successfully!");
    } catch (error) {
      console.error("Error saving question:", error);
      alert("Error saving question. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Edit question
  const handleEdit = (question) => {
    setNewQuestion({
      ...question,
      options: question.options || ["", ""],
      testCases: question.testCases || [{ input: "", expectedOutput: "" }],
      correctAnswer: question.correctAnswer || "" // Keep as string
    });
    setEditingId(question._id);
    setActiveTab(question.roundType);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Delete question
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this question?")) {
      try {
        setLoading(true);
        // await axios.delete(`/api/questions/${id}`);
        fetchQuestions();
        alert("Question deleted successfully!");
      } catch (error) {
        console.error("Error deleting question:", error);
        alert("Error deleting question. Please try again.");
      } finally {
        setLoading(false);
      }
    }
  };

  // Filter questions by round type
  const filteredQuestions = questions.filter(q => q.roundType === activeTab);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-10">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Assessment Questions Manager
          </h1>
          <p className="text-gray-600">
            Manage questions for Aptitude, Core, and Coding rounds
          </p>
        </div>

        {/* Tabs for Round Types */}
        <div className="flex flex-wrap gap-2 mb-8">
          {["APTITUDE", "CORE", "CODING"].map((type) => (
            <button
              key={type}
              onClick={() => {
                setActiveTab(type);
                setNewQuestion(prev => ({ 
                  ...initialQuestion, 
                  roundType: type,
                  options: type === "CODING" ? [] : ["", ""]
                }));
                setEditingId(null);
              }}
              className={`px-6 py-3 rounded-lg font-medium transition-all ${
                activeTab === type
                  ? "bg-blue-600 text-white shadow-lg"
                  : "bg-white text-gray-700 border border-gray-300 hover:bg-gray-50"
              }`}
            >
              {type.charAt(0) + type.slice(1).toLowerCase()} Round
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column - Form */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-800">
                {editingId ? "Edit Question" : "Add New Question"}
              </h2>
              <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                {activeTab} Round
              </span>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Question Text */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Question Text *
                </label>
                <textarea
                  value={newQuestion.questionText}
                  onChange={(e) => handleInputChange("questionText", e.target.value)}
                  placeholder="Enter your question here..."
                  rows={3}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>

              {/* Marks & Difficulty */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Marks
                  </label>
                  <input
                    type="number"
                    min="1"
                    value={newQuestion.marks}
                    onChange={(e) => handleInputChange("marks", parseInt(e.target.value) || 1)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Difficulty
                  </label>
                  <select
                    value={newQuestion.difficulty}
                    onChange={(e) => handleInputChange("difficulty", e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="EASY">Easy</option>
                    <option value="MEDIUM">Medium</option>
                    <option value="HARD">Hard</option>
                  </select>
                </div>
              </div>

              {/* MCQ Section for Aptitude & Core */}
              {(activeTab === "APTITUDE" || activeTab === "CORE") && (
                <>
                  <div className="border-t pt-6">
                    <div className="flex justify-between items-center mb-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Options *
                        </label>
                        <p className="text-sm text-gray-500">
                          Click the radio button next to an option to mark it as correct
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={addOption}
                        className="text-blue-600 hover:text-blue-800 font-medium text-sm whitespace-nowrap"
                      >
                        + Add Option
                      </button>
                    </div>
                    
                    <div className="space-y-3">
                      {newQuestion.options.map((option, index) => (
                        <div key={index} className="flex items-center gap-3">
                          <div className="flex items-center">
                            <input
                              type="radio"
                              id={`option-${index}`}
                              name="correctAnswer"
                              checked={newQuestion.correctAnswer === index.toString()}
                              onChange={() => setCorrectAnswer(index)}
                              className="h-5 w-5 text-blue-600 focus:ring-blue-500 cursor-pointer"
                            />
                          </div>
                          <div className="flex-1">
                            <label 
                              htmlFor={`option-${index}`}
                              className="block text-sm font-medium text-gray-700 mb-1 cursor-pointer"
                            >
                              Option {index + 1}
                            </label>
                            <input
                              type="text"
                              value={option}
                              onChange={(e) => handleOptionChange(index, e.target.value)}
                              placeholder={`Enter option ${index + 1} text`}
                              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                          </div>
                          {newQuestion.options.length > 2 && (
                            <button
                              type="button"
                              onClick={() => removeOption(index)}
                              className="text-red-600 hover:text-red-800 p-2 ml-2"
                              title="Remove option"
                            >
                              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                              </svg>
                            </button>
                          )}
                        </div>
                      ))}
                    </div>
                    
                    {/* Correct Answer Display */}
                    {newQuestion.correctAnswer && newQuestion.correctAnswer !== "" && (
                      <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-lg">
                        <div className="flex items-center">
                          <div className="flex-shrink-0">
                            <svg className="h-5 w-5 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                            </svg>
                          </div>
                          <div className="ml-3">
                            <p className="text-sm font-medium text-green-800">
                              Correct Answer Selected: 
                              <span className="ml-2 font-bold">
                                Option {parseInt(newQuestion.correctAnswer) + 1}
                              </span>
                            </p>
                            <p className="text-sm text-green-600 mt-1">
                              "{newQuestion.options[parseInt(newQuestion.correctAnswer)]}"
                            </p>
                          </div>
                        </div>
                      </div>
                    )}

                    {!newQuestion.correctAnswer && newQuestion.correctAnswer !== "0" && (
                      <div className="mt-4 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                        <div className="flex items-center">
                          <div className="flex-shrink-0">
                            <svg className="h-5 w-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                            </svg>
                          </div>
                          <div className="ml-3">
                            <p className="text-sm font-medium text-yellow-800">
                              No correct answer selected
                            </p>
                            <p className="text-sm text-yellow-600 mt-1">
                              Click a radio button above to select the correct answer
                            </p>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </>
              )}

              {/* Coding Section */}
              {activeTab === "CODING" && (
                <>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Round Time (minutes)
                      </label>
                      <input
                        type="number"
                        min="1"
                        value={newQuestion.roundTime}
                        onChange={(e) => handleInputChange("roundTime", parseInt(e.target.value) || 30)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                  </div>

                  {/* Test Cases */}
                  <div className="border-t pt-6">
                    <div className="flex justify-between items-center mb-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Test Cases *
                        </label>
                        <p className="text-sm text-gray-500">
                          Define input and expected output pairs
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={addTestCase}
                        className="text-blue-600 hover:text-blue-800 font-medium text-sm"
                      >
                        + Add Test Case
                      </button>
                    </div>
                    
                    <div className="space-y-4">
                      {newQuestion.testCases.map((testCase, index) => (
                        <div key={index} className="border border-gray-200 rounded-lg p-4">
                          <div className="flex justify-between items-center mb-3">
                            <span className="font-medium text-gray-700">
                              Test Case {index + 1}
                            </span>
                            {newQuestion.testCases.length > 1 && (
                              <button
                                type="button"
                                onClick={() => removeTestCase(index)}
                                className="text-red-600 hover:text-red-800 text-sm"
                              >
                                Remove
                              </button>
                            )}
                          </div>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                              <label className="block text-sm text-gray-600 mb-1">
                                Input
                              </label>
                              <input
                                type="text"
                                value={testCase.input}
                                onChange={(e) => handleTestCaseChange(index, "input", e.target.value)}
                                placeholder="e.g., [1,2,3] or 'hello'"
                                className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                              />
                            </div>
                            <div>
                              <label className="block text-sm text-gray-600 mb-1">
                                Expected Output
                              </label>
                              <input
                                type="text"
                                value={testCase.expectedOutput}
                                onChange={(e) => handleTestCaseChange(index, "expectedOutput", e.target.value)}
                                placeholder="e.g., 6 or 'olleh'"
                                className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                              />
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </>
              )}

              {/* Action Buttons */}
              <div className="flex gap-4 pt-6 border-t">
                <button
                  type="submit"
                  disabled={loading}
                  className="flex-1 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? (
                    <span className="flex items-center justify-center">
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Saving...
                    </span>
                  ) : editingId ? "Update Question" : "Add Question"}
                </button>
                
                {editingId && (
                  <button
                    type="button"
                    onClick={resetForm}
                    disabled={loading}
                    className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Cancel
                  </button>
                )}
              </div>
            </form>
          </div>

          {/* Right Column - Questions List */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-800">
                {activeTab.charAt(0) + activeTab.slice(1).toLowerCase()} Questions ({filteredQuestions.length})
              </h2>
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-500">
                  Total Marks: {filteredQuestions.reduce((sum, q) => sum + q.marks, 0)}
                </span>
              </div>
            </div>

            {loading ? (
              <div className="text-center py-10">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
                <p className="mt-4 text-gray-600">Loading questions...</p>
              </div>
            ) : filteredQuestions.length === 0 ? (
              <div className="text-center py-10">
                <div className="text-gray-400 mb-4">
                  <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <p className="text-gray-500 mb-2">No questions added yet</p>
                <p className="text-gray-400 text-sm">Start by adding your first question</p>
              </div>
            ) : (
              <div className="space-y-4">
                {filteredQuestions.map((question, index) => (
                  <div
                    key={question._id}
                    className="border border-gray-200 rounded-lg p-4 hover:border-blue-300 transition-colors"
                  >
                    <div className="flex justify-between items-start mb-3">
                      <div className="flex items-start space-x-3">
                        <span className="px-2 py-1 bg-gray-100 text-gray-800 rounded text-sm font-medium">
                          {index + 1}
                        </span>
                        <div>
                          <h3 className="font-medium text-gray-800">
                            {question.questionText.length > 100
                              ? question.questionText.substring(0, 100) + "..."
                              : question.questionText}
                          </h3>
                          <div className="flex items-center space-x-4 mt-1">
                            <span className="text-sm text-gray-600">
                              {question.marks} mark{question.marks !== 1 ? 's' : ''}
                            </span>
                            <span className="px-2 py-0.5 bg-gray-100 text-gray-700 rounded text-xs">
                              {question.difficulty}
                            </span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex space-x-2">
                        <button
                          onClick={() => handleEdit(question)}
                          className="p-2 text-blue-600 hover:bg-blue-50 rounded"
                          title="Edit"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                          </svg>
                        </button>
                        <button
                          onClick={() => handleDelete(question._id)}
                          className="p-2 text-red-600 hover:bg-red-50 rounded"
                          title="Delete"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </button>
                      </div>
                    </div>

                    {/* Show options for MCQ questions */}
                    {(question.roundType === "APTITUDE" || question.roundType === "CORE") && question.options && (
                      <div className="mt-3">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                          {question.options.map((option, optIndex) => (
                            <div
                              key={optIndex}
                              className={`px-3 py-2 rounded text-sm ${
                                question.correctAnswer === optIndex.toString()
                                  ? "bg-green-100 text-green-800 border border-green-300"
                                  : "bg-gray-50 text-gray-700"
                              }`}
                            >
                              <div className="flex items-center">
                                <span className="mr-2 font-medium">
                                  {String.fromCharCode(65 + optIndex)}.
                                </span>
                                <span>{option}</span>
                              </div>
                              {question.correctAnswer === optIndex.toString() && (
                                <div className="mt-1 text-xs font-medium text-green-700 flex items-center">
                                  <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                  </svg>
                                  Correct Answer
                                </div>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Show test cases count for coding questions */}
                    {question.roundType === "CODING" && (
                      <div className="mt-3">
                        <div className="flex items-center space-x-4 text-sm text-gray-600">
                          <span>
                            {question.testCases?.length || 0} test case(s)
                          </span>
                          {question.roundTime && (
                            <span>
                              Time: {question.roundTime} min
                            </span>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Summary */}
        <div className="mt-8 bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-lg font-bold text-gray-800 mb-4">Assessment Summary</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {["APTITUDE", "CORE", "CODING"].map((type) => {
              const typeQuestions = questions.filter(q => q.roundType === type);
              const totalMarks = typeQuestions.reduce((sum, q) => sum + q.marks, 0);
              return (
                <div key={type} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium text-gray-700">{type}</span>
                    <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-xs font-medium">
                      {typeQuestions.length} questions
                    </span>
                  </div>
                  <div className="text-sm text-gray-600">
                    Total Marks: <span className="font-bold">{totalMarks}</span>
                  </div>
                  <div className="mt-3">
                    <div className="flex justify-between text-xs text-gray-500">
                      <span>Easy: {typeQuestions.filter(q => q.difficulty === "EASY").length}</span>
                      <span>Medium: {typeQuestions.filter(q => q.difficulty === "MEDIUM").length}</span>
                      <span>Hard: {typeQuestions.filter(q => q.difficulty === "HARD").length}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuestionsManager;