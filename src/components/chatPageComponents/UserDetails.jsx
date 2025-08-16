import { getAvatarColor, getInitials } from '../../utils/userAvtar'

export default function UserDetails({ user }) {
  return (
    <div className="w-80 bg-white border-l border-gray-200 flex flex-col items-center py-8 px-6 shadow-sm">
      <button className="group mb-6 transition-transform duration-200 hover:scale-105">
        {user?.image ? (
          <img
            src={user.image || '/placeholder.svg'}
            alt={user.fullName}
            className="w-24 h-24 rounded-full mb-4 ring-4 ring-blue-50 group-hover:ring-blue-100 transition-all duration-200 object-cover"
          />
        ) : (
          <div
            className={`w-24 h-24 rounded-full ${getAvatarColor(
              user.fullName
            )} flex items-center justify-center ring-4 ring-blue-50 group-hover:ring-blue-100 transition-all duration-200 shadow-lg`}
          >
            <p className="text-white font-bold text-xl">
              {getInitials(user.fullName)}
            </p>
          </div>
        )}
      </button>
      <h2 className="text-2xl font-bold text-gray-900 mb-2">{user.name}</h2>
      <div className="text-blue-600 font-medium mb-6 px-3 py-1 bg-blue-50 rounded-full text-sm">
        {user.role}
      </div>
      <div className="flex space-x-3 mb-8">
        <span className="w-8 h-8 bg-gradient-to-r from-red-400 to-red-500 rounded-full shadow-md hover:shadow-lg transition-shadow duration-200 cursor-pointer"></span>
        <span className="w-8 h-8 bg-gradient-to-r from-green-400 to-green-500 rounded-full shadow-md hover:shadow-lg transition-shadow duration-200 cursor-pointer"></span>
        <span className="w-8 h-8 bg-gradient-to-r from-blue-400 to-blue-500 rounded-full shadow-md hover:shadow-lg transition-shadow duration-200 cursor-pointer"></span>
        <span className="w-8 h-8 bg-gradient-to-r from-indigo-400 to-indigo-500 rounded-full shadow-md hover:shadow-lg transition-shadow duration-200 cursor-pointer"></span>
      </div>
      <div className="w-full bg-gray-50 rounded-xl p-4">
        <h4 className="text-sm font-bold text-gray-600 mb-4 tracking-wide">
          ABOUT ME
        </h4>
        <div className="space-y-4">
          <div className="bg-white rounded-lg p-3 shadow-sm">
            <div className="text-xs text-gray-500 font-medium mb-1">
              Works at
            </div>
            <div className="text-sm font-semibold text-gray-900">
              WebSmash Inc.
            </div>
          </div>
          <div className="bg-white rounded-lg p-3 shadow-sm">
            <div className="text-xs text-gray-500 font-medium mb-1">
              Studied at
            </div>
            <div className="text-sm font-semibold text-gray-900">
              Riverdale University
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
