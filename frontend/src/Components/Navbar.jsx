import { Search, Phone } from "lucide-react";
import {Link} from 'react-router-dom'
const Navbar = () => {
  return (
    <header className="w-full bg-white  ">

      {/* 🔹 Top Bar */}
      <div className="bg-gray-100 text-xs text-gray-600">
        <div className="max-w-7xl mx-auto flex items-center justify-between px-4 py-2">

          {/* Left Menu */}
          <ul className="flex gap-4 p-1">
            <Link to='/' className="text-[#0A65CC] font-medium text-sm border-b-2 border-[#0A65CC]">
              Home
            </Link>
            <Link to='find-jobs' className="hover:text-[#0A65CC] text-sm cursor-pointer">Find Job</Link>
            <li className="hover:text-[#0A65CC] text-sm  cursor-pointer">Employers</li>
            <li className="hover:text-[#0A65CC] text-sm  cursor-pointer">Candidates</li>
            <li className="hover:text-[#0A65CC] text-sm  cursor-pointer">Pricing Plans</li>
            <li className="hover:text-[#0A65CC] text-sm  cursor-pointer">Customer Supports</li>
          </ul>

          {/* Right Info */}
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1">
              <Phone size={14} />
              <span>+1-202-555-0178</span>
            </div>
            <div className="flex items-center gap-1 cursor-pointer">
              🇺🇸 <span>English</span>
            </div>
          </div>

        </div>
      </div>

      {/* 🔹 Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between gap-6">

        {/* Logo */}
        <div className="flex items-center gap-2">
          <div className="w-9 h-9 bg-[#0A65CC] rounded-md flex items-center justify-center text-white font-bold">
            M
          </div>
          <span className="text-xl font-semibold">MyJob</span>
        </div>

        {/* Country + Search */}
        <div className="flex items-center gap-3 flex-1 max-w-xl border rounded-md px-3 py-2">

          {/* Country */}
          <div className="flex items-center gap-1 text-sm">
            🇮🇳 <span>India</span>
          </div>

          <div className="w-px h-5 bg-gray-300"></div>

          {/* Search */}
          <Search size={16} className="text-[#0A65CC]" />
          <input
            type="text"
            placeholder="Job title, keyword, company"
            className="flex-1 outline-none text-sm"
          />
        </div>

        {/* Actions */}
        <div className="flex items-center gap-3">
          <button className="px-4 py-2 text-sm border border-[#0A65CC] text-[#0A65CC] rounded-md hover:bg-[#0A65CC]/10">
            Sign In
          </button>
          <button className="px-4 py-2 text-sm bg-[#0A65CC] text-white rounded-md hover:opacity-90">
            Post A Jobs
          </button>
        </div>

      </div>
    </header>
  );
};

export default Navbar;
