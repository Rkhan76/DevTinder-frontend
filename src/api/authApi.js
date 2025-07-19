import axios from '../utils/axiosConfig'
import Cookies from 'js-cookie'
 

const BASE_URL = import.meta.env.VITE_API_BASE_URL


export const userLogin = async (email, password) => {
  const api = `${BASE_URL}${import.meta.env.VITE_API_USER_LOGIN}`
  try {
    const response = await axios.post(api, { email, password })
    return response.data
  } catch (error) {
    console.error('Login failed:', error)
    throw error
  }
}


export const userSignup = async (fullName, emailId, password) => {
  const api = `${BASE_URL}${import.meta.env.VITE_API_USER_REGISTER}`

  try {
    console.log(fullName, emailId, password)
    const response = await axios.post(api, {
      fullName,
      email: emailId,
      password,
    })
    return response.data
  } catch (error) {
    console.error('Signup failed:', error)
    throw error
  }
}


export const signInWithGoogle = async (code) => {
  const api = `${BASE_URL}${import.meta.env.VITE_API_USER_GOOGLE_LOGIN}`
  try {
    const response = await axios.post(api, { code })
    return response.data
  } catch (error) {
    console.error('Google sign-in failed:', error)
    throw error
  }
}

export const isAuthenticated = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/auth/check`)
    return response.status === 200
  } catch (error) {
    return false
  }
}

export const userLogout = async () => {
  const api = `${BASE_URL}${import.meta.env.VITE_API_LOGOUT}`
  try {
    const response = await axios.get(api)
    return response.data
  } catch (error) {
    console.error('Logout failed:', error)
    throw error
  }
}

