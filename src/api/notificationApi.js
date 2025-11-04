import axios from '../utils/axiosConfig'

const BASE_URL = import.meta.env.VITE_API_BASE_URL


export const saveFcmToken = async (token) => {
  const api = `${BASE_URL}/notifications/save-fcm-token`
  
  try {
    const res = await axios.post(api,{token})
    return res.data
  } catch (err) {
    console.error('Error saving FCM token:', err)
    throw err
  }
}

// Fetch people you may know
export const fetchNotifications = async () => {
  const api = `${BASE_URL}/notifications/get-notifications`

  try {
    const response = await axios.get(api)
    return response.data 
  } catch (error) {
    console.error(
      'Something went wrong while fetching notification',
      error
    )
    throw error
  }
}

// ✅ Mark a single notification as read
export const markNotificationAsRead = async (notificationId) => {
  const api = `${BASE_URL}/notifications/mark-as-read/${notificationId}`
  try {
    const response = await axios.patch(api)
    return response.data
  } catch (error) {
    console.error(`Error marking notification ${notificationId} as read:`, error)
    throw error
  }
}

// ✅ Mark all notifications as read
export const markAllNotificationsAsRead = async (userId) => {
  const api = `${BASE_URL}/notifications/mark-all-as-read/${userId}`
  try {
    const response = await axios.put(api)
    return response.data
  } catch (error) {
    console.error(`❌ Error marking all notifications as read for user ${userId}:`, error)
    throw error
  }
}

// ✅ Delete a notification
export const deleteNotification = async (notificationId) => {
  const api = `${BASE_URL}/notifications/delete/${notificationId}`
  try {
    const response = await axios.delete(api)
    return response.data
  } catch (error) {
    console.error(`Error deleting notification ${notificationId}:`, error)
    throw error
  }
}