import axiosInstance from '../utils/axiosConfig';

// Fetch chat history with a user
export const fetchChatHistory = async (userId) => {
  const response = await axiosInstance.get(`/chat/${userId}`);
  return response.data;
};

// Optionally, send a message via REST (not required for real-time, but can be used for fallback)
export const sendMessage = async ({ sender, receiver, message }) => {
  const response = await axiosInstance.post('/chat/send', { sender, receiver, message });
  return response.data;
}; 