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
} from "lucide-react";

import RecruiterPostJob from './Components/Recruiter/RecruiterPostJob.jsx'


const RecruiterDashboard = () => {

    const [selectedSidebar , setSelectedSidebar] = useState('overview')
    const [showAllJobs, setShowAllJobs] = useState(false);


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



  return (
    <div className="min-h-screen flex flex-col">

      {/* Navbar */}
      {/* <Navbar /> */}

      {/* Content wrapper */}
      <div className="flex flex-1 max-w-7xl mx-auto w-full px-4 py-4 gap-4">

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
        <div className="flex-1 p-4 overflow-y-auto h-[calc(100vh-64px)]">
          {selectedSidebar === "overview" && (
            <>
                <RecruiterPostJob/>
            </>
            )}

            {/* {selectedSidebar === "applied-jobs" && (
                <>
                </>
            )} */}

        </div>

      </div>
    </div>
  );
};

export default RecruiterDashboard;
