import axios from '../utils/axiosConfig'

const BASE_URL = import.meta.env.VITE_API_BASE_URL

/* ================================
   SAVE FCM TOKEN
================================ */
export const saveFcmToken = async (token) => {
  const api = `${BASE_URL}/notifications/token`

  try {
    const res = await axios.post(api, { token })
    return res.data
  } catch (err) {
    console.error('Error saving FCM token:', err)
    throw err
  }
}

/* ================================
   FETCH ALL NOTIFICATIONS
================================ */
export const fetchNotifications = async () => {
  const api = `${BASE_URL}/notifications`

  try {
    const response = await axios.get(api)
    return response.data
  } catch (error) {
    console.error('Error fetching notifications:', error)
    throw error
  }
}

/* ================================
   MARK A NOTIFICATION AS READ
================================ */
export const markNotificationAsRead = async (notificationId) => {
  const api = `${BASE_URL}/notifications/${notificationId}/read`

  try {
    const response = await axios.patch(api)
    return response.data
  } catch (error) {
    console.error(
      `Error marking notification ${notificationId} as read:`,
      error
    )
    throw error
  }
}

/* ================================
   MARK ALL AS READ
================================ */
export const markAllNotificationsAsRead = async (userId) => {
  const api = `${BASE_URL}/notifications/read-all/${userId}`

  try {
    const response = await axios.patch(api)
    return response.data
  } catch (error) {
    console.error(
      `Error marking all notifications as read for user ${userId}:`,
      error
    )
    throw error
  }
}

/* ================================
   DELETE NOTIFICATION
================================ */
export const deleteNotification = async (notificationId) => {
  const api = `${BASE_URL}/notifications/${notificationId}`

  try {
    const response = await axios.delete(api)
    return response.data
  } catch (error) {
    console.error(`Error deleting notification ${notificationId}:`, error)
    throw error
  }
}
