import React, { useEffect } from "react";
import { useState } from "react";
import hireflow from "../../assets/hireflow.jpg";
import naukriimage from "../../assets/naukriimage.png";
import logoimage from "../../assets/logoimage.jpg";
import { MdOutlineAccountCircle } from "react-icons/md";
import { PiDotDuotone } from "react-icons/pi";
import { SiTicktick } from "react-icons/si";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import axios from "axios";

const DOMAIN = import.meta.env.VITE_DOMAIN;

const OnlineTestHomePage = () => {
  const { id } = useParams();
  const [jobStatus, setJobStatus] = useState("start");
  const navigate = useNavigate();
  const [job, setJob] = useState({});
  const [relatedJobs, setRelatedJobs] = useState([]);

  const fetchRecommendJob = async () => {
    try {
      const response = await axios.post(
        DOMAIN + "/api/job/recommended-list",
        { jobId: id },
        {
          withCredentials: true,
        },
      );

      if (response.status === 200) {
        setRelatedJobs(response.data.relatedJobs);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const fetchData = async () => {
    try {
      const response = await axios.get(
        DOMAIN + `/api/job/job-detailes?jobId=${id}`,
        {
          withCredentials: true,
        },
      );

      if (response.status === 200) {
        const currentDate = new Date();
        const expirationDate = new Date(response.data.expirationData);
        if (currentDate > expirationDate) {
          setJobStatus("completed");
        } else {
          setJobStatus("start");
        }
        setJob(response.data.job);
        fetchRecommendJob();
      }
    } catch (err) {
      console.log(err.msg);
    }
  };

  useEffect(() => {
    fetchData();
  }, [id]);

  return (
    <div>
      <div className="min-h-screen flex max-w-7xl mx-auto gap-3 flex-col sm:flex-row">
        <div className="flex flex-col h-fit max-w-4xl w-full gap-3">
          <div className="flex flex-col bg-white rounded-xl shadow-xl p-4 sm:p-6">
            {/* Banner */}
            <img
              src={naukriimage}
              alt="HireFlow"
              className="w-full h-40 sm:h-56 object-cover rounded-2xl"
            />

            {/* Company + Title */}
            <div className="flex flex-col sm:flex-row sm:items-center gap-4 mt-6">
              <img
                src={hireflow}
                alt="company"
                className="h-16 w-16 sm:h-24 sm:w-24 rounded-xl object-cover"
              />
              <div>
                <h1 className="text-xl sm:text-3xl font-medium text-gray-900">
                  {job.title}
                </h1>
                <p className="text-sm sm:text-lg text-gray-600">
                  Hireflow campus
                </p>
              </div>
            </div>

            <div className="border-b border-gray-300 w-full my-5"></div>

            {/* Bottom Section */}
            <div className="flex flex-col sm:flex-row sm:justify-between gap-5">
              {/* Left Info */}
              <div className="flex flex-col sm:flex-row sm:items-center gap-3 text-sm sm:text-base font-light">
                <h1 className="text-gray-500">
                  Participation:
                  <span className="text-gray-700 font-normal ml-1">
                    Individual
                  </span>
                </h1>

                <h1 className="text-gray-500">
                  Enrolled:
                  <span className="text-gray-700 font-normal ml-1">
                    {job?.applications?.length || 0}
                  </span>
                </h1>
              </div>

              {/* Right Status */}
              <div className="flex flex-wrap items-center gap-4">
                {jobStatus === "completed" && (
                  <div className="flex text-gray-400 items-center gap-2 font-semibold text-sm sm:text-base">
                    <SiTicktick />
                    <p>Contest Completed</p>
                  </div>
                )}

                {jobStatus === "notstart" && (
                  <div className="flex items-center text-sm sm:text-base">
                    <h1 className="text-gray-700 font-medium">Round 1</h1>
                    <PiDotDuotone size={20} className="fill-green-600" />
                    <p className="text-green-600">Upcoming</p>
                  </div>
                )}

                {jobStatus === "start" && (
                  <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                    <div className="flex items-center text-sm sm:text-base">
                      <h1 className="text-gray-700 font-medium">Round 1</h1>
                      <PiDotDuotone size={20} className="fill-red-600" />
                      <p className="text-red-600">Live</p>
                    </div>

                    <button
                      className="bg-blue-700 text-white px-6 sm:px-8 py-2 text-sm sm:text-lg rounded-full font-medium"
                      onClick={() => navigate(`/job/confirmTest/${id}`)}
                    >
                      Start
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="flex flex-col bg-white rounded-xl shadow-2xl p-5 gap-3">
            <h1 className="flex text-gray-700 font-medium text-2xl">
              Round details
            </h1>
            <div className="flex flex-col border border-gray-300 rounded-xl px-8 py-5 gap-3">
              <h1 className="flex text-gray-600 font-medium text-lg">
                Round 1
              </h1>
              <div className="flex gap-10">
                <p className="text-gray-500">
                  From :{" "}
                  <span className="text-gray-700">
                    {new Date(job?.createdAt).toDateString()}
                  </span>
                </p>
                <p className="text-gray-500">
                  To :{" "}
                  <span className="text-gray-700">
                    {new Date(job?.expirationDate).toDateString()}
                  </span>
                </p>
              </div>
            </div>
          </div>
          <div className="flex flex-col bg-white rounded-xl shadow-2xl p-5">
            <h1 className="flex text-gray-700 font-medium text-2xl">
              Contest Description
            </h1>
            <h1 className="flex text-gray-600 font-semibold mt-3">
              {job.description}
            </h1>
            <ul className="list-disc pl-5">
              {job?.responsibilities?.map((eachItem) => (
                <li className="text-gray-600 font-semibold">{eachItem}</li>
              ))}
            </ul>

            <h1 className="flex text-gray-600 font-semibold">
              Duration - {job?.aptitudeTime + job?.codingTime + job?.coreTime}{" "}
              Minutes
            </h1>

            <h1 className="flex text-gray-700 font-medium text-lg mt-5 mb-4">
              Instruction
            </h1>
            <ul className="list-disc pl-5">
              <li className="text-gray-500 font-semibold">
                Maximum time limit is{" "}
                {job?.aptitudeTime + job?.codingTime + job?.coreTime} minutes.
              </li>
              <li className="text-gray-500 font-semibold">
                Please ensure you click the 'Submit' button after completing the
                test to record your attempt successfully.
              </li>
            </ul>
          </div>
          <div className="flex flex-col bg-white rounded-xl shadow-2xl p-5 gap-2">
            <h1 className="flex text-gray-700 font-medium text-2xl">
              Eligiblity
            </h1>
            <h1 className="flex text-gray-600 font-semibold mt-2">
              All students, currently enrolled on campus, are eligible.
            </h1>
            <h1 className="flex text-gray-600 font-semibold mt-2">
              Experience : {job?.experience}
            </h1>
          </div>
        </div>
        <div className="flex flex-col h-fit max-w-xl gap-5">
          <div className="max-w-5xl w-full bg-gradient-to-r from-pink-100 via-pink-50 to-pink-200 rounded-2xl flex  px-8 pt-3 gap-3">
            <div className="max-w-md flex items-start flex-col">
              <h2 className="text-md font-normal text-gray-700 leading-snug">
                Contest are fun with friends. Invite your crew & see who comes
                on top
              </h2>

              <button className="mt-4 text-blue-600 font-medium hover:underline">
                Invite your friend
              </button>
            </div>

            <div className=" hidden md:block">
              <img
                src={logoimage}
                alt="Invite Friends"
                className="h-24 object-top-right rounded-2xl"
              />
            </div>
          </div>
          <div className="flex flex-col border border-gray-200 h-fit p-4 bg-white rounded-xl gap-3">
            <h1 className="text-gray-600 font-semibold text-lg">
              Similar contests
            </h1>
            {relatedJobs?.map((job) => (
              <div
                key={job._id}
                onClick={() => navigate(`/job/homepage/${job._id}`)}
                className="flex flex-col border border-gray-200 h-fit bg-white rounded-xl px-4 py-6 gap-3 shadow-xl"
              >
                {/* Top Section */}
                <div className="flex items-center gap-3">
                  <img
                    src={hireflow}
                    className="h-14 w-14 rounded-xl object-cover"
                    alt="company"
                  />
                  <div>
                    <h1 className="text-xl font-medium text-gray-900">
                      {job.title}
                    </h1>
                    <p className="text-md text-gray-600">
                      {job.role} • {job.location}
                    </p>
                  </div>
                </div>

                {/* Job Info */}
                <div className="flex flex-wrap gap-3 text-sm">
                  <p className="text-gray-500">
                    Experience:{" "}
                    <span className="text-gray-700">{job.experience}</span>
                  </p>
                  <p className="text-gray-500">
                    Type: <span className="text-gray-700">{job.jobType}</span>
                  </p>
                  <p className="text-gray-500">
                    Level: <span className="text-gray-700">{job.jobLevel}</span>
                  </p>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-2">
                  {job.tags?.map((tag, index) => (
                    <div
                      key={index}
                      className="border border-gray-200 rounded-xl px-2 py-1"
                    >
                      <p className="text-sm text-gray-500">{tag}</p>
                    </div>
                  ))}
                </div>

                <div className="border border-dashed border-gray-300"></div>

                {/* Bottom Section */}
                <div className="flex justify-between items-center flex-wrap gap-2">
                  <div className="flex border border-gray-200 rounded-xl font-medium text-indigo-700 items-center px-2 py-1 gap-1">
                    <MdOutlineAccountCircle size={16} />
                    <p className="text-sm">
                      {job.applications?.length || 0} Applied
                    </p>
                  </div>

                  <p className="text-gray-500 text-sm">
                    Expires: {new Date(job.expirationDate).toLocaleDateString()}
                  </p>
                </div>

                {/* Salary */}
                <p className="text-indigo-600 font-medium text-sm">
                  ₹ {job.salary.min.toLocaleString()} - ₹{" "}
                  {job.salary.max.toLocaleString()} / {job.salary.type}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OnlineTestHomePage;
