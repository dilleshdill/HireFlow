import React, { useState } from "react";
import Navbar from "../Components/Navbar.jsx";
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
  Check ,CircleDashed, BriefcaseBusiness, ArrowRightIcon, MapPin, ArrowRight, ArrowLeftIcon,
  Users2,
  EllipsisVerticalIcon,
  ClipboardClock
} from "lucide-react";


import RecruiterPostJob from '../Components/Recruiter/RecruiterPostJob.jsx'
import RecruiterSettings from "../Components/Recruiter/RecruiterSettings.jsx";
import RecruiterPostedJobs from "../Components/Recruiter/RecruiterPostedJobs.jsx";
import SavedCandidates from "../Components/Recruiter/SavedCandidates.jsx";
import MyJobTests from "../Components/Recruiter/MyJobTests.jsx";
import { useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import RecruiterSidebar from "../Components/Recruiter/RecruiterSidebar.jsx";


const DOMAIN = import.meta.env.VITE_DOMAIN
const RecruiterDashboard = () => {

    const [selectedSidebar , setSelectedSidebar] = useState('overview')
    const [showAllJobs, setShowAllJobs] = useState(false);
    const [jobs , setJobs] = useState([]);
    const [jobNo , setJobNo] = useState(0);
    const [savedNo , setSavedNo] = useState(0);
    const [name , setName] = useState('')
    const [savedCandidates , setSavedCandidates] = useState([])
    const navigate = useNavigate();

  useEffect(() => {
    const savedSidebar = localStorage.getItem("sideBar");
    if (savedSidebar) {
      setSelectedSidebar(savedSidebar);
    }
  }, []);

    const getUserDetails = async () => {
        try {
            const response = await axios.get(DOMAIN + '/api/auth/get-user',{withCredentials:true})

            if(response.status === 200){
                setName(response.data.user.name)
            }
        } catch (error) {
         console.log(error.message)   
        }
    }

  useEffect(()=>{
    const fetchJobs = async() => {
      try {
        const response = await axios.get(DOMAIN + '/api/job/my-jobs' , {withCredentials:true})

        if(response.status === 200){
          setJobs(response.data.jobs)
          setJobNo(response.data.jobs.length)
        }
      } catch (error) {
        console.error("Failed to fetch jobs:", error);
      }
    }

    const fetchSavedCandidates = async () => {
            try {
              const response = await axios.get(DOMAIN + '/api/recruiter/get-all-savedCandidates',{withCredentials:true})
              if(response.status === 200){
                setSavedNo(response.data.savedCandidates.length)
                setSavedCandidates(response.data.savedCandidates)
              }
            } catch (error) {
              console.log(error.message)
            }
          }
    
    getUserDetails()
    fetchJobs();
    fetchSavedCandidates();
    
  },[])

  const visibleJobs = showAllJobs ? jobs : jobs.slice(0,4)


  return (
    <div className="min-h-screen flex flex-col">
      <div className="sm:hidden">
          <RecruiterSidebar selectedSidebar={selectedSidebar} setSelectedSidebar={setSelectedSidebar} />
        </div>
      <div className="flex flex-1 max-w-9xl mx-auto w-full px-4 py-4 gap-4">

        {/* Sidebar */}
        <div className="hidden sm:flex">
          <RecruiterSidebar selectedSidebar={selectedSidebar} setSelectedSidebar={setSelectedSidebar} />
        </div>


        {/* Main Content */}
        <div className="flex-1 max-w-6xl p-4 overflow-y-auto h-[calc(100vh-64px)]">
          {selectedSidebar === "overview" && (
            <>
                <div className="flex flex-col gap-1">
                    <p className="text-lg font-medium  text-gray-800">Hello , {name}</p>
                    <p className="text-sm text-gray-500">Here is your daily activities and job alerts</p>
                </div>

                {/* STATS CARDS */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-5 pb-4">

                    {/* Applied Jobs */}
                    <div className="bg-blue-50 rounded-lg p-4 flex items-center justify-between">
                    <div>
                        <p className="text-xl font-semibold">{jobNo}</p>
                        <p className="text-sm text-gray-500">Open Jobs</p>
                    </div>
                    <div className="p-3 bg-white rounded-md">
                        <BriefcaseBusiness className="size-6 text-blue-500" />
                    </div>
                    </div>

                    {/* Saved Jobs */}
                    <div className="bg-orange-100 rounded-lg p-4 flex items-center justify-between">
                    <div>
                        <p className="text-xl font-semibold">{savedNo}</p>
                        <p className="text-sm text-gray-500">Saved Candidates</p>
                    </div>
                    <div className="p-3 bg-white rounded-md">
                        <Bookmark className="size-6 text-orange-500" />
                    </div>
                    </div>

                    {/* Job Alerts */}
                    <div className="bg-green-100 rounded-lg p-4 flex items-center justify-between">
                    <div>
                        <p className="text-xl font-semibold">15</p>
                        <p className="text-sm text-gray-500">Job Alerts</p>
                    </div>
                    <div className="p-3 bg-white rounded-md">
                        <Bell className="size-6 text-green-500" />
                    </div>
                    </div>

                    {/* Profile Status */}
                    <div className="bg-purple-100 rounded-lg p-4 flex items-center justify-between">
                    <div>
                        <p className="text-xl font-semibold">80%</p>
                        <p className="text-sm text-gray-500">Profile Complete</p>
                    </div>
                    <div className="p-3 bg-white rounded-md">
                        <Settings className="size-6 text-purple-500" />
                    </div>
                    </div>

                </div>



                <div className="flex items-center justify-between p-2">
                    <p>Recently Posted Jobs</p>
                    <div  >
                        <button onClick={()=>setShowAllJobs(prev => !prev)} className="p-2 flex items-center justify-center text-gray-500 gap-2" >
                            {showAllJobs ? (
                                <>
                                    View less
                                    <ArrowLeftIcon className="size-4" />
                                </>
                                ) : (
                                <>
                                    View all
                                    <ArrowRightIcon className="size-4" />
                                </>
                            )}

                            
                        </button>
                    </div>
                </div>

                <div className="hidden sm:flex items-center justify-between pr-10 pl-1 bg-gray-200 text-gray-500 text-sm p-2 rounded-md">
                    <div className="pl-5">
                        <p>Jobs</p>
                    </div>
                    <div className="flex gap-30">
                        <p>Applications</p>
                        <p>Status</p>
                        <p>Action</p>
                    </div>
                </div>

                {/* MOBILE VIEW (GRID CARDS) */}
                    <div className="lg:col-span-3 grid grid-cols-1 sm:grid-cols-2 gap-6 sm:hidden">
                    {visibleJobs.map((job) => (
                        <div
                        key={job._id}
                        className="bg-white p-5 rounded-lg border border-gray-200 hover:shadow-md transition"
                        >
                        <div className="flex items-center gap-4 mb-4">
                            <img
                            src={job.postedBy.logoUrl}
                            alt="logo"
                            className="h-12 w-12 rounded-md object-contain"
                            />
                            <div>
                                <p className="font-semibold">{job.role}</p>
                            <p className="font-semibold text-xs">{job.jobType}</p>
                            <p className="text-xs text-gray-500 capitalize">
                                {job.type}
                            </p>
                            </div>
                        </div>

                        <div className="flex flex-col gap-2 text-sm text-gray-500">
                            <div className="flex items-center gap-2">
                            <MapPin className="size-4" />
                            {job.location}
                            </div>
                            <div className="flex items-center gap-2">
                            <Briefcase className="size-4" />
                            {job.vacancies} open jobs
                            </div>
                        </div>

                        <button
                        onClick={()=>navigate(`/find-candidates/${job._id}`)}
                        className="bg-blue-200 w-full mt-4 px-4 py-2 flex items-center justify-center gap-2 text-blue-500 rounded-md hover:bg-blue-300 transition">
                            View Applications
                            <ArrowRight className="size-4" />
                        </button>
                        </div>
                    ))}
                    </div>

                    {/* LAPTOP / DESKTOP VIEW (ONE CARD PER ROW) */}
                    <div className="hidden sm:flex lg:col-span-3 flex-col gap-4 pt-3">
                    {visibleJobs.map((job) => (
                        <div
                        key={job._id}
                        className="flex items-center justify-between p-4 border border-gray-200 rounded-lg bg-white hover:shadow-md transition"
                        >
                        {/* LEFT */}
                        <div className="flex items-center gap-4">
                            <img
                            src={job.postedBy.logoUrl}
                            alt="logo"
                            className="h-12 w-12 rounded-md object-contain"
                            />

                            <div className="flex flex-col gap-1">
                            <div className="flex items-center gap-2">
                                <p className="font-semibold">{job.role}</p>
                                
                                <span className="text-xs px-2 py-0.5 rounded-full bg-blue-100 text-blue-500 capitalize">
                                {job.jobType}
                                </span>
                            </div>
                            

                            <div className="flex items-center gap-4 text-sm text-gray-500">
                                <div className="flex items-center gap-1">
                                  <MapPin className="size-4" />
                                  {job.location}
                                </div>
                                <div className="flex items-center gap-1">
                                <Briefcase className="size-4" />
                                {job.vacancies} open jobs
                                </div>
                            </div>
                            </div>
                        </div>

                        {/* RIGHT */}
                        <div className="flex items-center justify-between w-110">
                            <div className="flex items-center justify-center gap-1 text-gray-400">
                              <Users2 className="size-4" />
                              <p className="text-sm ">{job.applications.length} Applications</p>
                            </div>
                            {job.isActive ? (
                                <div className="flex items-center justify-center gap-1 text-green-600">
                                    <Check className="size-4" />
                                    <p className="text-sm ">Active</p>
                                </div>
                            ):(
                                <div className="flex items-center justify-center text-orange-400 gap-2">
                                    <CircleDashed className="size-3" />
                                    <p className="text-sm">Expired</p>
                                </div>
                            )}
                            
                            
                            <div className="flex gap-2">
                              <button
                              onClick={()=>navigate(`/find-candidates/${job._id}`)}
                              
                              className="flex items-center gap-3 px-4 py-2 text-sm text-blue-500 font-medium bg-gray-100 rounded-md hover:bg-gray-200 transition">
                                View Applications
                              </button>
                              <button className="flex items-center text-sm text-gray-500 font-medium">
                                  <EllipsisVerticalIcon className="size-4" />
                              </button>
                            </div>
                        </div>
                        </div>
                    ))}
                    </div>
                        
            </>
            )}

            {selectedSidebar === "post-job" && (
            <>
                <RecruiterPostJob/>
            </>
            )}

            {selectedSidebar === "my-jobs" && (
                <>
                  <RecruiterPostedJobs />
                </>
            )}

            {selectedSidebar === "settings" && (
                <>
                  <RecruiterSettings />
                </>
            )}

            {selectedSidebar === "saved-candidates" && (
                <>
                  <SavedCandidates />
                </>
            )}

            {selectedSidebar === "my-tests" && (
                <>
                  <MyJobTests />
                </>
            )}

        </div>

      </div>
    </div>
  );
};

export default RecruiterDashboard;
