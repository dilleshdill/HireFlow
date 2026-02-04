import { ArrowRight } from 'lucide-react'
import React from 'react'


const UserRecurterRegister = () => {
  return (
    <div className='flex bg-white w-full justify-center gap-10 mt-10'>
        <div className='flex flex-col bg-gray-200 w-96 p-6 gap-3 rounded-xl'>
            <h1 className='text-2xl'>Become a Candidate</h1>
            <p className='text-gray-400'>Click on the Register Now to become a candidate in hireflow.Then you can apply for jobs</p>
            <div className='flex items-center bg-white p-5 text-blue-500 w-fit rounded-xl'>
                <button >
                    Register Now 
                </button>
                <ArrowRight size={20}/>
            </div>
        </div>
        <div className='flex flex-col bg-blue-900 w-96 p-6 gap-3 rounded-xl'>
            <h1 className='text-2xl text-white'>Become a Recuruter</h1>
            <p className='text-gray-400'>Click on the Register Now to become a candidate in hireflow.Then you can apply for jobs</p>
            <div className='flex items-center bg-white p-5 text-blue-500 w-fit rounded-xl'>
                <button >
                    Register Now 
                </button>
                <ArrowRight size={20}/>
            </div>
        </div>

    </div>
  )
}

export default UserRecurterRegister