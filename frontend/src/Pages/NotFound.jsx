import React from 'react'
import pageNotFoundImage from '../assets/pageNotFoundImage.svg'
import { ArrowRight } from 'lucide-react'

const NotFound = () => {
  return (
    <div className=' min-w-screen min-h-screen flex justify-center items-center'>
    <div className='flex justify-center items-center' >
      <div className='flex flex-col'>
            <h1 className='text-2xl font-semibold'>Opps! Page not found</h1>
            <p>something went wrong.It's look this the link is broken or page is remove</p>
            <div>
                <div>
                    <h1>Home</h1>
                    <ArrowRight/>
                </div>
            </div>
      </div>
      <img src={pageNotFoundImage} className='h-110 w-auto'/>
    </div>
    </div>
  )
}

export default NotFound
