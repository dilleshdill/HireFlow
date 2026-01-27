import { Search, MapPin } from "lucide-react";

const SearchBar = () => {
  return (
    <div className="mt-8 w-full max-w-2xl bg-white shadow-lg rounded-lg flex items-center overflow-hidden">

      {/* Job search */}
      <div className="flex items-center gap-2 px-4 py-3 flex-1">
        <Search size={18} className="text-[#0A65CC]" />
        <input
          type="text"
          placeholder="Job title, Keyword..."
          className="w-full outline-none text-sm"
        />
      </div>

      {/* Divider */}
      <div className="w-px h-8 bg-gray-200"></div>

      {/* Location */}
      <div className="hidden md:flex items-center gap-2 px-4 py-3 flex-1">
        <MapPin size={18} className="text-[#0A65CC]" />
        <input
          type="text"
          placeholder="Your Location"
          className="w-full outline-none text-sm"
        />
      </div>

      {/* Button */}
      <button className="bg-[#0A65CC] text-white px-6 py-3 text-sm font-medium hover:opacity-90 transition">
        Find Job
      </button>
    </div>
  );
};

export default SearchBar;
