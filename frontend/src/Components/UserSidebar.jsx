
import React, { useState, useEffect } from "react";
import {
  Layers,
  Briefcase,
  Bell,
  Settings,
  Bookmark,
  Book,
  SearchCheck,
  Menu,
  X,
  Building2
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const UserSidebar = () => {
const sidebarData = [
  {
    id: 1,
    icon: <Layers />,
    label: "Overview",
    value: "overview",
  },
  {
    id: 2,
    icon: <SearchCheck />,
    label: "Find Jobs",
    value: "find-jobs",
  },
  {
    id: 9,
    icon: <Building2 />,
    label: "Find Companies",
    value: "find-companies",
  },
  {
    id: 3,
    icon: <Briefcase />,
    label: "Applied Jobs",
    value: "applied-jobs",
  },
  {
    id: 4,
    icon: <Bookmark />,
    label: "Favorite Jobs",
    value: "favorite-jobs",
  },
  {
    id: 5,
    icon: <Bell />,
    label: "Job Alerts",
    value: "job-alerts",
  },
  {
    id: 6,
    icon: <Settings />,
    label: "Settings",
    value: "settings",
  },
  {
    id: 7,
    icon: <Book />,
    label: "My Rounds",
    value: "My Rounds",
  },
];

  const [selectedSidebar, setSelectedSidebar] = useState("overview");
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const saved = localStorage.getItem("userSideBar");
    if (saved) {
      setSelectedSidebar(saved);
    }
  }, []);

  const handleClick = (value) => {
    setSelectedSidebar(value);
    localStorage.setItem("userSideBar", value);
    navigate("/user-dashboard");
    setIsOpen(false); // close drawer on mobile
  };

  return (
    <>
      {/* Mobile Top Bar */}
      <div className="sm:hidden flex justify-between items-center p-4 border-b">
        <h2 className="font-semibold text-gray-700">Dashboard</h2>
        <button onClick={() => setIsOpen(true)}>
          <Menu size={24} />
        </button>
      </div>

      {/* Overlay (Mobile) */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40 sm:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed sm:static top-0 left-0 h-full sm:h-[calc(100vh-64px)]
          w-64 bg-white border-r border-gray-200 z-50
          transform transition-transform duration-300 ease-in-out
          ${isOpen ? "translate-x-0" : "-translate-x-full sm:translate-x-0"}
        `}
      >
        {/* Close button (mobile) */}
        <div className="sm:hidden flex justify-between items-center p-4 border-b">
          <p className="font-medium text-gray-600">
            Candidate Dashboard
          </p>
          <button onClick={() => setIsOpen(false)}>
            <X size={22} />
          </button>
        </div>

        {/* Desktop Title */}
        <p className="hidden sm:block font-medium text-gray-600 p-4">
          Candidate Dashboard
        </p>

        <div className="flex flex-col gap-2 text-gray-600 text-sm px-2">
          {sidebarData.map((item) => (
            <div
              key={item.id}
              onClick={() => handleClick(item.value)}
              className={`flex items-center gap-3 cursor-pointer p-2 px-5 rounded-md transition-all duration-200
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
    </>
  );
};

export default UserSidebar;
