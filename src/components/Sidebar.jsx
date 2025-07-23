import React from "react";

export default function Sidebar({ users, selectedUser, onSelectUser }) {
  return (
    <div className="w-16 bg-white flex flex-col items-center py-4 border-r">
      {users.map((user) => (
        <button
          key={user.id}
          className={`relative mb-4 focus:outline-none ${selectedUser.id === user.id ? "ring-2 ring-blue-400 rounded-full" : ""}`}
          onClick={() => onSelectUser(user)}
        >
          <img src={user.avatar} alt={user.name} className="w-10 h-10 rounded-full" />
          <span className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-white ${user.online ? "bg-green-400" : "bg-gray-400"}`}></span>
        </button>
      ))}
    </div>
  );
} 