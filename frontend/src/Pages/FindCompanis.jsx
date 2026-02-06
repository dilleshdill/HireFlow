import React, { useState } from "react";
import Navbar from "../Components/Navbar.jsx";
import { MapPin, Briefcase, ArrowRight } from "lucide-react";
import { useEffect } from "react";
import axios from "axios";
import iphonelogo from "../assets/iphonelogo.png";

const DOMAIN = import.meta.env.VITE_DOMAIN
const FindCompanis = () => {
  const [organization, setOrganization] = useState("");
  const [companies , setCompanies] = useState([])

  // const companies = [
  //   {
  //     id: 1,
  //     name: "Tech Solutions Inc.",
  //     image: "https://cdn-icons-png.flaticon.com/512/5968/5968705.png",
  //     open_jobs: 5,
  //     location: "San Francisco, CA",
  //     type: "private",
  //   },
  //   {
  //     id: 2,
  //     name: "Innovatech Corp.",
  //     image: "https://cdn-icons-png.flaticon.com/512/5968/5968292.png",
  //     open_jobs: 3,
  //     location: "New York, NY",
  //     type: "mnc",
  //   },
  //   {
  //     id: 3,
  //     name: "Global Enterprises",
  //     image: "https://cdn-icons-png.flaticon.com/512/5968/5968672.png",
  //     open_jobs: 8,
  //     location: "Chicago, IL",
  //     type: "government",
  //   },
  //   {
  //     id: 4,
  //     name: "Creative Minds LLC",
  //     image: "https://cdn-icons-png.flaticon.com/512/5968/5968267.png",
  //     open_jobs: 2,
  //     location: "Austin, TX",
  //     type: "startup",
  //   },
  // ];

const organizations = [
    { value: "government", label: "Government" },
    { value: "private", label: "Private Company" },
    { value: "startup", label: "Startup" },
    { value: "mnc", label: "MNC" },
    { value: "ngo", label: "NGO" },
    { value: "educational", label: "Educational Institution" },
  ];

  const filteredCompanies =
    organization === ""
      ? companies
      : companies.filter((c) => c.type === organization);


  useEffect(()=>{
    const fetchCompanies = async () => {
      try {
        const response = await axios.get(DOMAIN + '/api/job/get-companies',{withCredentials:true})
        if(response.status === 200){
          console.log(response.data.companies)
          setCompanies(response.data.companies)
        }
      } catch (error) {
        console.log(error.message)
      }
    }

    fetchCompanies();
  },[])
  return (
    <>
      <Navbar />

      <div className="w-full ">
        <div className="max-w-7xl mx-auto px-4 py-6">
          {/* Header */}
          <div className="mb-6">
            <h1 className="text-2xl font-semibold">Find Companies</h1>
            <p className="text-sm text-gray-500">
              Explore companies hiring right now
            </p>
          </div>

          {/* Main Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* LEFT FILTER */}
            <div className="bg-white p-4 rounded-lg border border-gray-200 h-fit">
              <p className="font-semibold mb-4">Organization Type</p>

              <div className="flex flex-col gap-3 text-gray-600">
                {organizations.map((item) => (
                  <label
                    key={item.value}
                    className="flex items-center gap-2 cursor-pointer text-sm"
                  >
                    <input
                      type="radio"
                      name="organization"
                      value={item.value}
                      checked={organization === item.value}
                      onChange={(e) => setOrganization(e.target.value)}
                      className="accent-[#0A65CC]"
                    />
                    <span
                      className={
                        organization === item.value
                          ? "text-[#0A65CC] font-medium"
                          : ""
                      }
                    >
                      {item.label}
                    </span>
                  </label>
                ))}

                <button
                  onClick={() => setOrganization("")}
                  className="text-sm mt-3 bg-[#0A65CC] p-3 text-white rounded-sm"
                >
                  Clear Filter
                </button>
              </div>
            </div>

            {/* MOBILE VIEW (GRID CARDS) */}
            <div className="lg:col-span-3 grid grid-cols-1 sm:grid-cols-2 gap-6 sm:hidden">
              {filteredCompanies.map((company) => (
                <div
                  key={company._id}
                  className="bg-white p-5 rounded-lg border border-gray-200 hover:shadow-md transition"
                >
                  <div className="flex items-center gap-4 mb-4">
                    <img
                      src={company.image || iphonelogo}
                      alt="logo"
                      className="h-12 w-12 rounded-md object-contain"
                    />
                    <div>
                      <p className="font-semibold">{company.companyName}</p>
                      <p className="text-xs text-gray-500 capitalize">
                        {company.organizationType}
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-col gap-2 text-sm text-gray-500">
                    <div className="flex items-center gap-2">
                      <MapPin className="size-4" />
                      {company.location}
                    </div>
                    <div className="flex items-center gap-2">
                      <Briefcase className="size-4" />
                      {company.teamsize} team size
                    </div>
                  </div>

                  <button className="bg-blue-200 w-full mt-4 px-4 py-2 flex items-center justify-center gap-2 text-blue-500 rounded-md hover:bg-blue-300 transition">
                    Open positions
                    <ArrowRight className="size-4" />
                  </button>
                </div>
              ))}
            </div>

            {/* LAPTOP / DESKTOP VIEW (ONE CARD PER ROW) */}
            <div className="hidden sm:flex lg:col-span-3 flex-col gap-4">
              {filteredCompanies.map((company) => (
                <div
                  key={company._id}
                  className="flex items-center justify-between p-4 border border-gray-200 rounded-lg bg-white hover:shadow-md transition"
                >
                  {/* LEFT */}
                  <div className="flex items-center gap-4">
                    <img
                      src={company.image || iphonelogo}
                      alt="logo"
                      className="h-12 w-12 rounded-md object-contain"
                    />

                    <div className="flex flex-col gap-1">
                      <div className="flex items-center gap-2">
                        <p className="font-semibold">{company.companyName}</p>
                        <span className="text-xs px-2 py-0.5 rounded-full bg-gray-100 text-gray-600 capitalize">
                          {company.organizationType}
                        </span>
                      </div>

                      <div className="flex items-center gap-4 text-sm text-gray-500">
                        <div className="flex items-center gap-1">
                          <MapPin className="size-4" />
                          {company.location}
                        </div>
                        <div className="flex items-center gap-1">
                          <Briefcase className="size-4" />
                          {company.teamsize} team size
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* RIGHT */}
                  <button
                    onClick={()=>naviga}
                   className="flex items-center gap-3 px-4 py-2 text-sm text-white bg-blue-400 rounded-md hover:bg-blue-500 transition">
                    Open positions
                    <ArrowRight className="size-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default FindCompanis;
