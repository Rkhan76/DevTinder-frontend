import axios from '../utils/axiosConfig'
import Cookies from 'js-cookie'
import { handledecodeToken } from '../utils/userDetailByToken'

const BASE_URL = import.meta.env.VITE_API_BASE_URL


export const addPost = async (content) => {
  const api = `${BASE_URL}${import.meta.env.VITE_API_ADD_POST}`
  try {
    const response = await axios.post(api, { content })
    return response.data
  } catch (error) {
    console.error('Login failed:', error)
    throw error
  }
}

export const fetchPosts = async (page) => {
  return axios.get(`/posts?page=${page}&limit=10`)
}
