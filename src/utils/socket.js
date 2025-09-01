import { io } from 'socket.io-client'

const getBackendUrl = () => {
  if (import.meta.env.MODE === 'development') {
    return 'http://localhost:3000'
  }
  return (
    import.meta.env.VITE_API_BASE_URL || 'https://your-production-backend.com'
  )
}

let socket = null

export const createSocket = (token) => {
  if (!socket) {
    socket = io(getBackendUrl(), {
      auth: { token },
      withCredentials: true,
      transports: ['websocket'],
    })
  }
  return socket
}

// Join a post-specific room for real-time comments
export const joinPostRoom = (postId) => {
  if (!socket) return
  socket.emit('join_post', postId)
}

// Listen for new comments on a post
export const subscribeToComments = (callback) => {
  if (!socket) return
  socket.on('receive_comment', (comment) => {
    callback(comment)
  })
}

// Listen for notifications for the logged-in user
export const subscribeToNotifications = (callback) => {
  if (!socket) return
  socket.on('receive_notification', (notification) => {
    callback(notification)
  })
}

// Disconnect socket (on logout)
export const disconnectSocket = () => {
  if (socket) {
    socket.disconnect()
    socket = null
  }
}
