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

// ✅ Create socket instance with JWT token
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

// ----------------- 🔹 Chat -----------------
export const joinChatRoom = (roomId) => {
  if (!socket) return
  socket.emit('join_chat', roomId)
}

export const subscribeToMessages = (callback) => {
  if (!socket) return
  socket.on('receive_message', (message) => {
    callback(message)
  })
}

// ----------------- 🔹 Comments -----------------
export const joinPostRoom = (postId) => {
  if (!socket) return
  socket.emit('join_post', postId)
}

export const subscribeToComments = (callback) => {
  if (!socket) return
  socket.on('receive_comment', (comment) => {
    callback(comment)
  })
}

// ----------------- 🔹 Notifications -----------------
export const subscribeToNotifications = (callback) => {
  if (!socket) return
  socket.on('receive_notification', (notification) => {
    callback(notification)
  })
}

// ----------------- 🔹 Cleanup -----------------
export const leavePostRoom = (postId) => {
  if (!socket) return
  socket.emit('leave_post', postId)
}

export const disconnectSocket = () => {
  if (socket) {
    socket.disconnect()
    socket = null
  }
}
