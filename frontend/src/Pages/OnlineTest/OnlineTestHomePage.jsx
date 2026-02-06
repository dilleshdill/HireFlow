import React from 'react'
import { useState } from 'react'
import hireflow from '../../assets/hireflow.jpg'
import naukriimage from '../../assets/naukriimage.png'
import images from '../../assets/images.png'
import { SiTicktick } from "react-icons/si";



const OnlineTestHomePage = () => {
    const [jobStatus,setJobStatus] = useState("notstart")
  return (
    <div >
  <div className="min-h-screen flex max-w-7xl mx-auto gap-3">
    
    <div className="flex flex-col h-fit max-w-4xl w-full gap-3">
      <div className='flex flex-col bg-white rounded-xl shadow-2xl p-5'>
        <img 
        src={naukriimage} 
        alt="HireFlow"
        className="w-full h-50 object-fill rounded-3xl"
      />
    
        <div className='flex items-center '>
            <img src={hireflow} className='h-25 w-25 rounded-xl'/>
            <div>
                <h1 className='text-3xl font-medium text-gray-900'>Deloite National Test</h1>
                <p className='text-lg text-gray-600'>Hireflow campus</p>
            </div>     
        </div>
        <div className="border-b border-gray-300 w-full">
        </div>
        <div className='flex flex-row justify-between mt-4'>
            <div className='flex gap-3 text-lg font-light'>   
                <h1 className='flex text-gray-500 '>Participation : <span className='flex text-gray-700 font-normal'>Individual</span></h1>
                <h1 className='flex text-gray-500'>Enrolled : <span className='flex text-gray-700 font-normal'>15471</span></h1>
            </div>
            <div>
                {
                    jobStatus === "notstart" && 
                    <div className='flex text-gray-400 items-center gap-2 font-semibold'>
                        <SiTicktick />
                        <p>Contest Completed</p>
                    </div>
                }
            </div>
        </div>
      </div>
      <div className='flex flex-col bg-white rounded-xl shadow-2xl p-5 gap-3'>
        <h1 className='flex text-gray-700 font-medium text-2xl'>Round details</h1>
        <div className='flex flex-col border border-gray-300 rounded-xl px-8 py-5 gap-3'>
            <h1 className='flex text-gray-600 font-medium text-lg'>Round 1</h1>
            <div className='flex gap-10'>
                <p className='text-gray-500'>From : <span className='text-gray-700'>Jan 19,7 pm</span></p>
                <p className='text-gray-500'>To : <span className='text-gray-700'>Jan 27,9:30 pm</span></p>
            </div>
        </div>
    </div>
    <div className='flex flex-col bg-white rounded-xl shadow-2xl p-5'>
        <h1 className='flex text-gray-700 font-medium text-2xl'>Contest Description</h1>
        <h1 className='flex text-gray-600 font-semibold mt-3'>Deloitte NLA Engineering Mock Assessment - B.E./B.Tech/M.E/M.Tech/MCA</h1>
        <ul className="list-disc pl-5">
            <li className="text-gray-600 font-semibold">
                Language Skills (English)
            </li>
            <li className="text-gray-600 font-semibold">
                General Aptitude (Logical Reasoning and Quantitative Ability)
            </li>
            <li className="text-gray-600 font-semibold">
                Technical Skills (MCQ)
            </li>
            <li className="text-gray-600 font-semibold">
                Technical Skills (Coding)
            </li>
        </ul>
        <h1 className='flex text-gray-600 font-semibold'>Total Questions - 64 Questions</h1>
        <h1 className='flex text-gray-600 font-semibold'>Duration - 90 Minutes</h1>

        <h1 className='flex text-gray-700 font-medium text-lg mt-5 mb-4'>Instruction</h1>
        <ul className="list-disc pl-5">
            <li className="text-gray-500 font-semibold">
                The assessment consists of 64 Questions that needs to be completed within 90 minutes.
            </li>
            <li className="text-gray-500 font-semibold">
                Maximum time limit is 90 minutes.
            </li>
            <li className="text-gray-500 font-semibold">
                Please ensure you click the 'Submit' button after completing the test to record your attempt successfully.
            </li>
        </ul>
    </div>
    <div className='flex flex-col bg-white rounded-xl shadow-2xl p-5 gap-3'>
        <h1 className='flex text-gray-700 font-medium text-2xl'>Eligiblity</h1>
        <h1 className='flex text-gray-600 font-semibold mt-2'>All students, currently enrolled on campus, are eligible.</h1>
    </div>

    </div>
    <div className='flex flex-col h-fit max-w-xl gap-5'>
        <div className="max-w-5xl w-full bg-gradient-to-r from-pink-100 via-pink-50 to-pink-200 rounded-2xl flex items-center justify-between px-8 py-6">
        
        
        <div className="max-w-md">
          <h2 className="text-md font-normal text-gray-700 leading-snug">
            Contest are fun with friends. Invite your crew & see who comes on top
          </h2>

          <button className="mt-4 text-blue-600 font-medium hover:underline">
            Invite your friend
          </button>
        </div>

        {/* Right Image */}
        <div className="hidden md:block">
          <img
            src={images}   // replace with your image
            alt="Invite Friends"
            className="h-24 object-contain"
          />
        </div>

      </div>
    </div>
    
  </div>

</div>

  )
}

export default OnlineTestHomePage
