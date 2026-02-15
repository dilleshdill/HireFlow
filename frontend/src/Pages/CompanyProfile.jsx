import React from 'react'
import Sidebar from '../Components/Sidebar.jsx'
import RecruterCompanyPage from '../Components/Recruiter/RecruiterCompanyPage.jsx'
import UserSidebar from '../Components/UserSidebar.jsx'
import RecruiterStaticSidebar from '../Components/Recruiter/RecruiterStaticSidebar.jsx'

const CompanyProfile = () => {
  return (
    <div className="min-h-screen flex flex-col ">
      <div className='sm:hidden'>
        <RecruiterStaticSidebar />
      </div>
        <div className="flex flex-1 max-w-9xl mx-auto w-full px-15 py-4 gap-4">
            <div className='hidden sm:flex'>
              <RecruiterStaticSidebar />
            </div>
            <RecruterCompanyPage />
            
        </div>
    </div>
  )
}

export default CompanyProfile