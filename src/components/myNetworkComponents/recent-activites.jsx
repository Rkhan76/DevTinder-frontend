const activities = [
  {
    id: 1,
    name: 'Alex Thompson',
    action: 'started following',
    target: 'TechCorp',
    time: '2h',
    avatar: 'https://randomuser.me/api/portraits/men/41.jpg',
  },
  {
    id: 2,
    name: 'Maria Garcia',
    action: 'liked a post by',
    target: 'John Doe',
    time: '4h',
    avatar: 'https://randomuser.me/api/portraits/women/52.jpg',
  },
  {
    id: 3,
    name: 'Kevin Park',
    action: 'commented on',
    target: 'Industry Trends',
    time: '6h',
    avatar: 'https://randomuser.me/api/portraits/men/33.jpg',
  },
]

export function RecentActivity() {
  return (
    <div className="card bg-base-100 shadow-xl border border-base-200 hover:shadow-2xl transition-all duration-300">
      <div className="card-body">
        <h2 className="card-title text-lg flex items-center gap-2 mb-4">
          <div className="w-2 h-2 bg-gradient-to-r from-primary to-secondary rounded-full"></div>
          Recent activity
        </h2>

        <div className="space-y-4">
          {activities.map((activity) => (
            <div
              key={activity.id}
              className="flex items-start space-x-4 p-3 rounded-lg hover:bg-gradient-to-r hover:from-primary/5 hover:to-secondary/5 transition-all duration-200"
            >
              <div className="relative">
                <div className="avatar">
                  <div className="w-10 h-10 rounded-full ring ring-primary/20 ring-offset-2">
                    <img
                      src={activity.avatar || '/placeholder.svg'}
                      alt={activity.name}
                    />
                  </div>
                </div>
                <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-success rounded-full border-2 border-base-100"></div>
              </div>

              <div className="flex-1 min-w-0">
                <p className="text-sm text-base-content leading-relaxed">
                  <span className="font-semibold text-base-content">
                    {activity.name}
                  </span>{' '}
                  <span className="text-base-content/70">
                    {activity.action}
                  </span>{' '}
                  <span className="font-semibold text-primary">
                    {activity.target}
                  </span>
                </p>
                <p className="text-xs text-base-content/50 mt-1 flex items-center gap-1">
                  <span className="w-1 h-1 bg-base-content/40 rounded-full"></span>
                  {activity.time} ago
                </p>
              </div>
            </div>
          ))}

          <div className="divider"></div>
          <button className="btn btn-ghost btn-sm text-primary hover:text-primary-focus transition-all duration-200 flex items-center gap-2">
            Show all activity
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  )
}
