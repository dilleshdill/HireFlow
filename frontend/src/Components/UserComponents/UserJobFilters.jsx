import { ChevronDown, ChevronUp, Layers, MapPin, SearchIcon } from "lucide-react";
import React, { useState } from "react";

const UserJobFilters = () => {
  const [category, setCategory] = useState("");
  const [isAdvanced , setIsAdvanced] = useState(false)
  const [experience, setExperience] = useState("");
  const [salary, setSalary] = useState("");
    const [jobType, setJobType] = useState([]);
    const [education, setEducation] = useState([]);
    const [jobLevel, setJobLevel] = useState("");

    const handleCheckboxChange = (state, setState, value) => {
        if (state.includes(value)) {
            setState(state.filter((item) => item !== value));
        } else {
            setState([...state, value]);
        }
    };



  const jobFilterData = {
  experience: [
    { label: "Freshers", value: "0" },
    { label: "1 - 2 Years", value: "1-2" },
    { label: "2 - 4 Years", value: "2-4" },
    { label: "4 - 6 Years", value: "4-6" },
    { label: "6 - 8 Years", value: "6-8" },
    { label: "8 - 10 Years", value: "8-10" },
    { label: "10 - 15 Years", value: "10-15" },
    { label: "15+ Years", value: "15+" },
  ],

  salary: [
    { label: "$50 - $1000", value: "50-1000" },
    { label: "$1000 - $2000", value: "1000-2000" },
    { label: "$3000 - $4000", value: "3000-4000" },
    { label: "$4000 - $6000", value: "4000-6000" },
    { label: "$6000 - $8000", value: "6000-8000" },
    { label: "$8000 - $10000", value: "8000-10000" },
    { label: "$10000 - $15000", value: "10000-15000" },
    { label: "$15000+", value: "15000+" },
  ],

  jobType: [
    { label: "All", value: "all" },
    { label: "Full Time", value: "full_time" },
    { label: "Part Time", value: "part_time" },
    { label: "Internship", value: "internship" },
    { label: "Remote", value: "remote" },
    { label: "Temporary", value: "temporary" },
    { label: "Contract Base", value: "contract" },
  ],

  education: [
    { label: "All", value: "all" },
    { label: "High School", value: "high_school" },
    { label: "Intermediate", value: "intermediate" },
    { label: "Bachelor Degree", value: "bachelor" },
    { label: "Graduation", value: "graduation" },
    { label: "Master Degree", value: "master" },
  ],

  jobLevel: [
    { label: "Entry Level", value: "entry" },
    { label: "Mid Level", value: "mid" },
    { label: "Expert Level", value: "expert" },
  ],
};

console.log(jobType)

  return (
    <div className="w-full bg-gray-100">
      <div className="max-w-7xl mx-auto px-4 py-4">
        
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <p className="font-semibold">Find Jobs</p>
          <p className="text-sm text-gray-500">Home / Find Jobs</p>
        </div>

        {/* Filters */}
        <div className="w-full bg-white grid grid-cols-1 sm:grid-cols-5 gap-3 p-4 rounded-sm shadow-sm">

          {/* Search */}
          <div className="flex items-center gap-2 border border-gray-200 rounded-sm px-3 py-2">
            <SearchIcon className="size-4 text-[#0A65CC]" />
            <input
              type="text"
              placeholder="Job title, keyword..."
              className="w-full outline-none text-sm"
            />
          </div>

          {/* Location */}
          <div className="flex items-center gap-2 border border-gray-200 rounded-sm px-3 py-2">
            <MapPin className="size-4 text-[#0A65CC]" />
            <input
              type="text"
              placeholder="Location"
              className="w-full outline-none text-sm"
            />
          </div>

          {/* Category */}
          <div className="flex items-center gap-2 border border-gray-200 rounded-md px-3 py-2">
            <Layers className="size-4 text-[#0A65CC]" />
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full outline-none bg-transparent text-sm cursor-pointer"
            >
              <option value="" disabled>
                Select Category
              </option>
              <option value="fullstack">Full Stack</option>
              <option value="frontend">Frontend</option>
              <option value="backend">Backend</option>
              <option value="uiux">UI / UX</option>
            </select>
          </div>

          {/* Advanced */}
          <div onClick={()=>setIsAdvanced(!isAdvanced)} className="flex items-center justify-between px-4 border border-gray-200 gap-1 text-sm text-gray-600 cursor-pointer">
            <span>Advanced Options</span>
            
            {isAdvanced ? <ChevronUp className="size-4" /> : <ChevronDown className="size-4" />}
          </div>

          {/* Button */}
          <button className="bg-[#045fc7] text-white rounded-md text-sm hover:bg-[#034da3] transition">
            Find Job
          </button>

            {isAdvanced && (
                <div className="sm:col-span-5 grid grid-cols-1 sm:grid-cols-5 gap-6 p-4 ">

                    {/* Experience (Radio) */}
                    <div className="flex flex-col gap-2">
                    <p className="font-semibold mb-2">Experience</p>
                    {jobFilterData.experience.map((item) => (
                        <label key={item.value} className="flex items-center gap-2 text-sm cursor-pointer">
                        <input
                            type="radio"
                            name="experience"
                            value={item.value}
                            checked={experience === item.value}
                            onChange={(e) => setExperience(e.target.value)}
                            className="accent-[#0A65CC]"
                        />
                        <span className={experience === item.value ? "text-[#0A65CC]" : ""}>
                            {item.label}
                        </span>
                        </label>
                    ))}
                    </div>

                    {/* Salary (Radio) */}
                    <div className="flex flex-col gap-2">
                        <p className="font-semibold mb-2">Salary</p>
                        {jobFilterData.salary.map((item) => (
                            <label key={item.value} className="flex items-center gap-2 text-sm cursor-pointer">
                            <input
                                type="radio"
                                name="salary"
                                value={item.value}
                                checked={salary === item.value}
                                onChange={(e) => setSalary(e.target.value)}
                                className="accent-[#0A65CC]"
                            />
                            <span className={salary === item.value ? "text-[#0A65CC]" : ""}>
                                {item.label}
                            </span>
                            </label>
                        ))}
                    </div>

                    {/* Job Type (Checkbox) */}
                    <div className="flex flex-col gap-2">
                        <p className="font-semibold mb-2">Job Type</p>
                        {jobFilterData.jobType.map((item) => (
                            <label key={item.value} className="flex items-center gap-2 text-sm cursor-pointer">
                            <input
                                type="checkbox"
                                checked={jobType.includes(item.value)}
                                onChange={() =>
                                handleCheckboxChange(jobType, setJobType, item.value)
                                }
                                className="accent-[#0A65CC]"
                            />
                            <span className={jobType.includes(item.value) ? "text-[#0A65CC]" : ""}> {item.label}</span>
                            
                            </label>
                        ))}
                    </div>

                    {/* Education (Checkbox) */}
                    <div className="flex flex-col gap-2">
                    <p className="font-semibold mb-2">Education</p>
                    {jobFilterData.education.map((item) => (
                        <label key={item.value} className="flex items-center gap-2 text-sm cursor-pointer">
                        <input
                            type="checkbox"
                            checked={education.includes(item.value)}
                            onChange={() =>
                            handleCheckboxChange(education, setEducation, item.value)
                            }
                            className="accent-[#0A65CC]"
                        />
                        <span className={education.includes(item.value) ? "text-[#0A65CC]" : ""}> {item.label}</span>
                        </label>
                    ))}
                    </div>

                    {/* Job Level (Radio) */}
                    <div className="flex flex-col gap-2">
                    <p className="font-semibold mb-2">Job Level</p>
                    {jobFilterData.jobLevel.map((item) => (
                        <label key={item.value} className="flex items-center gap-2 text-sm cursor-pointer">
                        <input
                            type="radio"
                            name="jobLevel"
                            value={item.value}
                            checked={jobLevel === item.value}
                            onChange={(e) => setJobLevel(e.target.value)}
                            className="accent-[#0A65CC]"
                        />
                        <span className={jobLevel === item.value ? "text-[#0A65CC]" : ""}>
                            {item.label}
                        </span>
                        </label>
                    ))}
                    </div>

                </div>
            )}

        </div>
      </div>
    </div>
  );
};

export default UserJobFilters;
