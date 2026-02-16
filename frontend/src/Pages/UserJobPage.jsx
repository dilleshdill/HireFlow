import React, { useEffect, useState } from "react";
import NavBar from "../Components/Navbar.jsx";
import {
  Link,
  Phone,
  Mail,
  CalendarDays,
  GraduationCap,
  MapPin,
  BriefcaseBusiness,
  LayoutDashboard,
  User,
  PlusSquare,
  Briefcase ,
  Bookmark,
  Users,
  Building2,
  Settings,
  ClipboardClock,

  ShieldCheck,
} from "lucide-react";
import { Facebook, Twitter, MessageCircle, Youtube } from "lucide-react";
import RelatedJobs from "../Components/RelatedJobs.jsx";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Sidebar from "../Components/Sidebar.jsx";
import RecruiterStaticSidebar from "../Components/Recruiter/RecruiterStaticSidebar.jsx";
import Loader from "../Components/Loader.jsx";

const DOMAIN = import.meta.env.VITE_DOMAIN;

const UserJobPage = () => {
  const { id } = useParams();
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
    const [selectedSidebar , setSelectedSidebar] = useState('overview')
    const navigate = useNavigate()

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          DOMAIN + `/api/user/get-user/?userId=${id}`,
          { withCredentials: true }
        );

        if (response.status === 200) {
          setUserData(response.data.user);
        }
      } catch (error) {
        console.log(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

    
  
    useEffect(() => {
      const savedSidebar = localStorage.getItem("sideBar");
      if (savedSidebar) {
        setSelectedSidebar(savedSidebar);
      }
    }, []);
  

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen w-full">
        <Loader />
      </div>
    );
  }

  if (!userData) {
    return <div className="p-10 text-center">User not found</div>;
  }

  return (
    <div className="min-h-screen flex flex-col">
      <div className='sm:hidden'>
        <RecruiterStaticSidebar />
      </div>
    <div className="flex flex-1 max-w-9xl mx-auto w-full px-4 py-4 gap-4">
      <div className='hidden sm:flex'>
          <RecruiterStaticSidebar />
      </div>
      <div>
        {/* Header */}
      <div className="w-full bg-gray-200 pt-3 pb-3">
        <div className="flex max-w-7xl mx-auto justify-between px-4">
          <h1 className="text-lg">User Profile</h1>
          <p className="text-md text-gray-400">Home / User / Profile</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 mt-6">

        {/* Top Section */}
        <div className="flex justify-between items-center">

          <div className="flex items-center gap-5">
            <img
              src="https://ui-avatars.com/api/?name=User"
              className="h-20 w-20 rounded-full"
              alt="profile"
            />

            <div>
              <h2 className="text-xl font-semibold">
                {userData.title}
              </h2>
              <p className="text-gray-500">
                {userData.education} • {userData.location}
              </p>

              <div className="flex gap-4 mt-2 text-sm text-gray-600">
                <div className="flex items-center gap-1">
                  <Phone size={15} />
                  {userData.phoneNo}
                </div>

                <div className="flex items-center gap-1">
                  <Link size={15} />
                  {userData.websiteUrl}
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Content */}
        <div className="flex gap-16 mt-8">

          {/* Left Section */}
          <div className="max-w-3xl">

            <h3 className="text-lg font-semibold text-gray-700">
              Biography
            </h3>

            <p className="text-gray-600 mt-3">
              {userData.biography}
            </p>

          </div>

          {/* Right Section */}
          <div className="w-full max-w-md">

            <div className="border border-gray-300 p-5 rounded-lg">

              <h3 className="text-lg font-semibold mb-4">
                Profile Overview
              </h3>

              <div className="space-y-4">

                <div className="flex items-center gap-2">
                  <GraduationCap size={20} className="text-blue-400" />
                  <span>{userData.education}</span>
                </div>

                <div className="flex items-center gap-2">
                  <BriefcaseBusiness size={20} className="text-blue-400" />
                  <span>{userData.experience} Years Experience</span>
                </div>

                <div className="flex items-center gap-2">
                  <MapPin size={20} className="text-blue-400" />
                  <span>{userData.location}</span>
                </div>

                <div className="flex items-center gap-2">
                  <ShieldCheck size={20} className="text-blue-400" />
                  <span>{userData.nationality}</span>
                </div>

                <div className="flex items-center gap-2">
                  <CalendarDays size={20} className="text-blue-400" />
                  <span>{userData.dateOfBirth}</span>
                </div>

              </div>

            </div>

            {/* Social Links */}
            <div className="border border-gray-300 p-5 rounded-lg mt-6">

              <h3 className="text-lg font-semibold mb-4">
                Social Links
              </h3>

              <div className="flex gap-3">

                {userData.facebook && (
                  <a href={`https://${userData.facebook}`} target="_blank">
                    <Facebook className="text-blue-600" />
                  </a>
                )}

                {userData.twitter && (
                  <a href={`https://${userData.twitter}`} target="_blank">
                    <Twitter className="text-blue-400" />
                  </a>
                )}

                {userData.instagram && (
                  <a href={`https://${userData.instagram}`} target="_blank">
                    <MessageCircle className="text-green-500" />
                  </a>
                )}

                {userData.youtube && (
                  <a href={`https://${userData.youtube}`} target="_blank">
                    <Youtube className="text-red-500" />
                  </a>
                )}

              </div>

            </div>

          </div>

        </div>

        <div className="mt-10">
          <RelatedJobs />
        </div>

      </div>
      </div>
    </div>
    </div>
  );
};

export default UserJobPage;
