import axios from 'axios'
import { useState } from 'react'

const Login = () => {
  const [emailId, setEmailId] = useState("")
  const [password, setPassword] = useState("")

  const handleLogin = async()=>{
    try{
       const res = await axios.post("",{
        emailId,
        password
       })
    }catch(error){
        console.log(error)
    }

  }
  return (
    <div className="flex justify-center my-28">
      <div className="card bg-base-300 w-96 shadow-sm">
        <div className="card-body">
          <h2 className="card-title text-2xl">Login</h2>
          <div>
            <fieldset className="fieldset">
              <legend className="fieldset-legend">Email</legend>
              <input
                type="text"
                value={emailId}
                onChange={(e) => setEmailId(e.target.value)}
                className="input"
                placeholder="Type here"
              />
              <legend className="fieldset-legend">Password</legend>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="input"
                placeholder="Type here"
              />
            </fieldset>
          </div>
          <div className="card-actions justify-center">
            <button onClick={handleLogin} className="btn btn-primary">Login</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login
