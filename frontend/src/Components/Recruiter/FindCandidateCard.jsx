import React from "react";
import iphonelogo from "../../assets/iphonelogo.png";

import {
  ArrowRight,
  Bookmark,
  Calendar,
  CircleCheck,
  DollarSignIcon,
  MapPin,
} from "lucide-react";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";
import { useState } from "react";


const DOMAIN = import.meta.env.VITE_DOMAIN
const FindCandidateCard = () => {

  const {id} = useParams()
  const [candidates , setCandidates] = useState([])
  const [savedCandidates , setSavedCandidates] = useState([])
  const [showDelete, setShowDelete] = useState(false);
  const [curDeleteId, setCurDeleteId] = useState("");
  const [showAdded, setShowAdded] = useState(false);
  const [curAddedId, setCurAddedId] = useState("");
  
  useEffect(()=>{
    const fetchCandidates = async () => {
      try {
        const response = await axios.get(DOMAIN + `/api/job/get-candidates/${id}`,{withCredentials:true})
        if(response.status === 200){
          console.log(response.data.candidates)
          setCandidates(response.data.candidates)
        }
      } catch (error) {
        console.log(error.message)
      }
    }

    const fetchSavedCandidates = async () => {
      try {
        const response = await axios.get(DOMAIN + '/api/recruiter/get-all-savedCandidates',{withCredentials:true})
        if(response.status === 200){
          console.log(response.data.savedCandidates)
          setSavedCandidates(response.data.savedCandidates)
        }
      } catch (error) {
        console.log(error.message)
      }
    }

    
    fetchCandidates();
    fetchSavedCandidates();

    
  },[])

  const addToSaved = async (userId) => {
    try {
      const response = await axios.post(DOMAIN + '/api/recruiter/save-candidate',{userId} , {withCredentials:true})
      if(response.status === 200){
        console.log(response.data)
        setSavedCandidates((prev)=> [...prev,response.data.savedCandidates])
      }
    } catch (error) {
      console.log(error.message)
    }
  }

  const removeFromSaved = async (userId) => {
    try {
      const response = await axios.post(DOMAIN + '/api/recruiter/remove-candidate',{userId},{withCredentials:true})
      if(response.status === 200){
        console.log(response.data)
        setCandidates((prev) =>
          prev.filter((saved) => saved.userId?._id !== userId)
        );
      }
    } catch (error) {
      console.log(error.message)
    }
  }

  return (
    <div className="w-full bg-gray-50 py-4">
      {candidates.map((item) => (
        <div key={item._id} className="w-full bg-white p-4">
          <div className="max-w-7xl mx-auto px-4 py-4 border border-gray-200 rounded-lg hover:shadow-md transition">

            {/* MAIN FLEX */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">

              {/* LEFT SECTION */}
              <div className="flex  gap-4 sm:flex-1 sm:items-center">

                {/* Logo */}
                <img
                  src={item.userLogo || iphonelogo}
                  alt="logo"
                  className="h-14 w-14 rounded-lg object-contain"
                />

                {/* Job Info */}
                <div className="flex flex-col gap-1">
                  <div className="flex flex-wrap items-center">
                    <p className="text-md font-medium">{item.name}</p>

                  </div>
                    <p className="text-sm text-gray-500">{item.profile.title}</p>
                  <div className="flex flex-wrap gap-4 text-sm text-gray-400">
                    <div className="flex items-center gap-1">
                      <MapPin className="size-4" />
                      <span>{item.profile.location}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <DollarSignIcon className="size-4" />
                      <span>{item.profile.experience} experience</span>
                    </div>

                  </div>
                </div>
              </div>

              {/* RIGHT SECTION */}
              <div className="flex items-center justify-between sm:justify-end gap-4 sm:flex-shrink-0">
                {savedCandidates.some(
                    (s) => s && String(s.userId) === String(item._id)
                  )?
                  (
                  <button
                    onClick={()=>{setCurDeleteId(item._id),setShowDelete(true)}}
                    className="cursor-pointer"
                  >
                    <Bookmark className="size-5" fill="black" />
                  </button>
                ):(
                  <button
                    onClick={()=>{setCurAddedId(item._id),setShowAdded(true)}}
                  >
                    <Bookmark className="size-6 text-gray-500 cursor-pointer hover:text-blue-500" />
                  </button>
                )}
                
                
                <button className="bg-blue-100 px-4 py-2 flex text-md font-medium items-center gap-2 text-blue-500 rounded-md hover:bg-blue-600 hover:text-white transition">
                  View Profile
                  <ArrowRight className="size-4" />
                </button>
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
                  removeFromSaved(curDeleteId);
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
                  addToSaved(curAddedId);
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

export default FindCandidateCard;
