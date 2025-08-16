import { useEffect, useState, useRef } from 'react'
import { useSelector } from 'react-redux'

import { fetchChatHistory } from '../api/chatApi'
import { createSocket } from '../utils/socket'
import { fetchAllUsers } from '../api/authApi'
import Sidebar from './chatPageComponents/Sidebar'
import ChatWindow from './chatPageComponents/ChatWindow'
import UserDetails from './chatPageComponents/UserDetails'

export default function ChatApp() {
  const currentUser = useSelector((state) => state.auth.user)
  const [users, setUsers] = useState([])
  const [selectedUser, setSelectedUser] = useState(null)
  const [messages, setMessages] = useState([])
  const [typing, setTyping] = useState(false)
  const [isOtherTyping, setIsOtherTyping] = useState(false)
  const socketRef = useRef(null)
  const typingTimeout = useRef(null)
  const [onlineUsers, setOnlineUsers] = useState([])

  // Fetch users on mount
  useEffect(() => {
    if (!currentUser) return
    fetchAllUsers().then((data) => {
      // Exclude current user from list
      const filtered = (data.users || []).filter(
        (u) => u.id !== currentUser._id
      )
      setUsers(filtered)
      setSelectedUser(filtered[0] || null)
    })
  }, [currentUser])

  // Connect socket and join room
  useEffect(() => {
    if (!currentUser) return
    socketRef.current = createSocket(currentUser.token)
    socketRef.current.emit('join', currentUser._id)

    // ✅ Listen for online users list
    socketRef.current.on('online_users', (userIds) => {
      setOnlineUsers(userIds)
    })

    socketRef.current.on('receive_message', (msg) => {
      setMessages((prev) => [...prev, msg])
    })
    socketRef.current.on('typing', ({ sender }) => {
      if (selectedUser && sender === selectedUser.id) setIsOtherTyping(true)
    })
    socketRef.current.on('stop_typing', ({ sender }) => {
      if (selectedUser && sender === selectedUser.id) setIsOtherTyping(false)
    })
    return () => {
      socketRef.current.disconnect()
    }
  }, [currentUser, selectedUser])

  // Fetch chat history when selected user changes
  useEffect(() => {
    if (!currentUser || !selectedUser) return
    fetchChatHistory(selectedUser._id).then((data) => {
      setMessages(data || [])
    })
  }, [selectedUser, currentUser])

  // Send message
  const handleSendMessage = (text) => {
    if (!text.trim() || !currentUser || !selectedUser) return

    const msg = {
      sender: currentUser._id,
      receiver: selectedUser._id,
      message: text,
    }

    socketRef.current.emit('send_message', msg)
    setMessages((prev) => [
      ...prev,
      {
        ...msg,
        time: new Date().toLocaleTimeString([], {
          hour: '2-digit',
          minute: '2-digit',
        }),
      },
    ])
    handleStopTyping()
  }

  // Typing indicator logic
  const handleTyping = () => {
    if (!typing) {
      setTyping(true)
      socketRef.current.emit('typing', {
        sender: currentUser._id,
        receiver: selectedUser._id,
      })
    }
    clearTimeout(typingTimeout.current)
    typingTimeout.current = setTimeout(() => {
      handleStopTyping()
    }, 1200)
  }
  const handleStopTyping = () => {
    if (typing) {
      setTyping(false)
      socketRef.current.emit('stop_typing', {
        sender: currentUser._id,
        receiver: selectedUser.id,
      })
    }
  }

  if (!selectedUser) {
    return (
      <div className="flex h-screen items-center justify-center w-full bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="text-center p-8 bg-white rounded-2xl shadow-lg max-w-md">
          <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg
              className="w-8 h-8 text-blue-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-3.582 8-8 8a8.955 8.955 0 01-2.697-.413l-3.178 1.589a1 1 0 01-1.414-1.414l1.589-3.178A8.955 8.955 0 013 12c0-4.418 3.582-8 8-8s8 3.582 8 8z"
              />
            </svg>
          </div>
          <h3 className="text-xl font-bold text-gray-900 mb-2">
            No Conversations Yet
          </h3>
          <p className="text-gray-500">
            Connect with other developers to start chatting!
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="flex h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <Sidebar
        users={users}
        onlineUsers={onlineUsers}
        selectedUser={selectedUser}
        onSelectUser={setSelectedUser}
      />
      <ChatWindow
        onlineUsers={onlineUsers}
        messages={messages}
        currentUser={currentUser}
        selectedUser={selectedUser}
        onSendMessage={handleSendMessage}
        users={users}
        onTyping={handleTyping}
        isOtherTyping={isOtherTyping}
      />
      <UserDetails user={selectedUser} />
    </div>
  )
}
