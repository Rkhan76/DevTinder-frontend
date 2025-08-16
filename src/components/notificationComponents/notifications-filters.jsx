
export function NotificationFilters({ activeFilter, onFilterChange, notifications}) {
  const filters = [
    { id: "all", label: "All", emoji: "📋", count: notifications.length },
    { id: "unread", label: "Unread", emoji: "🔴", count: notifications.filter((n) => !n.read).length },
    {
      id: "connection",
      label: "Connections",
      emoji: "👥",
      count: notifications.filter((n) => n.type === "connection").length,
    },
    { id: "like", label: "Likes", emoji: "❤️", count: notifications.filter((n) => n.type === "like").length },
    { id: "comment", label: "Comments", emoji: "💬", count: notifications.filter((n) => n.type === "comment").length },
    { id: "job", label: "Jobs", emoji: "💼", count: notifications.filter((n) => n.type === "job").length },
    { id: "mention", label: "Mentions", emoji: "📢", count: notifications.filter((n) => n.type === "mention").length },
    {
      id: "invitation",
      label: "Invitations",
      emoji: "✉️",
      count: notifications.filter((n) => n.type === "invitation").length,
    },
  ]

  return (
    <div className="bg-white border border-gray-200 rounded-lg shadow-sm">
      <div className="p-6">
        <h3 className="font-semibold text-lg text-gray-900 mb-6">Filter notifications</h3>

        <div className="space-y-2">
          {filters.map((filter) => (
            <button
              key={filter.id}
              onClick={() => onFilterChange(filter.id)}
              className={`w-full flex items-center justify-between p-3 rounded-lg text-left transition-all duration-200 ${
                activeFilter === filter.id
                  ? "bg-blue-50 text-blue-900 border border-blue-200"
                  : "hover:bg-gray-50 border border-transparent"
              }`}
            >
              <div className="flex items-center gap-3">
                <span className="text-lg">{filter.emoji}</span>
                <span className="font-medium text-sm">{filter.label}</span>
              </div>
              <span
                className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                  activeFilter === filter.id ? "bg-blue-100 text-blue-800" : "bg-gray-100 text-gray-600"
                }`}
              >
                {filter.count}
              </span>
            </button>
          ))}
        </div>

        <div className="border-t border-gray-200 my-6"></div>

        <div className="space-y-3">
          <h4 className="font-medium text-sm text-gray-600">Quick Actions</h4>
          <button className="w-full flex items-center justify-center gap-2 px-4 py-2 border border-gray-300 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-50 transition-colors duration-200">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
              />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            Settings
          </button>
        </div>
      </div>
    </div>
  )
}
