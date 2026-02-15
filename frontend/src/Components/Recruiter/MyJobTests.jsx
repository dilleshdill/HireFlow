import React, { useEffect, useState } from "react";
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
import axios from "axios";
import { useNavigate } from "react-router-dom";
import iphonelogo from "../../assets/iphonelogo.png";
import Loader from "../Loader";


const DOMAIN = import.meta.env.VITE_DOMAIN
const MyJobTests = () => {
  const [showAllJobs, setShowAllJobs] = useState(false);
  const [jobs , setJobs] = useState([])
  const [loading , setLoading] = useState(true)
  const navigate = useNavigate();

  const developerRoles = [
    { id: 1, label: "Frontend Developer", value: "frontend_developer" },
    { id: 2, label: "Backend Developer", value: "backend_developer" },
    { id: 3, label: "Full Stack Developer", value: "fullstack_developer" },
    { id: 4, label: "MERN Stack Developer", value: "mern_stack_developer" },
    { id: 5, label: "MEAN Stack Developer", value: "mean_stack_developer" },
    { id: 6, label: "React Developer", value: "react_developer" },
    { id: 7, label: "Node.js Developer", value: "nodejs_developer" },
    { id: 8, label: "JavaScript Developer", value: "javascript_developer" },
    { id: 9, label: "Web Developer", value: "web_developer" },
    { id: 10, label: "Software Engineer", value: "software_engineer" },
  ];

  useEffect(()=>{
    const fetchJobs = async() => {
      try {
        const response = await axios.get(DOMAIN + '/api/job/my-jobs' , {withCredentials:true})

        if(response.status === 200){
          console.log(response.data)
          setJobs(response.data.jobs)
        }
      } catch (error) {
        console.error("Failed to fetch jobs:", error);
      }finally{
        setLoading(false)
      }
    }
    fetchJobs();
  },[])

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen w-full">
        <Loader />
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between p-2">
        <h2 className="font-medium text-gray-700">My Tests ( {jobs.length} )</h2>
        <div>
          <select className="border border-gray-200 px-3 py-2 rounded">
            <option value="" disabled>
              Select Role
            </option>
            {developerRoles.map((role) => (
              <option key={role.id} value={role.value}>
                {role.label}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="hidden sm:flex items-center justify-between pr-10 pl-1 bg-gray-100 text-gray-500 text-sm p-2 rounded-md">
        <div className="pl-5">
          <p>Jobs</p>
        </div>
        <div className="flex gap-30">
          <p>Applications</p>
          <p>Status</p>
          <p>Action</p>
        </div>
      </div>

      {/* MOBILE VIEW (GRID CARDS) */}
      <div className="lg:col-span-3 grid grid-cols-1 sm:grid-cols-2 gap-6 sm:hidden">
        {jobs.map((job) => (
          <div
            key={job._id}
            className="bg-white p-5 rounded-lg border border-gray-200 hover:shadow-md transition"
          >
            <div className="flex items-center gap-4 mb-4">
              <img
                src={job.postedBy.logoUrl}
                alt="logo"
                className="h-12 w-12 rounded-md object-contain"
              />
              <div>
                <p className="font-semibold">{job.role}</p>
                <p className="font-semibold text-xs">{job.jobLevel}</p>
                <p className="text-xs text-gray-500 capitalize">{job.jobType}</p>
              </div>
            </div>

            <div className="flex flex-col gap-2 text-sm text-gray-500">
              <div className="flex items-center gap-2">
                <MapPin className="size-4" />
                {job.location}
              </div>
              <div className="flex items-center gap-2">
                <Briefcase className="size-4" />
                {job.vacancies} open jobs
              </div>
            </div>

            <button onClick={()=>navigate(`/questions-setup/${job._id}`)} className="bg-blue-200 w-full mt-4 px-4 py-2 flex items-center justify-center gap-2 text-blue-500 rounded-md hover:bg-blue-300 transition">
              Add Test Details
              <ArrowRight className="size-4" />
            </button>
          </div>
        ))}
      </div>

      {/* LAPTOP / DESKTOP VIEW (ONE CARD PER ROW) */}
      <div className="hidden sm:flex lg:col-span-3 flex-col gap-4 pt-3">
        {jobs.map((job) => (
          <div
            key={job._id}
            className="flex items-center justify-between p-4 border border-gray-200 rounded-lg bg-white hover:shadow-md transition"
          >
            {/* LEFT */}
            <div className="flex items-center gap-4">
              <img
                src={job.postedBy.logoUrl || iphonelogo}
                alt="logo"
                className="h-12 w-12 rounded-md object-contain"
              />

              <div className="flex flex-col gap-1">
                <div className="flex items-center gap-2">
                  <p className="font-semibold">{job.role}</p>

                  <span className="text-xs px-2 py-0.5 rounded-full bg-blue-100 text-blue-500 capitalize">
                    {job.jobType}
                  </span>
                </div>

                <div className="flex items-center gap-4 text-sm text-gray-500">
                  <div className="flex items-center gap-1">
                    <MapPin className="size-4" />
                    {job.location || "Remote"}
                  </div>
                  <div className="flex items-center gap-1">
                    <Briefcase className="size-4" />
                    {job.vacancies} open jobs
                  </div>
                </div>
              </div>
            </div>

            {/* RIGHT */}
            <div className="flex items-center justify-between w-110">
              <div className="flex items-center justify-center gap-1 text-gray-400">
                <Users2 className="size-4" />
                <p className="text-sm "> {job.applications.length} Applications</p>
              </div>
              {job.isActive === true ? (
                <div className="flex items-center justify-center gap-1 text-green-600">
                  <Check className="size-4" />
                  <p className="text-sm ">Active</p>
                </div>
              ) : (
                <div className="flex items-center justify-center text-orange-400 gap-2">
                  <CircleDashed className="size-3" />
                  <p className="text-sm">Pending</p>
                </div>
              )}

              <div className="flex gap-2">
                <button
                  onClick={()=>navigate(`/questions-setup/${job._id}`)}
                 className="flex items-center gap-3 px-4 py-2 text-sm text-blue-500 font-medium bg-gray-100 rounded-md hover:bg-gray-200 transition">
                  Add Test Details
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
  );
};

export default MyJobTests