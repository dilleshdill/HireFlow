import { Search, Menu, X } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

const Navbar = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const handleNavigate = (path) => {
    navigate(path);
    setOpen(false); // close mobile menu after navigation
  };

  return (
    <header className="w-full bg-white shadow-sm sticky top-0 z-50">
      
      {/* Top Bar */}
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        
        {/* Logo */}
        <div className="flex items-center gap-2 cursor-pointer" onClick={() => handleNavigate("/")}>
          <div className="w-9 h-9 bg-[#0A65CC] rounded-md flex items-center justify-center text-white font-bold">
            M
          </div>
          <span className="text-lg font-semibold">MyJob</span>
        </div>

        {/* Desktop Search */}
        <div className="hidden md:flex items-center gap-3 flex-1 max-w-xl border rounded-md px-3 py-2 mx-6">
          <Search size={16} className="text-[#0A65CC]" />
          <input
            type="text"
            placeholder="Job title, keyword, company"
            className="flex-1 outline-none text-sm"
          />
        </div>

        {/* Desktop Buttons */}
        <div className="hidden md:flex items-center gap-3">
          <button
            onClick={() => handleNavigate("/login")}
            className="px-4 py-2 text-sm border border-[#0A65CC] text-[#0A65CC] rounded-md hover:bg-[#0A65CC]/10 transition"
          >
            Sign Up
          </button>
          <button className="px-4 py-2 text-sm bg-[#0A65CC] text-white rounded-md hover:opacity-90 transition">
            Post A Job
          </button>
        </div>

        {/* Mobile Hamburger */}
        <button
          className="md:hidden p-2"
          onClick={() => setOpen(true)}
        >
          <Menu size={24} />
        </button>
      </div>

      {/* Mobile Slide Menu */}
      <div
        className={`fixed top-0 right-0 h-full w-3/4 bg-white shadow-lg transform transition-transform duration-300 ease-in-out z-50
        ${open ? "translate-x-0" : "translate-x-full"}`}
      >
        <div className="p-4 flex items-center justify-between border-b">
          <span className="font-semibold text-lg">Menu</span>
          <button onClick={() => setOpen(false)}>
            <X size={24} />
          </button>
        </div>

        <div className="p-4 space-y-6">
          
          {/* Buttons */}
          <button
            onClick={() => handleNavigate("/login")}
            className="w-full py-3 text-sm border border-[#0A65CC] text-[#0A65CC] rounded-md hover:bg-[#0A65CC]/10 transition"
          >
            Sign Up
          </button>

          <button className="w-full py-3 text-sm bg-[#0A65CC] text-white rounded-md hover:opacity-90 transition">
            Post A Job
          </button>
        </div>
      </div>

      {/* Overlay */}
      {open && (
        <div
          onClick={() => setOpen(false)}
          className="fixed inset-0 bg-black/40 z-40"
        ></div>
      )}
    </header>
  );
};

export default Navbar;
