import axios from '../utils/axiosConfig'

const BASE_URL = import.meta.env.VITE_API_BASE_URL

/* ================================
   UPDATE USER ABOUT SECTION
================================ */
export const handleUpdateAboutSection = async (profileData) => {
  const api = `${BASE_URL}/users/profile/about`

  try {
    const { data } = await axios.put(api, profileData)
    return data
  } catch (error) {
    console.error(
      'Error updating profile:',
      error.response?.data || error.message
    )
    throw error.response?.data || { message: 'Server error' }
  }
}
