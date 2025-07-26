import axios from '../utils/axiosConfig'

const BASE_URL = import.meta.env.VITE_API_BASE_URL

// Get user by ID
export const getUserById = async (userId) => {
  const api = `${BASE_URL}/user/${userId}`
  try {
    const response = await axios.get(api)
    return response.data
  } catch (error) {
    throw error
  }
}

// Fetch posts by user ID
export const fetchUserPosts = async (userId, page = 1) => {
  const api = `${BASE_URL}/post/user/${userId}?page=${page}&limit=10`
  try {
    const response = await axios.get(api)
    return response.data
  } catch (error) {
    throw error
  }
}

// Add friend
export const addFriend = async (friendId) => {
  const api = `${BASE_URL}/user/add-friend`
  try {
    const response = await axios.post(api, { friendId })
    return response.data
  } catch (error) {
    throw error
  }
}

// Remove friend
export const removeFriend = async (friendId) => {
  const api = `${BASE_URL}/user/remove-friend`
  try {
    const response = await axios.delete(api, { data: { friendId } })
    return response.data
  } catch (error) {
    throw error
  }
}
