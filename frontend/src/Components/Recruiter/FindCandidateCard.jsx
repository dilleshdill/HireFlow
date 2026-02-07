import React from "react";

import {
  ArrowRight,
  Bookmark,
  Calendar,
  DollarSignIcon,
  MapPin,
} from "lucide-react";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";


const DOMAIN = import.meta.env.VITE_DOMAIN
const FindCandidateCard = () => {
const candidates = [
  {
    id: 1,
    name: "Dillesh Nakkina",
    role: "Marketing Manager",
    experience: "3 Years",
    location: "Delhi, India",
    userLogo:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/9/95/Instagram_logo_2022.svg/330px-Instagram_logo_2022.svg.png",
  },
  {
    id: 2,
    name: "Tarun Bommana",
    role: "backend developer",
    experience: "2 Years",
    location: "Bangalore, India",
    userLogo:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/5/51/Facebook_f_logo_%282019%29.svg/330px-Facebook_f_logo_%282019%29.svg.png",
  },
  {
    id: 3,
    name: "Yeswanth Nakkella",
    role: "full stack developer",
    experience: "4 Years",
    location: "Hyderabad, India",
    userLogo:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/9/95/Instagram_logo_2022.svg/330px-Instagram_logo_2022.svg.png",
  },
  {
    id: 4,
    name: "Naveen Andhavarapu",
    role: "UI / UX Designer",
    experience: "1 Year",
    location: "Mumbai, India",
    userLogo:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/5/51/Facebook_f_logo_%282019%29.svg/330px-Facebook_f_logo_%282019%29.svg.png",
  },
];

  const {id} = useParams()
  
  useEffect(()=>{
    const fetchCandidates = async () => {
      try {
        const response = await axios.get(DOMAIN + `/api/job/get-candidates/${id}`,{withCredentials:true})
        if(response.status === 200){
          console.log(response.data)
        }
      } catch (error) {
        console.log(error.message)
      }
    }

    fetchCandidates();
  },[])


  return (
    <div className="w-full bg-gray-50 py-4">
      {candidates.map((item) => (
        <div key={item.id} className="w-full bg-white p-4">
          <div className="max-w-7xl mx-auto px-4 py-4 border border-gray-200 rounded-lg hover:shadow-md transition">

            {/* MAIN FLEX */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">

              {/* LEFT SECTION */}
              <div className="flex  gap-4 sm:flex-1 sm:items-center">

                {/* Logo */}
                <img
                  src={item.userLogo}
                  alt="logo"
                  className="h-14 w-14 rounded-lg object-contain"
                />

                {/* Job Info */}
                <div className="flex flex-col gap-1">
                  <div className="flex flex-wrap items-center">
                    <p className="text-md font-medium">{item.name}</p>

                  </div>
                    <p className="text-sm text-gray-500">{item.role}</p>
                  <div className="flex flex-wrap gap-4 text-sm text-gray-400">
                    <div className="flex items-center gap-1">
                      <MapPin className="size-4" />
                      <span>{item.location}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <DollarSignIcon className="size-4" />
                      <span>{item.experience} experience</span>
                    </div>

                  </div>
                </div>
              </div>

              {/* RIGHT SECTION */}
              <div className="flex items-center justify-between sm:justify-end gap-4 sm:flex-shrink-0">
                <Bookmark className="size-6 text-gray-500 cursor-pointer hover:text-blue-500" />
                <button className="bg-blue-100 px-4 py-2 flex text-md font-medium items-center gap-2 text-blue-500 rounded-md hover:bg-blue-600 hover:text-white transition">
                  View Profile
                  <ArrowRight className="size-4" />
                </button>
              </div>

            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default FindCandidateCard;
