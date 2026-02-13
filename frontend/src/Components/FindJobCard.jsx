import React, { useEffect } from "react";
import iphonelogo from "../assets/iphonelogo.png";
import {
  ArrowRight,
  Bookmark,
  Calendar,
  CircleCheck,
  DollarSignIcon,
  MapPin,
} from "lucide-react";
import axios from "axios";
import { useState } from "react";


const DOMAIN = import.meta.env.VITE_DOMAIN
const FindJobCard = () => {

  const [jobs , setJobs] = useState([])
  const [appliedJobs , setAppliedJobs] = useState([])
  const [favoriteJobs , setFavoriteJobs] = useState([])
  const [showDelete, setShowDelete] = useState(false);
  const [curDeleteId, setCurDeleteId] = useState("");
  const [showAdded, setShowAdded] = useState(false);
  const [curAddedId, setCurAddedId] = useState("");


  useEffect(()=>{
    const fetchJobs = async () => {
      try {
        const response = await axios.get(DOMAIN + '/api/job/all-jobs')

        if (response.status === 200){
          console.log(response.data.jobs)
          setJobs(response.data.jobs)
        }
      } catch (error) {
        console.log(error.message)
      }
    }

    const fetchAppliedJobs = async () => {
      try {
        const response = await axios.get(DOMAIN + '/api/job/applied-jobs',{withCredentials:true})
        if(response.status === 200){
          console.log(response.data)
          setAppliedJobs(response.data.jobs)
        }
      } catch (error) {
        console.log(error.message)
      }
    }
    
    const fetchFavoriteJobs = async () => {
      try {
        const response = await axios.get(DOMAIN + '/api/job/get-favorite',{withCredentials:true})

        if(response.status === 200){
          console.log(response.data)
          setFavoriteJobs(response.data.jobs)
        }
      } catch (error) {
        
      }
    }

    fetchJobs();
    fetchAppliedJobs();
    fetchFavoriteJobs();
  },[])

  const isExpired = (date) => new Date(date) < new Date();

  const applyJob = async (jobId) =>{
    try {
      const response = await axios.post(DOMAIN + '/api/job/apply',{jobId},{withCredentials:true})
      if(response.status === 200){
        console.log(response.data)
        setAppliedJobs((prev) => [...prev, response.data.application]);
      }
    } catch (error) {
      console.log(error.message)
    }
  }

  const addToFavorite = async (jobId) => {
    try {
      const response = await axios.post(DOMAIN + '/api/job/addTo-favorite',{jobId},{withCredentials:true})
      
      if (response.status === 200){
        console.log(response.data)
        setFavoriteJobs((prev) => [...prev,response.data.favorite])
      }
    } catch (error) {
      console.log(error.message)
    }
  }


  const removeFavorite = async (jobId) => {
    try {
      const response = await axios.post(DOMAIN + '/api/job/remove-favorite',{jobId},{withCredentials:true})
      
      if (response.status === 200){
        console.log(response.data)
        setFavoriteJobs((prev) => prev.filter((fav)=> fav.jobId?._id !== jobId))
      }
    } catch (error) {
      console.log(error.message)
    }
  }

  
  return (
    <div className="w-full bg-gray-50 py-4">
      {jobs.map((job) => (
<<<<<<< HEAD
        <div key={job._id} className="w-full bg-white p-4">
=======
        <div key={job._id} className="w-full bg-white p-4" onClick={()=>navigate(`/company-profile/${job._id}`)}>
=======
    <div className="w-full  py-4 ">

      <div className="w-full bg-gray-100">
      <div className="max-w-7xl mx-auto px-4 py-4">
        
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <p className="font-semibold">Find Jobs</p>
          <p className="text-sm text-gray-500">Home / Find Jobs</p>
        </div>

        {/* Filters */}
        <div className="w-full bg-white grid grid-cols-1 sm:grid-cols-5 gap-3 p-4 rounded-sm shadow-sm">

          {/* Search */}
          <div className="flex items-center gap-2 border border-gray-200 rounded-sm px-3 py-2">
            <SearchIcon className="size-4 text-[#0A65CC]" />
            <input
              onChange={(e)=>setSearch(e.target.value)}
              value={search}
              type="text"
              placeholder="Job title, keyword..."
              className="w-full outline-none text-sm"
            />
          </div>

          {/* Location */}
          <div className="flex items-center gap-2 border border-gray-200 rounded-sm px-3 py-2">
            <MapPin className="size-4 text-[#0A65CC]" />
            <input
              type="text"
              placeholder="Location"
              className="w-full outline-none text-sm"
            />
          </div>

          {/* Category */}
          <div className="flex items-center gap-2 border border-gray-200 rounded-md px-3 py-2">
            <Layers className="size-4 text-[#0A65CC]" />
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full outline-none bg-transparent text-sm cursor-pointer"
            >
              <option value="" disabled>
                Select Category
              </option>
              <option value="fullstack">Full Stack</option>
              <option value="Frontend">Frontend</option>
              <option value="backend">Backend</option>
              <option value="uiux">UI / UX</option>
            </select>
          </div>

          {/* Advanced */}
          <div onClick={()=>setIsAdvanced(!isAdvanced)} className="flex items-center justify-between px-4 border border-gray-200 gap-1 text-sm text-gray-600 cursor-pointer">
            <span>Advanced Options</span>
            
            {isAdvanced ? <ChevronUp className="size-4" /> : <ChevronDown className="size-4" />}
          </div>

          {/* Button */}
          <div className="flex items-center justify-between gap-1">
            <button className="bg-[#045fc7] p-2 w-full cursor-pointer text-white rounded-md text-sm hover:bg-[#034da3] transition">
              Find Job
            </button>
            <button
                onClick={() => {
                  setExperience("");
                  setSalary("");
                  setJobType([]);
                  setEducation([]);
                  setJobLevel("");
                }}
                className=" bg-gray-200 cursor-pointer hover:bg-gray-300 w-full p-2 rounded-md text-sm"
              >
                Clear Filters
            </button>
          </div>

            {isAdvanced && (
                <div className="sm:col-span-5 grid grid-cols-1 sm:grid-cols-5 gap-6 p-4 ">

                  {/* Experience (Radio) */}
                  <div className="flex flex-col gap-2">
                    <p className="font-semibold mb-2">Experience</p>
                    {jobFilterData.experience.map((item) => (
                        <label key={item.value} className="flex items-center gap-2 text-sm cursor-pointer">
                        <input
                            type="radio"
                            name="experience"
                            value={item.value}
                            checked={experience === item.value}
                            onChange={(e) => setExperience(e.target.value)}
                            className="accent-[#0A65CC]"
                        />
                        <span className={experience === item.value ? "text-[#0A65CC]" : ""}>
                            {item.label}
                        </span>
                        </label>
                    ))}
                    </div>

                    {/* Salary (Radio) */}
                    <div className="flex flex-col gap-2">
                        <p className="font-semibold mb-2">Salary</p>
                        {jobFilterData.salary.map((item) => (
                            <label key={item.value} className="flex items-center gap-2 text-sm cursor-pointer">
                            <input
                                type="radio"
                                name="salary"
                                value={item.value}
                                checked={salary === item.value}
                                onChange={(e) => setSalary(e.target.value)}
                                className="accent-[#0A65CC]"
                            />
                            <span className={salary === item.value ? "text-[#0A65CC]" : ""}>
                                {item.label}
                            </span>
                            </label>
                        ))}
                    </div>

                    {/* Job Type (Checkbox) */}
                    <div className="flex flex-col gap-2">
                        <p className="font-semibold mb-2">Job Type</p>
                        {jobFilterData.jobType.map((item) => (
                            <label key={item.value} className="flex items-center gap-2 text-sm cursor-pointer">
                            <input
                                type="checkbox"
                                checked={jobType.includes(item.value)}
                                onChange={() =>
                                handleCheckboxChange(jobType, setJobType, item.value)
                                }
                                className="accent-[#0A65CC]"
                            />
                            <span className={jobType.includes(item.value) ? "text-[#0A65CC]" : ""}> {item.label}</span>
                            
                            </label>
                        ))}
                    </div>

                    {/* Education (Checkbox) */}
                    <div className="flex flex-col gap-2">
                    <p className="font-semibold mb-2">Education</p>
                    {jobFilterData.education.map((item) => (
                        <label key={item.value} className="flex items-center gap-2 text-sm cursor-pointer">
                        <input
                            type="checkbox"
                            checked={education.includes(item.value)}
                            onChange={() =>
                            handleCheckboxChange(education, setEducation, item.value)
                            }
                            className="accent-[#0A65CC]"
                        />
                        <span className={education.includes(item.value) ? "text-[#0A65CC]" : ""}> {item.label}</span>
                        </label>
                    ))}
                    </div>

                    {/* Job Level (Radio) */}
                    <div className="flex flex-col gap-2">
                    <p className="font-semibold mb-2">Job Level</p>
                    {jobFilterData.jobLevel.map((item) => (
                        <label key={item.value} className="flex items-center gap-2 text-sm cursor-pointer">
                        <input
                            type="radio"
                            name="jobLevel"
                            value={item.value}
                            checked={jobLevel === item.value}
                            onChange={(e) => setJobLevel(e.target.value)}
                            className="accent-[#0A65CC]"
                        />
                        <span className={jobLevel === item.value ? "text-[#0A65CC]" : ""}>
                            {item.label}
                        </span>
                        </label>
                    ))}
                    </div>

                </div>
            )}

        </div>
      </div>
    </div>


      <div className="flex flex-col justify-between min-h-[65vh]">
        <div>
          {filteredJobs.map((job) => (
        <div key={job._id} className="w-full bg-white p-2">
>>>>>>> 2c7ec48a9858cb37bb03b5af12ef05f0d9527410
>>>>>>> ad8f396d1be9552a96eb34139a7e33f21f376ce9
          <div className="max-w-7xl mx-auto px-4 py-4 border border-gray-200 rounded-lg hover:shadow-md transition">

            {/* MAIN FLEX */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">

              {/* LEFT SECTION */}
              <div className="flex flex-col sm:flex-row gap-4 sm:flex-1">

                {/* Logo */}
                <img
                  src={iphonelogo}
                  alt="logo"
                  className="h-14 w-14 rounded-lg object-contain"
                />

                {/* Job Info */}
                <div className="flex flex-col gap-3">
                  <div className="flex flex-wrap gap-2 items-center">
                    <p className="text-md font-medium">{job.title}</p>

                    {job.featured && (
                      <span className="text-xs bg-red-100 px-2 py-1 rounded-full text-red-500">
                        Featured
                      </span>
                    )}

                    <span className="text-xs bg-blue-100 px-2 py-1 rounded-full text-blue-500">
                      {job.jobType}
                    </span>
                  </div>

                  <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                    <div className="flex items-center gap-1">
                      <MapPin className="size-4" />
                      <span>{job.location || "Hyderabad"}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <DollarSignIcon className="size-4" />
                      <span>
                        {job.salary?.max
                          ? `${job.salary.max}k ${job.salary.type}`
                          : "Not disclosed"}
                      </span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar className="size-4" />
                      <span>{new Date(job.expirationDate).toLocaleDateString()}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* RIGHT SECTION */}
              <div className="flex items-center justify-between sm:justify-end gap-4 sm:flex-shrink-0">
                {favoriteJobs.some((f)=>  f.jobId?._id === job._id)?(
                  <button
                      onClick={() => {
                        setCurDeleteId(job._id);
                          setShowDelete(true);}}
                            className="cursor-pointer">
                            <Bookmark className="size-5" fill="black" />
                    </button>
                ):(
                  <button onClick={()=>{setCurAddedId(job._id);setShowAdded(true);}} >
                    <Bookmark 
                  
                 className="size-5 text-gray-500 cursor-pointer hover:text-blue-500" />
                  </button>
                )}
                {isExpired(job.expirationDate) ? (
                    <button
                      disabled
                      className="bg-gray-200 px-4 py-2 text-gray-500 rounded-md cursor-not-allowed"
                    >
                      Expired
                    </button>
                  ) : appliedJobs.some((app) => app.jobId?._id === job._id)
                     ? (
                    <button
                      disabled
                      className="bg-gray-200 px-4 py-2 text-gray-500 rounded-md cursor-not-allowed"
                    >
                      Already Applied
                    </button>
                  ) : (
                    <button
                      onClick={() => applyJob(job._id)}
                      className="bg-blue-100 px-4 py-2 flex items-center gap-2 text-blue-500 rounded-md hover:bg-blue-200 transition"
                    >
                      Apply Now
                      <ArrowRight className="size-4" />
                    </button>
                  )}

              </div>

            </div>
          </div>
        </div>
      ))}

      {/* DELETE MODAL */}
      {showDelete && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50">
          <div className="bg-white shadow-md rounded-xl py-6 px-5 md:w-[460px] w-[370px] border border-gray-200">
            <div className="flex items-center justify-center p-4 bg-red-100 rounded-full">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M2.875 5.75h1.917m0 0h15.333m-15.333 0v13.417a1.917 1.917 0 0 0 1.916 1.916h9.584a1.917 1.917 0 0 0 1.916-1.916V5.75m-10.541 0V3.833a1.917 1.917 0 0 1 1.916-1.916h3.834a1.917 1.917 0 0 1 1.916 1.916V5.75m-5.75 4.792v5.75m3.834-5.75v5.75" stroke="#DC2626" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
            </div>

            <h2 className="text-gray-900 font-semibold mt-4 text-xl text-center">
              Are you sure?
            </h2>

            <p className="text-sm text-gray-600 mt-2 text-center">
              Do you really want to continue? <br />
              This action cannot be undone.
            </p>

            <div className="flex items-center justify-center gap-4 mt-5">
              <button
                onClick={() => {
                  setShowDelete(false);
                  setCurDeleteId("");
                }}
                className="w-36 h-10 rounded-md border border-gray-300 bg-white text-gray-600 text-sm hover:bg-gray-100 transition"
              >
                Cancel
              </button>

              <button
                onClick={() => {
                  removeFavorite(curDeleteId);
                  setCurDeleteId("");
                  setShowDelete(false);
                }}
                className="w-36 h-10 rounded-md text-white bg-red-600 text-sm hover:bg-red-700 transition"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Added MODAL */}
      {showAdded && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50">
          <div className="bg-white shadow-md rounded-xl py-6 px-5 md:w-[460px] w-[370px] border border-gray-200">
            <div className="flex items-center justify-center p-4 bg-blue-100 rounded-full">
                <CircleCheck className="size-8 text-blue-600" />
            </div>

            <h2 className="text-gray-900 font-semibold mt-4 text-xl text-center">
              Are you sure?
            </h2>

            <p className="text-sm text-gray-600 mt-2 text-center">
              Do you really want to continue? <br />
              This action cannot be undone.
            </p>

            <div className="flex items-center justify-center gap-4 mt-5">
              <button
                onClick={() => {
                  setShowAdded(false);
                  setCurAddedId("");
                }}
                className="w-36 h-10 rounded-md border border-gray-300 bg-white text-gray-600 text-sm hover:bg-gray-100 transition"
              >
                Cancel
              </button>

              <button
                onClick={() => {
                  addToFavorite(curAddedId);
                  setCurAddedId("");
                  setShowAdded(false);
                }}
                className="w-36 h-10 rounded-md text-white bg-red-600 text-sm hover:bg-red-700 transition"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FindJobCard;
