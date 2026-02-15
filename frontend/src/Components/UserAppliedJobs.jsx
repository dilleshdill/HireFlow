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
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import Loader from "./Loader";

const DOMAIN = import.meta.env.VITE_DOMAIN
const UserAppliedJobs = () => {
  const [showAllJobs, setShowAllJobs] = useState(false);
  const [appliedJobs , setAppliedJobs] = useState([])
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const limit = 5;
  const [loading , setLoading] = useState(false)

  const navigate = useNavigate();

  useEffect(()=>{
    const fetchAppliedJobs = async () => {
      try {
        setLoading(true)
        const response = await axios.get(DOMAIN + '/api/job/applied-jobs',{
          params:{
            page,
            limit
          }
          ,withCredentials:true})
        if(response.status === 200){
          console.log(response.data.jobs)
          setAppliedJobs(response.data.jobs)
        }
      } catch (error) {
        console.log(error.message)
      }finally{
        setLoading(false)
      }
    }
    fetchAppliedJobs();
  },[page])
  
  const visibleJobs = showAllJobs ? appliedJobs : appliedJobs.slice(0, 4);
    const loaderComponent = loading ? <Loader /> : null;



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
      {loaderComponent}

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
            key={job._id}
            className="bg-white p-5 rounded-lg border border-gray-200 hover:shadow-md transition"
          >
            <div className="flex items-center gap-4 mb-4">
              <img
                src={job.recruiterId.logoUrl}
                alt="logo"
                className="h-12 w-12 rounded-md object-contain"
              />
              <div>
                <p className="font-semibold">{job.jobId.role}</p>
                <p className="font-semibold text-xs">{job.jobId.title}</p>
                <p className="text-xs text-gray-500 capitalize">{job.jobId.jobType}</p>
              </div>
            </div>

            <div className="flex flex-col gap-2 text-sm text-gray-500">
              <div className="flex items-center gap-2">
                <MapPin className="size-4" />
                {job.jobId.location}
              </div>
              <div className="flex items-center gap-2">
                <Briefcase className="size-4" />
                {job.jobId.vacancies} open jobs
              </div>
            </div>

            <button onClick={()=>navigate(`/job/homepage/${job.jobId._id}`)} className="bg-gray-200 font-medium w-full mt-4 px-4 py-2 flex items-center justify-center gap-2 text-blue-500 rounded-md hover:bg-gray-300 transition">
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
                src={job.recruiterId.logoUrl || iphonelogo}
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

      <div className="flex items-center justify-center mt-4">
          <Stack spacing={2}>
            <Pagination
              count={5}
              variant="outlined"
              color="primary"
              size="medium"
              shape="rounded"
              onChange={(event, value) => setPage(value)}
            />
          </Stack>
        </div>
    </div>
  );
};

export default UserAppliedJobs;
