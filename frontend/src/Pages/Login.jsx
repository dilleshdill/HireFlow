import React, { useState } from 'react'
import axios from 'axios'


const DOMAIN = import.meta.env.VITE_DOMAIN

const Login = () => {
    const [state, setState] = useState("login");
    const [role , setRole] = useState("User")

    const [formData, setFormData] = useState({
            name: 'dillesh',
            email: 'dillesh@gmail.com',
            password: '123',
            role:''
        })
    
    const Data = [
        { id: "1", role: "User" },
        { id: "2", role: "Admin" },
        { id: "3", role: "Recruiter" },
    ]

    const handleSubmit = async (e) => {
    e.preventDefault()

    const payload = {
        ...formData,
        role: role
    }

    console.log("form data", payload)

    try {
        const url =
        state === "login"
            ? DOMAIN + "/api/auth/login"
            : DOMAIN + "/api/auth/signup"

        const response = await axios.post(url, payload, {
        withCredentials: true,
        })

        console.log(response.data)
    } catch (error) {
        console.log(error.response?.data || error.message)
    }
    }

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData(prev => ({ ...prev, [name]: value }))
    }

    return (
            <div className='h-screen flex items-center justify-center'>
                <form onSubmit={handleSubmit} className="sm:w-[400px]  w-full text-center border border-gray-300/60  px-8 bg-white">
                    <h1 className="text-gray-900 text-3xl mt-10 font-medium">{state === "login" ? "Login" : "Sign up"}</h1>
                    <p className="text-gray-500 text-sm mt-2">Please sign in to continue</p>

                    <div className='flex justify-center gap-3 mt-5'>
                        {Data.map((item)=>(
                            <div
                                key={item.id}
                                value={item.role}
                                onClick={()=>setRole(item.role)}
                                className={`px-3 py-1.5 text-sm  font-medium transition-all  cursor-pointer
                                    ${
                                    role === item.role
                                        ? " border-b-3 border-b-[#0A65CC] text-[#0A65CC] "
                                        : " text-slate-600 backdrop-blur-lg hover:bg-white/70"
                                    }
                                `}
                                
                            >
                                {item.role}
                            </div>
                        ))}
                    </div>

                    {state !== "login" && (
                        <div className="flex items-center mt-6 w-full bg-white border border-gray-300/80 h-12  overflow-hidden pl-6 gap-2">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#6B7280" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-user-round-icon lucide-user-round"><circle cx="12" cy="8" r="5" /><path d="M20 21a8 8 0 0 0-16 0" /></svg>
                            <input type="text" name="name" placeholder="Name" className="border-none outline-none ring-0" value={formData.name} onChange={handleChange} required />
                        </div>
                    )}
                    <div className="flex items-center w-full mt-4 bg-white border border-gray-300/80 h-12  overflow-hidden pl-6 gap-2">
                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#6B7280" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-mail-icon lucide-mail"><path d="m22 7-8.991 5.727a2 2 0 0 1-2.009 0L2 7" /><rect x="2" y="4" width="20" height="16" rx="2" /></svg>
                        <input type="email" name="email" placeholder="Email id" className="border-none outline-none ring-0" value={formData.email} onChange={handleChange} required />
                    </div>
                    <div className="flex items-center mt-4 w-full bg-white border border-gray-300/80 h-12  overflow-hidden pl-6 gap-2">
                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#6B7280" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-lock-icon lucide-lock"><rect width="18" height="11" x="3" y="11" rx="2" ry="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" /></svg>
                        <input type="password" name="password" placeholder="Password" className="border-none outline-none ring-0" value={formData.password} onChange={handleChange} required />
                    </div>
                    <div className="mt-4 text-left text-indigo-500">
                        <button className="text-sm text-[#0A65CC]" type="reset">Forget password?</button>
                    </div>
                    <button type="submit" className="mt-2 w-full h-11  text-white bg-[#0A65CC] hover:opacity-90 transition-opacity">
                        {state === "login" ? "Login" : "Sign up"}
                    </button>
                    <p onClick={() => setState(prev => prev === "login" ? "register" : "login")} className="text-gray-500 text-sm mt-3 mb-11">{state === "login" ? "Don't have an account?" : "Already have an account?"} <a href="#" className="text-[#0A65CC] hover:underline">click here</a></p>
                </form>
            </div>
    )
}

export default Login