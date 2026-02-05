import React from 'react'
import { ArrowLeft, ArrowRight ,} from 'lucide-react'
import { FcGoogle } from "react-icons/fc";
import { FaFacebookF } from "react-icons/fa";

const ForgotPage = () => {
  return (
    <div className='flex flex-col min-h-screen justify-center items-center ' >
        <div className='flex flex-col w-md'>
            <h1 className='text-4xl'>Forgot Password</h1>
            <p className='text-gray-500 text-lg mt-5'>Go Back to <span className='text-blue-600 cursor-pointer'>Sign In</span></p>   
            <p className='text-gray-500 text-lg mt-1'>Don't Have An Account <span className='text-blue-600 cursor-pointer'>Create Account</span></p>   
            <input type="text"
            placeholder='Email Address'

            className='flex border border-gray-200 px-5 py-2 rounded-md mt-8 outline-none'/>
            <button className='flex bg-blue-600 px-5 py-2  text-white rounded-md mt-5 outline-none justify-center items-center gap-2 text-lg'>Reset Password<span><ArrowRight /></span></button>
            <p className='flex justify-center mt-5 text-gray-500'>Or</p>
            <div className='flex gap-6 mt-2'>
                <button className='flex gap-2 text-md text-gray-500 items-center border border-gray-300 px-3 py-2 rounded-lg'>
                    <span><FaFacebookF className='fill-blue-600 outline-none text-gray-600' size={20}/></span>
                    Sign in With Facebook
                </button>
                <button className='flex gap-2 text-md text-gray-500 items-center border border-gray-300 px-3 py-2 rounded-lg'>
                    <span><FcGoogle size={20}/></span>
                    Sign in With Google
                </button>
            </div>
        </div>

    </div>

  )
}

export default ForgotPage
