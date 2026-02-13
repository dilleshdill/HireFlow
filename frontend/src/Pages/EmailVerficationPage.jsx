import React, { useRef ,useState} from 'react'
import axios from 'axios'
import { useLocation, useNavigate } from 'react-router-dom'

const DOMAIN = import.meta.env.VITE_DOMAIN

const EmailVerficationPage = () => {
    const [otp,setOtp] = useState(["","","",""])
    const location = useLocation()
    const {role} = location.data
    
    const inputRef = useRef([])
    const navigate = useNavigate()

    const handleChange = (val,index) => {
        if (!/^\d?$/.test(val)) return;
        const newData = [...otp]
        newData[index] =  val 
        setOtp(newData)

        if(index < 3 && val){
            inputRef.current[index+1].focus()
        }
    }

    const keyDown = (e,index) => {
        if (e.key === "Backspace" && !e.target.value) {
            if(index > 0){
                inputRef.current[index-1].focus()
            } 
        }
    }

    const getResendOtp = async() => {
        try{
            const response = await axios.get(DOMAIN + "/resendOtp")
            if(response.status === 200){
                console.log(response.data)
            }
        }catch(err){
            console.log("something went wrong",err)
        }
    }

    const getSubmit = async(e) => {
        e.preventDefault()
        const otpString = otp.join("")
        try{
            
            const response = await axios.post(DOMAIN + "/api/auth/otp-verification",
              {
                otp:otpString 
            },{withCredentials:true})
            if(response.status === 200){
                console.log(response.data)
                if (role === "USER"){
                  navigate("/user-dashboard")
                }       
                else if (role === "RECRUITER"){
                  navigate("/recruiter-dashboard")
                }         
            }
        }catch(err){
            console.log("something went wrong",err)
        }
    }

  return (
    <>
      <div className="relative flex min-h-screen flex-col justify-center overflow-hidden bg-gray-50 py-12">
        <div className="relative bg-white px-6 pt-10 pb-9 shadow-xl mx-auto w-full max-w-lg rounded-2xl">
          <div className="mx-auto flex w-full max-w-md flex-col space-y-16">

            <div className="flex flex-col items-center justify-center text-center space-y-2">
              <p className="font-semibold text-3xl">Email Verification</p>
              <p className="text-sm font-medium text-gray-400">
                We have sent a code to your email ba**@dipainhouse.com
              </p>
            </div>

            <form onSubmit={getSubmit}>
              <div className="flex flex-col space-y-16">

               <div className='flex gap-5 justify-center'>
                {otp.map((value, idx) => (
                    <input
                    key={idx}
                    ref={el => (inputRef.current[idx] = el)}
                    type="text"
                    maxLength={1}
                    value={value}
                    onChange={e => handleChange(e.target.value, idx)}
                    onKeyDown={e => keyDown(e, idx)}
                    className='border-1 border-black h-15 w-15 rounded-xl text-center'
                    />
                ))}
    </div>

                <div className="flex flex-col space-y-5">
                  <button type='submit' className="w-full py-5 bg-blue-700 text-white rounded-xl shadow-sm" >
                    Verify Account
                  </button>

                  <div className="flex flex-row items-center justify-center text-sm font-medium space-x-1 text-gray-500">
                    <p>Didn't receive code?</p>
                    <button onClick = {getResendOtp} className="text-blue-600">Resend</button>
                  </div>
                </div>

              </div>
            </form>

          </div>
        </div>
      </div>
    </>
  )
}

export default EmailVerficationPage
