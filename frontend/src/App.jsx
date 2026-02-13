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
import OnlineTestDetailes from './Pages/OnlineTest/OnlineTestDetailes.jsx'
import OnlineTestExam from './Pages/OnlineTest/OnlineTestExam.jsx'
import OnlineCoadingTest from './Pages/OnlineTest/OnlineCoadingTest.jsx'
import RecruiterTestDetailes from './Pages/RecruiterTestDetailes.jsx'
import FeedBackPage from './Pages/FeedBackPage.jsx'
import MyRounds from './Components/MyRounds.jsx'

import CompanyProfile from './Pages/CompanyProfile.jsx'
import Loader from './Components/Loader.jsx'
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
        <Route path='/find-candidates/:id' element={<FindCandidates />} />
        <Route path='/user-dashboard' element={<UserDashboard />} />
        <Route path='/company-registration' element={<CompanyRegistrationPage />} />
        <Route path='/recruiter-dashboard' element={<RecruiterDashboard />} />
        <Route path='/recruiter-jobpage' element={<RecruiterJobPage />} />
        <Route path="/forgot-password" element={<ForgotPage />} />
        <Route path="/reset-password" element={<ResetPage />} />
        <Route path="/job/homepage/:id" element={<OnlineTestHomePage />} />
        <Route path='/company-jobs/:id' element={<FindCompanyJobs />} />
        <Route path="/job/confirmtest/:id" element= {<OnlineTestConfirmPage />} />
        <Route path="/job/test/detailes/:id" element = {<OnlineTestDetailes />} />
        <Route path="/job/test/exam/:id" element={<OnlineTestExam />} />  
        <Route path="/job/test/coading-test/:id" element={<OnlineCoadingTest />} />
        <Route path="/questions-setup/:id" element={<RecruiterTestDetailes />} />
        <Route path="/feedback" element={<FeedBackPage />} />
        <Route path="/my-founds" element={<MyRounds />} />
        <Route path='/company-profile/:id' element={<CompanyProfile />} />
        <Route path='/loader' element={<Loader />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
    </>
  )
}

export default App