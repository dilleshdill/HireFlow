import React from 'react'
import {
  LayoutDashboard,
  User,
  PlusSquare,
  Briefcase,
  Bookmark,
  Users,
  Building2,
  Settings,
  Bell,
  Check,
  CircleDashed,
  BriefcaseBusiness,
  ArrowRightIcon,
  MapPin,
  ArrowRight,
  ArrowLeftIcon,
  Users2,
  EllipsisVerticalIcon,
} from "lucide-react";

const SavedCandidates = () => {

    const savedCandidates = [
  {
    id: 1,
    image: "https://randomuser.me/api/portraits/men/32.jpg",
    name: "Rahul Sharma",
    role: "Frontend Developer",
  },
  {
    id: 2,
    image: "https://randomuser.me/api/portraits/women/45.jpg",
    name: "Ananya Reddy",
    role: "Full Stack Developer",
  },
  {
    id: 3,
    image: "https://randomuser.me/api/portraits/men/67.jpg",
    name: "Suresh Kumar",
    role: "Backend Developer",
  },
  {
    id: 4,
    image: "https://randomuser.me/api/portraits/women/22.jpg",
    name: "Priya Singh",
    role: "MERN Stack Developer",
  },
  {
    id: 5,
    image: "https://randomuser.me/api/portraits/men/81.jpg",
    name: "Arjun Patel",
    role: "React Developer",
  },
];

  return (
    <div>
              {/* MOBILE VIEW (GRID CARDS) */}
      <div className="lg:col-span-3 grid grid-cols-1 sm:grid-cols-2 gap-6 sm:hidden">
        {savedCandidates.map((job) => (
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
                {job.role}
              </div>
              <div className="flex items-center gap-2">
                <Briefcase className="size-4" />
                {job.name} open jobs
              </div>
            </div>

            <button className="bg-blue-200 w-full mt-4 px-4 py-2 flex items-center justify-center gap-2 text-blue-500 rounded-md hover:bg-blue-300 transition">
              Open positions
              <ArrowRight className="size-4" />
            </button>
          </div>
        ))}
      </div>

      {/* LAPTOP / DESKTOP VIEW (ONE CARD PER ROW) */}
      <div className="hidden sm:flex lg:col-span-3 flex-col gap-4 pt-3">
        {savedCandidates.map((job) => (
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
                  <p className="font-semibold">{job.role}</p>
                </div>

                <div className="flex items-center gap-4 text-sm text-gray-500">
                  <div className="flex items-center gap-1">
                    <MapPin className="size-4" />
                    {job.name}
                  </div>
                </div>
              </div>
            </div>

            {/* RIGHT */}
            <div className="flex items-center justify-between ">

              <div className="flex gap-2 items-center">
                <Bookmark className='size-5' />
                <button className="flex items-center gap-3 px-4 py-2 text-sm text-blue-500 font-medium bg-blue-100 rounded-md hover:bg-gray-200 transition">
                  View Profile
                  <ArrowRightIcon className='size-4' />
                </button>
                <button className="flex items-center text-sm text-gray-500 font-medium">
                  <EllipsisVerticalIcon className="size-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default SavedCandidates