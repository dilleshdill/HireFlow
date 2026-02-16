import React, { useEffect, useState } from "react";
import {
  Phone,
  CalendarDays,
  GraduationCap,
  MapPin,
  BriefcaseBusiness,
  ShieldCheck,
  Facebook,
  Twitter,
  MessageCircle,
  Youtube,
} from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import RecruiterStaticSidebar from "../Components/Recruiter/RecruiterStaticSidebar.jsx";
import RelatedJobs from "../Components/RelatedJobs.jsx";
import Loader from "../Components/Loader.jsx";

const DOMAIN = import.meta.env.VITE_DOMAIN;

const UserJobPage = () => {
  const { id } = useParams();
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

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
    <div className="min-h-screen bg-gray-50 flex">

      {/* Sidebar Desktop */}
      <div className="hidden lg:block">
        <RecruiterStaticSidebar />
      </div>

      {/* Main Content */}
      <div className="flex-1">

        {/* Mobile Sidebar */}
        <div className="lg:hidden">
          <RecruiterStaticSidebar />
        </div>

        {/* Header */}
        <div className="bg-white border-b">
          <div className="max-w-7xl mx-auto px-4 py-4 flex flex-col sm:flex-row justify-between sm:items-center gap-2">
            <h1 className="text-lg font-semibold">User Profile</h1>
            <p className="text-sm text-gray-400">
              Home / User / Profile
            </p>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 py-6">

          {/* Profile Card */}
          <div className="border border-gray-200 p-5 rounded-lg flex flex-col sm:flex-row items-start sm:items-center gap-6">

            <img
              src={`https://ui-avatars.com/api/?name=${userData.title}`}
              className="h-24 w-24 rounded-full object-cover"
              alt="profile"
            />

            <div className="flex-1">
              <h2 className="text-xl font-semibold">
                {userData.title}
              </h2>

              <p className="text-gray-500 mt-1">
                {userData.education} • {userData.location}
              </p>

              <div className="flex flex-col sm:flex-row sm:items-center gap-3 mt-3 text-sm text-gray-600">
                {userData.phoneNo && (
                  <div className="flex items-center gap-1">
                    <Phone size={15} />
                    {userData.phoneNo}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Main Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">

            {/* Left Side */}
            <div className="lg:col-span-2 space-y-6">

              {/* Biography */}
              <div className="border border-gray-200 p-5 rounded-lg">
                <h3 className="text-lg font-semibold text-gray-700">
                  Biography
                </h3>

                <p className="text-gray-600 mt-3 leading-relaxed">
                  {userData.biography || "No biography added."}
                </p>
              </div>

              {/* Related Jobs */}
              <div>
                <RelatedJobs />
              </div>

            </div>

            {/* Right Side */}
            <div className="space-y-6">

              {/* Profile Overview */}
              <div className="border border-gray-200 p-5 rounded-lg">
                <h3 className="text-lg font-semibold mb-4">
                  Profile Overview
                </h3>

                <div className="space-y-4 text-sm text-gray-600">

                  {userData.education && (
                    <div className="flex items-center gap-2">
                      <GraduationCap size={18} className="text-blue-500" />
                      <span>{userData.education}</span>
                    </div>
                  )}

                  {userData.experience && (
                    <div className="flex items-center gap-2">
                      <BriefcaseBusiness size={18} className="text-blue-500" />
                      <span>{userData.experience} Years Experience</span>
                    </div>
                  )}

                  {userData.location && (
                    <div className="flex items-center gap-2">
                      <MapPin size={18} className="text-blue-500" />
                      <span>{userData.location}</span>
                    </div>
                  )}

                  {userData.nationality && (
                    <div className="flex items-center gap-2">
                      <ShieldCheck size={18} className="text-blue-500" />
                      <span>{userData.nationality}</span>
                    </div>
                  )}

                  {userData.dateOfBirth && (
                    <div className="flex items-center gap-2">
                      <CalendarDays size={18} className="text-blue-500" />
                      <span>{userData.dateOfBirth}</span>
                    </div>
                  )}

                </div>
              </div>

              {/* Social Links */}
              <div className="border border-gray-200 p-5 rounded-lg">
                <h3 className="text-lg font-semibold mb-4">
                  Social Links
                </h3>

                <div className="flex gap-4">

                  {userData.facebook && (
                    <a href={`https://${userData.facebook}`} target="_blank" rel="noreferrer">
                      <Facebook className="text-blue-600 hover:scale-110 transition" />
                    </a>
                  )}

                  {userData.twitter && (
                    <a href={`https://${userData.twitter}`} target="_blank" rel="noreferrer">
                      <Twitter className="text-blue-400 hover:scale-110 transition" />
                    </a>
                  )}

                  {userData.instagram && (
                    <a href={`https://${userData.instagram}`} target="_blank" rel="noreferrer">
                      <MessageCircle className="text-green-500 hover:scale-110 transition" />
                    </a>
                  )}

                  {userData.youtube && (
                    <a href={`https://${userData.youtube}`} target="_blank" rel="noreferrer">
                      <Youtube className="text-red-500 hover:scale-110 transition" />
                    </a>
                  )}

                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default UserJobPage;
