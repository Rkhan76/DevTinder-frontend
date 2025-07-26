import React from "react";

export default function MessageItem({ message, isMe, sender }) {
  console.log(message, "message on message item component");
  return (
    <div className={`flex ${isMe ? "justify-end" : "justify-start"}`}>
      {!isMe && <img src={sender.avatar} alt={sender.name} className="w-8 h-8 rounded-full mr-2 self-end" />}
      <div className={`max-w-xs px-4 py-2 rounded-lg shadow ${isMe ? "bg-blue-500 text-white" : "bg-white text-gray-800"}`}>
        <div>{message}</div>
        <div className="text-xs text-right mt-1 opacity-60">{message.time}</div>
      </div>
      {isMe && <img src={sender.avatar} alt={sender.name} className="w-8 h-8 rounded-full ml-2 self-end" />}
    </div>
  );
} 