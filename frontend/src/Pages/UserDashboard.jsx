import React, { useState } from "react";
import Navbar from "../Components/Navbar.jsx";
import { Layers, Briefcase, Bell,Check ,CircleDashed, Settings, BriefcaseBusiness, Bookmark, ArrowRightIcon, MapPin, ArrowRight, ArrowLeftIcon } from "lucide-react";
import iphonelogo from '../assets/iphonelogo.png';
import UserAppliedJobs from "../Components/UserAppliedJobs.jsx";
const UserDashboard = () => {

    const [selectedSidebar , setSelectedSidebar] = useState('overview')
    const [showAllJobs, setShowAllJobs] = useState(false);


const sidebarData = [
  {
    id: 1,
    icon: <Layers />,
    label: "Overview",
    value: "overview",
  },
  {
    id: 2,
    icon: <Briefcase />,
    label: "Applied Jobs",
    value: "applied-jobs",
  },
  {
    id: 3,
    icon: <Bookmark />,
    label: "Favorite Jobs",
    value: "favorite-jobs",
  },
  {
    id: 4,
    icon: <Bell />,
    label: "Job Alerts",
    value: "job-alerts",
  },
  {
    id: 5,
    icon: <Settings />,
    label: "Settings",
    value: "settings",
  },
];

const jobs = [
  {
    id: 1,
    name: "Tech Solutions Inc.",
    jobRole: "Frontend Developer",
    image: "https://cdn-icons-png.flaticon.com/512/5968/5968705.png",
    location: "San Francisco, CA",
    status: "active",
    type: "full-time",
    salary: "$120,000 / year",
    dateApplied: "2025-01-05",
  },
  {
    id: 2,
    name: "Innovatech Corp.",
    jobRole: "Full Stack Engineer",
    image: "https://cdn-icons-png.flaticon.com/512/5968/5968292.png",
    location: "New York, NY",
    status: "pending",
    type: "remote",
    salary: "$95,000 / year",
    dateApplied: "2025-01-08",
  },
  {
    id: 3,
    name: "Global Enterprises",
    jobRole: "Backend Developer",
    image: "https://cdn-icons-png.flaticon.com/512/5968/5968672.png",
    location: "Chicago, IL",
    status: "active",
    type: "part-time",
    salary: "$45 / hour",
    dateApplied: "2025-01-10",
  },
  {
    id: 4,
    name: "Creative Minds LLC",
    jobRole: "UI/UX Designer",
    image: "https://cdn-icons-png.flaticon.com/512/5968/5968267.png",
    location: "Austin, TX",
    status: "pending",
    type: "full-time",
    salary: "$105,000 / year",
    dateApplied: "2025-01-12",
  },
  {
    id: 5,
    name: "CloudNine Systems",
    jobRole: "DevOps Engineer",
    image: "https://cdn-icons-png.flaticon.com/512/5968/5968282.png",
    location: "Seattle, WA",
    status: "active",
    type: "remote",
    salary: "$110,000 / year",
    dateApplied: "2025-01-15",
  },
  {
    id: 6,
    name: "NextGen Innovations",
    jobRole: "QA Engineer",
    image: "https://cdn-icons-png.flaticon.com/512/5968/5968295.png",
    location: "Boston, MA",
    status: "pending",
    type: "part-time",
    salary: "$40 / hour",
    dateApplied: "2025-01-17",
  },
  {
    id: 7,
    name: "Apex Technologies",
    jobRole: "Software Engineer",
    image: "https://cdn-icons-png.flaticon.com/512/5968/5968300.png",
    location: "Denver, CO",
    status: "active",
    type: "full-time",
    salary: "$98,000 / year",
    dateApplied: "2025-01-19",
  },
  {
    id: 8,
    name: "Bright Future Labs",
    jobRole: "Data Scientist",
    image: "https://cdn-icons-png.flaticon.com/512/5968/5968312.png",
    location: "Los Angeles, CA",
    status: "pending",
    type: "remote",
    salary: "$115,000 / year",
    dateApplied: "2025-01-21",
  },
  {
    id: 9,
    name: "Summit Solutions",
    jobRole: "Product Manager",
    image: "https://cdn-icons-png.flaticon.com/512/5968/5968321.png",
    location: "Dallas, TX",
    status: "active",
    type: "full-time",
    salary: "$90,000 / year",
    dateApplied: "2025-01-23",
  },
  {
    id: 10,
    name: "BlueWave Tech",
    jobRole: "Mobile App Developer",
    image: "https://cdn-icons-png.flaticon.com/512/5968/5968330.png",
    location: "Miami, FL",
    status: "pending",
    type: "part-time",
    salary: "$42 / hour",
    dateApplied: "2025-01-25",
  },
];

    const visibleJobs = showAllJobs ? jobs : jobs.slice(0,4)


  return (
    <div className="min-h-screen flex flex-col">

      {/* Navbar */}
      {/* <Navbar /> */}

      {/* Content wrapper */}
      <div className="flex flex-1 max-w-9xl mx-auto w-full px-4 py-4 gap-4">

        {/* Sidebar */}
        <div className="w-64 pl-4 pt-4 pb-4 border-r border-gray-200  hidden sm:block sticky top-0 h-[calc(100vh-64px)]">

            <p className="font-medium text-gray-600 pb-3 px-5">
                Candidate Dashboard
            </p>

            <div className="flex flex-col gap-2 text-gray-600 text-sm">
                {sidebarData.map((item) => (
                <div
                    key={item.id}
                    onClick={() => setSelectedSidebar(item.value)}
                    className={`flex items-center gap-3 cursor-pointer p-2 px-7 
                    hover:bg-gray-100
                    ${
                        selectedSidebar === item.value
                        ? "border-l-4 border-[#0A65CC] text-[#0A65CC] bg-[#0A65CC]/10"
                        : ""
                    }
                    `}
                >
                    <span className="text-lg">{item.icon}</span>
                    <span>{item.label}</span>
                </div>
                ))}
            </div>
        </div>


        {/* Main Content */}
        <div className="flex-1 max-w-6xl p-4 overflow-y-auto h-[calc(100vh-64px)]">
          {selectedSidebar === "overview" && (
            <>
                <div className="flex flex-col gap-1">
                    <p className="text-lg font-medium  text-gray-800">Hello , Dillesh Nakkina</p>
                    <p className="text-sm text-gray-500">Here is your daily activities and job alerts</p>
                </div>

                {/* STATS CARDS */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-5 pb-4">

                    {/* Applied Jobs */}
                    <div className="bg-blue-50 rounded-lg p-4 flex items-center justify-between">
                    <div>
                        <p className="text-xl font-semibold">589</p>
                        <p className="text-sm text-gray-500">Applied Jobs</p>
                    </div>
                    <div className="p-3 bg-white rounded-md">
                        <BriefcaseBusiness className="size-6 text-blue-500" />
                    </div>
                    </div>

                    {/* Saved Jobs */}
                    <div className="bg-orange-100 rounded-lg p-4 flex items-center justify-between">
                    <div>
                        <p className="text-xl font-semibold">120</p>
                        <p className="text-sm text-gray-500">Saved Jobs</p>
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

                {/* PLACEHOLDER FOR CONTENT */}
                <div className="bg-[#d94242] rounded-lg p-6 text-sm text-gray-500">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center justify-center gap-5">
                            <img src={iphonelogo} className="rounded-4xl h-15 w-auto" />
                            <div>
                                <p className="text-md text-white">Your Profile editing is not completed.</p>
                                <p className=" text-sm text-white font-thin">complete your profile editing & build your custome Resume</p>
                            </div>
                        </div>
                        <div>
                            <button className="bg-white flex gap-2 p-3 rounded-md text-red-600">
                                Edit Profile
                                <ArrowRightIcon className="size-5" />
                            </button>
                        </div>
                    </div>
                    
                </div>

                <div className="flex items-center justify-between p-2">
                    <p>Recently Applied</p>
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
                        <p>Date Applied</p>
                        <p>Status</p>
                        <p>Action</p>
                    </div>
                </div>

                {/* MOBILE VIEW (GRID CARDS) */}
                    <div className="lg:col-span-3 grid grid-cols-1 sm:grid-cols-2 gap-6 sm:hidden">
                    {visibleJobs.map((job) => (
                        <div
                        key={job.id}
                        className="bg-white p-5 rounded-lg border border-gray-200 hover:shadow-md transition"
                        >
                        <div className="flex items-center gap-4 mb-4">
                            <img
                            src={job.image}
                            alt="logo"
                            className="h-12 w-12 rounded-md object-contain"
                            />
                            <div>
                                <p className="font-semibold">{job.jobRole}</p>
                            <p className="font-semibold text-xs">{job.name}</p>
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
                            {job.open_jobs} open jobs
                            </div>
                        </div>

                        <button className="bg-blue-200 w-full mt-4 px-4 py-2 flex items-center justify-center gap-2 text-blue-500 rounded-md hover:bg-blue-300 transition">
                            Open positions
                            <ArrowRight className="size-4" />
                        </button>
                        </div>
                    ))}
                    </div>

                    {/* LAPTOP / DESKTOP VIEW (ONE CARD PER ROW) */}
                    <div className="hidden sm:flex lg:col-span-3 flex-col gap-4 pt-3">
                    {visibleJobs.map((job) => (
                        <div
                        key={job.id}
                        className="flex items-center justify-between p-4 border border-gray-200 rounded-lg bg-white hover:shadow-md transition"
                        >
                        {/* LEFT */}
                        <div className="flex items-center gap-4">
                            <img
                            src={job.image}
                            alt="logo"
                            className="h-12 w-12 rounded-md object-contain"
                            />

                            <div className="flex flex-col gap-1">
                            <div className="flex items-center gap-2">
                                <p className="font-semibold">{job.jobRole}</p>
                                
                                <span className="text-xs px-2 py-0.5 rounded-full bg-blue-100 text-blue-500 capitalize">
                                {job.type}
                                </span>
                            </div>
                            <p className="text-gray-600 text-xs">{job.name}</p>

                            <div className="flex items-center gap-4 text-sm text-gray-500">
                                <div className="flex items-center gap-1">
                                <MapPin className="size-4" />
                                {job.location}
                                </div>
                                <div className="flex items-center gap-1">
                                <Briefcase className="size-4" />
                                {job.open_jobs} open jobs
                                </div>
                            </div>
                            </div>
                        </div>

                        {/* RIGHT */}
                        <div className="flex items-center justify-between w-110">
                            <p className="text-sm text-gray-500">{job.dateApplied}</p>
                            {job.status === 'active' ? (
                                <div className="flex items-center justify-center gap-1 text-green-600">
                                    <Check className="size-4" />
                                    <p className="text-sm ">{job.status}</p>
                                </div>
                            ):(
                                <div className="flex items-center justify-center text-orange-400 gap-2">
                                    <CircleDashed className="size-3" />
                                    <p className="text-sm">{job.status}</p>
                                </div>
                            )}
                            
                            
                            <button className="flex items-center gap-3 px-4 py-2 text-sm text-blue-500 font-medium bg-gray-100 rounded-md hover:bg-gray-200 transition">
                                View Details
                            </button>
                        </div>
                        </div>
                    ))}
                    </div>
                        
            </>
            )}

            {selectedSidebar === "applied-jobs" && (
                <UserAppliedJobs />
            )}

        </div>

      </div>
    </div>
  );
};

export default UserDashboard;
