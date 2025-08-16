const activities = [
  {
    id: 1,
    name: 'Alex Thompson',
    action: 'started following',
    target: 'TechCorp',
    time: '2h',
    avatar: '/professional-person.png',
  },
  {
    id: 2,
    name: 'Maria Garcia',
    action: 'liked a post by',
    target: 'John Doe',
    time: '4h',
    avatar: '/professional-woman-diverse.png',
  },
  {
    id: 3,
    name: 'Kevin Park',
    action: 'commented on',
    target: 'Industry Trends',
    time: '6h',
    avatar: '/professional-man.png',
  },
]

export function RecentActivity() {
  return (
    <div className="card bg-base-100 shadow-md">
      {/* Header */}
      <div className="card-title p-4 text-lg">Recent activity</div>

      {/* Content */}
      <div className="card-body space-y-4 pt-0">
        {activities.map((activity) => (
          <div key={activity.id} className="flex items-start space-x-3">
            {/* Avatar */}
            <div className="avatar">
              <div className="w-8 h-8 rounded-full">
                <img
                  src={activity.avatar || '/placeholder.svg'}
                  alt={activity.name}
                />
              </div>
            </div>

            {/* Details */}
            <div className="flex-1">
              <p className="text-sm">
                <span className="font-semibold">{activity.name}</span>{' '}
                {activity.action}{' '}
                <span className="font-semibold">{activity.target}</span>
              </p>
              <p className="text-xs text-gray-500">{activity.time}</p>
            </div>
          </div>
        ))}

        {/* Footer link */}
        <div className="pt-4 border-t">
          <p className="text-sm text-blue-600 hover:underline cursor-pointer">
            Show all activity
          </p>
        </div>
      </div>
    </div>
  )
}
