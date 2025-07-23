import React, { useState } from "react";
import Sidebar from "./Sidebar";
import ChatWindow from "./ChatWindow";
import UserDetails from "./UserDetails";

const users = [
  { id: 1, name: "Dan Walker", avatar: "/avatars/dan.png", online: true, role: "IOS Developer" },
  { id: 2, name: "Jenna", avatar: "/avatars/jenna.png", online: true, role: "Designer" },
  // ...more users
];

const initialMessages = [
  { id: 1, senderId: 1, text: "Hi Jenna! I made a new design, and I wanted to show it to you.", time: "8:03am" },
  { id: 2, senderId: 1, text: "It's quite clean and it's inspired from Bulkit.", time: "8:03am" },
  { id: 3, senderId: 1, text: "FYI it was done in less than a day.", time: "8:13am" },
  { id: 4, senderId: 2, text: "Oh really??! I want to see that.", time: "8:12am" },
  { id: 5, senderId: 2, text: "Great to hear it. Just send me the PSD files so I can have a look at it.", time: "8:17am" },
  { id: 6, senderId: 2, text: "And if you have a prototype, you can also send me the link to it.", time: "8:18am" },
];

export default function ChatApp() {
  const [selectedUser, setSelectedUser] = useState(users[0]);
  const [messages, setMessages] = useState(initialMessages);

  const handleSendMessage = (text) => {
    setMessages([
      ...messages,
      {
        id: messages.length + 1,
        senderId: 1, // Assume current user is Dan Walker (id: 1)
        text,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      },
    ]);
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar users={users} selectedUser={selectedUser} onSelectUser={setSelectedUser} />
      <ChatWindow
        messages={messages}
        currentUser={users[0]}
        selectedUser={selectedUser}
        onSendMessage={handleSendMessage}
        users={users}
      />
      <UserDetails user={selectedUser} />
    </div>
  );
} 