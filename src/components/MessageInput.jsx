import React, { useState } from "react";

export default function MessageInput({ onSend, onTyping }) {
  const [text, setText] = useState("");
  const handleSend = () => {
    console.log(text, "text");
    if (text.trim()) {
      onSend(text);
      setText("");
    }
  };
  return (
    <div className="flex items-center px-6 py-4 bg-white border-t">
      <input
        type="text"
        className="flex-1 border rounded-full px-4 py-2 mr-2 focus:outline-none focus:ring"
        placeholder="Type your message..."
        value={text}
        onChange={(e) => {
          setText(e.target.value);
          if (onTyping) onTyping();
        }}
        onKeyDown={(e) => {
          if (e.key === "Enter") handleSend();
        }}
      />
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-600"
        onClick={handleSend}
      >
        Send
      </button>
    </div>
  );
} 