import React from 'react'
import pageNotFoundImage from '../assets/pageNotFoundImage.svg'
import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import Footer from '../Components/Footer'

const NotFound = () => {
  return (
    <>
    <div className=' min-w-screen min-h-screen flex flex-col justify-center items-center'>
    <div className='sm:flex flex-col md:flex flex-row justify-center items-center' >
      <div className='flex flex-col gap-4 '>
            <h1 className='text-4xl font-semibold'>Opps! Page not found</h1>
            <p className='text-gray-400 text-xl max-w-sm'>something went wrong.It's look this the link is broken or page is remove</p>
            <div className='flex flex-rows gap-3'>
                <Link to="/" className='flex bg-blue-800 text-white w-fit px-6 py-3 rounded-md text-md items-center'>
                    <h1>Home</h1>
                    <ArrowRight/>
                </Link>
                <Link to="/" className='flex border-2 border-gray-200  text-blue-600 w-fit px-5 py-3 rounded-md text-md items-center'>
                    <h1>Go Back</h1>
                    <ArrowRight/>
                </Link>
            </div>
      </div>
      <img src={pageNotFoundImage} className='h-110 w-auto'/>
    </div>
    
    </div>
    <Footer />
    </>
  )
}

export default NotFound
