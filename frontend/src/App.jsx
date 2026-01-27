import React from 'react'
import './index.css'
import { Toaster } from 'react-hot-toast'
import { Route ,Routes } from 'react-router-dom'
import Home from './Pages/Home.jsx'
import Login from './Pages/Login.jsx'
import EmailVerficationPage from './Pages/EmailVerficationPage.jsx'
import UserJobPage from './Pages/UserJobPage.jsx'
import { User } from 'lucide-react'

const App = () => {
  return (
    <>
      <Toaster />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/email-verification' element={<EmailVerficationPage />} />
        <Route path="/user/job-page" element={<UserJobPage />} />
      </Routes>
    </>
  )
}

export default App