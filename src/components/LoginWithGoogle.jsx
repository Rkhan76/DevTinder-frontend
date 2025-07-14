import { useGoogleLogin } from '@react-oauth/google'
import { signInWithGoogle } from '../api/authApi'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import Cookies from 'js-cookie' // Make sure you import this

const LoginWithGoogle = () => {
  const navigate = useNavigate()

  // Define login function here
  const login = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      try {
        const res = await signInWithGoogle(tokenResponse.code)
        console.log(res, 'response in signInWithGoogle')

        if (res.success) {
          if (res.token) {
            Cookies.set('token', res.token, {
              expires: 7,
              path: '/',
              secure: false,
            })
          }
          toast.success('Successfully Logged In')
          navigate('/home')
        } else {
          toast.error('Something went wrong')
        }
      } catch (error) {
        console.error('Error in Google login:', error)
        toast.error('Login failed')
      }
    },
    onError: () => {
      console.error('Google Login Failed')
      toast.error('Google login failed')
    },
    flow: 'auth-code',
  })

  return (
    <button
      onClick={() => login()}
      className="px-6 py-3 rounded-lg font-medium text-white bg-gray-800 hover:bg-gray-700 border border-gray-600 hover:border-gray-500 shadow-md transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-400 flex items-center justify-center space-x-2"
    >
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        {/* Google SVG icon */}
      </svg>
      <span>Sign in with Google</span>
    </button>
  )
}

export default LoginWithGoogle
