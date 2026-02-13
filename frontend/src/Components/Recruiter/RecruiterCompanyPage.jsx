import React from "react";
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
  Globe,
} from "lucide-react";
import { Facebook, Twitter, MessageCircle, Youtube } from "lucide-react";
import RelatedJobs from "../RelatedJobs.jsx";


const Responsibilites = [
  {
    data: "Donec et sapien id leo accumsan pellentesque eget maximus",
  },
  {
    data: "Donec et sapien id leo accumsan pellentesque eget maximus",
  },
  {
    data: "Donec et sapien id leo accumsan pellentesque eget maximus",
  },
  {
    data: "Donec et sapien id leo accumsan pellentesque eget maximus",
  },
  {
    data: "Donec et sapien id leo accumsan pellentesque eget maximus",
  },
  {
    data: "Donec et sapien id leo accumsan pellentesque eget maximus",
  },
];

const RecruterCompanyPage = () => {
  return (
    <div className="flex flex-col">
      <div className="w-full bg-gray-200 pt-3 pb-3">
        <div className="flex max-w-7xl mx-auto justify-between px-4">
          <h1 className="text-lg">Company Detailes</h1>
          <div className="flex">
            <p className="text-md text-gray-400">Home/JobFind/JobDetailes</p>
          </div>
        </div>
      </div>
      <div className="w-full">
        <div className="flex flex-col max-w-7xl mx-auto justify-between px-4">
          <div className="flex w-full justify-between items-center ">
            <div className="flex items-center gap-5 mt-5">
              <img
                src="https://uttrakhandcoldandcuttings.co.in/images/Instagram-Log-in.jpg"
                className="h-20 w-20 rounded-full"
              />
              <div className="flex flex-col gap-2">
                <p className="text-xl">Instagram</p>
                <p className="text-md text-gray-400">
                  Information Techonology(IT)
                </p>
              </div>
            </div>
            <div className="flex flex-col">
              <div className="flex gap-3">
                <div className="flex bg-blue-600 px-6 py-2 items-center gap-1 rounded-sm">
                  <p className="text-white">Apply Now</p>
                  <MoveRight size={20} className="text-white" />
                </div>
              </div>
            </div>
          </div>
          <div className="flex mt-5 gap-16 mb-20">
            <div className="flex flex-col max-w-3xl">
              <h1 className="text-gray-600 text-lg font-semibold">
                Description
              </h1>
              <p className="text-gray-500 mt-3">
                Job Description Integer aliquet pretium consequat. Donec et
                sapien id leo accumsan pellentesque eget maximus tellus. Duis et
                est ac leo rhoncus tincidunt vitae vehicula augue. Donec in
                suscipit diam. Pellentesque quis justo sit amet arcu commodo
                sollicitudin. Integer finibus blandit condimentum. Vivamus sit
                amet ligula ullamcorper, pulvinar ante id, tristique erat.
                Quisque sit amet aliquam urna. Maecenas blandit felis id massa
                sodales finibus. Integer bibendum eu nulla eu sollicitudin. Sed
                lobortis diam tincidunt accumsan faucibus. Quisque blandit augue
                quis turpis auctor, dapibus euismod ante ultricies. Ut non felis
                lacinia turpis feugiat euismod at id magna. Sed ut orci arcu.
                Suspendisse sollicitudin faucibus aliquet. Nam dapibus
                consectetur erat in euismod. Cras urna augue, mollis venenatis
                augue sed, porttitor aliquet nibh. Sed tristique dictum
                elementum. Nulla imperdiet sit amet quam eget lobortis. Etiam in
                neque sit amet orci interdum tincidunt. sollicitudin. Sed
                lobortis diam tincidunt accumsan faucibus. Quisque blandit augue
                quis turpis auctor, dapibus euismod ante ultricies. Ut non felis
                lacinia turpis feugiat euismod at id magna. Sed ut orci arcu.
                Suspendisse sollicitudin faucibus aliquet. Nam dapibus
                consectetur erat in euismod. Cras urna augue, mollis venenatis
                augue sed, porttitor aliquet nibh. Sed tristique dictum
                elementum. Nulla imperdiet sit amet quam eget lobortis. Etiam in
                neque sit amet orci interdum tincidunt.
              </p>

              <h1 className="text-gray-600 text-lg font-semibold mt-4">
                Company Benifits
              </h1>

              <p className="text-gray-500 mt-3">
                sollicitudin. Sed lobortis diam tincidunt accumsan faucibus.
                Quisque blandit augue quis turpis auctor, dapibus euismod ante
                ultricies. Ut non felis lacinia turpis feugiat euismod at id
                magna. Sed ut orci arcu. Suspendisse sollicitudin faucibus
                aliquet. Nam dapibus consectetur erat in euismod. Cras urna
                augue, mollis venenatis augue sed
              </p>
              <div className="px-7 mt-5">
                {Responsibilites.map((each) => (
                  <li className="text-gray-400 mb-2">{each.data}</li>
                ))}
              </div>
              <h1 className="text-gray-600 text-lg font-semibold mt-4">
                Company Vision
              </h1>
              <p className="text-gray-500 mt-3">
                sollicitudin. Sed lobortis diam tincidunt accumsan faucibus.
                Quisque blandit augue quis turpis auctor, dapibus euismod ante
                ultricies. Ut non felis lacinia turpis feugiat euismod at id
                magna. Sed ut orci arcu. Suspendisse sollicitudin faucibus
                aliquet. Nam dapibus consectetur erat in euismod. Cras urna
                augue, mollis venenatis augue sed
              </p>

              <div className="flex mt-5 gap-2">
                <h1 className="text-gray-600 font-medium">Share this job:</h1>
                <div className="flex border-1 border-gray-300 px-3 py-1 gap-1">
                  <Facebook className="text-blue-700" />
                  <p className="text-blue-700">FaceBook</p>
                </div>
                <div className="flex border-1 border-gray-300 px-3 py-1 gap-1">
                  <Twitter className="text-blue-400" />
                  <p className="text-blue-400">Twitter</p>
                </div>
                <div className="flex border-1 border-gray-300 px-3 py-1 gap-1">
                  <MessageCircle className="text-green-500" />
                  <p className="text-green-500">WhatsApp</p>
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-3">
              <div className="border-2 border-gray-300 p-5">
                <h1 className="text-lg text-gray-500 font-semibold">
                  Job OverView
                </h1>
                <div className="p-2 grid sm:grid-cols-1 md:grid-cols-2 gap-23 mt-7">
                  <div className="flex flex-col gap-1">
                    <CalendarDays size={30} className="text-blue-400" />
                    <p className="text-gray-500 ">Founded In</p>
                    <p className="">14,Jan 2026</p>
                  </div>
                  <div className="flex flex-col gap-1">
                    <Timer size={30} className="text-blue-400" />
                    <p className="text-gray-500 ">Organization Type</p>
                    <p className="">Private Company</p>
                  </div>

                  <div className="flex flex-col gap-1">
                    <Wallet size={30} className="text-blue-400" />
                    <p className="text-gray-500">Team Size</p>
                    <p className="">120-300 Employees</p>
                  </div>
                  <div className="flex flex-col gap-1">
                    <MapPin size={30} className="text-blue-400" />
                    <p className="text-gray-500 font-bold">Location</p>
                    <p className="">14,Jan 2026</p>
                  </div>
                  <div className="flex flex-col gap-1">
                    <BriefcaseBusiness size={30} className="text-blue-400" />
                    <p className="text-gray-500 font-bold">Industry Type</p>
                    <p className="">Techonology</p>
                  </div>
                </div>
              </div>
              <div className="flex flex-col gap-2 border-2 border-gray-300 p-5">
                <h1 className="text-xl font-light">Contact Information</h1>
                <div className="flex gap-3 items-center mt-2">
                  <Globe size={25} className="text-blue-400" />
                  <div className="flex flex-col gap-1">
                    <p className="text-md text-gray-400 font-light">Website</p>
                    <p className="text-md text-black font-normal">
                      www.google.com
                    </p>
                  </div>
                </div>
                <hr className="border-t-1 border-gray-300" />
                <div className="flex gap-3 items-center">
                  <Phone size={25} className="text-blue-400" />
                  <div className="flex flex-col gap-1">
                    <p className="text-md text-gray-400 font-light">Phone</p>
                    <p className="text-md text-black font-normal">
                      +91 9010144168
                    </p>
                  </div>
                </div>
                <hr className="border-t-1 border-gray-300" />
                <div className="flex gap-3 items-center">
                  <Mail size={25} className="text-blue-400" />
                  <div className="flex flex-col gap-1">
                    <p className="text-md text-gray-400 font-light">
                      Email Address
                    </p>
                    <p className="text-md text-black font-normal">
                      tarunbommana798@gmail.com
                    </p>
                  </div>
                </div>
                <hr className="border-t-1 border-gray-300" />
              </div>
              <div className="flex flex-col gap-2 border-2 border-gray-300 p-5">
                <h1>Follow us on</h1>
                <div className="flex gap-2 mt-2">
                  <div className="bg-blue-200 p-1.5 rounded-md">
                    <Facebook className="text-blue-400" />
                  </div>
                  <div className="bg-blue-800 p-1.5 rounded-md">
                    <Twitter className="text-white" />
                  </div>
                  <div className="bg-green-200 p-1.5 rounded-md">
                    <MessageCircle className="text-green-600" />
                  </div>
                  <div className="bg-red-200 p-1.5 rounded-md">
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
  );
};

export default RecruterCompanyPage;
