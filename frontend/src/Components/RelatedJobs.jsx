import React from 'react'
import { MapPin } from 'lucide-react'

const Data = [
    {
        imageUrl:"https://uttrakhandcoldandcuttings.co.in/images/Instagram-Log-in.jpg",
        companyName:"Google",
        location:"india",
        role:"MERN Developer",
        type:"Full Time",
        salary:50000
    },
    {
        imageUrl:"https://uttrakhandcoldandcuttings.co.in/images/Instagram-Log-in.jpg",
        companyName:"Google",
        location:"india",
        role:"MERN Developer",
        type:"Full Time",
        salary:50000
    },
    {
        imageUrl:"https://uttrakhandcoldandcuttings.co.in/images/Instagram-Log-in.jpg",
        companyName:"Google",
        location:"india",
        role:"MERN Developer",
        type:"Full Time",
        salary:50000
    },
    {
        imageUrl:"https://uttrakhandcoldandcuttings.co.in/images/Instagram-Log-in.jpg",
        companyName:"Google",
        location:"india",
        role:"MERN Developer",
        type:"Full Time",
        salary:50000
    },
    {
        imageUrl:"https://uttrakhandcoldandcuttings.co.in/images/Instagram-Log-in.jpg",
        companyName:"Google",
        location:"india",
        role:"MERN Developer",
        type:"Full Time",
        salary:50000
    },
    {
        imageUrl:"https://uttrakhandcoldandcuttings.co.in/images/Instagram-Log-in.jpg",
        companyName:"Google",
        location:"india",
        role:"MERN Developer",
        type:"Full Time",
        salary:50000
    },
]

const RelatedJobs = () => {
  return (
    <div className='flex flex-col'>
        <h1 className='text-gray-700 text-2xl font-semibold'>Related Jobs</h1>
        <div className='grid sm:grid-cols-2 md:grid-cols-3 gap-5 mt-5'>
            {
            
            Data.map(eachItem => (
                <div className='border-1 border-gray-200 p-5 rounded-lg'>
                    <div className='flex gap-3'>
                        <img className="h-15 w-15 rounded-lg" src={eachItem.imageUrl}/>
                        <div className='flex flex-col gap-1'>
                            <p className='text-xl'>{eachItem.companyName}</p>
                            <div className='flex gap-1 '>
                                <MapPin className="text-gray-300" size={20}/>
                                <p className="text-gray-500">{eachItem.location}</p>
                            </div>
                        </div>
                    </div>
                    <h1 className='mt-2 text-xl font-medium text-gray-700'>{eachItem.role}</h1>
                    <div className='flex gap-2'>
                        <p className='text-gray-400 text-sm'>{eachItem.type}</p>
                        <p className='text-gray-400 text-sm'>{eachItem.salary}</p>
                    </div>
                </div>
                ))
        }
        </div>
    </div>
  )
}

export default RelatedJobs