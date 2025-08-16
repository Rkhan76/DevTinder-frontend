
export function NotificationItem({ notification, onMarkAsRead, onDelete }) {
  const getNotificationIcon = () => {
    const iconClasses = "w-4 h-4"
    const containerClasses = "w-10 h-10 rounded-full flex items-center justify-center"

    switch (notification.type) {
      case "connection":
        return (
          <div className={`${containerClasses} bg-blue-100`}>
            <svg className={`${iconClasses} text-blue-600`} fill="currentColor" viewBox="0 0 20 20">
              <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3z" />
            </svg>
          </div>
        )
      case "like":
        return (
          <div className={`${containerClasses} bg-red-100`}>
            <svg className={`${iconClasses} text-red-600`} fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                clipRule="evenodd"
              />
            </svg>
          </div>
        )
      case "comment":
        return (
          <div className={`${containerClasses} bg-green-100`}>
            <svg className={`${iconClasses} text-green-600`} fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z"
                clipRule="evenodd"
              />
            </svg>
          </div>
        )
      case "job":
        return (
          <div className={`${containerClasses} bg-purple-100`}>
            <svg className={`${iconClasses} text-purple-600`} fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M6 6V5a3 3 0 013-3h2a3 3 0 013 3v1h2a2 2 0 012 2v3.57A22.952 22.952 0 0110 13a22.95 22.95 0 01-8-1.43V8a2 2 0 012-2h2zm2-1a1 1 0 011-1h2a1 1 0 011 1v1H8V5zm1 5a1 1 0 011-1h.01a1 1 0 110 2H10a1 1 0 01-1-1z"
                clipRule="evenodd"
              />
            </svg>
          </div>
        )
      case "mention":
        return (
          <div className={`${containerClasses} bg-yellow-100`}>
            <svg className={`${iconClasses} text-yellow-600`} fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M18 3a1 1 0 00-1.447-.894L8.763 6H5a3 3 0 000 6h.28l1.771 5.316A1 1 0 008 18h1a1 1 0 001-1v-4.382l6.553 3.276A1 1 0 0018 15V3z"
                clipRule="evenodd"
              />
            </svg>
          </div>
        )
      default:
        return (
          <div className={`${containerClasses} bg-gray-100`}>
            <svg className={`${iconClasses} text-gray-600`} fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                clipRule="evenodd"
              />
            </svg>
          </div>
        )
    }
  }

  return (
    <div
      className={`bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-all duration-200 ${
        !notification.read ? "border-l-4 border-l-blue-500" : ""
      }`}
    >
      <div className="p-4">
        <div className="flex items-start gap-4">
          {/* Avatar or Icon */}
          <div className="flex-shrink-0 relative">
            {notification.avatar ? (
              <div className="relative">
                <img
                  src={notification.avatar || "/placeholder.svg?height=48&width=48"}
                  alt="User avatar"
                  className="w-12 h-12 rounded-full object-cover border-2 border-gray-100"
                />
                <div className="absolute -bottom-1 -right-1">{getNotificationIcon(notification.type)}</div>
              </div>
            ) : (
              getNotificationIcon(notification.type)
            )}
          </div>

          {/* Content */}
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1">
                <h4
                  className={`text-sm leading-5 ${
                    !notification.read ? "font-semibold text-gray-900" : "font-medium text-gray-700"
                  }`}
                >
                  {notification.title}
                </h4>
                <p className="text-sm text-gray-600 mt-1 leading-5">{notification.description}</p>
                <p className="text-xs text-gray-500 mt-2 font-medium">{notification.time}</p>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-1">
                {!notification.read && (
                  <button
                    onClick={() => onMarkAsRead(notification.id)}
                    className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors duration-200"
                    title="Mark as read"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </button>
                )}

                <div className="relative group">
                  <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors duration-200">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zM12 13a1 1 0 110-2 1 1 0 010 2zM12 20a1 1 0 110-2 1 1 0 010 2z"
                      />
                    </svg>
                  </button>

                  <div className="absolute right-0 top-full mt-1 w-40 bg-white border border-gray-200 rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-10">
                    <div className="py-1">
                      {!notification.read && (
                        <button
                          onClick={() => onMarkAsRead(notification.id)}
                          className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 transition-colors duration-200"
                        >
                          Mark as read
                        </button>
                      )}
                      <button
                        onClick={() => onDelete(notification.id)}
                        className="w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-red-50 transition-colors duration-200"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons for specific notification types */}
            {notification.action === "connection_request" && (
              <div className="flex gap-3 mt-4">
                <button className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors duration-200">
                  Accept
                </button>
                <button className="px-4 py-2 border border-gray-300 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-50 transition-colors duration-200">
                  Ignore
                </button>
              </div>
            )}

            {notification.action === "job_match" && (
              <div className="flex gap-3 mt-4">
                <button className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors duration-200">
                  View Job
                </button>
                <button className="px-4 py-2 border border-gray-300 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-50 transition-colors duration-200">
                  Not Interested
                </button>
              </div>
            )}
          </div>

          {/* Unread indicator */}
          {!notification.read && <div className="w-2 h-2 bg-blue-500 rounded-full flex-shrink-0 mt-2"></div>}
        </div>
      </div>
    </div>
  )
}
