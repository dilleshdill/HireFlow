import React, { useState, useEffect } from "react";
import {
  Layers,
  Briefcase,
  Bell,
  Settings,
  Bookmark,
  Book,
  SearchCheck
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const Sidebar = () => {

  const sidebarData = [
    { id: 1, icon: <Layers size={18} />, label: "Overview", value: "overview" },
    { id: 2, icon: <SearchCheck size={18} />, label: "Find Jobs", value: "find-jobs" },
    { id: 3, icon: <Briefcase size={18} />, label: "Applied Jobs", value: "applied-jobs" },
    { id: 4, icon: <Bookmark size={18} />, label: "Favorite Jobs", value: "favorite-jobs" },
    { id: 5, icon: <Bell size={18} />, label: "Job Alerts", value: "job-alerts" },
    { id: 6, icon: <Settings size={18} />, label: "Settings", value: "settings" },
    { id: 7, icon: <Book size={18} />, label: "My Rounds", value: "my-rounds" },
  ];

  const [selectedSidebar, setSelectedSidebar] = useState("overview");
  const navigate = useNavigate();

  // Restore from localStorage
  useEffect(() => {
    const saved = localStorage.getItem("userSideBar");
    if (saved) {
      setSelectedSidebar(saved);
    }
  }, []);

  const handleClick = (value) => {
    setSelectedSidebar(value);
    localStorage.setItem("userSideBar", value);
    navigate('/user-dashboard');
  };

  return (
    <div className="w-64 pl-4 pt-4 pb-4 border-r border-gray-200 hidden sm:block sticky top-0 h-[calc(100vh-64px)]">

      <p className="font-medium text-gray-600 pb-3 px-5">
        Candidate Dashboard
      </p>

      <div className="flex flex-col gap-2 text-gray-600 text-sm">
        {sidebarData.map((item) => (
          <div
            key={item.id}
            onClick={() => handleClick(item.value)}
            className={`flex items-center gap-3 cursor-pointer p-2 px-7 rounded-md transition-all duration-200
              hover:bg-gray-100
              ${
                selectedSidebar === item.value
                  ? "border-l-4 border-[#0A65CC] text-[#0A65CC] bg-[#0A65CC]/10"
                  : ""
              }`}
          >
            <span>{item.icon}</span>
            <span>{item.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
