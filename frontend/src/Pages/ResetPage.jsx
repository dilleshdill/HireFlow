import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useState } from "react";
import { ArrowRight } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

const DOMAIN = import.meta.env.VITE_DOMAIN
const ResetPage = () => {
  const location = useLocation();
  const role = location.state?.role;
  const email = location.state?.email;

  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error , setError] = useState("")
  const navigate = useNavigate()

  const resetPassword = async () => {
    setError("")
    try {
        if (password && confirmPassword && password === confirmPassword){

            const response = await axios.post(DOMAIN + '/api/auth/reset-password',{email,password})

            if(response.status === 200){
                toast.success("password changed successfully")
                navigate('/login')
            }
        }else{
            setError("give same password for new and confirm")
            toast.error("something went wrong")
        }
    } catch (error) {
        console.log(error.message)
        setError("server error")
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md bg-white shadow-xl rounded-2xl p-8 sm:p-10">

        {/* Heading */}
        <h1 className="text-2xl sm:text-3xl font-semibold text-center text-gray-800">
          Reset Password
        </h1>

        <p className="text-center text-gray-500 text-xs sm:text-base mt-3">
          Email : {email}
        </p>

        <p className="text-center text-gray-500 text-xs sm:text-base mt-3">
          Enter your new password and confirm it below.
        </p>

        {/* New Password */}
        <div className="mt-6 relative">
          <input
            type={showNewPassword ? "text" : "password"}
            placeholder="New Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-4 py-3 pr-12 outline-none transition"
          />

          <div
            className="absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer text-gray-500 hover:text-gray-700"
            onClick={() => setShowNewPassword(!showNewPassword)}
          >
            {showNewPassword ? <FaEyeSlash /> : <FaEye />}
          </div>
        </div>

        {/* Confirm Password */}
        <div className="mt-4 relative">
          <input
            type={showConfirmPassword ? "text" : "password"}
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-4 py-3 pr-12 outline-none transition"
          />

          <div
            className="absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer text-gray-500 hover:text-gray-700"
            onClick={() =>
              setShowConfirmPassword(!showConfirmPassword)
            }
          >
            {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
          </div>
        </div>

        {error && <p className="text-red-500 text-xs pt-2">Error : {error}</p>}

        {/* Button */}
        <button
            onClick={()=>resetPassword()}
          className="w-full mt-6 bg-blue-500 hover:bg-blue-700 text-white py-3 rounded-lg flex items-center justify-center gap-2 font-medium text-lg transition duration-200"
        >
          Reset Password
          <ArrowRight size={20} />
        </button>

      </div>
    </div>
  );
};

export default ResetPage;
