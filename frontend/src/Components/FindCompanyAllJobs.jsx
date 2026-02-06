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
import { useParams } from "react-router-dom";




const DOMAIN = import.meta.env.VITE_DOMAIN
const FindCompanyAllJobs = () => {
    
    const { id } = useParams();
  const [jobs , setJobs] = useState([])
  const [appliedJobs , setAppliedJobs] = useState([])
  const [favoriteJobs , setFavoriteJobs] = useState([])
  const [showDelete, setShowDelete] = useState(false);
  const [curDeleteId, setCurDeleteId] = useState("");
  const [showAdded, setShowAdded] = useState(false);
  const [curAddedId, setCurAddedId] = useState("");

    console.log("id",id)
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

    const companyJobs = async () => {
        try {
            
            const response = await axios.get(DOMAIN + `/api/job/company-jobs/${id}`)
            if(response.status === 200){
                console.log(response.data)
            }
        } catch (error) {
            console.log(error.message)
        }
    }

    // fetchJobs();
    // fetchAppliedJobs();
    // fetchFavoriteJobs();
    companyJobs();
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
        <div key={job._id} className="w-full bg-white p-4">
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

export default FindCompanyAllJobs;
