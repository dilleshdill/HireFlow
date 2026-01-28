import { ArrowRight, MoveRight } from 'lucide-react';
import React from 'react'

const jobRoles = [
  { id: 1, name: "Software Developer" },
  { id: 2, name: "Frontend Developer" },
  { id: 3, name: "Backend Developer" },
  { id: 4, name: "Full Stack Developer" },
  { id: 5, name: "DevOps Engineer" },
  { id: 6, name: "Data Analyst" },
  { id: 7, name: "Data Scientist" },
  { id: 8, name: "UI/UX Designer" },
  { id: 9, name: "Project Manager" },
  { id: 10, name: "QA / Test Engineer" },
  { id: 11, name: "Technical Support" },
  { id: 12, name: "Product Manager" },
  { id: 13, name: "HR Recruiter" },
  { id: 14, name: "Business Analyst" },
  { id: 15, name: "Sales Executive" },
  { id: 16, name: "Marketing Specialist" },
  { id: 17, name: "Operations Manager" },
  { id: 18, name: "Customer Success" },
  { id: 19, name: "Network Engineer" },
  { id: 20, name: "Cybersecurity Engineer" },
  { id: 21, name: "Cloud Engineer" },
  { id: 22, name: "Database Administrator" },
  { id: 23, name: "Mechanical Engineer" },
  { id: 24, name: "Electrical Engineer" },
  { id: 25, name: "Civil Engineer" }
];

const salaryTypes = [
  { id: 1, name: "Hourly" },
  { id: 2, name: "Daily" },
  { id: 3, name: "Weekly" },
  { id: 4, name: "Bi-Weekly" },
  { id: 5, name: "Monthly" },
  { id: 6, name: "Quarterly" },
  { id: 7, name: "Yearly" },
  { id: 8, name: "Commission-Based" },
  { id: 9, name: "Contract-Based" },
  { id: 10, name: "Fixed + Incentives" }
];

const educationLevels = [
  { id: 1, name: "No Formal Education" },
  { id: 2, name: "High School" },
  { id: 3, name: "Diploma" },
  { id: 4, name: "Undergraduate (UG)" },
  { id: 5, name: "Bachelor’s Degree" },
  { id: 6, name: "Postgraduate (PG)" },
  { id: 7, name: "Master’s Degree" },
  { id: 8, name: "Doctorate (PhD)" },
  { id: 9, name: "Certification" },
  { id: 10, name: "Vocational Training" }
];

const experienceLevels = [
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

const jobTypes = [
  { id: 1, name: "Full-Time" },
  { id: 2, name: "Part-Time" },
  { id: 3, name: "Contract" },
  { id: 4, name: "Temporary" },
  { id: 5, name: "Internship" },
  { id: 6, name: "Freelance" },
  { id: 7, name: "Remote" },
  { id: 8, name: "On-Site" },
  { id: 9, name: "Hybrid" },
  { id: 10, name: "Volunteer" }
];

const vacancies = [
  { id: 1, name: "1" },
  { id: 2, name: "2" },
  { id: 3, name: "3" },
  { id: 4, name: "4" },
  { id: 5, name: "5" },
  { id: 6, name: "6" },
  { id: 7, name: "7" },
  { id: 8, name: "8" },
  { id: 9, name: "9" },
  { id: 10, name: "10" }
];

const jobLevels = [
  { id: 1, name: "Intern" },
  { id: 2, name: "Entry Level" },
  { id: 3, name: "Junior" },
  { id: 4, name: "Mid Level" },
  { id: 5, name: "Senior" },
  { id: 6, name: "Lead" },
  { id: 7, name: "Manager" },
  { id: 8, name: "Director" },
  { id: 9, name: "Vice President" },
  { id: 10, name: "Executive / C-Level" }
];





const RecruiterPostJob = () => {
  return ( 
    <div className='sm:p-2 md:pd-5 flex flex-col flex-1 gap-5 min-h-screen'>
        <h1 className='text-2xl text-gray-800'>Post a Job</h1>
        <div className='flex flex-col gap-2 mt-3'>
            <h1>Job Title</h1>
            <input 
            placeholder='Add job tittle,role,vacancies etc'
            className='border border-2 border-gray-200 p-3 flex flex-1 rounded-md'/>
        </div>
        <div className='flex gap-5 w-full'>
            <div className='flex flex-1 flex-col gap-2 mt-3'>
                <h1>Tags</h1>
                <input 
                placeholder='Job keyword,tags etc...'
                className='border-2 border-gray-200 p-3 flex flex-1 rounded-md outline-none'/>
            </div>
            <div className='flex flex-col gap-2 mt-3'>
                <h1>Job Role</h1>
                <select 
                className='border-2 border-gray-200 p-3 flex  rounded-md outline-none'>
                    <option value="" disabled selected >
                        Select Job Role
                    </option>
                    {
                        jobRoles.map((eachItem,index) => (
                            <option key={index}>{eachItem.name}</option>
                        ))
                    }
                </select>
                
            </div>
        </div>
        <div className='mt-5'>
            <h1 className='text-xl text-gray-700 '>Salary</h1>
            <div className='grid sm:grid-cols-1 md:grid-cols-3 gap-3 mt-3'>
                
                <div className='flex flex-col gap-2'>
                    <h1 className='text-md text-gray-600'>Min Salary</h1>
                    <div className='flex border border-gray-300 rounded-md'>
                        <input 
                        type="text"
                        className='flex flex-1 p-2 text-sm'
                        placeholder='Min Salary'/>
                        <button className='bg-gray-200 p-2'>
                            USD
                        </button>
                    </div>
                </div>
                <div className='flex flex-col gap-2'>
                    <h1 className='text-md text-gray-600'>Max Salary</h1>
                    <div className='flex border border-gray-300 rounded-md'>
                        <input 
                        type="text"
                        className='flex flex-1 p-2 text-sm'
                        placeholder='Max Salary'/>
                        <button className='bg-gray-200 p-2'>
                            USD
                        </button>
                    </div>
                </div>
                <div className='flex flex-col gap-2'>
                    <h1 className='text-md text-gray-600'>Salary Type</h1>
                    <select className='flex border border-gray-300 rounded-md p-3'>
                        <option value="" disabled selected>
                            Select 
                        </option>
                        {
                            salaryTypes.map((eachItem,index) => (
                                <option value={index}>{eachItem.name}</option>   
                            ))
                        }
                    </select>
                </div>
            </div>
        </div>
        <div className='mt-5'>
            <h1 className='text-xl text-gray-700 '>Advance Information</h1>
            <div className='grid sm:grid-cols-1 md:grid-cols-3 gap-3 mt-3'>
                
                <div className='flex flex-col gap-2'>
                    <h1 className='text-md text-gray-600'>Education</h1>
                    <select className='flex border border-gray-300 rounded-md p-3'>
                        <option value="" disabled selected>
                            Select 
                        </option>
                        {
                            educationLevels.map((eachItem,index) => (
                                <option value={index}>{eachItem.name}</option>   
                            ))
                        }
                    </select>
                </div>

                <div className='flex flex-col gap-2'>
                    <h1 className='text-md text-gray-600'>Experience </h1>
                    <select className='flex border border-gray-300 rounded-md p-3'>
                        <option value="" disabled selected>
                            Select 
                        </option>
                        {
                            experienceLevels.map((eachItem,index) => (
                                <option value={index}>{eachItem.name}</option>   
                            ))
                        }
                    </select>
                </div>

                <div className='flex flex-col gap-2'>
                    <h1 className='text-md text-gray-600'>Job Type</h1>
                    <select className='flex border border-gray-300 rounded-md p-3'>
                        <option value="" disabled selected>
                            Select 
                        </option>
                        {
                            jobTypes.map((eachItem,index) => (
                                <option value={index}>{eachItem.name}</option>   
                            ))
                        }
                    </select>
                </div>

                <div className='flex flex-col gap-2'>
                    <h1 className='text-md text-gray-600'>Vacancies</h1>
                    <select className='flex border border-gray-300 rounded-md p-3'>
                        <option value="" disabled selected>
                            Select 
                        </option>
                        {
                            vacancies.map((eachItem,index) => (
                                <option value={index}>{eachItem.name}</option>   
                            ))
                        }
                    </select>
                </div>

                <div className='flex flex-col gap-2'>
                    <h1 className='text-md text-gray-600'>Expiration Data</h1>
                    <input 
                    type="date"
                    className='flex-1 border border-gray-300 rounded-md p-3 '
                    />
                    
                </div>

                <div className='flex flex-col gap-2'>
                    <h1 className='text-md text-gray-600'>Job Level</h1>
                    <select className='flex border border-gray-300 rounded-md p-3'>
                        <option value="" disabled selected>
                            Select 
                        </option>
                        {
                            jobLevels.map((eachItem,index) => (
                                <option value={index}>{eachItem.name}</option>   
                            ))
                        }
                    </select>
                </div>
            </div>
        </div>
        <div className='mt-5'>
            <h1 className='text-xl text-gray-700 '>Description & Responsibilty</h1>
            <h1 className='text-md text-gray-600 mt-3'>Description</h1>
            <textarea
                rows={5}
                placeholder='Add Your Description'
                className='flex w-full border border-gray-300 rounded-md p-5 mt-1'
            >

            </textarea>
            <h1 className='text-md text-gray-600 mt-4'>Responsibilites</h1>
            <textarea
                rows={5}
                placeholder='Add Your Job Responsibilites'
                className='flex w-full border border-gray-300 rounded-md p-5 mt-1'
            >

            </textarea>

        </div>
        <div className='flex bg-blue-700 text-white w-fit px-4 py-2 gap-2 items-center rounded-sm'>
            <h1>Post Job</h1>
            <ArrowRight size={20}/>
        </div>
    </div>
  )
}


export default RecruiterPostJob