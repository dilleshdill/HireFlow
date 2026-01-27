import React from 'react'
import './index.css'
import { Toaster } from 'react-hot-toast'
import { Route ,Routes } from 'react-router-dom'
import Home from './Pages/Home'

const App = () => {
  return (
    <>
      <Toaster />
      <Routes>
        <Route path='/' element={<Home />} />
      </Routes>
    </>
  )
}

export default App