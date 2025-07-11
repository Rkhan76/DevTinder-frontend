import axios from 'axios'
import Cookies from 'js-cookie'
 

const BASE_URL = import.meta.env.VITE_API_BASE_URL

// const api = axios.create({
//   baseURL: BASE_URL,
//   withCredentials: true, // allows cookies to be sent in requests
// })

export const userLogin = async (email,password) => {
    const api = `${BASE_URL}${import.meta.env.VITE_API_USER_LOGIN}`
  try {
    const response = await axios.post(api, { email, password })

    const token = response.data.data.token
   
    if (token) {
        Cookies.set('token', token, {
          expires: 7,
          path: '/',
          secure: false,
        })
    }

    return response.data
  } catch (error) {
    console.error('Login failed:', error)
    throw error 
  }
}

export const userSignup = async (email, password) => {
  const api = `${BASE_URL}${import.meta.env.VITE_API_USER_REGISTER}`
  try {
    const response = await axios.post(api, { email, password })

    console.log(response)
   
    return response.data

  } catch (error) {
    console.error('Signup failed:', error)
    throw error
  }
}
