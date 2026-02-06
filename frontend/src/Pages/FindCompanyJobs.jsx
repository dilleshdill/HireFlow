import React from 'react'
import Navbar from '../Components/Navbar.jsx'
import UserJobFilters from '../Components/UserJobFilters.jsx'
import FindCompanyAllJobs from '../Components/FindCompanyAllJobs.jsx'



const FindCompanyJobs = () => {
  return (
    <div>
        <Navbar />
        <UserJobFilters />
        <FindCompanyAllJobs />
        <div className='h-[80vh] flex items-center justify-center'>
            <h1 className='text-3xl font-semibold'>Find Jobs Page Coming Soon...</h1>
        </div>
    </div>
  )
}

export default FindCompanyJobs