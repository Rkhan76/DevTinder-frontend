import React, { useEffect, useState, useRef } from "react";
import { useSelector } from 'react-redux';
import Sidebar from "./Sidebar";
import ChatWindow from "./ChatWindow";
import UserDetails from "./UserDetails";
import { fetchChatHistory } from '../api/chatApi';
import { createSocket } from '../utils/socket';
import { fetchAllUsers } from '../api/authApi';


export default function ChatApp() {
  const currentUser = useSelector((state) => state.auth.user);
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [messages, setMessages] = useState([]);
  const [typing, setTyping] = useState(false);
  const [isOtherTyping, setIsOtherTyping] = useState(false);
  const socketRef = useRef(null);
  const typingTimeout = useRef(null);
    const [onlineUsers, setOnlineUsers] = useState([])

  // Fetch users on mount
  useEffect(() => {
    if (!currentUser) return;
    fetchAllUsers().then((data) => {
      // Exclude current user from list
      const filtered = (data.users || []).filter(u => u.id !== currentUser._id);
      setUsers(filtered);
      setSelectedUser(filtered[0] || null);
    });
  }, [currentUser]);

  // Connect socket and join room
  useEffect(() => {
    if (!currentUser) return
    socketRef.current = createSocket(currentUser.token)
    socketRef.current.emit('join', currentUser._id)

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
  }, [currentUser, selectedUser]);

  // Fetch chat history when selected user changes
  useEffect(() => {
    if (!currentUser || !selectedUser) return;
    fetchChatHistory(selectedUser._id).then((data) => {
      
      setMessages(data || []);
    });
  }, [selectedUser, currentUser]);

  // Send message
  const handleSendMessage = (text) => {
    if (!text.trim() || !currentUser || !selectedUser) return;

    const msg = {
      sender: currentUser._id,
      receiver: selectedUser._id,
      message: text,
    };

    socketRef.current.emit('send_message', msg);
    setMessages((prev) => [...prev, { ...msg, time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }]);
    handleStopTyping();
  };

  // Typing indicator logic
  const handleTyping = () => {
    if (!typing) {
      setTyping(true);
      socketRef.current.emit('typing', { sender: currentUser._id, receiver: selectedUser._id });
    }
    clearTimeout(typingTimeout.current);
    typingTimeout.current = setTimeout(() => {
      handleStopTyping();
    }, 1200);
  };
  const handleStopTyping = () => {
    if (typing) {
      setTyping(false);
      socketRef.current.emit('stop_typing', { sender: currentUser._id, receiver: selectedUser.id });
    }
  };

  if (!selectedUser) {
    return <div className="flex h-screen items-center justify-center w-full text-xl text-gray-500">No other users found to chat with.</div>;
  }

  return (
    <div className="flex h-screen bg-gray-100">
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