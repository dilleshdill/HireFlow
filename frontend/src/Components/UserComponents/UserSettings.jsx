import React, { useState } from 'react'
import { MoveRight, UserRoundPen, CloudUpload,Link,Facebook,Twitter,Youtube,Instagram,Mail,FileMinus,Ellipsis, Plus, CirclePlus,Eye} from 'lucide-react';



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
  { id: 10, name: "+971 (UAE)" }
];

const userExperience = [
  { id: 1, name: "Fresher" },
  { id: 2, name: "0 - 1 year" },
  { id: 3, name: "1 - 2 years" },
  { id: 4, name: "2 - 3 years" },
  { id: 5, name: "3 - 5 years" },
  { id: 6, name: "5 - 7 years" },
  { id: 7, name: "7 - 10 years" },
  { id: 8, name: "10 - 12 years" },
  { id: 9, name: "12 - 15 years" },
  { id: 10, name: "15+ years" }
];

const userEducation = [
  { id: 1, name: "High School" },
  { id: 2, name: "Diploma" },
  { id: 3, name: "Undergraduate (UG)" },
  { id: 4, name: "Bachelor’s Degree" },
  { id: 5, name: "Postgraduate (PG)" },
  { id: 6, name: "Master’s Degree" },
  { id: 7, name: "Doctorate / PhD" },
  { id: 8, name: "Certification" },
  { id: 9, name: "Vocational Training" },
  { id: 10, name: "Others" }
];

const nationalities = [
  { id: 1, name: "Indian" },
  { id: 2, name: "American" },
  { id: 3, name: "British" },
  { id: 4, name: "Canadian" },
  { id: 5, name: "Australian" },
  { id: 6, name: "German" },
  { id: 7, name: "French" },
  { id: 8, name: "Italian" },
  { id: 9, name: "Spanish" },
  { id: 10, name: "Japanese" },
  { id: 11, name: "Chinese" },
  { id: 12, name: "South Korean" },
  { id: 13, name: "Brazilian" },
  { id: 14, name: "Mexican" },
  { id: 15, name: "Russian" },
  { id: 16, name: "South African" },
  { id: 17, name: "Argentinian" },
  { id: 18, name: "UAE" },
  { id: 19, name: "Saudi Arabian" },
  { id: 20, name: "Singaporean" }
];

const gender = [
    {
        name:"Male"
    },
    {
        name:"Male"
    },
    {
        name:"Others"
    },
]

const maritalStatus = [
  { id: 1, name: "Single" },
  { id: 2, name: "Married" },
  { id: 3, name: "Divorced" },
  { id: 4, name: "Widowed" },
  { id: 5, name: "Separated" }
];







const UserSettings = () => {
    const [progress, setProgress] = useState(1);
      const [value, setValue] = useState("");
      const [showModel,setShowModel] = useState(false)
    //   const [isSubmit,setSubmit] = useState(false)
  return (
    <div className='w-full bg-white py-5'>
      <div className='max-w-6xl mx-auto'>

        <h1 className='text-xl font-normal text-gray-800'>Settings</h1>
            
        <div className='max-w-5xl justify-center mx-auto p-6 mt-5'>
          <div className='flex max-w-3xl mx-auto justify-around gap-7'>

            {/* Step 1 */}
            <div className='flex flex-col items-center w-full'>
              <div onClick={()=>setProgress(1)} className={`flex gap-1 items-center ${progress === 1 ? "text-blue-500 font-semibold" : "text-gray-400"}`}>
                <UserRoundPen size={22} />
                <h1 className='text-lg'>Personal Info</h1>
              </div>
              <div className={`h-0.5 w-full ${progress === 1 && "bg-blue-500"}`}></div>
            </div>

            {/* Step 2 */}
            <div className='flex flex-col items-center w-full'>
              <div onClick={()=>setProgress(2)} className={`flex gap-1 items-center ${progress === 2 ? "text-blue-500 font-semibold" : "text-gray-400"}`}>
                <UserRoundPen size={22} />
                <h1 className='text-lg'>Profile</h1>
              </div>
              <div className={`h-0.5 w-full ${progress === 2 && "bg-blue-500" }`}></div>
            </div>

            {/* Step 3 */}
            <div className='flex flex-col items-center w-full'>
              <div onClick={()=>setProgress(3)} className={`flex gap-1 items-center ${progress === 3 ? "text-blue-500 font-semibold" : "text-gray-400"}`}>
                <UserRoundPen size={22} />
                <h1 className='text-lg'>Social Media Info</h1>
              </div>
              <div className={`h-0.5 w-full ${progress === 3 && "bg-blue-500" }`}></div>
            </div>

            {/* Step 4 */}
            <div className='flex flex-col items-center w-full'>
              <div onClick={()=>setProgress(4)} className={`flex gap-1 items-center ${progress === 4 ? "text-blue-500 font-semibold" : "text-gray-400"}`}>
                <UserRoundPen size={22} />
                <h1 className='text-lg'>Contact Info</h1>
              </div>
              <div className={`h-0.5 w-full ${progress === 4 && "bg-blue-500"}`}></div>
            </div>

          </div>

          
          <div className='mt-7 text-center max-w-5xl mx-auto '>
            {/* FirstPage */}
            {progress === 1 &&
              <div className='flex flex-col gap-3 w-full'>
                <h1 className='text-lg font-medium text-gray-700 text-start'>Basic Information</h1>

                <div className='flex gap-5 '>
                  <div className='flex flex-col gap-2' >
                    <h1 className='text-md text-gray-600 text-start'>Upload Document</h1>
                    <div onClick={()=>setShowModel(true)} className='flex flex-col border-2 gap-2 border-dashed border-gray-300 rounded-md h-48 w-60 flex items-center justify-center cursor-pointer hover:bg-gray-50 transition'
                    >
                      <CloudUpload size={30} className='text-gray-400' />
                      <p className='text-gray-500'><span className='text-black'>Browse Photo</span> or Drop here</p>
                      <p className='text-gray-400'>A Photo large then 200kb works Best.Photo Max size 5mb</p>
                    </div>
                  </div>        

                  <div className='w-full flex flex-col'>
                        <div className=' w-full grid grid-cols-1 md:grid-cols-2 gap-3'>
                    <div className='flex flex-col'>
                        <h1 className='text-start text-gray-700 text-md'>Full Name</h1>
                        <input 
                        type="text"
                        className='border border-gray-300 p-3 mt-1'/>  
                    </div>
                    <div className='flex flex-col'>
                        <h1 className='text-start text-gray-700 text-md'>Title/headline</h1>
                        <input 
                        type="text"
                        className='border border-gray-300 p-3 mt-1'/>
                    </div>
                    <div className='flex flex-col'>
                        <h1 className='text-start text-gray-700 text-md'>Experience</h1>
                        <select className='border border-gray-300 p-3.5 mt-1'>
                            <option disabled selected value="">Select</option>
                            {
                                userExperience.map((userItem,index) => (
                                    <option value={index}>{userItem.name}</option>
                                ))
                            }
                        </select>
                    </div>
                    <div className='flex flex-col'>
                        <h1 className='text-start text-gray-700 text-md'>Education</h1>
                        <select className='border border-gray-300 p-3.5 mt-1'>
                            <option disabled selected value="">Select</option>
                            {
                                userEducation.map((userItem,index) => (
                                    <option value={index}>{userItem.name}</option>
                                ))
                            }
                        </select>
                    </div>
                        </div>
                        <div className='mt-3'>
                            <h1 className='text-start text-gray-700 text-md'>Full Name</h1>
                            <div className="flex text-gray-400 border border-gray-300 p-3 gap-2 items-center mt-1">
                                <Link size={19} className='text-blue-700'/>
                                <input 
                                type="text" 
                                placeholder='Website Url..'
                                className='outline-none'
                                />
                            </div>
                        </div>
                        <div className='flex mt-3 bg-blue-700 w-fit px-5 py-3 text-white gap-2 items-center rounded-md cursor-pointer hover:bg-blue-700 transition'
                        >
                        <h1>Save Changes & Next</h1>
                        
                        </div>
                    </div>

                </div> 
                <div className='border-t-2 mt-1 border-gray-200 w-full h-2'>
                </div>

                <h1 className='text-lg font-medium text-gray-700 text-start'>Your Resume & CV</h1>
                
                    <div className='grid sm:grid-cols-1 md:grid-cols-3 gap-3'>
                        <div className='bg-gray-100 flex gap-3 p-2 items-center'>
                            <FileMinus size={20} className='text-blue-500' />
                            <div className='text-start'>
                                <h1 className='text-md text-gray-600'>Professional Resume</h1>
                                <h1 className='text-sm text-gray-600'>5 mb</h1>
                            </div>
                            <Ellipsis className="ml-15" size={20}/>

                        </div>
                        <div className='bg-gray-100 flex gap-3 p-2 items-center'>
                            <FileMinus size={20} className='text-blue-500' />
                            <div className='text-start'>
                                <h1 className='text-md text-gray-600'>Professional Resume</h1>
                                <h1 className='text-sm text-gray-600'>5 mb</h1>
                            </div>
                            <Ellipsis className="ml-15" size={20}/>

                        </div>
                        <div className='bg-gray-100 flex gap-3 p-2 items-center'>
                            <FileMinus size={20} className='text-blue-500' />
                            <div className='text-start'>
                                <h1 className='text-md text-gray-600'>Professional Resume</h1>
                                <h1 className='text-sm text-gray-600'>5 mb</h1>
                            </div>
                            <Ellipsis className="ml-15" size={20}/>

                        </div>
                        <div className='bg-white border border-dashed border-gray-400 flex gap-3 p-2 items-center'>
                            <CirclePlus size={20} className='text-blue-500' />
                            <div className='text-start'>
                                <h1 className='text-md text-gray-600'>Add Resume/CV</h1>
                                <h1 className='text-sm text-gray-600'>Browse file or drop here,only pdf</h1>
                            </div>
                        </div>

                    </div>
                    <div className='flex bg-blue-700 w-fit px-5 py-3 text-white gap-2 items-center rounded-md cursor-pointer hover:bg-blue-700 transition'
                    onClick={() => setProgress(2)}>
                        <h1>Save & Next </h1>
                        <MoveRight />
                    </div>
                  
                
              </div>
            }
            
            {progress === 2 && 
                <div className='mt-7 text-center max-w-5xl mx-auto'>
                    <div className='grid gap-5 grid-cols-1 md:grid-cols-2 mt-10'>
                        <div className='flex flex-col gap-2'>
                            <h1 className='text-gray-500 text-lg text-start'>Nationality</h1>
                            <select className='text-gray-400 border border-gray-300 p-3'>
                                <option disabled selected value="">Select</option>
                                {
                                    nationalities.map((item,index) => (
                                        <option value={index}>{item.name}</option>
                                    ))
                                }
                            </select>
                            
                        </div>
                        <div className='flex flex-col gap-2'>
                            <h1 className='text-gray-500 text-lg text-start'>Date Of Birth</h1>
                            <input
                            className='text-gray-400 border border-gray-300 p-3' 
                            type="date"
                            />
                            
                        </div>
                        <div className='flex flex-col gap-2'>
                            <h1 className='text-gray-500 text-lg text-start'>Gender</h1>
                            <select className='text-gray-400 border border-gray-300 p-3' placeholder="select">
                                <option disabled selected value="">Select</option>
                                {
                                    gender.map((item,index) => (
                                        <option value={index}>{item.name}</option>
                                    ))
                                }
                            </select>
                            
                        </div>
                        

                        <div className='flex flex-col gap-2'>
                            <h1 className='text-gray-500 text-lg text-start'>Martinal Status</h1>
                            <select className='text-gray-400 border border-gray-300 p-3' placeholder="select">
                                <option disabled selected value="">Select</option>
                                {
                                    maritalStatus.map((item,index) => (
                                        <option value={index}>{item.name}</option>
                                    ))
                                }
                            </select>
                            
                        </div>

                        <div className='flex flex-col gap-2'>
                            <h1 className='text-gray-500 text-lg text-start'>Education</h1>
                            <select className='text-gray-400 border border-gray-300 p-3' placeholder="select">
                                <option disabled selected value="">Select</option>
                                {
                                    userEducation.map((item,index) => (
                                        <option value={index}>{item.name}</option>
                                    ))
                                }
                            </select>
                            
                        </div>

                         <div className='flex flex-col gap-2'>
                            <h1 className='text-gray-500 text-lg text-start'>Experience</h1>
                            <select className='text-gray-400 border border-gray-300 p-3' placeholder="select">
                                <option disabled selected value="">Select</option>
                                {
                                    userExperience.map((item,index) => (
                                        <option value={index}>{item.name}</option>
                                    ))
                                }
                            </select>
                            
                        </div>
                        

                    </div>
                                
                    <div className='flex flex-col mt-10 gap-2'>
                        <h1 className='text-gray-500 text-lg text-start'>Biography</h1>
                        <textarea 
                        rows={4}
                        className='border border-gray-300 p-3'
                        placeholder='Write down your biography here.let the employers know who you are..'>
                            
                        </textarea>
                    </div>
                    <div className='flex gap-3 mt-8'>
                            <div className='flex bg-gray-300 w-fit px-5 py-3 text-black gap-2 items-center rounded-md cursor-pointer hover:bg-gray-400 transition'
                            onClick={() => setProgress(1)}>
                                <h1>Previous </h1>
                                
                        </div>
                        <div className='flex bg-blue-700 w-fit px-5 py-3 text-white gap-2 items-center rounded-md cursor-pointer hover:bg-blue-700 transition'
                            onClick={() => setProgress(3)}>
                                <h1>Save Changes & Next </h1>
                                
                        </div>
                    </div>
                </div>
            }
            {/* thirdPage */}
            {progress === 3 && 
                <div className='flex flex-col gap-2 mt-7 text-center max-w-5xl mx-auto '>
                    <h1 className='text-gray-500 text-lg text-start'>Social Link 1 </h1>
                    <div className='flex gap-3'>
                        <div className="flex border-1 border-gray-300 px-5 py-3 gap-3 w-fit">
                            <Facebook size={25} className="text-blue-700" />
                            <p className="text-lg text-gray-700 font-serif">FaceBook</p>
                        </div>
                        <input type="text" 
                        className='flex flex-1 border-1 border-gray-300  text-gray-500 px-5 py-3 gap-3 '
                        placeholder='Profile link/url...'/>
                    </div>

                    <h1 className='text-gray-500 text-lg text-start mt-3'>Social Link 1 </h1>
                    <div className='flex gap-3'>
                        <div className="flex border-1 border-gray-300 px-5 py-3 gap-3 w-fit">
                            <Instagram size={25} className="text-blue-700" />
                            <p className="text-lg text-gray-700 font-serif">FaceBook</p>
                        </div>
                        <input type="text" 
                        className='flex flex-1 border-1 border-gray-300  text-gray-500 px-5 py-3 gap-3 '
                        placeholder='Profile link/url...'/>
                    </div>
                    <h1 className='text-gray-500 text-lg text-start mt-3'>Social Link 1 </h1>
                    <div className='flex gap-3'>
                        <div className="flex border-1 border-gray-300 px-5 py-3 gap-3 w-fit">
                            <Twitter size={25} className="text-blue-700" />
                            <p className="text-lg text-gray-700 font-serif">FaceBook</p>
                        </div>
                        <input type="text" 
                        className='flex flex-1 border-1 border-gray-300  text-gray-500 px-5 py-3 gap-3 '
                        placeholder='Profile link/url...'/>
                    </div>
                    <h1 className='text-gray-500 text-lg text-start mt-3'>Social Link 1 </h1>
                    <div className='flex gap-3'>
                        <div className="flex border-1 border-gray-300 px-5 py-3 gap-3 w-fit">
                            <Youtube size={25} className="text-blue-700" />
                            <p className="text-lg text-gray-700 font-serif">FaceBook</p>
                        </div>
                        <input type="text" 
                        className='flex flex-1 border-1 border-gray-300  text-gray-500 px-5 py-3 gap-3 '
                        placeholder='Profile link/url...'/>
                    </div>

                    <div className='flex gap-3 mt-8'>
                            <div className='flex bg-gray-300 w-fit px-5 py-3 text-black gap-2 items-center rounded-md cursor-pointer hover:bg-gray-400 transition'
                            onClick={() => setProgress(2)}>
                                <h1>Previous </h1>
                                
                        </div>
                        <div className='flex bg-blue-700 w-fit px-5 py-3 text-white gap-2 items-center rounded-md cursor-pointer hover:bg-blue-700 transition'
                            onClick={() => setProgress(4)}>
                                <h1>Save Changes & Next </h1>
                                
                        </div>
                    </div>


                </div>
            }
            {progress === 4 && 
                <div className='flex flex-col mt-10'>
                    <h1 className='text-start text-lg text-gray-500 font-medium'>Company Location</h1>
                    <input
                    type="text"

                    className='border border-gray-300 rounded-md p-2 w-full mt-1'
                    />
                    <h1 className='text-start text-lg text-gray-500 font-medium mt-3'>Phone </h1>
                    <div className='flex gap-5 mt-2'>
                        <select className='p-3 border border-gray-300'>
                            {
                                phoneCodes.map((eachItem,index) => (
                                    <option key={index}>{eachItem.name}</option>
                                ))
                            }
                        </select>
                        <input
                        type="text"
                        placeholder='Phone Number'
                        className='flex flex-1 text-gray-400 p-1 border border-gray-300 '
                        />
                    </div>
                    <h1 className='text-start text-lg text-gray-500 font-medium mt-5'>Email</h1>
                    <div className='border border-gray-300 rounded-md p-3 w-full mt-1 flex gap-2'>
                        <Mail className='text-blue-500'/>
                        <input
                            type="text"
                            placeholder='Email'
                            className='flex flex-1 outline-none text-gray-600'

                        />
                    </div>
                    <div className='flex gap-3 mt-8'>
                            <div className='flex bg-gray-300 w-fit px-5 py-3 text-black gap-2 items-center rounded-md cursor-pointer hover:bg-gray-400 transition'
                            onClick={() => setProgress(3)}>
                                <h1>Previous </h1>
                                
                        </div>
                        <div className='flex bg-blue-700 w-fit px-5 py-3 text-white gap-2 items-center rounded-md cursor-pointer hover:bg-blue-700 transition'
                            onClick={() => {
                                
                                setProgress(5)}
                                }>
                                <h1>Save Changes </h1>
                                
                        </div>
                    </div>
                    <h1 className='text-xl text-gray-700 text-start mt-5'>Change Password</h1>
                    <div className='grid grid-cols-1 md:grid-cols-3 gap-3 mt-2'>
                        <div className='mt-2'>
                            <h1 className='text-start text-gray-600'>Current Password</h1>
                            <div className="flex border border-gray-300 mt-1 px-2 py-3 justify-between">
                                <input 
                                type="text"
                                placeholder='Password '/>
                                <Eye />

                            </div>
                        </div>
                        <div className='mt-2'>
                            <h1 className='text-start text-gray-600'>New Password</h1>
                            <div className="flex border border-gray-300 mt-1 px-2 py-3 justify-between">
                                <input 
                                type="text"
                                placeholder='Password '/>
                                <Eye />

                            </div>
                        </div>
                        <div className='mt-2'>
                            <h1 className='text-start text-gray-600'>Confirm Password</h1>
                            <div className="flex border border-gray-300 mt-1 px-2 py-3 justify-between">
                                <input 
                                type="text"
                                placeholder='Password '/>
                                <Eye />

                            </div>
                        </div>
                    </div>
                    <div className='flex gap-3 mt-8'>
                            
                        <div className='flex bg-blue-700 w-fit px-5 py-3 text-white gap-2 items-center rounded-md cursor-pointer hover:bg-blue-700 transition'
                            onClick={() => {
                                
                                setProgress(5)}
                                }>
                                <h1>Save Changes </h1>
                                
                        </div>
                    </div>
                </div>
            }
          </div>
        </div>

        {
            showModel && 
            <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
                <div className="bg-white w-full max-w-lg rounded-lg shadow-lg p-6">
                    
                    
                    <div className="flex justify-between items-center mb-4">
                    <h2 className="text-lg font-semibold">Add CV/Resume</h2>
                    <button onClick={() =>setShowModel(false)} className="text-gray-500 hover:text-black">
                        ✕
                    </button>
                    </div>

                    
                    <div className="mb-4">
                    <label className="text-sm font-medium block mb-1">CV/Resume Name</label>
                    <input
                        type="text"
                        className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
                        placeholder="Enter resume name"
                    />
                    </div>

                    <div className="mb-6">
                    <label className="text-sm font-medium block mb-1">Upload your CV/Resume</label>
                    <div className="border-2 border-dashed border-gray-300 rounded-md p-6 text-center flex flex-col items-center">
                        <div className="text-3xl mb-2">☁️</div>
                        <p className="text-blue-600 font-medium cursor-pointer">
                        Browse File or drop here
                        </p>
                        <p className="text-xs text-gray-500 mt-1">
                        Only PDF format available · Max file size 12 MB
                        </p>
                    </div>
                    </div>

                    {/* Buttons */}
                    <div className="flex justify-end space-x-3">
                    <button
                        onClick={()=>setShowModel(false)}
                        className="px-4 py-2 rounded-md border border-gray-300 text-gray-600 hover:bg-gray-100"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={()=>setShowModel(false)}
                        className="px-4 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700"
                    >
                        Add CV/Resume
                    </button>
                    </div>
                </div>
            </div>
        }
        
      </div>
    </div>
  )
}

export default UserSettings
