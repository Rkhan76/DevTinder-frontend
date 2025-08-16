'use client'
import { getInitials, getAvatarColor } from '../../utils/userAvtar'

export default function Sidebar({
  users,
  onlineUsers,
  selectedUser,
  onSelectUser,
}) {
  return (
    <div className="w-20 bg-white flex flex-col items-center py-6 border-r border-gray-200 shadow-sm">
      {users.map((user) => (
        <button
          key={user?._id}
          className={`relative mb-6 h-12 w-12 focus:outline-none transition-all duration-200 hover:scale-110 ${
            selectedUser._id === user._id
              ? 'ring-3 ring-blue-500 ring-offset-2 rounded-full shadow-lg'
              : 'hover:ring-2 hover:ring-blue-200 hover:ring-offset-1 rounded-full'
          }`}
          onClick={() => onSelectUser(user)}
        >
          {user?.image ? (
            <img
              src={user.image || '/placeholder.svg'}
              alt={user.fullName}
              className="w-12 h-12 rounded-full object-cover shadow-md"
            />
          ) : (
            <div
              className={`h-full rounded-full ${getAvatarColor(
                user.fullName
              )} w-full flex items-center justify-center shadow-md`}
            >
              <p className="text-white font-bold text-sm">
                {getInitials(user.fullName)}
              </p>
            </div>
          )}

          <span
            className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-3 border-white shadow-sm ${
              onlineUsers.includes(user?._id) ? 'bg-green-500' : 'bg-gray-400'
            }`}
          ></span>
        </button>
      ))}
    </div>
  )
}
