import React from 'react'
import './index.css'
import { Toaster } from 'react-hot-toast'
import { Route ,Routes } from 'react-router-dom'
import Home from './Pages/Home.jsx'
import Login from './Pages/Login.jsx'
import EmailVerficationPage from './Pages/EmailVerficationPage.jsx'
import UserJobPage from './Pages/UserJobPage.jsx'
import { User } from 'lucide-react'
import FindJobs from './Pages/FindJobs.jsx'
import RecruterCompanyPage from './Pages/RecruterCompanyPage.jsx'
import FindCompanis from './Pages/FindCompanis.jsx'
import FindCandidates from './Pages/FindCandidates.jsx'
import UserDashboard from './Pages/UserDashboard.jsx'

const App = () => {
  return (
    <>
      <Toaster />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/email-verification' element={<EmailVerficationPage />} />
        <Route path="/user/job-page" element={<UserJobPage />} />
        <Route path='/find-jobs' element={<FindJobs />} />
        <Route path='/company-details' element={<RecruterCompanyPage />} />
        <Route path='/find-companies' element={<FindCompanis />} />
        <Route path='/find-candidates' element={<FindCandidates />} />
        <Route path='/user-dashboard' element={<UserDashboard />} />
      </Routes>
    </>
  )
}

export default App