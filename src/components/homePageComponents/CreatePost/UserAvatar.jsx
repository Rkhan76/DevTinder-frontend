import { getAvatarColor, getInitials } from '../../../utils/userAvtar'

const UserAvatar = ({ user, size = 'md' }) => {
  const sizeClasses = {
    sm: 'w-10 h-10 text-xs',
    md: 'w-12 h-12 text-sm',
    lg: 'w-14 h-14 text-base',
  }

  const ringClasses = {
    sm: 'ring-2 ring-blue-100',
    md: 'ring-2 ring-blue-100',
    lg: 'ring-3 ring-white',
  }

  return (
    <div className="relative">
      {user?.image ? (
        <div
          className={`${sizeClasses[size]} rounded-full overflow-hidden ${ringClasses[size]} hover:ring-blue-200 transition-all duration-200`}
        >
          <img
            alt="User avatar"
            src={user.image}
            className="w-full h-full object-cover"
          />
        </div>
      ) : (
        <div
          className={`flex items-center justify-center rounded-full ${
            sizeClasses[size]
          } ${
            ringClasses[size]
          } hover:ring-blue-200 transition-all duration-200 ${getAvatarColor(
            user?.fullName
          )}`}
        >
          <span className="text-white font-semibold">
            {getInitials(user?.fullName)}
          </span>
        </div>
      )}
    </div>
  )
}

export default UserAvatar
