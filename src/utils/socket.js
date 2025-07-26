import { io } from 'socket.io-client';

const getBackendUrl = () => {
  if (import.meta.env.MODE === 'development') {
    return 'http://localhost:3000';
  }
  return import.meta.env.VITE_API_BASE_URL || 'https://your-production-backend.com';
};

export const createSocket = (token) => {
  return io(getBackendUrl(), {
    auth: { token },
    withCredentials: true,
    transports: ['websocket'],
  });
}; 