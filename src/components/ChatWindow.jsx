import React from 'react'
import MessageList from './MessageList'
import MessageInput from './MessageInput'
import { getAvatarColor, getInitials } from '../utils/userAvtar'

export default function ChatWindow({
  messages,
  currentUser,
  selectedUser,
  onSendMessage,
  users,
  onTyping,
  isOtherTyping,
  onlineUsers,
}) {


  return (
    <div className="flex flex-col flex-1 bg-gray-50 rounded-lg overflow-hidden shadow-sm">
      {/* Header */}
      <div className="flex items-center gap-3 px-4 py-3 bg-white border-b shadow-sm">
        {selectedUser?.image ? (
          <img
            src={selectedUser?.image}
            alt={selectedUser?.fullName}
            className="w-10 h-10 rounded-full object-cover"
          />
        ) : (
          <div
            className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-sm ${getAvatarColor(
              selectedUser?.fullName
            )}`}
          >
            {getInitials(selectedUser?.fullName)}
          </div>
        )}

        <div>
          <div className="font-semibold text-gray-800">
            {selectedUser?.fullName || 'Unknown User'}
          </div>
          <div className="text-xs text-gray-500">
            {onlineUsers.includes(selectedUser?._id) ? 'Online' : 'Offline'}
          </div>
        </div>
      </div>

      {/* Message list */}
      <div className="flex-1 overflow-y-auto px-4 py-2 bg-white">
        <MessageList
          messages={messages}
          users={users}
          currentUser={currentUser}
        />
        {isOtherTyping && (
          <div className="px-2 py-1 text-sm text-gray-500 animate-pulse">
            {selectedUser?.name || 'User'} is typing...
          </div>
        )}
      </div>

      {/* Message input */}
      <div className="border-t px-4 py-3 bg-white">
        <MessageInput onSend={onSendMessage} onTyping={onTyping} />
      </div>
    </div>
  )
}
