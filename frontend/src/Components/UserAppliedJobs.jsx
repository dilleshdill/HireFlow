import React, { useState } from "react";
import iphonelogo from "../assets/iphonelogo.png";
import {
  Briefcase,
  ArrowRightIcon,
  MapPin,
  ArrowRight,
  ArrowLeftIcon,
  Check,
  CircleDashed,
} from "lucide-react";
import { useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";


const DOMAIN = import.meta.env.VITE_DOMAIN
const UserAppliedJobs = () => {
  const [showAllJobs, setShowAllJobs] = useState(false);
  const [appliedJobs , setAppliedJobs] = useState([])

  const navigate = useNavigate();
  // const jobs = [
  //   {
  //     id: 1,
  //     name: "Tech Solutions Inc.",
  //     jobRole: "Frontend Developer",
  //     image: "https://cdn-icons-png.flaticon.com/512/5968/5968705.png",
  //     location: "San Francisco, CA",
  //     status: "active",
  //     type: "full-time",
  //     salary: "$120,000 / year",
  //     dateApplied: "2025-01-05",
  //   },
  //   {
  //     id: 2,
  //     name: "Innovatech Corp.",
  //     jobRole: "Full Stack Engineer",
  //     image: "https://cdn-icons-png.flaticon.com/512/5968/5968292.png",
  //     location: "New York, NY",
  //     status: "pending",
  //     type: "remote",
  //     salary: "$95,000 / year",
  //     dateApplied: "2025-01-08",
  //   },
  //   {
  //     id: 3,
  //     name: "Global Enterprises",
  //     jobRole: "Backend Developer",
  //     image: "https://cdn-icons-png.flaticon.com/512/5968/5968672.png",
  //     location: "Chicago, IL",
  //     status: "active",
  //     type: "part-time",
  //     salary: "$45 / hour",
  //     dateApplied: "2025-01-10",
  //   },
  //   {
  //     id: 4,
  //     name: "Creative Minds LLC",
  //     jobRole: "UI/UX Designer",
  //     image: "https://cdn-icons-png.flaticon.com/512/5968/5968267.png",
  //     location: "Austin, TX",
  //     status: "pending",
  //     type: "full-time",
  //     salary: "$105,000 / year",
  //     dateApplied: "2025-01-12",
  //   },
  //   {
  //     id: 5,
  //     name: "CloudNine Systems",
  //     jobRole: "DevOps Engineer",
  //     image: "https://cdn-icons-png.flaticon.com/512/5968/5968282.png",
  //     location: "Seattle, WA",
  //     status: "active",
  //     type: "remote",
  //     salary: "$110,000 / year",
  //     dateApplied: "2025-01-15",
  //   },
  //   {
  //     id: 6,
  //     name: "NextGen Innovations",
  //     jobRole: "QA Engineer",
  //     image: "https://cdn-icons-png.flaticon.com/512/5968/5968295.png",
  //     location: "Boston, MA",
  //     status: "pending",
  //     type: "part-time",
  //     salary: "$40 / hour",
  //     dateApplied: "2025-01-17",
  //   },
  //   {
  //     id: 7,
  //     name: "Apex Technologies",
  //     jobRole: "Software Engineer",
  //     image: "https://cdn-icons-png.flaticon.com/512/5968/5968300.png",
  //     location: "Denver, CO",
  //     status: "active",
  //     type: "full-time",
  //     salary: "$98,000 / year",
  //     dateApplied: "2025-01-19",
  //   },
  //   {
  //     id: 8,
  //     name: "Bright Future Labs",
  //     jobRole: "Data Scientist",
  //     image: "https://cdn-icons-png.flaticon.com/512/5968/5968312.png",
  //     location: "Los Angeles, CA",
  //     status: "pending",
  //     type: "remote",
  //     salary: "$115,000 / year",
  //     dateApplied: "2025-01-21",
  //   },
  //   {
  //     id: 9,
  //     name: "Summit Solutions",
  //     jobRole: "Product Manager",
  //     image: "https://cdn-icons-png.flaticon.com/512/5968/5968321.png",
  //     location: "Dallas, TX",
  //     status: "active",
  //     type: "full-time",
  //     salary: "$90,000 / year",
  //     dateApplied: "2025-01-23",
  //   },
  //   {
  //     id: 10,
  //     name: "BlueWave Tech",
  //     jobRole: "Mobile App Developer",
  //     image: "https://cdn-icons-png.flaticon.com/512/5968/5968330.png",
  //     location: "Miami, FL",
  //     status: "pending",
  //     type: "part-time",
  //     salary: "$42 / hour",
  //     dateApplied: "2025-01-25",
  //   },
  // ];

  useEffect(()=>{
    const fetchAppliedJobs = async () => {
      try {
        const response = await axios.get(DOMAIN + '/api/job/applied-jobs',{withCredentials:true})
        if(response.status === 200){
          console.log(response.data.jobs)
          setAppliedJobs(response.data.jobs)
        }
      } catch (error) {
        console.log(error.message)
      }
    }
    fetchAppliedJobs();
  },[])
  const visibleJobs = showAllJobs ? appliedJobs : appliedJobs.slice(0, 4);

  return (
    <div>
      <div className="flex items-center justify-between p-2">
        <p>Applied(567)</p>
        <div>
          <button
            onClick={() => setShowAllJobs((prev) => !prev)}
            className="p-2 flex items-center justify-center text-gray-500 gap-2"
          >
            {showAllJobs ? (
              <>
                View less
                <ArrowLeftIcon className="size-4" />
              </>
            ) : (
              <>
                View all
                <ArrowRightIcon className="size-4" />
              </>
            )}
          </button>
        </div>
      </div>

      <div className="hidden sm:flex items-center justify-between pr-10 pl-1 bg-gray-200 text-gray-500 text-sm p-2 rounded-md">
        <div className="pl-5">
          <p>Jobs</p>
        </div>
        <div className="flex items-center justify-between w-110 pr-5 pl-4">
          <p>Date Applied</p>
          <p>Status</p>
          <p>Action</p>
        </div>
      </div>

      {/* MOBILE VIEW (GRID CARDS) */}
      <div className="lg:col-span-3 grid grid-cols-1 sm:grid-cols-2 gap-6 sm:hidden">
        {visibleJobs.map((job) => (
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
        {visibleJobs.map((job) => (
          <div
            key={job._id}
            className="flex items-center justify-between p-4 border border-gray-200 rounded-lg bg-white hover:shadow-md transition"
          >
            {/* LEFT */}
            <div className="flex items-center gap-4">
              <img
                src={job.image || iphonelogo}
                alt="logo"
                className="h-12 w-12 rounded-md object-contain"
              />

              <div className="flex flex-col gap-1">
                <div className="flex items-center gap-2">
                  <p className="font-semibold">{job.jobId.role}</p>

                  <span className="text-xs px-2 py-0.5 rounded-full bg-blue-100 text-blue-500 capitalize">
                    {job.jobId.jobType}
                  </span>
                </div>
                <p className="text-gray-600 text-xs">{job.jobId.title}</p>

                <div className="flex items-center gap-4 text-sm text-gray-500">
                  <div className="flex items-center gap-1">
                    <MapPin className="size-4" />
                    {job.jobId.location}
                  </div>
                  <div className="flex items-center gap-1">
                    <Briefcase className="size-4" />
                    {job.jobId.vacancies} open jobs
                  </div>
                </div>
              </div>
            </div>

            {/* RIGHT */}
            <div className="flex items-center justify-between w-110">
              <p className="text-sm text-gray-500">{job.createdAt}</p>
              {job.status === "APPLIED" ? (
                <div className="flex items-center justify-center gap-1 text-green-600">
                  <Check className="size-4" />
                  <p className="text-sm ">{job.status}</p>
                </div>
              ) : (
                <div className="flex items-center justify-center text-orange-400 gap-2">
                  <CircleDashed className="size-3" />
                  <p className="text-sm">{job.status}</p>
                </div>
              )}

              <button
                onClick={()=>navigate(`/job/homepage/${job.jobId._id}`)}
              className="flex items-center gap-3 px-4 py-2 text-sm text-blue-500 font-medium bg-gray-100 rounded-md hover:bg-gray-200 transition">
                View Details
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="flex items-center justify-between w-full max-w-80 text-gray-500 font-medium">
        <button
          type="button"
          aria-label="prev"
          className="rounded-full bg-slate-200/50"
        >
          <svg
            width="40"
            height="40"
            viewBox="0 0 40 40"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M22.499 12.85a.9.9 0 0 1 .57.205l.067.06a.9.9 0 0 1 .06 1.206l-.06.066-5.585 5.586-.028.027.028.027 5.585 5.587a.9.9 0 0 1 .06 1.207l-.06.066a.9.9 0 0 1-1.207.06l-.066-.06-6.25-6.25a1 1 0 0 1-.158-.212l-.038-.08a.9.9 0 0 1-.03-.606l.03-.083a1 1 0 0 1 .137-.226l.06-.066 6.25-6.25a.9.9 0 0 1 .635-.263Z"
              fill="#475569"
              stroke="#475569"
              strokeWidth=".078"
            />
          </svg>
        </button>

        <div className="flex items-center gap-2 text-sm font-medium">
          <button className="h-10 w-10 flex items-center justify-center aspect-square">
            1
          </button>
          <button className="h-10 w-10 flex items-center justify-center aspect-square">
            2
          </button>
          <button className="h-10 w-10 flex items-center justify-center aspect-square text-indigo-500 border border-indigo-200 rounded-full">
            3
          </button>
          <button className="h-10 w-10 flex items-center justify-center aspect-square">
            4
          </button>
          <button className="h-10 w-10 flex items-center justify-center aspect-square">
            5
          </button>
        </div>

        <button
          type="button"
          aria-label="next"
          className="rounded-full bg-slate-200/50"
        >
          <svg
            className="rotate-180"
            width="40"
            height="40"
            viewBox="0 0 40 40"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M22.499 12.85a.9.9 0 0 1 .57.205l.067.06a.9.9 0 0 1 .06 1.206l-.06.066-5.585 5.586-.028.027.028.027 5.585 5.587a.9.9 0 0 1 .06 1.207l-.06.066a.9.9 0 0 1-1.207.06l-.066-.06-6.25-6.25a1 1 0 0 1-.158-.212l-.038-.08a.9.9 0 0 1-.03-.606l.03-.083a1 1 0 0 1 .137-.226l.06-.066 6.25-6.25a.9.9 0 0 1 .635-.263Z"
              fill="#475569"
              stroke="#475569"
              strokeWidth=".078"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default UserAppliedJobs;
