import React from 'react'
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { useState } from 'react';
import { ArrowRight } from 'lucide-react';


const ResetPage = () => {
    const [showNewPasswordIcon,setNewPasswordIcon] = useState(true)
    const [showConfirmPasswordIcon,setConfirmPasswordIcon] = useState(true)
    const [password,setPassword] = useState("")
    const [confirmPassword,setConfirmPassword] = useState("")

  return (
    <div className='flex min-h-screen min-w-screen justify-center items-center'>
      <div className='flex flex-col w-md'>
        <h1 className='text-3xl font-normal text-center'>Reset Password</h1>
        <p className='text-center mt-5 text-gray-400'>You can reset your password here.And Enter Your New password here and confirm that password here.</p>

        <div className='border border-gray-300 px-4 py-2 rounded-sm mt-3 flex flex-row justify-between'>
            <input type={showNewPasswordIcon ? "text" : "password"}
            placeholder='New Password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className='outline-none'/>
            {
                showNewPasswordIcon ? 
                <FaEye onClick={() => {
                    setNewPasswordIcon(!showNewPasswordIcon)
                    
                }}/>
                :
                <FaEyeSlash onClick={() => setNewPasswordIcon(!showNewPasswordIcon)}/>
            }
        </div>

        <div className='border border-gray-300 px-4 py-2 rounded-sm mt-3 flex flex-row justify-between'>
            <input type={showConfirmPasswordIcon ? "text" : "password"} 
            value={confirmPassword}
            onChange={(e) =>setConfirmPassword(e.target.value)}
            placeholder='Confirm Password'
            className='outline-none'/>
            {
                showConfirmPasswordIcon ? 
                <FaEye onClick={() => setConfirmPasswordIcon(!showConfirmPasswordIcon)} />
                :
                <FaEyeSlash onClick={() => setConfirmPasswordIcon(!showConfirmPasswordIcon)}/>
            }
        </div>

        <button className='flex bg-blue-700 text-white justify-center py-2 mt-3 rounded-sm '>
            Reset Password
            <span>
                <ArrowRight />
            </span>
        </button>
      </div>
    </div>
  )
}

export default ResetPage
