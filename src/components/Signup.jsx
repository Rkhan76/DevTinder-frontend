import axios from 'axios'
import { useState } from 'react'
import toast from 'react-hot-toast'
import { userLogin, userSignup } from '../api/authApi'
import { Navigate, useNavigate } from 'react-router-dom'

const Signup = () => {
  const [emailId, setEmailId] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()

  const handleSignup = async () => {
    try {
      const res = await userSignup(emailId, password)
      if (res.success) {
         toast.success('Signup Successful!')
        navigate('/login')
      }
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <div className="flex justify-center my-28">
      <div className="card bg-base-300 w-96 shadow-sm">
        <div className="card-body">
          <h2 className="card-title text-2xl">Signup</h2>
          <div>
            <fieldset className="fieldset">
              <legend className="fieldset-legend">Email</legend>
              <input
                type="text"
                value={emailId}
                onChange={(e) => setEmailId(e.target.value)}
                className="input"
                placeholder="example@gmail.com"
              />
              <legend className="fieldset-legend">Password</legend>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="input"
                placeholder="12345"
              />
            </fieldset>
          </div>
          <div className="card-actions justify-center">
            <button onClick={handleSignup} className="btn btn-primary">
              Signup
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Signup
