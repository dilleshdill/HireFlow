import React, { useEffect, useState } from "react";
import {
  Briefcase,
  MapPin,
  Bookmark,
  Calendar,
  DollarSign,
  CirclePlus,
  PencilLine,
} from "lucide-react";
import axios from "axios";
import iphonelogo from "../assets/iphonelogo.png";

const DOMAIN = import.meta.env.VITE_DOMAIN;

const UserFavoriteJobs = () => {
  const [favoriteJobs, setFavoriteJobs] = useState([]);
  const [showDelete, setShowDelete] = useState(false);
  const [curDeleteId, setCurDeleteId] = useState("");

  useEffect(() => {
    const fetchFavoriteJobs = async () => {
      try {
        const response = await axios.get(
          `${DOMAIN}/api/job/get-favorite`,
          { withCredentials: true }
        );

        if (response.status === 200) {
          setFavoriteJobs(response.data.jobs || []);
        }
      } catch (error) {
        console.log(error.message);
      }
    };

    fetchFavoriteJobs();
  }, []);

  const removeFavorite = async (jobId) => {
    try {
      const response = await axios.post(
        `${DOMAIN}/api/job/remove-favorite`,
        { jobId },
        { withCredentials: true }
      );

      if (response.status === 200) {
        setFavoriteJobs((prev) =>
          prev.filter((fav) => fav.jobId?._id !== jobId)
        );
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const getDaysRemaining = (date) => {
    if (!date) return null;

    const expiry = new Date(date);
    if (isNaN(expiry.getTime())) return null;

    const today = new Date();
    return Math.ceil((expiry - today) / (1000 * 60 * 60 * 24));
  };

  return (
    <div>
      {/* HEADER */}
      <div className="flex items-center justify-between p-2">
        <p className="font-medium text-gray-700">
          Favorite Jobs ({favoriteJobs.length})
        </p>

        <button className="p-2 text-sm flex items-center text-gray-500 gap-2">
          <PencilLine className="size-4" />
          Edit Job Alert
        </button>
      </div>

      {/* MOBILE VIEW */}
      <div className="grid grid-cols-1 sm:hidden gap-6">
        {favoriteJobs.map((job) => {
          const daysRemaining = getDaysRemaining(
            job.jobId?.expirationDate
          );

          return (
            <div
              key={job._id}
              className="bg-white p-5 rounded-lg border border-gray-200 hover:shadow-md transition"
            >
              <div className="flex items-center gap-4 mb-4">
                <img
                  src={iphonelogo}
                  alt="logo"
                  className="h-12 w-12 rounded-md object-contain"
                />

                <div>
                  <p className="font-semibold">
                    {job.jobId?.role}
                  </p>
                  <p className="text-xs text-gray-500 capitalize">
                    {job.jobId?.jobType}
                  </p>
                </div>
              </div>

              <div className="flex flex-col gap-2 text-sm text-gray-500">
                <div className="flex items-center gap-2">
                  <MapPin className="size-4" />
                  {job.jobId?.location}
                </div>

                <div className="flex items-center gap-2">
                  <DollarSign className="size-4" />
                  {job.jobId?.salary?.max || "Not disclosed"}
                </div>

                {daysRemaining === null ? (
                  <p>No expiry</p>
                ) : daysRemaining <= 0 ? (
                  <div className="flex gap-1 items-center">
                    <CirclePlus className="size-3 text-red-500" />
                    <p className="text-red-500 text-xs">
                      Job Expired
                    </p>
                  </div>
                ) : (
                  <div className="flex gap-1 items-center">
                    <Calendar className="size-4" />
                    <p>{daysRemaining} Days Remaining</p>
                  </div>
                )}
              </div>

              <button
                onClick={() => {
                  setCurDeleteId(job.jobId._id);
                  setShowDelete(true);
                }}
                className="bg-gray-200 font-medium w-full mt-4 px-4 py-2 flex items-center justify-center gap-2 text-red-500 rounded-md hover:bg-gray-300 transition"
              >
                Remove from Favorites
              </button>
            </div>
          );
        })}
      </div>

      {/* DESKTOP VIEW */}
      <div className=" hidden md:flex flex-col gap-4 pt-3">
        {favoriteJobs.length === 0 ? (
          <p className="text-center text-gray-500 py-10">
            No favorite jobs found
          </p>
        ) : (
          favoriteJobs.map((job) => {
            const daysRemaining = getDaysRemaining(
              job.jobId?.expirationDate
            );

            return (
              <div
                key={job._id}
                className="flex items-center justify-between p-4 border border-gray-200 rounded-lg bg-white hover:shadow-md transition"
              >
                {/* LEFT */}
                <div className="flex items-center gap-4">
                  <img
                    src={iphonelogo}
                    alt="logo"
                    className="h-12 w-12 rounded-md object-contain"
                  />

                  <div className="flex flex-col gap-1">
                    <div className="flex items-center gap-2">
                      <p className="font-semibold">
                        {job.jobId?.role}
                      </p>

                      <span className="text-xs px-2 py-0.5 rounded-full bg-blue-100 text-blue-500 capitalize">
                        {job.jobId?.jobType}
                      </span>
                    </div>

                    <div className="flex items-center gap-4 text-xs text-gray-500">
                      <div className="flex items-center gap-1">
                        <MapPin className="size-4" />
                        {job.jobId?.location}
                      </div>

                      <div className="flex items-center gap-1">
                        <DollarSign className="size-4" />
                        {job.jobId?.salary?.max || "Not disclosed"}
                      </div>

                      <div className="flex items-center gap-1">
                        {daysRemaining === null ? (
                          <p>No expiry</p>
                        ) : daysRemaining <= 0 ? (
                          <div className="flex gap-1 items-center">
                            <CirclePlus className="size-3 text-red-500" />
                            <p className="text-red-500 text-xs">
                              Job Expired
                            </p>
                          </div>
                        ) : (
                          <div className="flex gap-1 items-center">
                            <Calendar className="size-4" />
                            <p>{daysRemaining} Days Remaining</p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                {/* RIGHT */}
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      setCurDeleteId(job.jobId._id);
                      setShowDelete(true);
                    }}
                    className="cursor-pointer"
                  >
                    <Bookmark className="size-5" fill="black" />
                  </button>

                  <button className="px-4 py-2 text-sm text-blue-500 font-medium bg-blue-100 rounded-md hover:bg-blue-600 hover:text-white transition">
                    View Details
                  </button>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* DELETE MODAL */}
      {showDelete && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50">
          <div className="bg-white shadow-md rounded-xl py-6 px-5 md:w-[460px] w-[370px] border border-gray-200">
            <div className="flex items-center justify-center p-4 bg-red-100 rounded-full">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M2.875 5.75h1.917m0 0h15.333m-15.333 0v13.417a1.917 1.917 0 0 0 1.916 1.916h9.584a1.917 1.917 0 0 0 1.916-1.916V5.75m-10.541 0V3.833a1.917 1.917 0 0 1 1.916-1.916h3.834a1.917 1.917 0 0 1 1.916 1.916V5.75m-5.75 4.792v5.75m3.834-5.75v5.75" stroke="#DC2626" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
            </div>

            <h2 className="text-gray-900 font-semibold mt-4 text-xl text-center">
              Are you sure?
            </h2>

            <p className="text-sm text-gray-600 mt-2 text-center">
              Do you really want to continue? <br />
              This action cannot be undone.
            </p>

            <div className="flex items-center justify-center gap-4 mt-5">
              <button
                onClick={() => {
                  setShowDelete(false);
                  setCurDeleteId("");
                }}
                className="w-36 h-10 rounded-md border border-gray-300 bg-white text-gray-600 text-sm hover:bg-gray-100 transition"
              >
                Cancel
              </button>

              <button
                onClick={() => {
                  removeFavorite(curDeleteId);
                  setCurDeleteId("");
                  setShowDelete(false);
                }}
                className="w-36 h-10 rounded-md text-white bg-red-600 text-sm hover:bg-red-700 transition"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserFavoriteJobs;
