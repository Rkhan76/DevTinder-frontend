import MessageList from '../MessageList'
import MessageInput from '../MessageInput'
import { getAvatarColor, getInitials } from '../../utils/userAvtar'

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
    <div className="flex flex-col h-[91vh] flex-1 bg-white rounded-lg overflow-hidden shadow-lg">
      {/* Header */}
      <div className="flex-shrink-0 flex items-center gap-4 px-6 py-4 bg-gradient-to-r from-blue-50 to-indigo-50 border-b border-gray-200">
        <div className="relative">
          {selectedUser?.image ? (
            <img
              src={selectedUser?.image || '/placeholder.svg'}
              alt={selectedUser?.fullName}
              className="w-12 h-12 rounded-full object-cover ring-2 ring-white shadow-md"
            />
          ) : (
            <div
              className={`w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-sm shadow-md ring-2 ring-white ${getAvatarColor(
                selectedUser?.fullName
              )}`}
            >
              {getInitials(selectedUser?.fullName)}
            </div>
          )}
          <span
            className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-white shadow-sm ${
              onlineUsers.includes(selectedUser?._id)
                ? 'bg-green-500'
                : 'bg-gray-400'
            }`}
          ></span>
        </div>

        <div>
          <div className="font-bold text-gray-900 text-lg">
            {selectedUser?.fullName || 'Unknown User'}
          </div>
          <div
            className={`text-sm font-medium ${
              onlineUsers.includes(selectedUser?._id)
                ? 'text-green-600'
                : 'text-gray-500'
            }`}
          >
            {onlineUsers.includes(selectedUser?._id) ? 'Online' : 'Offline'}
          </div>
        </div>
      </div>

      {/* Message list */}
      <div className="flex-1 min-h-0 overflow-y-auto px-6 py-4 bg-gray-50">
        <MessageList
          messages={messages}
          users={users}
          currentUser={currentUser}
        />
        {isOtherTyping && (
          <div className="flex items-center gap-2 px-4 py-2 text-sm text-gray-600 bg-white rounded-full shadow-sm w-fit">
            <div className="flex space-x-1">
              <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"></div>
              <div
                className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"
                style={{ animationDelay: '0.1s' }}
              ></div>
              <div
                className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"
                style={{ animationDelay: '0.2s' }}
              ></div>
            </div>
            <span>{selectedUser?.name || 'User'} is typing...</span>
          </div>
        )}
      </div>

      {/* Message input */}
      <div className="flex-shrink-0 border-t border-gray-200 px-6 py-4 bg-white">
        <MessageInput onSend={onSendMessage} onTyping={onTyping} />
      </div>
    </div>
  )
}
