import React, { useEffect, useState } from "react";
import {
  LayoutDashboard,
  User,
  PlusSquare,
  Briefcase,
  Bookmark,
  Users,
LogOutIcon,
  Building2,
  Settings,
  ClipboardClock,
  Menu,
  X
} from "lucide-react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const DOMAIN = import.meta.env.VITE_DOMAIN

const RecruiterSidebar = ({ selectedSidebar, setSelectedSidebar }) => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate()

      const getLogout = async () => {
        try {
          const response = await axios.post(DOMAIN + '/api/auth/logout')
          if(response.status === 200){
            toast.success("logout successfully")
            navigate('/login')
          }
        } catch (error) {
          toast.error("error to logout")
        }
      }

  useEffect(() => {
    const savedSidebar = localStorage.getItem("sideBar");
    if (savedSidebar) {
      setSelectedSidebar(savedSidebar);
    }
  }, []);

  const sidebarData = [
    { id: 1, icon: <LayoutDashboard size={18} />, label: "Overview", value: "overview" },
    { id: 3, icon: <PlusSquare size={18} />, label: "Post a Job", value: "post-job" },
    { id: 4, icon: <Briefcase size={18} />, label: "My Jobs", value: "my-jobs" },
    { id: 5, icon: <Bookmark size={18} />, label: "Saved Candidates", value: "saved-candidates" },
    { id: 6, icon: <Users size={18} />, label: "Employee Profile", value: "employee-profile" },
    { id: 8, icon: <Settings size={18} />, label: "Settings", value: "settings" },
    { id: 9, icon: <ClipboardClock size={18} />, label: "My Tests", value: "my-tests" },
  ];

  const handleClick = (value) => {
    setSelectedSidebar(value);
    localStorage.setItem("sideBar", value);
    setIsOpen(false); // close mobile drawer
  };



  return (
    <>
      {/* 🔹 MOBILE TOP BAR */}
      <div className="sm:hidden flex justify-between items-center p-4 border-b bg-white">
        <h2 className="font-semibold text-[#0A65CC]">HireFlow</h2>
        <button onClick={() => setIsOpen(true)}>
          <Menu size={24} />
        </button>
      </div>

      {/* 🔹 MOBILE OVERLAY */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40 sm:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* 🔹 SIDEBAR */}
      <div
        className={`fixed sm:static top-0 left-0 h-full sm:h-[calc(100vh-64px)]
        w-64 bg-white border-r border-gray-200 z-50
        transform transition-transform duration-300 ease-in-out
        ${isOpen ? "translate-x-0" : "-translate-x-full sm:translate-x-0"}
        `}
      >
        {/* Mobile Header */}
        <div className="sm:hidden flex justify-between items-center p-4 border-b">
          <p className="font-medium text-gray-600">Recruiter Dashboard</p>
          <button onClick={() => setIsOpen(false)}>
            <X size={22} />
          </button>
        </div>

        {/* Desktop Header */}
        <p className="hidden sm:block font-medium text-gray-600 p-4">
          Recruiter Dashboard
        </p>

        <div className="flex flex-col justify-between min-h-[80vh]">
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
              {item.icon}
              <span>{item.label}</span>
            </div>
          ))}
        </div>

        <div className="flex items-center pl-8 gap-2">
                  <button
                    onClick={()=>getLogout()}
                    className="flex items-center gap-2 text-red-500 bg-red-50 p-2 rounded-md px-4 cursor-pointer"
                  >
                    Logout
                    <LogOutIcon className="size-5 text-red-500" />
                  </button>
                  
                </div>
        </div>
      </div>
    </>
  );
};

export default RecruiterSidebar;
