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

const DOMAIN = import.meta.env.VITE_DOMAIN
const RecruiterPostedJobs = () => {
  const [showAllJobs, setShowAllJobs] = useState(false);
  const [jobs , setJobs] = useState([])

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
  //     applied: "786",
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
  //     applied: "786",
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
  //     applied: "786",
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
  //     applied: "786",
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
  //     applied: "786",
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
  //     applied: "786",
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
  //     applied: "786",
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
  //     applied: "786",
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
  //     applied: "786",
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
  //     applied: "786",
  //     dateApplied: "2025-01-25",
  //   },
  // ];

  // const visibleJobs = jobs;


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
      }
    }
    fetchJobs();
  },[])
  return (
    <div>
      <div className="flex items-center justify-between p-2">
        <p className="font-medium text-gray-700">Favorite Jobs(567)</p>
        <div className="flex gap-4">
          <button
            onClick={() => setShowAllJobs((prev) => !prev)}
            className="p-2 text-sm flex items-center justify-center text-gray-500 gap-2"
          >
            Job status
          </button>
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
      {/* <div className="lg:col-span-3 grid grid-cols-1 sm:grid-cols-2 gap-6 sm:hidden">
        {jobs.map((job) => (
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

            <button className="bg-blue-200 w-full mt-4 px-4 py-2 flex items-center justify-center gap-2 text-blue-500 rounded-md hover:bg-blue-300 transition">
              Open positions
              <ArrowRight className="size-4" />
            </button>
          </div>
        ))}
      </div> */}

      {/* LAPTOP / DESKTOP VIEW (ONE CARD PER ROW) */}
      <div className="hidden sm:flex lg:col-span-3 flex-col gap-4 pt-3">
        {jobs.map((job) => (
          <div
            key={job._id}
            className="flex items-center justify-between p-4 border border-gray-200 rounded-lg bg-white hover:shadow-md transition"
          >
            {/* LEFT */}
            <div className="flex items-center gap-4">
              {/* <img
                src={job.image}
                alt="logo"
                className="h-12 w-12 rounded-md object-contain"
              /> */}

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
                <p className="text-sm "> 365 Applications</p>
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
                <button className="flex items-center gap-3 px-4 py-2 text-sm text-blue-500 font-medium bg-gray-100 rounded-md hover:bg-gray-200 transition">
                  View Applications
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

export default RecruiterPostedJobs;
