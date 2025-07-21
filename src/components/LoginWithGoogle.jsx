import { useGoogleLogin } from '@react-oauth/google'
import { signInWithGoogle } from '../api/authApi'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import Cookies from 'js-cookie' // Make sure you import this
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { setUser } from '../redux/slices/authSlice'

const LoginWithGoogle = () => {
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
    const dispatch = useDispatch()

  // Define login function here
  const login = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      try {
        const res = await signInWithGoogle(tokenResponse.code)
        console.log(res, 'response in signInWithGoogle')

        if (res.success) {
          console.log("hey i am succesfull")
           dispatch(setUser(res?.user))
          toast.success('Successfully Logged In')
          navigate('/home')
        } else {
          toast.error('Something went wrong')
        }
      } catch (error) {
        setLoading(false)
        console.log("error i am getting when login with googel ", error)
        toast.error('Login failed')
      }
    },
    onError: () => {
      setLoading(false)
      toast.error('Google login failed')
    },
    flow: 'auth-code',
  })

 return (
   <div>
     {loading ? (
       <div className="w-full flex items-center justify-center gap-3 py-3 px-4 rounded-lg border border-gray-300 bg-white text-[#4576C7] font-semibold text-lg shadow hover:bg-blue-50 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-300 mt-2">
         <button className="btn btn-outline border-primary text-primary hover:bg-primary hover:text-white">
           <svg
             className="animate-spin -ml-1 mr-2 h-5 w-5"
             xmlns="http://www.w3.org/2000/svg"
             fill="none"
             viewBox="0 0 24 24"
           >
             <circle
               className="opacity-25"
               cx="12"
               cy="12"
               r="10"
               stroke="currentColor"
               strokeWidth="4"
             ></circle>
             <path
               className="opacity-75"
               fill="currentColor"
               d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
             ></path>
           </svg>
           Logging In
         </button>
       </div>
     ) : (
       <button
         onClick={() => {
           login()
           setLoading(true)
         }}
         className="w-full flex items-center justify-center gap-3 py-3 px-4 rounded-lg border border-gray-300 bg-white text-[#4576C7] font-semibold text-lg shadow hover:bg-blue-50 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-300 mt-2"
       >
         <svg className="w-5 h-5" viewBox="0 0 48 48">
           <g>
             <path
               fill="#4285F4"
               d="M24 9.5c3.54 0 6.36 1.53 7.82 2.81l5.77-5.77C33.64 3.36 29.28 1.5 24 1.5 14.98 1.5 7.06 7.44 3.68 15.09l6.91 5.36C12.06 14.36 17.56 9.5 24 9.5z"
             />
             <path
               fill="#34A853"
               d="M46.1 24.55c0-1.64-.15-3.22-.42-4.74H24v9.01h12.42c-.54 2.9-2.18 5.36-4.65 7.03l7.18 5.59C43.93 37.13 46.1 31.36 46.1 24.55z"
             />
             <path
               fill="#FBBC05"
               d="M10.59 28.45c-1.01-2.99-1.01-6.21 0-9.2l-6.91-5.36C1.64 17.36 0 20.53 0 24s1.64 6.64 3.68 9.11l6.91-5.36z"
             />
             <path
               fill="#EA4335"
               d="M24 46.5c5.28 0 9.7-1.75 12.93-4.77l-7.18-5.59c-2.01 1.35-4.59 2.16-7.75 2.16-6.44 0-11.94-4.86-13.41-11.36l-6.91 5.36C7.06 40.56 14.98 46.5 24 46.5z"
             />
             <path fill="none" d="M0 0h48v48H0z" />
           </g>
         </svg>
         <span>Sign in with Google</span>
       </button>
     )}
   </div>
 )

}

export default LoginWithGoogle
