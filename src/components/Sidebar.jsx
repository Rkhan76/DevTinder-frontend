import React, { use } from "react";
import { getInitials, getAvatarColor } from "../utils/userAvtar";

export default function Sidebar({ users, onlineUsers, selectedUser, onSelectUser }) {
  return (
    <div className="w-16 bg-white flex flex-col items-center py-4 border-r">
      {users.map((user) => (
        <button
          key={user?._id}
          className={`relative mb-4 h-10 w-10 focus:outline-none ${
            selectedUser._id === user._id
              ? 'ring-2 ring-blue-400 rounded-full'
              : ''
          }`}
          onClick={() => onSelectUser(user)}
        >
          {user?.image ? (
            <img
              src={user.image}
              alt={user.fullName}
              className="w-10 h-10 rounded-full"
            />
          ) : (
            <div
              className={`h-full rounded-full ${getAvatarColor(
                user.fullName
              )} w-full flex items-center justify-center`}
            >
              <p>{getInitials(user.fullName)}</p>
            </div>
          )}

          {/* <img src={'https://media.istockphoto.com/id/1682296067/photo/happy-studio-portrait-or-professional-man-real-estate-agent-or-asian-businessman-smile-for.jpg?s=612x612&w=0&k=20&c=9zbG2-9fl741fbTWw5fNgcEEe4ll-JegrGlQQ6m54rg='} alt={user.name} className="w-10 h-10 rounded-full" /> */}
          <span
            className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-white ${
              onlineUsers.includes(user?._id)? 'bg-green-400' : 'bg-gray-700'
            }`}
          ></span>
        </button>
      ))}
    </div>
  )
} 