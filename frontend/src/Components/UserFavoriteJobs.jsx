import React from 'react'
import {
  Briefcase,
  ArrowRightIcon,
  MapPin,
  ArrowRight,
  ArrowLeftIcon,
  Check,
  PencilLine,
  CircleDashed,
  Bookmark,
  Calendar,
  DollarSign,
  CirclePlus,
} from "lucide-react";

  const favoriteJobs = [
    {
      id: 1,
      name: "Tech Solutions Inc.",
      jobRole: "Frontend Developer",
      image: "https://cdn-icons-png.flaticon.com/512/5968/5968705.png",
      location: "San Francisco, CA",
      status: "active",
      type: "full-time",
      salary: "$120,000 / year",
      postedDate: "expired",
    },
    {
      id: 2,
      name: "Innovatech Corp.",
      jobRole: "Full Stack Engineer",
      image: "https://cdn-icons-png.flaticon.com/512/5968/5968292.png",
      location: "New York, NY",
      status: "pending",
      type: "remote",
      salary: "$95,000 / year",
      postedDate: "2",
    },
    {
      id: 3,
      name: "Global Enterprises",
      jobRole: "Backend Developer",
      image: "https://cdn-icons-png.flaticon.com/512/5968/5968672.png",
      location: "Chicago, IL",
      status: "active",
      type: "part-time",
      salary: "$45 / hour",
      postedDate: "5",
    },
    {
      id: 4,
      name: "Creative Minds LLC",
      jobRole: "UI/UX Designer",
      image: "https://cdn-icons-png.flaticon.com/512/5968/5968267.png",
      location: "Austin, TX",
      status: "pending",
      type: "full-time",
      salary: "$105,000 / year",
      postedDate: "expired",
    },
    {
      id: 5,
      name: "CloudNine Systems",
      jobRole: "DevOps Engineer",
      image: "https://cdn-icons-png.flaticon.com/512/5968/5968282.png",
      location: "Seattle, WA",
      status: "active",
      type: "remote",
      salary: "$110,000 / year",
      postedDate: "8",
    },
    {
      id: 6,
      name: "NextGen Innovations",
      jobRole: "QA Engineer",
      image: "https://cdn-icons-png.flaticon.com/512/5968/5968295.png",
      location: "Boston, MA",
      status: "pending",
      type: "part-time",
      salary: "$40 / hour",
      postedDate: "2",
    },
    {
      id: 7,
      name: "Apex Technologies",
      jobRole: "Software Engineer",
      image: "https://cdn-icons-png.flaticon.com/512/5968/5968300.png",
      location: "Denver, CO",
      status: "active",
      type: "full-time",
      salary: "$98,000 / year",
      postedDate: "expired",
    },
    {
      id: 8,
      name: "Bright Future Labs",
      jobRole: "Data Scientist",
      image: "https://cdn-icons-png.flaticon.com/512/5968/5968312.png",
      location: "Los Angeles, CA",
      status: "pending",
      type: "remote",
      salary: "$115,000 / year",
      postedDate: "9",
    },
    {
      id: 9,
      name: "Summit Solutions",
      jobRole: "Product Manager",
      image: "https://cdn-icons-png.flaticon.com/512/5968/5968321.png",
      location: "Dallas, TX",
      status: "active",
      type: "full-time",
      salary: "$90,000 / year",
      postedDate: "expired",
    },
    {
      id: 10,
      name: "BlueWave Tech",
      jobRole: "Mobile App Developer",
      image: "https://cdn-icons-png.flaticon.com/512/5968/5968330.png",
      location: "Miami, FL",
      status: "pending",
      type: "part-time",
      salary: "$42 / hour",
      postedDate: "1",
    },
  ];
const UserFavoriteJobs = () => {
  return (
    <div>
        <div className="flex items-center justify-between p-2">
            <p className='font-medium text-gray-700'>Favorite Jobs(567)</p>
            <div>
            <button
                onClick={() => setShowAllJobs((prev) => !prev)}
                className="p-2 text-sm flex items-center justify-center text-gray-500 gap-2"
            >
                
                <PencilLine className="size-4" />
                Edit Job Alert
            </button>
            </div>
        </div>
        {/* MOBILE VIEW (GRID CARDS) */}
      <div className="lg:col-span-3 grid grid-cols-1 sm:grid-cols-2 gap-6 sm:hidden">
        {favoriteJobs.map((job) => (
          <div
            key={job.id}
            className="bg-white p-5 rounded-lg border border-gray-200 hover:shadow-md transition"
          >
            <div className="flex items-center gap-4 mb-4">
              <img
                src={job.image}
                alt="logo"
                className="h-12 w-12 rounded-md object-contain"
              />
              <div>
                <p className="font-semibold">{job.jobRole}</p>
                <p className="font-semibold text-xs">{job.name}</p>
                <p className="text-xs text-gray-500 capitalize">{job.type}</p>
              </div>
            </div>

            <div className="flex flex-col gap-2 text-sm text-gray-500">
              <div className="flex items-center gap-2">
                <MapPin className="size-4" />
                {job.location}
              </div>
              <div className="flex items-center gap-2">
                <Briefcase className="size-4" />
                {job.open_jobs} open jobs
              </div>
            </div>

            <button className="bg-gray-200 font-medium w-full mt-4 px-4 py-2 flex items-center justify-center gap-2 text-blue-500 rounded-md hover:bg-gray-300 transition">
              View Details
              <ArrowRight className="size-4" />
            </button>
          </div>
        ))}
      </div>

      {/* LAPTOP / DESKTOP VIEW (ONE CARD PER ROW) */}
      <div className="hidden sm:flex lg:col-span-3 flex-col gap-4 pt-3">
        {favoriteJobs.map((job) => (
          <div
            key={job.id}
            className="flex items-center justify-between p-4 border border-gray-200 rounded-lg bg-white hover:shadow-md transition"
          >
            {/* LEFT */}
            <div className="flex items-center gap-4">
              <img
                src={job.image}
                alt="logo"
                className="h-12 w-12 rounded-md object-contain"
              />

              <div className="flex flex-col gap-1">
                <div className="flex items-center gap-2">
                  <p className="font-semibold">{job.jobRole}</p>

                  <span className="text-xs px-2 py-0.5 rounded-full bg-blue-100 text-blue-500 capitalize">
                    {job.type}
                  </span>
                </div>
                <p className="text-gray-600 text-xs">{job.name}</p>

                <div className="flex items-center gap-4 text-xs text-gray-500">
                  <div className="flex items-center gap-1">
                    <MapPin className="size-4" />
                    {job.location}
                  </div>

                  <div className="flex items-center gap-1">
                    <DollarSign className="size-4" />
                    {job.salary} 
                  </div>
                  <div className="flex items-center gap-1">
                    
                    {job.postedDate === "expired" ? (
                        <div className='flex gap-1'>
                            <CirclePlus className='size-3 text-red-500' />
                            <p className='text-red-500 text-xs'>Job Expired</p>
                        </div>
                    ):(<div className='flex gap-1 items-center'>
                        <Calendar className="size-4" />
                        <p>{job.postedDate} Days Remaining</p>
                        </div>)}
                  </div>
                </div>
              </div>
            </div>

            {/* RIGHT */}
            <div className="flex items-center gap-2">
                <button className="flex items-center text-md text-gray-600 cursor-pointer transition">
                <Bookmark className='size-5' fill='black' />
              </button>

              <button className="flex items-center gap-3 px-4 py-2 text-sm text-blue-500 cursor-pointer font-medium bg-blue-100 rounded-md hover:bg-blue-600 hover:text-white transition">
                View Details
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default UserFavoriteJobs