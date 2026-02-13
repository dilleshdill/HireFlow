import React from 'react'
import Sidebar from '../Components/Sidebar.jsx'
import RecruterCompanyPage from './RecruterCompanyPage.jsx'

const CompanyProfile = () => {
  return (
    <div className="min-h-screen flex flex-col ">
        <div className="flex flex-1 max-w-9xl mx-auto w-full px-15 py-4 gap-4">
            <Sidebar/>
            <RecruterCompanyPage />
            
        </div>
    </div>
  )
}

export default CompanyProfile