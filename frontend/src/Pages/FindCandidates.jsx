import React, { useEffect, useState } from 'react'
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
import RecruiterJobFilters from '../Components/Recruiter/RecruiterJobFilters.jsx'
import FindCandidateCard from '../Components/Recruiter/FindCandidateCard.jsx'
import RecruiterSidebar from '../Components/Recruiter/RecruiterSidebar.jsx'
import { useNavigate } from 'react-router-dom';
import RecruiterStaticSidebar from '../Components/Recruiter/RecruiterStaticSidebar.jsx';

const FindCandidates = () => {

    const [selectedSidebar , setSelectedSidebar] = useState('overview')
    const navigate = useNavigate()
  
    useEffect(() => {
      const savedSidebar = localStorage.getItem("sideBar");
      if (savedSidebar) {
        setSelectedSidebar(savedSidebar);
      }
    }, []);
  
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
      {
        id: 9,
        icon: <ClipboardClock />,
        label: "My Tests",
        value: "my-tests",
      },
    ];
  return (
    <div className="min-h-screen flex flex-col">
      <div className='sm:hidden'>
          <RecruiterStaticSidebar />
        </div>
      <div className="flex flex-1 max-w-9xl mx-auto w-full px-4 py-4 gap-4">
        <div className='hidden sm:flex'>
          <RecruiterStaticSidebar />
        </div>

        <div>
            <RecruiterJobFilters />
            <FindCandidateCard />
        </div>
      </div>
    </div>
  )
}

export default FindCandidates