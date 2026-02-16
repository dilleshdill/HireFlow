import React, { useEffect, useState } from "react";

import {
  Link,
  Phone,
  Mail,
  Bookmark,
  MoveRight,
  CalendarDays,
  Timer,
  GraduationCap,
  Wallet,
  MapPin,
  BriefcaseBusiness,
  ShieldCheck,
  Globe
} from "lucide-react";
import { Facebook, Twitter, MessageCircle, Youtube } from "lucide-react";

import { useParams } from "react-router-dom";
import axios from "axios";
import Loader from "../Loader";
import UserSidebar from "../UserSidebar";
import RelatedJobs from "../RelatedJobs";




const DOMAIN = import.meta.env.VITE_DOMAIN

const RecruterCompanyPage = () => {
  const {id} = useParams()
  const [jobData , setJobData] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(()=>{
    const fetchData = async () =>{
      try {
        const response = await axios.get(DOMAIN + `/api/job/job-detailes/?jobId=${id}`,{withCredentials:true})
        if(response.status === 200){
          setJobData(response.data.job)
        }
      } catch (error) {
        console.error("Error fetching job details:", error)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  },[id])

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen w-full">
        <Loader />
      </div>
    )
  }

  if (!jobData) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-xl">Job not found</div>
      </div>
    )
  }

  // Format date function
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' }
    return new Date(dateString).toLocaleDateString(undefined, options)
  }

  return (
    <div className="min-h-screen flex flex-col">
    
    <div className="flex flex-1 max-w-9xl mx-auto w-full px-4 py-4 gap-4">
      <div>
        <div className="w-full bg-gray-200 pt-3 pb-3">
        <div className="flex max-w-7xl mx-auto justify-between px-4">
          <h1 className="text-lg">Company Details</h1>
          <div className="flex">
            <p className="text-md text-gray-400">Home/JobFind/JobDetails</p>
          </div>
        </div>
      </div>
      <div className="w-full">
        <div className="flex flex-col max-w-7xl mx-auto justify-between px-4">
          <div className="flex w-full justify-between items-center ">
            <div className="flex items-center gap-5 mt-5">
              <img
                src={jobData.postedBy?.logoUrl || '/default-logo.png'}
                className="h-20 w-20 rounded-full object-cover"
                alt="Company Logo"
              />
              <div className="flex flex-col gap-2">
                <p className="text-xl font-semibold">{jobData.role}</p>
                <p className="text-md text-gray-400">
                  {jobData.title} • {jobData.jobType} • {jobData.jobLevel}
                </p>
              </div>
            </div>
            <div className="flex flex-col">
              <div className="flex gap-3">
                <div className="flex bg-blue-600 px-6 py-2 items-center gap-1 rounded-sm cursor-pointer hover:bg-blue-700 transition">
                  <p  className="text-white">Apply Now</p>
                  <MoveRight size={20} className="text-white" />
                </div>
              </div>
            </div>
          </div>
          <div className="flex mt-5 gap-16 mb-20">
            <div className="flex flex-col max-w-3xl">
              <h1 className="text-gray-600 text-lg font-semibold">
                Description :
              </h1>
              <p className="text-gray-500 mt-3">
                {jobData.description}
              </p>

              <h1 className="text-gray-600 text-lg font-semibold mt-4">
                Responsibilities :
              </h1>
              <div className="px-7 mt-5">
                <ul className="list-disc pl-5">
                  {jobData?.responsibilities?.map((each, index) => (
                    <li key={index} className="text-gray-600 mb-2">
                      {each}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Display tags/skills if available */}
              {/* Tags */}
              <h1 className="text-gray-600 text-lg font-semibold mt-4">
                    Required Skills :
              </h1>
              <div className="flex flex-wrap gap-2 mt-6">
                
                {jobData?.tags?.[0]?.split(" ").map((tag, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 text-blue-600 bg-blue-100 text-sm rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>


              <div className="flex mt-5 gap-2">
                <h1 className="text-gray-600 font-medium">Share this job:</h1>
                <div className="flex border border-gray-300 px-3 py-1 gap-1 cursor-pointer hover:bg-gray-50">
                  <Facebook className="text-blue-700" />
                  <p className="text-blue-700">Facebook</p>
                </div>
                <div className="flex border border-gray-300 px-3 py-1 gap-1 cursor-pointer hover:bg-gray-50">
                  <Twitter className="text-blue-400" />
                  <p className="text-blue-400">Twitter</p>
                </div>
                <div className="flex border border-gray-300 px-3 py-1 gap-1 cursor-pointer hover:bg-gray-50">
                  <MessageCircle className="text-green-500" />
                  <p className="text-green-500">WhatsApp</p>
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-3">
              <div className="border-2 border-gray-300 p-5">
                <h1 className="text-lg text-gray-500 font-semibold">
                  Job Overview
                </h1>
                <div className="p-2 grid grid-cols-2 gap-6 mt-7">
                  <div className="flex flex-col gap-1">
                    <CalendarDays size={30} className="text-blue-400" />
                    <p className="text-gray-500 text-sm">Posted Date</p>
                    <p className="text-sm font-medium">{formatDate(jobData.createdAt)}</p>
                  </div>
                  <div className="flex flex-col gap-1">
                    <Timer size={30} className="text-blue-400" />
                    <p className="text-gray-500 text-sm">Job Type</p>
                    <p className="text-sm font-medium">{jobData.jobType}</p>
                  </div>
                  
                  <div className="flex flex-col gap-1">
                    <Wallet size={30} className="text-blue-400" />
                    <p className="text-gray-500 text-sm">Salary</p>
                    <p className="text-sm font-medium">
                      {jobData.salary?.currency} {jobData.salary?.min}k - {jobData.salary?.max}k / {jobData.salary?.type}
                    </p>
                  </div>
                  <div className="flex flex-col gap-1">
                    <MapPin size={30} className="text-blue-400" />
                    <p className="text-gray-500 text-sm">Location</p>
                    <p className="text-sm font-medium capitalize">{jobData.location}</p>
                  </div>
                  <div className="flex flex-col gap-1">
                    <BriefcaseBusiness size={30} className="text-blue-400" />
                    <p className="text-gray-500 text-sm">Experience</p>
                    <p className="text-sm font-medium">{jobData.experience}</p>
                  </div>
                  <div className="flex flex-col gap-1">
                    <GraduationCap size={30} className="text-blue-400" />
                    <p className="text-gray-500 text-sm">Education</p>
                    <p className="text-sm font-medium">{jobData.education}</p>
                  </div>
                  <div className="flex flex-col gap-1">
                    <ShieldCheck size={30} className="text-blue-400" />
                    <p className="text-gray-500 text-sm">Vacancies</p>
                    <p className="text-sm font-medium">{jobData.vacancies} positions</p>
                  </div>
                  <div className="flex flex-col gap-1">
                    <Timer size={30} className="text-blue-400" />
                    <p className="text-gray-500 text-sm">Expires On</p>
                    <p className="text-sm font-medium">{formatDate(jobData.expirationDate)}</p>
                  </div>
                </div>
              </div>
              
              <div className="flex flex-col gap-2 border-2 border-gray-300 p-5">
                <h1 className="text-xl font-light">Contact Information</h1>
                <div className="flex gap-3 items-center mt-2">
                  <Globe size={25} className="text-blue-400"/>
                  <div className="flex flex-col gap-1">
                    <p className="text-md text-gray-400 font-light">Website</p>
                    <p className="text-md text-black font-normal">
                      {jobData.postedBy?.companyWebSite || 'www.company.com'}
                    </p>
                  </div>
                </div>
                <hr className="border-t-1 border-gray-300"/>
                <div className="flex gap-3 items-center">
                  <Phone size={25} className="text-blue-400"/>
                  <div className="flex flex-col gap-1">
                    <p className="text-md text-gray-400 font-light">Phone</p>
                    <p className="text-md text-black font-normal">
                      {jobData.postedBy?.phoneNo || "1234567890"}
                    </p>
                  </div>
                </div>
                <hr className="border-t-1 border-gray-300"/>
                <div className="flex gap-3 items-center">
                  <Mail size={25} className="text-blue-400"/>
                  <div className="flex flex-col gap-1">
                    <p className="text-md text-gray-400 font-light">Email Address</p>
                    <p className="text-md text-black font-normal">
                      {jobData.postedBy?.email || 'HireFlow@gmail.com'}
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="flex flex-col gap-2 border-2 border-gray-300 p-5">
                <h1 className="text-lg font-semibold">Follow us on</h1>
                <div className="flex gap-2 mt-2">
                  <div className="bg-blue-200 p-1.5 rounded-md cursor-pointer hover:bg-blue-300">
                    <Facebook className="text-blue-400" />
                  </div>
                  <div className="bg-blue-800 p-1.5 rounded-md cursor-pointer hover:bg-blue-900">
                    <Twitter className="text-white" />
                  </div>
                  <div className="bg-green-200 p-1.5 rounded-md cursor-pointer hover:bg-green-300">
                    <MessageCircle className="text-green-600" />
                  </div>
                  <div className="bg-red-200 p-1.5 rounded-md cursor-pointer hover:bg-red-300">
                    <Youtube className="text-red-500" />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div>
            <RelatedJobs />
          </div>
        </div>
      </div>
      </div>
    </div>
    </div>
  );
};

export default RecruterCompanyPage;
