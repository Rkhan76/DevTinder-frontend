import axios from '../utils/axiosConfig'

const BASE_URL = import.meta.env.VITE_API_BASE_URL

/* ========================================
   📌 GET PEOPLE YOU MAY KNOW (Recommendations)
======================================== */
export const getPeopleYouMayKnow = async (page = 1, limit = 10) => {
  const api = `${BASE_URL}/friends/recommendations?page=${page}&limit=${limit}`

  try {
    const response = await axios.get(api)
    return response.data
  } catch (error) {
    console.error('Error fetching recommendations:', error)
    throw error
  }
}

/* ========================================
   📌 SEND FRIEND REQUEST
======================================== */
export const sendFriendRequest = async (userId) => {
  try {
    const api = `${BASE_URL}/friends/requests/${userId}`
    const response = await axios.post(api)
    return response.data
  } catch (error) {
    console.error(
      'Error sending friend request:',
      error.response?.data || error.message
    )
    throw error.response?.data || error
  }
}

/* ========================================
   📌 GET REQUESTS SENT TO YOU
======================================== */
export const getPeopleWhoSentYouTheFriendRequest = async () => {
  const api = `${BASE_URL}/friends/requests`

  try {
    const response = await axios.get(api)
    return response.data
  } catch (error) {
    console.error('Error fetching incoming friend requests:', error)
    throw error
  }
}

/* ========================================
   📌 ACCEPT FRIEND REQUEST
======================================== */
export const acceptTheFriendRequest = async (userId) => {
  const api = `${BASE_URL}/friends/requests/${userId}/accept`

  try {
    const response = await axios.post(api)
    return response.data
  } catch (error) {
    console.error('Error accepting friend request:', error)
    throw error
  }
}

/* ========================================
   📌 REJECT FRIEND REQUEST
======================================== */
export const rejectTheFriendRequest = async (userId) => {
  const api = `${BASE_URL}/friends/requests/${userId}/reject`

  try {
    const response = await axios.post(api)
    return response.data
  } catch (error) {
    console.error('Error rejecting friend request:', error)
    throw error
  }
}

/* ========================================
   📌 SUGGESTED FRIENDS (AI recommendations)
======================================== */
export const getSuggestedFriends = async () => {
  const api = `${BASE_URL}/friends/suggestions`

  try {
    const response = await axios.get(api)
    return response.data
  } catch (error) {
    console.error('Error fetching suggested friends:', error)
    throw error
  }
}
