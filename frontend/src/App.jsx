import React from 'react'
import './index.css'
import { Toaster } from 'react-hot-toast'
import { Route ,Routes } from 'react-router-dom'
import Home from './Pages/Home.jsx'
import Login from './Pages/Login.jsx'
import EmailVerficationPage from './Pages/EmailVerficationPage.jsx'
import UserJobPage from './Pages/UserJobPage.jsx'
import { ImageOff, User } from 'lucide-react'
import FindJobs from './Pages/FindJobs.jsx'
import RecruterCompanyPage from './Pages/RecruterCompanyPage.jsx'
import FindCompanis from './Pages/FindCompanis.jsx'
import FindCandidates from './Pages/FindCandidates.jsx'
import UserDashboard from './Pages/UserDashboard.jsx'
import CompanyRegistrationPage from './Pages/CompanyRegistrationPage.jsx'
import RecruiterDashboard from './Pages/RecruiterDashboard.jsx'
import NotFound from './Pages/NotFound.jsx'
import RecruiterJobPage from './Pages/RecruiterJobPage.jsx'
import ForgotPage from './Pages/ForgotPage.jsx'
import ResetPage from './Pages/ResetPage.jsx'
import OnlineTestHomePage from './Pages/OnlineTest/OnlineTestHomePage.jsx'
import FindCompanyJobs from './Pages/FindCompanyJobs.jsx'
import OnlineTestConfirmPage from './Pages/OnlineTest/OnlineTestConfirmPage.jsx'
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
        <Route path='/company-registration' element={<CompanyRegistrationPage />} />
        <Route path='/recruiter-dashboard' element={<RecruiterDashboard />} />
        <Route path='/recruiter-jobpage' element={<RecruiterJobPage />} />
        <Route path="/forgot-password" element={<ForgotPage />} />
        <Route path="/reset-password" element={<ResetPage />} />
        <Route path="/job/homepage" element={<OnlineTestHomePage />} />
        <Route path='/company-jobs/:id' element={<FindCompanyJobs />} />
        <Route path="/job/confirmtest" element= {<OnlineTestConfirmPage />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
    </>
  )
}

export default App