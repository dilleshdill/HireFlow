import React, { useEffect, useState } from "react";
import NavBar from "../Components/Navbar.jsx";
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
import RelatedJobs from "../Components/RelatedJobs.jsx";
import { useParams } from "react-router-dom";
import axios from "axios";
import Loader from "../Components/Loader.jsx";
import Sidebar from "../Components/Sidebar.jsx";
import RecruiterStaticSidebar from "../Components/Recruiter/RecruiterStaticSidebar.jsx";
import UserSidebar from "../Components/UserSidebar.jsx";

const DOMAIN = import.meta.env.VITE_DOMAIN;

const RecruterCompanyPage = () => {
  const { id } = useParams();
  const [jobData, setJobData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          DOMAIN + `/api/job/job-detailes/?jobId=${id}`,
          { withCredentials: true }
        );
        if (response.status === 200) {
          setJobData(response.data.job);
        }
      } catch (error) {
        console.error("Error fetching job details:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader />
      </div>
    );
  }

  if (!jobData) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-xl">Job not found</div>
      </div>
    );
  }

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "short", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div className="min-h-screen flex flex-col">

      {/* Mobile Sidebar */}
      <div className="md:hidden">
        <UserSidebar />
      </div>

      <div className="flex flex-1 w-full max-w-[1600px] mx-auto px-4 py-4 gap-4">

        {/* Desktop Sidebar */}
        <div className="hidden md:block">
          <UserSidebar />
        </div>

        <div className="flex-1">

          {/* Header */}
          <div className="w-full bg-gray-200 py-3">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between max-w-7xl mx-auto px-4 gap-2">
              <h1 className="text-lg font-semibold">Company Details</h1>
              <p className="text-sm text-gray-400">
                Home / JobFind / JobDetails
              </p>
            </div>
          </div>

          <div className="w-full">
            <div className="flex flex-col max-w-7xl mx-auto px-4">

              {/* Top Section */}
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 mt-5">

                <div className="flex items-center gap-4">
                  <img
                    src={jobData.postedBy?.logoUrl || "/default-logo.png"}
                    className="h-20 w-20 rounded-full object-cover"
                    alt="Company Logo"
                  />
                  <div>
                    <p className="text-xl font-semibold">{jobData.role}</p>
                    <p className="text-sm text-gray-400">
                      {jobData.title} • {jobData.jobType} • {jobData.jobLevel}
                    </p>
                  </div>
                </div>

                <div className="w-full lg:w-auto">
                  <div className="flex justify-center lg:justify-end">
                    <div className="w-full lg:w-auto flex bg-blue-600 px-6 py-3 items-center justify-center gap-2 rounded-md cursor-pointer hover:bg-blue-700 transition">
                      <p className="text-white">Apply Now</p>
                      <MoveRight size={20} className="text-white" />
                    </div>
                  </div>
                </div>

              </div>

              {/* Main Content Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8 mb-20">

                {/* LEFT SIDE */}
                <div className="lg:col-span-2 flex flex-col space-y-6">

                  <div>
                    <h1 className="text-gray-600 text-lg font-semibold">
                      Description :
                    </h1>
                    <p className="text-gray-500 mt-3 leading-relaxed">
                      {jobData.description}
                    </p>
                  </div>

                  <div>
                    <h1 className="text-gray-600 text-lg font-semibold">
                      Responsibilities :
                    </h1>
                    <ul className="list-disc pl-6 mt-4 space-y-2">
                      {jobData?.responsibilities?.map((each, index) => (
                        <li key={index} className="text-gray-600">
                          {each}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h1 className="text-gray-600 text-lg font-semibold">
                      Required Skills :
                    </h1>
                    <div className="flex flex-wrap gap-2 mt-4">
                      {jobData?.tags?.[0]?.split(" ").map((tag, index) => (
                        <span
                          key={index}
                          className="px-3 py-1 text-blue-600 bg-blue-100 text-sm rounded-full"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Share */}
                  <div className="flex flex-wrap gap-3 mt-4">
                    <div className="flex border px-4 py-2 gap-2 items-center cursor-pointer hover:bg-gray-50">
                      <Facebook className="text-blue-700" />
                      <p className="text-blue-700 text-sm">Facebook</p>
                    </div>
                    <div className="flex border px-4 py-2 gap-2 items-center cursor-pointer hover:bg-gray-50">
                      <Twitter className="text-blue-400" />
                      <p className="text-blue-400 text-sm">Twitter</p>
                    </div>
                    <div className="flex border px-4 py-2 gap-2 items-center cursor-pointer hover:bg-gray-50">
                      <MessageCircle className="text-green-500" />
                      <p className="text-green-500 text-sm">WhatsApp</p>
                    </div>
                  </div>

                </div>

                {/* RIGHT SIDE */}
                <div className="flex flex-col gap-6">

                  {/* Job Overview */}
                  <div className="border border-gray-300 p-5 rounded-md">
                    <h1 className="text-lg text-gray-500 font-semibold">
                      Job Overview
                    </h1>

                    <div className="grid grid-cols-2 gap-6 mt-6 text-sm">

                      <div>
                        <CalendarDays className="text-blue-400" />
                        <p className="text-gray-500 text-xs mt-1">Posted Date</p>
                        <p>{formatDate(jobData.createdAt)}</p>
                      </div>

                      <div>
                        <Timer className="text-blue-400" />
                        <p className="text-gray-500 text-xs mt-1">Job Type</p>
                        <p>{jobData.jobType}</p>
                      </div>

                      <div>
                        <Wallet className="text-blue-400" />
                        <p className="text-gray-500 text-xs mt-1">Salary</p>
                        <p>
                          {jobData.salary?.currency} {jobData.salary?.min}k - {jobData.salary?.max}k
                        </p>
                      </div>

                      <div>
                        <MapPin className="text-blue-400" />
                        <p className="text-gray-500 text-xs mt-1">Location</p>
                        <p className="capitalize">{jobData.location}</p>
                      </div>

                      <div>
                        <BriefcaseBusiness className="text-blue-400" />
                        <p className="text-gray-500 text-xs mt-1">Experience</p>
                        <p>{jobData.experience}</p>
                      </div>

                      <div>
                        <GraduationCap className="text-blue-400" />
                        <p className="text-gray-500 text-xs mt-1">Education</p>
                        <p>{jobData.education}</p>
                      </div>

                      <div>
                        <ShieldCheck className="text-blue-400" />
                        <p className="text-gray-500 text-xs mt-1">Vacancies</p>
                        <p>{jobData.vacancies} positions</p>
                      </div>

                      <div>
                        <Timer className="text-blue-400" />
                        <p className="text-gray-500 text-xs mt-1">Expires On</p>
                        <p>{formatDate(jobData.expirationDate)}</p>
                      </div>

                    </div>
                  </div>

                  {/* Contact */}
                  <div className="border border-gray-300 p-5 rounded-md space-y-4">
                    <h1 className="text-lg font-semibold">Contact Information</h1>

                    <div className="flex gap-3 items-center">
                      <Globe className="text-blue-400" />
                      <p className="text-sm break-all">
                        {jobData.postedBy?.companyWebSite}
                      </p>
                    </div>

                    <div className="flex gap-3 items-center">
                      <Phone className="text-blue-400" />
                      <p className="text-sm">
                        {jobData.postedBy?.phoneNo}
                      </p>
                    </div>

                    <div className="flex gap-3 items-center">
                      <Mail className="text-blue-400" />
                      <p className="text-sm break-all">
                        {jobData.postedBy?.email}
                      </p>
                    </div>
                  </div>

                </div>
              </div>

              <RelatedJobs />

            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecruterCompanyPage;
