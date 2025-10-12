import axios from '../utils/axiosConfig'

const BASE_URL = import.meta.env.VITE_API_BASE_URL

export const userLogin = async (email, password) => {
  const api = `${BASE_URL}/auth/login`
  const response = await axios.post(api, { email, password })
  return response.data
}

export const userSignup = async (fullName, emailId, password) => {
  const api = `${BASE_URL}/auth/register`
 
    const response = await axios.post(api, {
      fullName,
      email: emailId,
      password,
    })
    return response.data
}

export const signInWithGoogle = async (code) => {
  const api = `${BASE_URL}/auth/google`
  const response = await axios.post(api, { code })
  console.log(response, " response in the signInWith google api")
  return response.data
  
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
  const api = `${BASE_URL}/auth/logout`
    const response = await axios.get(api)
    return response.data
}

// Fetch all users (for chat sidebar)
export const fetchAllUsers = async () => {
  const api = `${BASE_URL}/user/all`
  const response = await axios.get(api)
  return response.data
}

// Search users by query
export const searchUsers = async (query) => {
  const api = `${BASE_URL}/user/search?query=${encodeURIComponent(query)}`
  const response = await axios.get(api)
  return response.data
}
