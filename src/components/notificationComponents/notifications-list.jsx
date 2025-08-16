import { NotificationItem } from "./notifications-item"


export function NotificationList({ notifications, onMarkAsRead, onDelete }) {
  if (notifications.length === 0) {
    return (
      <div className="bg-white border border-gray-200 rounded-lg shadow-sm">
        <div className="text-center py-16 px-6">
          <div className="w-16 h-16 mx-auto mb-6 bg-gray-100 rounded-full flex items-center justify-center">
            <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 17h5l-5 5v-5zM9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">No notifications</h3>
          <p className="text-gray-600 max-w-sm mx-auto">
            You're all caught up! Check back later for new notifications.
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {notifications.map((notification) => (
        <NotificationItem
          key={notification.id}
          notification={notification}
          onMarkAsRead={onMarkAsRead}
          onDelete={onDelete}
        />
      ))}
    </div>
  )
}
