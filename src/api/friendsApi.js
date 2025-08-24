import axios from '../utils/axiosConfig'

const BASE_URL = import.meta.env.VITE_API_BASE_URL

// Fetch people you may know
export const getPeopleYouMayKnow = async (page = 1, limit = 10) => {
  const api = `${BASE_URL}/user/get-people-you-may-know?page=${page}&limit=${limit}`

  console.log(`Fetching people you may know from: ${api}`)
  try {
    const response = await axios.get(api)
    return response.data // contains { success, data, pagination }
  } catch (error) {
    console.error('Something went wrong while fetching people you may know:', error)
    throw error
  }
}

// Send friend request
export const sendFriendRequest = async (userId) => {
  try {
    const response = await API.post(`/user/add-friend/${userId}`);
    return response.data;
  } catch (error) {
    console.error("Error sending friend request:", error.response?.data || error.message);
    throw error.response?.data || error;
  }
};


// fetch the people send friend request to you
export const getPeopleWhoSentYouTheFriendRequest = async () => {
  const api = `${BASE_URL}/user/friend-requests`

  console.log(`Fetching people you may know from: ${api}`)
  try {
    const response = await axios.get(api)
    return response.data 
  } catch (error) {
    console.error(
      'Something went wrong while fetching people you may know:',
      error
    )
    throw error
  }
}