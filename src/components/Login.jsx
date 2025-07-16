import axios from 'axios'
import { useState } from 'react'
import { userLogin } from '../api/authApi'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import LoginWithGoogle from './LoginWithGoogle'

const Login = () => {
  const [emailId, setEmailId] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleLogin = async () => {
    if (!emailId || !password) {
      toast.error('Please fill in all fields')
      return
    }

    try {
      setLoading(true)
      const res = await userLogin(emailId, password)
      if (res.success) {
        toast.success('Login Successful!')
        navigate('/home')
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message || 'Login failed. Please try again.'
      )
      console.error('Login error:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Left side: Blue background with text */}
      <div className="md:w-1/2 w-full flex flex-col justify-center items-center bg-[#86B6F6] relative p-8 min-h-[400px]">
        <div
          className="text-white font-extrabold text-4xl md:text-5xl text-left drop-shadow-lg select-none"
          style={{ textShadow: '4px 4px 0 #5a8fd6' }}
        >
          Welcome Back to
          <br />
          Your Social
          <br />
          Community.
        </div>
      </div>

      {/* Center logo overlapping split */}
      <div className="hidden md:block absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10">
        <div className="rounded-full border-8 border-white bg-[#86B6F6] w-32 h-32 flex items-center justify-center shadow-xl">
          <svg
            width="60"
            height="60"
            viewBox="0 0 60 60"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="30" cy="30" r="30" fill="#fff" />
            <path d="M20 40L30 20L40 40Z" fill="#86B6F6" />
          </svg>
        </div>
      </div>

      {/* Right side: Login form */}
      <div className="md:w-1/2 w-full flex flex-col justify-center items-center bg-white relative p-8 min-h-[400px]">
        <div className="w-full max-w-md mx-auto bg-white rounded-xl shadow-lg p-10 flex flex-col items-center">
          {/* Avatar */}
          <div className="relative mb-6">
            <img
              src="https://randomuser.me/api/portraits/women/44.jpg"
              alt="avatar"
              className="w-24 h-24 rounded-full border-4 border-white shadow-lg object-cover"
            />
            <span className="absolute bottom-2 right-2 w-6 h-6 bg-green-400 border-2 border-white rounded-full flex items-center justify-center">
              <svg width="16" height="16" fill="none" viewBox="0 0 16 16">
                <circle cx="8" cy="8" r="8" fill="#22C55E" />
                <path
                  d="M5 8.5l2 2 4-4"
                  stroke="#fff"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
          </div>

          {/* Form */}
          <div className="w-full space-y-4">
            <div>
              <input
                type="email"
                value={emailId}
                onChange={(e) => setEmailId(e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-300 text-lg"
                placeholder="jennadavis@gmail.com"
                required
              />
            </div>
            <div>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-300 text-lg"
                placeholder="••••••••"
                required
                minLength={6}
              />
            </div>

            {loading ? (
              <button
                disabled
                className="w-full py-3 rounded-lg bg-[#4576C7] text-white font-semibold text-lg shadow flex items-center justify-center"
              >
                <svg
                  className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
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
                Signing In...
              </button>
            ) : (
              <button
                onClick={handleLogin}
                className="w-full py-3 rounded-lg bg-[#4576C7] text-white font-semibold text-lg shadow hover:bg-[#335fa3] transition"
              >
                Login
              </button>
            )}

            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center">
                <span className="bg-white px-4 text-gray-500 text-sm">
                  OR CONTINUE WITH
                </span>
              </div>
            </div>

            <LoginWithGoogle />

            <div className="text-center mt-4">
              <Link
                to="/forgot-password"
                className="text-[#4576C7] hover:underline font-medium"
              >
                Forgot password?
              </Link>
            </div>

            {/* Professional "Don't have an account" section */}
            <div className="mt-8 p-4 bg-gray-50 rounded-lg border border-gray-200 text-center">
              <p className="text-gray-700">
                Don't have an account?{' '}
                <Link
                  to="/signup"
                  className="font-semibold text-[#4576C7] hover:underline transition-colors"
                >
                  Sign up
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login
