import axios from 'axios'
import { useState } from 'react'
import toast from 'react-hot-toast'
import { userLogin, userSignup } from '../../api/authApi'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import LoginWithGoogle from './LoginWithGoogle'

const Signup = () => {
  const [fullName, setFullName] = useState('')
  const [emailId, setEmailId] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleSignup = async () => {
    // Validate required fields
    if (!fullName.trim()) {
      toast.error('Full name is required!')
      return
    }
    if (!emailId.trim()) {
      toast.error('Email is required!')
      return
    }
    if (!password.trim()) {
      toast.error('Password is required!')
      return
    }

    setLoading(true)
    try {
      const res = await userSignup(fullName, emailId, password)
      if (res.success) {
        toast.success('Signup Successful!')
        navigate('/login')
      }
    } catch (error) {
      toast.error('Something went wrong!')
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
          Join an
          <br />
          Exciting Social
          <br />
          Experience.
        </div>
      </div>
      {/* Center logo overlapping split */}
      <div className="hidden md:block absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10">
        <div className="rounded-full border-8 border-white bg-[#86B6F6] w-32 h-32 flex items-center justify-center shadow-xl">
          {/* Replace with your SVG logo if available */}
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
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-300 text-lg"
                placeholder="Full Name"
                required
              />
            </div>
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
              />
            </div>
            {loading ? (
              <button className="w-full py-3 rounded-lg bg-[#4576C7] text-white font-semibold text-lg shadow hover:bg-[#335fa3] transition flex items-center justify-center">
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
                Creating Account...
              </button>
            ) : (
              <button
                onClick={handleSignup}
                className="w-full py-3 rounded-lg bg-[#4576C7] text-white font-semibold text-lg shadow hover:bg-[#335fa3] transition"
              >
                Sign Up
              </button>
            )}
            <LoginWithGoogle />
            <div className="text-center mt-6">
              <p className="text-gray-600">
                Already have an account?{' '}
                <Link
                  to="/login"
                  className="font-medium text-[#86b6f6] hover:text-primary/80 hover:underline transition-colors"
                >
                  Login
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Signup
