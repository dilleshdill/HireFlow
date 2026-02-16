import React, { useEffect, useRef, useState } from "react";
import {
  MoveRight,
  UserRoundPen,
  CloudUpload,
  Link,
  Facebook,
  Twitter,
  Youtube,
  Instagram,
  Mail,
  Eye,
  EyeOff
} from "lucide-react";
import toast from "react-hot-toast";
import axios from "axios";

const DOMAIN = import.meta.env.VITE_DOMAIN;

const organizations = [
  { organization: "HR Recruitment Services" },
  { organization: "Talent Acquisition Solutions" },
  { organization: "Workforce Finder" },
  { organization: "Global Talent Hub" },
  { organization: "Career Connect Agency" },
  { organization: "People Bridge Consultancy" },
  { organization: "HireSphere Solutions" },
  { organization: "RecruitWell Group" },
  { organization: "IntelliTalent Services" },
  { organization: "CareerLink Partners" },
  { organization: "TalentFirst HR" },
  { organization: "JobQuest Consultancy" },
  { organization: "TalentReach Solutions" },
  { organization: "PeopleMatrix HR" },
  { organization: "CareerPath Recruiters" },
  { organization: "SmartHire Consulting" },
  { organization: "RecruitEdge Services" },
  { organization: "PeopleNest Partners" },
  { organization: "FutureHire Agency" },
  { organization: "PrimeTalent Associates" },
  { organization: "TalentX" },
  { organization: "HireFlow" },
  { organization: "JobWave" },
  { organization: "Recruify" },
  { organization: "NextHire" },
  { organization: "HireDeck" },
  { organization: "WorkHive" },
  { organization: "JobBridge" },
  { organization: "TalentLoop" },
  { organization: "WorkNest" },
];

const industryTypes = [
  { id: 1, name: "Information Technology (IT)" },
  { id: 2, name: "Software Development" },
  { id: 3, name: "Banking & Finance" },
  { id: 4, name: "Telecommunications" },
  { id: 5, name: "Healthcare & Medical" },
  { id: 6, name: "Manufacturing" },
  { id: 7, name: "Automotive" },
  { id: 8, name: "Retail & E-commerce" },
  { id: 9, name: "Education & Training" },
  { id: 10, name: "Construction & Real Estate" },
  { id: 11, name: "Media & Entertainment" },
  { id: 12, name: "Hospitality & Tourism" },
  { id: 13, name: "Human Resources & Recruitment" },
  { id: 14, name: "BPO / KPO" },
  { id: 15, name: "Logistics & Supply Chain" },
  { id: 16, name: "Energy & Utilities" },
  { id: 17, name: "Government & Public Sector" },
  { id: 18, name: "Agriculture & Food Processing" },
  { id: 19, name: "Pharmaceuticals" },
  { id: 20, name: "Aerospace & Defense" },
  { id: 21, name: "Consumer Goods" },
  { id: 22, name: "Financial Services" },
  { id: 23, name: "Insurance" },
  { id: 24, name: "Legal Services" },
  { id: 25, name: "Non-Profit & NGOs" },
];

const teamSizes = [
  { id: 1, name: "1–10 employees" },
  { id: 2, name: "11–50 employees" },
  { id: 3, name: "51–200 employees" },
  { id: 4, name: "201–500 employees" },
  { id: 5, name: "501–1,000 employees" },
  { id: 6, name: "1,001–5,000 employees" },
  { id: 7, name: "5,001–10,000 employees" },
  { id: 8, name: "10,000+ employees" },
];

const phoneCodes = [
  { id: 1, name: "+91 (India)" },
  { id: 2, name: "+1 (United States / Canada)" },
  { id: 3, name: "+44 (United Kingdom)" },
  { id: 4, name: "+61 (Australia)" },
  { id: 5, name: "+81 (Japan)" },
  { id: 6, name: "+49 (Germany)" },
  { id: 7, name: "+86 (China)" },
  { id: 8, name: "+33 (France)" },
  { id: 9, name: "+39 (Italy)" },
  { id: 10, name: "+971 (UAE)" },
];

const RecruiterSettings = () => {
  const [progress, setProgress] = useState(1);
  const fileRef = useRef(null);
  const bannerFileRef = useRef(null);
  const [previewImage1, setPreviewImage1] = useState("");
  const [previewImage2, setPreviewImage2] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [showCurrentPassword, setshowCurrentPassword] = useState(true);
  const [newPassword, setNewPasword] = useState("");
  const [showNewPassword, setshowNewPassword] = useState(true);
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [showConfirmPassword, setshowConfirmPassword] = useState(true);

  const [userProfileData, setUserProfileData] = useState({
    fullName: "",
    email: "",
    phoneNo: "",
    location: "",
    companyName: "",
    aboutUs: "",
    organizationType: "",
    industryTypes: "",
    logoUrl: "",
    bannerUrl: "",
    teamSizes: "5",
    yearofEstablishment: "",
    companyWebsite: "",
    vision: "",
    instagram: "",
    linkedin: "",
    twitter: "",
    facebook: "",
    youtube: "",
  });

  const getFile = () => {
    fileRef.current.click();
  };

  const getBannerFile = () => {
    bannerFileRef.current.click();
  };

  const getSubmit = async () => {
    try {
      const response = await axios.post(
        DOMAIN + "/api/recruiter/recruiter-detailes",
        {
          userProfileData,
        },
        { withCredentials: true },
      );
      if (response.status === 200) {
        toast.success("Data Successfully Inserted");
      }
    } catch (err) {
      toast.error("error in insert data")
    }
  };

  const handleChange = async (e) => {
    const file = e.target.files[0];
    if (!file) {
      toast.error("Give Valid File");
    }

    const formData = new FormData();
    formData.append("resume", file);

    try {
      const res = await axios.post(
        `${DOMAIN}/api/recruiter/upload-image`,
        formData,
        { withCredentials: true },
      );
      if (res.status === 200) {
        toast.success("uploaded successfully")
        setPreviewImage1(res.data.resumeUrl);
        setUserProfileData({
          ...userProfileData,
          logoUrl: res.data.resumeUrl,
        });
      }
    } catch (e) {
      toast.error("error to upload")
    }
  };

  const bannerHandleChange = async (e) => {
    toast.success("enter into bannerHandleChange");
    const file = e.target.files[0];
    if (!file) {
      toast.error("Give Valid File");
    }

    const formData = new FormData();
    formData.append("resume", file);

    try {
      const res = await axios.post(
        `${DOMAIN}/api/recruiter/upload-image`,
        formData,
        { withCredentials: true },
      );
      if (res.status === 200) {
        toast.success("uploaded successfully")
        setPreviewImage2(res.data.resumeUrl);
        setUserProfileData({
          ...userProfileData,
          bannerUrl: res.data.resumeUrl,
        });
      }
    } catch (e) {
      toast.error("error to upload")
    }
  };

  const fetchData = async () => {
    try {
      const response = await axios.get(DOMAIN + "/api/recruiter/get-profile", {
        withCredentials: true,
      }); 
      if (response.status === 200) {
        setUserProfileData(response.data.recruiterProfile);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const getChangePassword= async() => {
    if (newPassword != confirmNewPassword){
      return toast.error("NewPassword Not Match With ConfirmPassword")
    }
    try{
      const response = await axios.post(DOMAIN + '/api/auth/change-password',{
        currentPassword,
        newPassword,
        confirmNewPassword
      },{
        withCredentials:true
      })
      if (response.status === 204){ 
        return toast.error("Enter Correct Old Password")
      }
      if (response.status === 200){
        toast.success("Pasword Updated Successfully")
      }

    }catch(err){
      console.log(err)
    }
  }

  useEffect(() => {
    fetchData();
  }, []);
  return (
    <div className="w-full bg-white py-5">
      <div className="max-w-6xl mx-auto">
        <div className="max-w-5xl justify-center mx-auto p-6">
          <div className="flex max-w-3xl mx-auto justify-around gap-7">
            {/* Step 1 */}
            <div
              onClick={() => setProgress(1)}
              className="flex flex-col items-center w-full"
            >
              <div
                className={`flex gap-1 items-center ${progress === 1 ? "text-blue-500 font-semibold" : "text-gray-400"}`}
              >
                <UserRoundPen size={22} />
                <h1 className="text-lg">Company Info</h1>
              </div>
              <div
                className={`h-0.5 w-full ${progress === 1 && "bg-blue-500"}`}
              ></div>
            </div>

            {/* Step 2 */}
            <div
              onClick={() => setProgress(2)}
              className="flex flex-col items-center w-full"
            >
              <div
                className={`flex gap-1 items-center ${progress === 2 ? "text-blue-500 font-semibold" : "text-gray-400"}`}
              >
                <UserRoundPen size={22} />
                <h1 className="text-lg">Founding Info</h1>
              </div>
              <div
                className={`h-0.5 w-full ${progress === 2 && "bg-blue-500"}`}
              ></div>
            </div>

            {/* Step 3 */}
            <div
              onClick={() => setProgress(3)}
              className="flex flex-col items-center w-full"
            >
              <div
                className={`flex gap-1 items-center ${progress === 3 ? "text-blue-500 font-semibold" : "text-gray-400"}`}
              >
                <UserRoundPen size={22} />
                <h1 className="text-lg">Social Media Info</h1>
              </div>
              <div
                className={`h-0.5 w-full ${progress === 3 && "bg-blue-500"}`}
              ></div>
            </div>

            {/* Step 4 */}
            <div
              onClick={() => setProgress(4)}
              className="flex flex-col items-center w-full"
            >
              <div
                className={`flex gap-1 items-center ${progress === 4 ? "text-blue-500 font-semibold" : "text-gray-400"}`}
              >
                <UserRoundPen size={22} />
                <h1 className="text-lg">Contact Info</h1>
              </div>
              <div
                className={`h-0.5 w-full ${progress === 4 && "bg-blue-500"}`}
              ></div>
            </div>
          </div>

          <div className="mt-7 text-center max-w-5xl mx-auto ">
            {progress === 1 && (
              <div className="flex flex-col gap-3 w-full">
                <h1 className="text-lg font-medium text-gray-700 text-start">
                  Logo & Banner Images
                </h1>

                <div className="flex gap-5 ">
                  <div className="flex flex-col gap-2">
                    <h1 className="text-md text-gray-600 text-start">
                      Upload Logo Image
                    </h1>
                    {userProfileData?.logoUrl ? (
                      <img
                        src={
                          typeof userProfileData?.logoUrl === "string"
                            ? userProfileData?.logoUrl
                            : URL.createObjectURL(userProfileData?.logoUrl)
                        }
                        alt="user-image"
                        onClick={getFile}
                        className="flex flex-col border-2 gap-2 border-dashed border-gray-300 rounded-md h-48 w-60 items-center justify-center cursor-pointer hover:bg-gray-50 transition"
                      />
                    ) : (
                      <div
                        className="flex flex-col border-2 gap-2 border-dashed border-gray-300 rounded-md h-48 w-60 flex items-center justify-center cursor-pointer hover:bg-gray-50 transition"
                        onClick={getFile}
                      >
                        <CloudUpload size={30} className="text-gray-400" />
                        <p className="text-gray-500">
                          <span className="text-black">Browse Photo</span> or
                          Drop here
                        </p>
                        <p className="text-gray-400">
                          A Photo large then 200kb works Best.Photo Max size 5mb
                        </p>
                      </div>
                    )}
                    <input
                      type="file"
                      ref={fileRef}
                      onChange={(e) => handleChange(e)}
                      className="hidden"
                    />
                  </div>

                  <div className="flex flex-col gap-2 flex-1">
                    <h1 className="text-md text-gray-600 text-start ">
                      Banner Image
                    </h1>
                    {userProfileData?.bannerUrl ? (
                      <div
                        onClick={getFile}
                        className="border-2 border-dashed border-gray-300 rounded-md h-48 w-full overflow-hidden cursor-pointer"
                      >
                        <img
                          src={userProfileData?.bannerUrl}
                          alt="banner"
                          className="w-full h-full object-cover"
                        />
                      </div>
                    ) : (
                      <div
                        className="bg-gray-100 rounded-md h-48 flex flex-col flex-1 items-center justify-center cursor-pointer hover:bg-gray-50 transition"
                        onClick={getBannerFile}
                      >
                        <CloudUpload size={30} className="text-gray-400" />
                        <p className="text-gray-500">
                          <span className="text-black">Browse Photo</span> or
                          Drop here
                        </p>
                        <p className="text-gray-400 w-96">
                          A Banner images optical dimension 1200*1700 is
                          supported. Formate Jpg,png. Max Photos size 5mg
                        </p>
                      </div>
                    )}

                    <input
                      type="file"
                      ref={bannerFileRef}
                      onChange={(e) => bannerHandleChange(e)}
                      className="hidden"
                    />
                  </div>
                </div>
                <div className="border-t-2 mt-1 border-gray-200 w-full h-2"></div>
                <h1 className="text-start">Company Name</h1>
                <input
                  type="text"
                  className="border border-gray-300 rounded-md p-2 w-full"
                  value={userProfileData.companyName}
                  onChange={(e) =>
                    setUserProfileData({
                      ...userProfileData,
                      companyName: e.target.value,
                    })
                  }
                />
                <h1 className="text-start">About Us</h1>
                <textarea
                  rows={3}
                  placeholder="Write down About your company here,Let the candidate know who we are."
                  className="border border-gray-300 text-gray-500 ounded-md p-2 w-full"
                  value={userProfileData.aboutUs}
                  onChange={(e) =>
                    setUserProfileData({
                      ...userProfileData,
                      aboutUs: e.target.value,
                    })
                  }
                />
                <div
                  className="flex bg-blue-700 w-fit px-5 py-3 text-white gap-2 items-center rounded-md cursor-pointer hover:bg-blue-700 transition"
                  onClick={() => {
                    getSubmit();
                    setProgress(2);
                  }}
                >
                  <h1>Save Changes & Next </h1>
                </div>
              </div>
            )}

            {progress === 2 && (
              <div className="mt-7 text-center max-w-5xl mx-auto">
                <div className="grid gap-15 grid-cols-1 md:grid-cols-3 mt-10">
                  <div className="flex flex-col gap-2">
                    <h1 className="text-gray-500 text-lg text-start">
                      Organization Type
                    </h1>
                    <select
                      className="text-gray-400 border border-gray-300 p-3"
                      placeholder="select"
                      value={userProfileData.organizationType}
                      onChange={(e) =>
                        setUserProfileData({
                          ...userProfileData,
                          organizationType: e.target.value,
                        })
                      }
                    >
                      {organizations.map((item, index) => (
                        <option value={index}>{item.organization}</option>
                      ))}
                    </select>
                  </div>
                  <div className="flex flex-col gap-2">
                    <h1 className="text-gray-500 text-lg text-start">
                      Industry Type
                    </h1>
                    <select
                      className="text-gray-400 border border-gray-300 p-3"
                      placeholder="select"
                      value={userProfileData.industryTypes}
                      onChange={(e) =>
                        setUserProfileData({
                          ...userProfileData,
                          industryTypes: e.target.value,
                        })
                      }
                    >
                      {industryTypes.map((item, index) => (
                        <option value={index}>{item.name}</option>
                      ))}
                    </select>
                  </div>
                  <div className="flex flex-col gap-2">
                    <h1 className="text-gray-500 text-lg text-start">
                      Team Size
                    </h1>
                    <select
                      className="text-gray-400 border border-gray-300 p-3"
                      placeholder="select"
                      value={userProfileData.teamsize}
                      onChange={(e) =>
                        setUserProfileData({
                          ...userProfileData,
                          teamsize: e.target.value,
                        })
                      }
                    >
                      {teamSizes.map((item, index) => (
                        <option value={index}>{item.name}</option>
                      ))}
                    </select>
                  </div>

                  <div className="flex flex-col gap-2">
                    <h1 className="text-gray-500 text-lg text-start">
                      Year of Establishment
                    </h1>
                    <input
                      className="text-gray-400 border border-gray-300 p-3"
                      type="date"
                      value={userProfileData.yearofEstablishment}
                      onChange={(e) =>
                        setUserProfileData({
                          ...userProfileData,
                          yearofEstablishment: e.target.value,
                        })
                      }
                    />
                  </div>

                  <div className="flex flex-col gap-2">
                    <h1 className="text-gray-500 text-lg text-start">
                      Company Website
                    </h1>
                    <div className="flex text-gray-400 border border-gray-300 p-3 gap-2 items-center">
                      <Link size={19} className="text-blue-700" />
                      <input
                        type="text"
                        placeholder="Website Url.."
                        value={userProfileData.companyWebSite}
                        onChange={(e) =>
                          setUserProfileData({
                            ...userProfileData,
                            companyWebSite: e.target.value,
                          })
                        }
                      />
                    </div>
                  </div>
                </div>

                <div className="flex flex-col mt-10 gap-2">
                  <h1 className="text-gray-500 text-lg text-start">Vision</h1>
                  <textarea
                    rows={4}
                    className="border border-gray-300 p-3"
                    placeholder="Tell us About Your Company Vision..."
                    value={userProfileData.vision}
                    onChange={(e) =>
                      setUserProfileData({
                        ...userProfileData,
                        vision: e.target.value,
                      })
                    }
                  ></textarea>
                </div>
                <div className="flex gap-3 mt-8">
                  <div
                    className="flex bg-gray-300 w-fit px-5 py-3 text-black gap-2 items-center rounded-md cursor-pointer hover:bg-gray-400 transition"
                    onClick={() => setProgress(1)}
                  >
                    <h1>Previous </h1>
                  </div>
                  <div
                    className="flex bg-blue-700 w-fit px-5 py-3 text-white gap-2 items-center rounded-md cursor-pointer hover:bg-blue-700 transition"
                    onClick={() => {
                      getSubmit();
                      setProgress(3);
                    }}
                  >
                    <h1>Save Changes </h1>
                  </div>
                </div>
              </div>
            )}

            {progress === 3 && (
              <div className="flex flex-col gap-2 mt-7 text-center max-w-5xl mx-auto ">
                <h1 className="text-gray-500 text-lg text-start">
                  Social Link 1{" "}
                </h1>
                <div className="flex gap-3">
                  <div className="flex border-1 border-gray-300 px-5 py-3 gap-3 w-fit">
                    <Facebook size={25} className="text-blue-700" />
                    <p className="text-lg text-gray-700 font-serif">FaceBook</p>
                  </div>
                  <input
                    type="text"
                    className="flex flex-1 border-1 border-gray-300  text-gray-500 px-5 py-3 gap-3 "
                    placeholder="Profile link/url..."
                    value={userProfileData.facebook}
                    onChange={(e) =>
                      setUserProfileData({
                        ...userProfileData,
                        facebook: e.target.value,
                      })
                    }
                  />
                </div>

                <h1 className="text-gray-500 text-lg text-start mt-3">
                  Social Link 1{" "}
                </h1>
                <div className="flex gap-3">
                  <div className="flex border-1 border-gray-300 px-5 py-3 gap-3 w-fit">
                    <Instagram size={25} className="text-blue-700" />
                    <p className="text-lg text-gray-700 font-serif">
                      instagram
                    </p>
                  </div>
                  <input
                    type="text"
                    className="flex flex-1 border-1 border-gray-300  text-gray-500 px-5 py-3 gap-3 "
                    placeholder="Profile link/url..."
                    value={userProfileData.instagram}
                    onChange={(e) =>
                      setUserProfileData({
                        ...userProfileData,
                        instagram: e.target.value,
                      })
                    }
                  />
                </div>
                <h1 className="text-gray-500 text-lg text-start mt-3">
                  Social Link 1{" "}
                </h1>
                <div className="flex gap-3">
                  <div className="flex border-1 border-gray-300 px-5 py-3 gap-3 w-fit">
                    <Twitter size={25} className="text-blue-700" />
                    <p className="text-lg text-gray-700 font-serif">Twitter</p>
                  </div>
                  <input
                    type="text"
                    className="flex flex-1 border-1 border-gray-300  text-gray-500 px-5 py-3 gap-3 "
                    placeholder="Profile link/url..."
                    value={userProfileData.twitter}
                    onChange={(e) =>
                      setUserProfileData({
                        ...userProfileData,
                        twitter: e.target.value,
                      })
                    }
                  />
                </div>
                <h1 className="text-gray-500 text-lg text-start mt-3">
                  Social Link 1{" "}
                </h1>
                <div className="flex gap-3">
                  <div className="flex border-1 border-gray-300 px-5 py-3 gap-3 w-fit">
                    <Youtube size={25} className="text-blue-700" />
                    <p className="text-lg text-gray-700 font-serif">Youtube</p>
                  </div>
                  <input
                    type="text"
                    className="flex flex-1 border-1 border-gray-300  text-gray-500 px-5 py-3 gap-3 "
                    placeholder="Profile link/url..."
                    value={userProfileData.youtube}
                    onChange={(e) =>
                      setUserProfileData({
                        ...userProfileData,
                        youtube: e.target.value,
                      })
                    }
                  />
                </div>

                <div className="flex gap-3 mt-8">
                  <div
                    className="flex bg-gray-300 w-fit px-5 py-3 text-black gap-2 items-center rounded-md cursor-pointer hover:bg-gray-400 transition"
                    onClick={() => setProgress(2)}
                  >
                    <h1>Previous </h1>
                  </div>
                  <div
                    className="flex bg-blue-700 w-fit px-5 py-3 text-white gap-2 items-center rounded-md cursor-pointer hover:bg-blue-700 transition"
                    onClick={() => {
                      getSubmit();
                      setProgress(4);
                    }}
                  >
                    <h1>Save Changes & Next </h1>
                  </div>
                </div>
              </div>
            )}

            {progress === 4 && (
              <div className="flex flex-col mt-10">
                <h1 className="text-start text-lg text-gray-500 font-medium">
                  Company Location
                </h1>
                <input
                  type="text"
                  className="border border-gray-300 rounded-md p-2 w-full mt-1"
                  value={userProfileData.location}
                  onChange={(e) =>
                    setUserProfileData({
                      ...userProfileData,
                      location: e.target.value,
                    })
                  }
                />
                <h1 className="text-start text-lg text-gray-500 font-medium mt-3">
                  Phone{" "}
                </h1>
                <div className="flex gap-5 mt-2">
                  <select className="p-3 border border-gray-300">
                    {phoneCodes.map((eachItem, index) => (
                      <option key={index}>{eachItem.name}</option>
                    ))}
                  </select>
                  <input
                    type="text"
                    placeholder="Phone Number"
                    className="flex flex-1 text-gray-400 p-1 border border-gray-300 "
                    value={userProfileData.phoneNo}
                    onChange={(e) =>
                      setUserProfileData({
                        ...userProfileData,
                        phoneNo: e.target.value,
                      })
                    }
                  />
                </div>
                <h1 className="text-start text-lg text-gray-500 font-medium mt-5">
                  Email
                </h1>
                <div className="border border-gray-300 rounded-md p-3 w-full mt-1 flex gap-2">
                  <Mail className="text-blue-500" />
                  <input
                    type="text"
                    placeholder="Email"
                    className="flex flex-1 outline-none text-gray-600"
                    value={userProfileData?.recruiterId?.email}
                    onChange={(e) =>
                      setUserProfileData({
                        ...userProfileData,
                        email: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="flex gap-3 mt-8">
                  <div
                    className="flex bg-blue-700 w-fit px-5 py-3 text-white gap-2 items-center rounded-md cursor-pointer hover:bg-blue-700 transition"
                    onClick={() => {
                      getSubmit();
                      
                    }}
                  >
                    <h1>Save Changes </h1>
                  </div>
                </div>
                <h1 className="text-xl text-gray-700 text-start mt-5">
                  Change Password
                </h1>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mt-2">
              <div className="mt-2">
                <h1 className="text-start text-gray-600">
                  Current Password
                </h1>
                <div className="flex border border-gray-300 mt-1 px-2 py-3 justify-between">
                  <input 
                    type={showCurrentPassword ? "text" : "password"} 
                    placeholder="Password" 
                    className="outline-none w-full"
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                  />
                  {
                    showCurrentPassword ?
                    <Eye className="text-gray-400 flex-shrink-0 cursor-pointer" onClick={() => setshowCurrentPassword(!showCurrentPassword)}/>
                    :
                    <EyeOff className="text-gray-400 flex-shrink-0 cursor-pointer" onClick={() => setshowCurrentPassword(!showCurrentPassword)}/>
                  }
                </div>
              </div>
              <div className="mt-2">
                <h1 className="text-start text-gray-600">New Password</h1>
                <div className="flex border border-gray-300 mt-1 px-2 py-3 justify-between">
                  <input 
                    type={showNewPassword ? "text" : "password"} 
                    placeholder="Password" 
                    className="outline-none w-full"
                    value={newPassword}
                    onChange={(e) => setNewPasword(e.target.value)}
                  />
                  {
                    showNewPassword ?
                    <Eye className="text-gray-400 flex-shrink-0 cursor-pointer" onClick={() => setshowNewPassword(!showNewPassword)}/>
                    :
                    <EyeOff className="text-gray-400 flex-shrink-0 cursor-pointer" onClick={() => setshowNewPassword(!showNewPassword)}/>
                  }
                </div>
              </div>
              <div className="mt-2">
                <h1 className="text-start text-gray-600">
                  Confirm Password
                </h1>
                <div className="flex border border-gray-300 mt-1 px-2 py-3 justify-between">
                  <input 
                    type={showConfirmPassword ? "text" : "password"} 
                    placeholder="Password" 
                    className="outline-none w-full"
                    value={confirmNewPassword}
                    onChange={(e) => setConfirmNewPassword(e.target.value)}
                  />
                  {
                    showConfirmPassword ?
                    <Eye className="text-gray-400 flex-shrink-0 cursor-pointer" onClick={() => setshowConfirmPassword(!showConfirmPassword)}/>
                    :
                    <EyeOff className="text-gray-400 flex-shrink-0 cursor-pointer" onClick={() => setshowConfirmPassword(!showConfirmPassword)}/>
                  }
                </div>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-3 mt-8">
              <div
                className="flex bg-blue-700 w-full sm:w-fit px-5 py-3 text-white gap-2 items-center justify-center rounded-md cursor-pointer hover:bg-blue-700 transition"
                
              >
                <h1 onClick={getChangePassword}>Save Changes</h1>
              </div>
            </div>
              </div>
            )}

          </div>
        </div>
      </div>
    </div>
  );
};

export default RecruiterSettings;
