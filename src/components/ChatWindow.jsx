import React from "react";
import MessageList from "./MessageList";
import MessageInput from "./MessageInput";

export default function ChatWindow({ messages, currentUser, selectedUser, onSendMessage, users }) {
  return (
    <div className="flex flex-col flex-1">
      <div className="flex items-center px-6 py-4 bg-white border-b">
        <img src={selectedUser.avatar} alt={selectedUser.name} className="w-10 h-10 rounded-full mr-3" />
        <div>
          <div className="font-semibold">{selectedUser.name}</div>
          <div className="text-xs text-gray-500">{selectedUser.online ? "Online" : "Offline"}</div>
        </div>
      </div>
      <MessageList messages={messages} users={users} currentUser={currentUser} />
      <MessageInput onSend={onSendMessage} />
    </div>
  );
} 