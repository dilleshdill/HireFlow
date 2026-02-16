import React, { useState } from "react";
import { ArrowRight } from "lucide-react";
import axios from "axios";
import { useNavigate } from "react-router-dom";


const DOMAIN = import.meta.env.VITE_DOMAIN
const ForgotPage = () => {

    const [email , setEmail] = useState('')
    const [error , setError] = useState('')
    const navigate = useNavigate()

    const resetPassword = async () => {
        setError("")
        try {
            const response = await axios.get(DOMAIN + `/api/auth/check-email/?email=${email}`,{withCredentials:true})

            if(response.status === 200){
                
                navigate('/forget-email',{state:{email:email , role:response.data.user.role}})

            }
            else{
                setError('email not found in Database')
            }
        } catch (error) {
            setError("email  not found in Database")
        }
    }


  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      
      <div className="w-full max-w-md bg-gray-50 shadow-xl rounded-2xl p-8 sm:p-10">
        
        {/* Title */}
        <h1 className="text-3xl sm:text-4xl font-semibold text-gray-800 text-center">
          Forgot Password
        </h1>

        {/* Sub Text */}
        <div className="mt-4 text-center space-y-2">
          <p className="text-gray-500 text-sm sm:text-base">
            Go back to{" "}
            <span className="text-blue-600 font-medium cursor-pointer hover:underline">
              Sign In
            </span>
          </p>
          <p className="text-gray-500 text-sm sm:text-base">
            Don’t have an account?{" "}
            <span className="text-blue-600 font-medium cursor-pointer hover:underline">
              Create Account
            </span>
          </p>
        </div>

        {/* Input */}
        <div className="mt-8">
          <input
            type="email"
            onChange={(e)=>setEmail(e.target.value)}
            placeholder="Email Address"
            className="w-full border border-gray-300 px-4 py-3 rounded-lg outline-none  transition"
          />
        </div>

        {error && <p className="text-red-600 text-xs pt-1">Error : {error}</p>}

        {/* Button */}
        <button
            onClick={()=>resetPassword()}
         className="w-full mt-4 bg-blue-500 hover:bg-blue-600 transition text-white py-3 rounded-lg flex items-center justify-center gap-2 text-lg font-medium">
          Reset Password
          <ArrowRight size={20} />
        </button>

      </div>

    </div>
  );
};

export default ForgotPage;
