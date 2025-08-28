import axios from '../utils/axiosConfig'

const BASE_URL = import.meta.env.VITE_API_BASE_URL


// ✅ Fetch navbar activity counts
export const fetchActivityCounts = async () => {
  const api = `${BASE_URL}/activity-counts`

  try {
    const response = await axios.get(api)
    console.log('response in fetchActivityCounts:', response.data)
    return response.data
  } catch (error) {
    console.error('Something went wrong while fetching activity counts:', error)
    throw error
  }
}