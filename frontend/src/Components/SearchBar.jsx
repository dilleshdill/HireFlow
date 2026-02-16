import { Search, MapPin } from "lucide-react";

const SearchBar = () => {
  return (
    <div className="w-full max-w-2xl bg-white shadow-lg rounded-lg p-3 sm:p-0 flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-0">

      {/* Job search */}
      <div className="flex items-center gap-2 px-4 py-3 flex-1 border sm:border-none rounded-md sm:rounded-none">
        <Search size={18} className="text-[#0A65CC]" />
        <input
          type="text"
          placeholder="Job title, Keyword..."
          className="w-full outline-none text-sm"
        />
      </div>

      {/* Divider (Desktop only) */}
      <div className="hidden sm:block w-px h-10 bg-gray-200"></div>

      {/* Location */}
      <div className="flex items-center gap-2 px-4 py-3 flex-1 border sm:border-none rounded-md sm:rounded-none">
        <MapPin size={18} className="text-[#0A65CC]" />
        <input
          type="text"
          placeholder="Your Location"
          className="w-full outline-none text-sm"
        />
      </div>

      {/* Button */}
      <button className="bg-[#0A65CC] text-white px-6 py-3 text-sm font-medium rounded-md sm:rounded-none sm:rounded-r-lg hover:opacity-90 transition w-full sm:w-auto">
        Find Job
      </button>
    </div>
  );
};

export default SearchBar;
