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
  FolderDown,
  
} from "lucide-react";

const sidebarData = [
  {
    id: 1,
    icon: <LayoutDashboard />,
    label: "Overview",
    value: "overview",
  },
  {
    id: 2,
    icon: <User />,
    label: "Profile",
    value: "profile",
  },
  {
    id: 3,
    icon: <PlusSquare />,
    label: "Post a Job",
    value: "post-job",
  },
  {
    id: 4,
    icon: <Briefcase />,
    label: "My Jobs",
    value: "my-jobs",
  },
  {
    id: 5,
    icon: <Bookmark />,
    label: "Saved Candidates",
    value: "saved-candidates",
  },
  {
    id: 6,
    icon: <Users />,
    label: "Employee Profile",
    value: "employee-profile",
  },
  {
    id: 7,
    icon: <Building2 />,
    label: "All Companies",
    value: "all-companies",
  },
  {
    id: 8,
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
      applied:"786",
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
      applied:"786",
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
      applied:"786",
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
      applied:"786",
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
      applied:"786",
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
      applied:"786",
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
      applied:"786",
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
      applied:"786",
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
      applied:"786",
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
      applied:"786",
      dateApplied: "2025-01-25",
    },
];

const applications = [
  {
    id: 1,
    name: "Arjun Rao",
    role: "Frontend Developer",
    experience: 5,
    education: "B.Tech CSE",
    appliedAt: "2026-02-01T10:30:00Z",
  },
  {
    id: 2,
    name: "Sneha Patel",
    role: "Backend Developer",
    experience: 3,
    education: "MCA",
    appliedAt: "2026-02-03T08:00:00Z",
  },
  {
    id: 3,
    name: "Rahul Mehta",
    role: "Full Stack Developer",
    experience: 7,
    education: "B.Tech IT",
    appliedAt: "2026-01-28T12:00:00Z",
  },
  {
    id: 4,
    name: "Priya Sharma",
    role: "UI/UX Designer",
    experience: 4,
    education: "B.Des",
    appliedAt: "2026-02-02T09:15:00Z",
  },
];


const RecruiterJobPage = () => {
    const [selectedSidebar , setSelectedSidebar] = useState('overview')
    const [showAllJobs, setShowAllJobs] = useState(false);
    const [showFilter,setShowFilter] = useState(false)
    const [filterValue,setFilterValue] = useState("JobApplications")
    const [showSort,setShowSort] = useState(false)
    const [sortValue,setShortValue] = useState("Newest")

    const visibleJobs = showAllJobs ? jobs : jobs.slice(0,4)

    let data = null

    if(sortValue === "Newest"){
        data = [...applications].sort(
            (a,b) => new Date(b.appliedAt) - new Date(a.appliedAt)
        )
    }
    else{
        data = [...applications].sort(
            (a,b) => new Date(a.appliedAt) - new Date(b.appliedAt)
        )
    }
  return (
    <div className="min-h-screen flex flex-col">
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

        <div className="flex-1 max-w-6xl p-4 overflow-y-auto h-[calc(100vh-64px)]">
            <div className="flex gap-3 justify-end relative">
  
                <div className="relative">
                    <button
                    className="bg-gray-100 px-3 py-1 rounded-sm"
                    onClick={() => {
                        setShowSort(false)
                        setShowFilter(!showFilter)}
                    }
                    >
                    Filter
                    </button>

                    {showFilter && (
                    <div className="absolute right-0 mt-2 w-56 px-4 py-3 bg-white shadow-2xl rounded-lg z-50">
                        <h1 className="text-gray-500 text-md font-semibold mb-3">
                        Filter Applications
                        </h1>

                        <label className="flex items-center gap-2 cursor-pointer mb-2">
                        <input
                            type="radio"
                            name="applicationFilter"
                            value="JobApplications"
                            checked={filterValue === "JobApplications"}
                            onChange={(e) => setFilterValue(e.target.value)}
                            className="accent-blue-500"
                        />
                        <span className="text-gray-700">Job Applications</span>
                        </label>

                        <label className="flex items-center gap-2 cursor-pointer">
                        <input
                            type="radio"
                            name="applicationFilter"
                            value="shortlisted"
                            checked={filterValue === "shortlisted"}
                            onChange={(e) => setFilterValue(e.target.value)}
                            className="accent-blue-500"
                        />
                        <span className="text-gray-700">Shortlisted Applications</span>
                        </label>
                    </div>
                    )}
                </div>
        
                <div className="relative">
                    <button
                    className="bg-blue-600 px-3 py-1 rounded-sm text-white"
                    onClick={() => {
                        setShowFilter(false)
                        setShowSort(!showSort)
                    }}
                    >
                    Sort
                    </button>

                    {showSort && (
                    <div className="absolute right-0 mt-2 w-56 px-4 py-3 bg-white shadow-2xl rounded-lg z-50">
                        <h1 className="text-gray-500 text-md font-semibold mb-3">
                        Sort Applications
                        </h1>

                        <label className="flex items-center gap-2 cursor-pointer mb-2">
                        <input
                            type="radio"
                            name="applicationSort"
                            value="Newest"
                            checked={sortValue === "Newest"}
                            onChange={(e) => setShortValue(e.target.value)}
                            className="accent-blue-500"
                        />
                        <span className="text-gray-700">Newest</span>
                        </label>

                        <label className="flex items-center gap-2 cursor-pointer">
                        <input
                            type="radio"
                            name="applicationSort"
                            value="oldest"
                            checked={sortValue === "oldest"}
                            onChange={(e) => setShortValue(e.target.value)}
                            className="accent-blue-500"
                        />
                        <span className="text-gray-700">Oldest</span>
                        </label>
                    </div>
                    )}
                </div>
            </div>

            <div>
            {
                filterValue === "JobApplications" ? 
                (
                    <div>
                    <h1 className="text-gray-700 font-normal text-2xl">Job Applications</h1>

                    <div className="grid min-h-screen sm:grid-cols-1 md:grid-cols-3 gap-7 gap-y-0 bg-gray-50 px-10 py-5 mt-7">
                        {
                            data.map(eachItem => (
                                <div className="flex flex-col h-fit shadow-lg p-8 bg-white gap-2 rounded-lg">
                            <div className="flex gap-3 items-center">
                                <img className="h-10 w-20 rounded-full"  src=" "/>
                                <div className="flex flex-col">
                                    <h1 className="text-gray-800 font-medium text-lg">{eachItem.name}</h1>
                                    <h1 className="text-gray-400 font-light">{eachItem.role}</h1>
                                </div>
                            </div>
                            <div className="border border-t-0 border-gray-400 ">
                            </div>
                            <ul className="flex flex-col list-disc pl-5 gap-3">
                                <li className="text-gray-500">{eachItem.experience} Years Experience</li>
                                <li className="text-gray-500">Education : {eachItem.education}</li>
                                <li className="text-gray-500">Applied : {eachItem.appliedAt}</li>
                            </ul>
                            <div className="flex gap-3 mt-3 items-center cursor-pointer">
                                <FolderDown className="text-blue-600"/>
                                <p className="text-blue-600 text-lg">Download CV</p>
                            </div>

                        </div>
                            ))
                        }
                         
                    </div>
                    </div>
                )
                : 
                (
                    <div>
                    <h1 className="text-gray-700 font-normal text-2xl">Shorted Applications</h1>

                    <div className="grid min-h-screen sm:grid-cols-1 md:grid-cols-3 gap-7 gap-y-0 bg-gray-50 px-10 py-5 mt-7">
                        {
                            data.map(eachItem => (
                                <div className="flex flex-col h-fit shadow-lg p-8 bg-white gap-2 rounded-lg">
                            <div className="flex gap-3 items-center">
                                <img className="h-10 w-20 rounded-full"  src=" "/>
                                <div className="flex flex-col">
                                    <h1 className="text-gray-800 font-medium text-lg">{eachItem.name}</h1>
                                    <h1 className="text-gray-400 font-light">{eachItem.role}</h1>
                                </div>
                            </div>
                            <div className="border border-t-0 border-gray-400 ">
                            </div>
                            <ul className="flex flex-col list-disc pl-5 gap-3">
                                <li className="text-gray-500">{eachItem.experience} Years Experience</li>
                                <li className="text-gray-500">Education : {eachItem.education}</li>
                                <li className="text-gray-500">Applied : {eachItem.appliedAt}</li>
                            </ul>
                            <div className="flex gap-3 mt-3 items-center cursor-pointer">
                                <FolderDown className="text-blue-600"/>
                                <p className="text-blue-600 text-lg">Download CV</p>
                            </div>

                        </div>
                            ))
                        }
                         
                    </div>
                    </div>
                )
            }
        </div>

        </div>
      </div>
    </div>
  )
}

export default RecruiterJobPage
