import axiosInstance from '../utils/axiosConfig'

/* ============================
   CHAT API
============================ */

// Fetch chat history with a user
export const fetchChatHistory = async (userId) => {
  const response = await axiosInstance.get(`/chats/${userId}`) // UPDATED
  return response.data
}

// Send a message (REST fallback)
export const sendMessage = async ({ sender, receiver, message }) => {
  const response = await axiosInstance.post('/chats/send', {
    // UPDATED
    sender,
    receiver,
    message,
  })
  return response.data
}
