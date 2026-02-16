import { Search, Menu, X } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

const Navbar = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  return (
    <header className="w-full bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">

        {/* Logo */}
        <div className="flex items-center gap-2">
          <div className="w-9 h-9 bg-[#0A65CC] rounded-md flex items-center justify-center text-white font-bold">
            M
          </div>
          <span className="text-lg sm:text-xl font-semibold">MyJob</span>
        </div>

        {/* Desktop Search */}
        <div className="hidden md:flex items-center gap-3 flex-1 max-w-xl border rounded-md px-3 py-2 mx-6">
          <div className="flex items-center gap-1 text-sm">
            🇮🇳 <span>India</span>
          </div>

          <div className="w-px h-5 bg-gray-300"></div>

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
            onClick={() => navigate("/login")}
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
          className="md:hidden"
          onClick={() => setOpen(!open)}
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="md:hidden px-4 pb-4 space-y-4 bg-white border-t">

          {/* Mobile Search */}
          <div className="flex items-center gap-3 border rounded-md px-3 py-2">
            <Search size={16} className="text-[#0A65CC]" />
            <input
              type="text"
              placeholder="Search jobs..."
              className="flex-1 outline-none text-sm"
            />
          </div>

          {/* Buttons */}
          <button
            onClick={() => navigate("/login")}
            className="w-full px-4 py-2 text-sm border border-[#0A65CC] text-[#0A65CC] rounded-md hover:bg-[#0A65CC]/10 transition"
          >
            Sign Up
          </button>

          <button className="w-full px-4 py-2 text-sm bg-[#0A65CC] text-white rounded-md hover:opacity-90 transition">
            Post A Job
          </button>
        </div>
      )}
    </header>
  );
};

export default Navbar;
