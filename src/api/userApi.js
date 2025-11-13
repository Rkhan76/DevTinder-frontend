import axios from '../utils/axiosConfig'

const BASE_URL = import.meta.env.VITE_API_BASE_URL

/* ============================================
   GET USER BY ID
============================================ */
export const getUserById = async (userId) => {
  const api = `${BASE_URL}/users/${userId}` // UPDATED
  try {
    const response = await axios.get(api)
    return response.data
  } catch (error) {
    throw error
  }
}

/* ============================================
   FETCH POSTS BY USER
============================================ */
export const fetchUserPosts = async (userId, page = 1) => {
  const api = `${BASE_URL}/posts/user/${userId}?page=${page}&limit=10` // UPDATED
  try {
    const response = await axios.get(api)
    return response.data
  } catch (error) {
    throw error
  }
}

/* ============================================
   FRIEND REQUEST SYSTEM (Now under /friends)
============================================ */

// Send friend request
export const sendFriendRequest = async (userId) => {
  const api = `${BASE_URL}/friends/requests/${userId}` // UPDATED
  try {
    const response = await axios.post(api)
    return response.data
  } catch (error) {
    throw error
  }
}

// Accept friend request
export const acceptFriendRequest = async (userId) => {
  const api = `${BASE_URL}/friends/requests/${userId}/accept` // UPDATED
  try {
    const response = await axios.post(api)
    return response.data
  } catch (error) {
    throw error
  }
}

// Reject friend request
export const rejectFriendRequest = async (userId) => {
  const api = `${BASE_URL}/friends/requests/${userId}/reject` // UPDATED
  try {
    const response = await axios.post(api)
    return response.data
  } catch (error) {
    throw error
  }
}

// Cancel your sent friend request
export const cancelFriendRequest = async (userId) => {
  const api = `${BASE_URL}/friends/requests/${userId}/cancel` // UPDATED
  try {
    const response = await axios.post(api)
    return response.data
  } catch (error) {
    throw error
  }
}

// Get friend requests sent to YOU
export const getFriendRequests = async () => {
  const api = `${BASE_URL}/friends/requests` // UPDATED
  try {
    const response = await axios.get(api)
    return response.data
  } catch (error) {
    throw error
  }
}
