import React from 'react'
import Navbar from '../Components/Navbar.jsx'
import UserJobFilters from '../Components/UserJobFilters.jsx'

const FindJobs = () => {
  return (
    <div>
        <Navbar />
        <UserJobFilters />
        <div className='h-[80vh] flex items-center justify-center'>
            <h1 className='text-3xl font-semibold'>Find Jobs Page Coming Soon...</h1>
        </div>
    </div>
  )
}

export default FindJobs