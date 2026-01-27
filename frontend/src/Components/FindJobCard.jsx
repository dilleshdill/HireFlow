import React from "react";
import iphonelogo from "../assets/iphonelogo.png";
import {
  ArrowRight,
  Bookmark,
  Calendar,
  DollarSignIcon,
  MapPin,
} from "lucide-react";

const FindJobCard = () => {
  const jobs = [
    {
      id: 1,
      title: "Marketing Manager",
      companyLogo: iphonelogo,
      featured: true,
      jobType: "Remote",
      location: "Delhi, India",
      salary: "$30k - $50k / Month",
      remaining: "4 Days remaining",
    },
    {
      id: 2,
      title: "Frontend Developer",
      companyLogo:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/9/95/Instagram_logo_2022.svg/330px-Instagram_logo_2022.svg.png",
      featured: false,
      jobType: "Full Time",
      location: "Bangalore, India",
      salary: "$40k - $70k / Month",
      remaining: "7 Days remaining",
    },
    {
      id: 3,
      title: "Backend Developer",
      companyLogo: iphonelogo,
      featured: true,
      jobType: "Hybrid",
      location: "Hyderabad, India",
      salary: "$50k - $90k / Month",
      remaining: "2 Days remaining",
    },
    {
      id: 4,
      title: "UI / UX Designer",
      companyLogo:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/9/95/Instagram_logo_2022.svg/330px-Instagram_logo_2022.svg.png",
      featured: false,
      jobType: "Remote",
      location: "Mumbai, India",
      salary: "$25k - $45k / Month",
      remaining: "10 Days remaining",
    },
  ];

  return (
    <div className="w-full bg-gray-50 py-4">
      {jobs.map((job) => (
        <div key={job.id} className="w-full bg-white p-4">
          <div className="max-w-7xl mx-auto px-4 py-4 border border-gray-200 rounded-lg hover:shadow-md transition">

            {/* MAIN FLEX */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">

              {/* LEFT SECTION */}
              <div className="flex flex-col sm:flex-row gap-4 sm:flex-1">

                {/* Logo */}
                <img
                  src={job.companyLogo}
                  alt="logo"
                  className="h-14 w-14 rounded-lg object-contain"
                />

                {/* Job Info */}
                <div className="flex flex-col gap-3">
                  <div className="flex flex-wrap gap-2 items-center">
                    <p className="text-md font-medium">{job.title}</p>

                    {job.featured && (
                      <span className="text-xs bg-red-100 px-2 py-1 rounded-full text-red-500">
                        Featured
                      </span>
                    )}

                    <span className="text-xs bg-blue-100 px-2 py-1 rounded-full text-blue-500">
                      {job.jobType}
                    </span>
                  </div>

                  <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                    <div className="flex items-center gap-1">
                      <MapPin className="size-4" />
                      <span>{job.location}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <DollarSignIcon className="size-4" />
                      <span>{job.salary}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar className="size-4" />
                      <span>{job.remaining}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* RIGHT SECTION */}
              <div className="flex items-center justify-between sm:justify-end gap-4 sm:flex-shrink-0">
                <Bookmark className="size-6 text-gray-500 cursor-pointer hover:text-blue-500" />
                <button className="bg-blue-100 px-4 py-2 flex items-center gap-2 text-blue-500 rounded-md hover:bg-blue-200 transition">
                  Apply Now
                  <ArrowRight className="size-4" />
                </button>
              </div>

            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default FindJobCard;
