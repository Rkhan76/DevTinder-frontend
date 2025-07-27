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

// Send friend request
export const sendFriendRequest = async (userId) => {
  const api = `${BASE_URL}/user/add-friend/${userId}`
  try {
    const response = await axios.post(api)
    return response.data
  } catch (error) {
    throw error
  }
}

// Accept friend request
export const acceptFriendRequest = async (userId) => {
  const api = `${BASE_URL}/user/accept-friend-request/${userId}`
  try {
    const response = await axios.post(api)
    return response.data
  } catch (error) {
    throw error
  }
}

// Reject friend request
export const rejectFriendRequest = async (userId) => {
  const api = `${BASE_URL}/user/reject-friend-request/${userId}`
  try {
    const response = await axios.post(api)
    return response.data
  } catch (error) {
    throw error
  }
}

// Cancel sent friend request
export const cancelFriendRequest = async (userId) => {
  const api = `${BASE_URL}/user/cancel-friend-request/${userId}`
  try {
    const response = await axios.post(api)
    return response.data
  } catch (error) {
    throw error
  }
}

// Get friend requests
export const getFriendRequests = async () => {
  const api = `${BASE_URL}/user/friend-requests`
  try {
    const response = await axios.get(api)
    return response.data
  } catch (error) {
    throw error
  }
}
