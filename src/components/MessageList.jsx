import React, { useEffect, useRef } from "react";
import MessageItem from "./MessageItem";

export default function MessageList({ messages, users, currentUser }) {
  const ref = useRef(null);
  useEffect(() => {
    ref.current?.scrollTo(0, ref.current.scrollHeight);
  }, [messages]);
  return (
    <div ref={ref} className="flex-1 overflow-y-auto px-6 py-4 space-y-4 bg-gray-100">
      {messages.map((msg) => (
        <MessageItem
          key={msg.id}
          message={msg}
          isMe={msg.senderId === currentUser.id}
          sender={users.find((u) => u.id === msg.senderId)}
        />
      ))}
    </div>
  );
} 