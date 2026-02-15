import React, { useEffect, useState } from "react";
import Navbar from "../Components/Navbar.jsx";
import UserJobFilters from "../Components/UserJobFilters.jsx";
import FindCompanyAllJobs from "../Components/FindCompanyAllJobs.jsx";
import {
  Link,
  Phone,
  Mail,
  CalendarDays,
  GraduationCap,
  MapPin,
  BriefcaseBusiness,
  LayoutDashboard,
  User,
  PlusSquare,
  Briefcase,
  Bookmark,
  Users,
  Building2,
  Layers,
  SearchCheck,
  Bell,
  Book,
  Settings,
  ClipboardClock,
  ShieldCheck,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import UserSidebar from "../Components/UserSidebar.jsx";

const FindCompanyJobs = () => {
  const [selectedSidebar, setSelectedSidebar] = useState("overview");
  const navigate = useNavigate();

  useEffect(() => {
    const savedSidebar = localStorage.getItem("sideBar");
    if (savedSidebar) {
      setSelectedSidebar(savedSidebar);
    }
  }, []);

    const handleClick = (value) => {
    setSelectedSidebar(value);
    localStorage.setItem("userSideBar", value);
    navigate('/user-dashboard');
  };

  const sidebarData = [
    { id: 1, icon: <Layers size={18} />, label: "Overview", value: "overview" },
    { id: 2, icon: <SearchCheck size={18} />, label: "Find Jobs", value: "find-jobs" },
    { id: 3, icon: <Briefcase size={18} />, label: "Applied Jobs", value: "applied-jobs" },
    { id: 4, icon: <Bookmark size={18} />, label: "Favorite Jobs", value: "favorite-jobs" },
    { id: 5, icon: <Bell size={18} />, label: "Job Alerts", value: "job-alerts" },
    { id: 6, icon: <Settings size={18} />, label: "Settings", value: "settings" },
    { id: 7, icon: <Book size={18} />, label: "My Rounds", value: "my-rounds" },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <div className="sm:hidden">
          <UserSidebar />
        </div>
      <div className="flex flex-1 max-w-9xl mx-auto w-full px-4 py-4 gap-4">
        <div className="hidden sm:flex">
          <UserSidebar />
        </div>
        <div>
          <UserJobFilters />
        <FindCompanyAllJobs />
        </div>
      </div>
    </div>
  );
};

export default FindCompanyJobs;
