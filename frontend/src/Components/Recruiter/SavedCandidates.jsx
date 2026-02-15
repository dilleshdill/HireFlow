import React from 'react'
import {
  LayoutDashboard,
  User,
  PlusSquare,
  Briefcase,
  Bookmark,
  Users,
  Building2,
  Settings,
  Bell,
  Check,
  CircleDashed,
  BriefcaseBusiness,
  ArrowRightIcon,
  MapPin,
  ArrowRight,
  DollarSignIcon,
  ArrowLeftIcon,
  Users2,
  EllipsisVerticalIcon,
} from "lucide-react";
import { useEffect } from 'react';
import { useState } from 'react';
import axios from 'axios';
import iphonelogo from "../../assets/iphonelogo.png";
import { useNavigate } from 'react-router-dom';
import Loader from '../Loader';


const DOMAIN = import.meta.env.VITE_DOMAIN
const SavedCandidates = () => {

//     const savedCandidates = [
//   {
//     id: 1,
//     image: "https://randomuser.me/api/portraits/men/32.jpg",
//     name: "Rahul Sharma",
//     role: "Frontend Developer",
//   },
//   {
//     id: 2,
//     image: "https://randomuser.me/api/portraits/women/45.jpg",
//     name: "Ananya Reddy",
//     role: "Full Stack Developer",
//   },
//   {
//     id: 3,
//     image: "https://randomuser.me/api/portraits/men/67.jpg",
//     name: "Suresh Kumar",
//     role: "Backend Developer",
//   },
//   {
//     id: 4,
//     image: "https://randomuser.me/api/portraits/women/22.jpg",
//     name: "Priya Singh",
//     role: "MERN Stack Developer",
//   },
//   {
//     id: 5,
//     image: "https://randomuser.me/api/portraits/men/81.jpg",
//     name: "Arjun Patel",
//     role: "React Developer",
//   },
// ];

  const [savedCandidates , setSavedCandidates] = useState([])
  const [candidates , setCandidates] = useState([])
  const [showDelete, setShowDelete] = useState(false);
  const [curDeleteId, setCurDeleteId] = useState("");
  const [showAdded, setShowAdded] = useState(false);
  const [curAddedId, setCurAddedId] = useState("");
  const [loading , setLoading] = useState(true)
  const navigate = useNavigate()

  useEffect(()=>{
  const fetchSavedCandidates = async () => {
        try {
          const response = await axios.get(DOMAIN + '/api/recruiter/get-all-savedCandidates',{withCredentials:true})
          if(response.status === 200){
            console.log(response.data.savedCandidates)
            setSavedCandidates(response.data.savedCandidates)
          }
        } catch (error) {
          console.log(error.message)
        }finally{
          setLoading(false)
        }
      }

    fetchSavedCandidates();

  },[])


  const removeFromSaved = async (userId) => {
    try {
      const response = await axios.post(DOMAIN + '/api/recruiter/remove-candidate',{userId},{withCredentials:true})
      if(response.status === 200){
        console.log(response.data)
        setSavedCandidates((prev) =>
          prev.filter((saved) => saved.userId?._id !== userId)
        );
      }
    } catch (error) {
      console.log(error.message)
    }
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen w-full">
        <Loader />
      </div>
    );
  }


  return (
    <div>
      {/* MOBILE VIEW (GRID CARDS) */}
      <div className="lg:col-span-3 grid grid-cols-1 sm:grid-cols-2 gap-6 sm:hidden">
        {savedCandidates.map((candidate) => (
          <div
            key={candidate._id}
            className="bg-white p-5 rounded-lg border border-gray-200 hover:shadow-md transition"
          >
            <div className="flex items-center gap-4 mb-4">
              <img
                src={candidate.image || iphonelogo}
                alt="logo"
                className="h-12 w-12 rounded-md object-contain"
              />
              <div>
                <p className="font-semibold">{candidate.userId.userId.name}</p>
                <p className="font-semibold text-xs">{candidate.userId.title}</p>
                <p className="text-xs text-gray-500 capitalize">{candidate.userId.websiteUrl}</p>
              </div>
            </div>

            <div className="flex flex-col gap-2 text-sm text-gray-500">
              <div className="flex items-center gap-2">
                <MapPin className="size-4" />
                {candidate.userId.location}
              </div>
              <div className="flex items-center gap-2">
                <Briefcase className="size-4" />
                {candidate.userId.experience} Experience
              </div>
            </div>

            <button
              onClick={()=>navigate(`/user/job-page/${candidate.userId._id}`)}
             className="bg-blue-200 w-full mt-4 px-4 py-2 flex items-center justify-center gap-2 text-blue-500 rounded-md hover:bg-blue-300 transition">
              View Profile
              <ArrowRight className="size-4" />
            </button>
          </div>
        ))}
      </div>

      {/* LAPTOP / DESKTOP VIEW (ONE CARD PER ROW) */}
      <div className="hidden sm:flex lg:col-span-3 flex-col gap-4 pt-3">
        <h2 className='font-medium'>Saved Candidates ( {savedCandidates.length} )</h2>
        {savedCandidates.map((candidate) => (
          <div
            key={candidate._id}
            className="flex items-center justify-between p-4 border border-gray-200 rounded-lg bg-white hover:shadow-md transition"
          >
             {/* LEFT SECTION */}
              <div className="flex  gap-4 sm:flex-1 sm:items-center">

                {/* Logo */}
                <img
                  src={candidate.userLogo || iphonelogo}
                  alt="logo"
                  className="h-14 w-14 rounded-lg object-contain"
                />

                {/* Job Info */}
                <div className="flex flex-col gap-1">
                  <div className="flex flex-wrap items-center">
                    <p className="text-md font-medium">{candidate.userId.userId.name}</p>

                  </div>
                    <p className="text-sm text-gray-500">{candidate.userId.title}</p>
                  <div className="flex flex-wrap gap-4 text-sm text-gray-400">
                    <div className="flex items-center gap-1">
                      <MapPin className="size-4" />
                      <span>{candidate.userId.location}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <DollarSignIcon className="size-4" />
                      <span>{candidate.userId.experience} experience</span>
                    </div>

                  </div>
                </div>
              </div>

            {/* RIGHT */}
            <div className="flex items-center justify-between ">

              <div className="flex gap-2 items-center">
                <button onClick={()=>{setCurDeleteId(candidate.userId._id),setShowDelete(true)}}>
                  <Bookmark className='size-5 cursor-pointer' fill='blac' />
                </button>
                <button onClick={()=>navigate(`/user/job-page/${candidate.userId._id}`)} className="flex items-center gap-3 px-4 py-2 text-sm text-blue-500 font-medium bg-blue-100 rounded-md hover:bg-gray-200 transition">
                  View Profile
                  <ArrowRightIcon className='size-4' />
                </button>
                <button className="flex items-center text-sm text-gray-500 font-medium">
                  <EllipsisVerticalIcon className="size-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

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

    </div>
  )
}

export default SavedCandidates