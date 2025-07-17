// src/utils/axiosConfig.js
import axios from 'axios'

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  withCredentials: true, // 👈 this sets it for all requests
})

export default axiosInstance
