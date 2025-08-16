import { FiUser, FiHeart, FiMessageCircle, FiShare2 } from 'react-icons/fi'

const NetworkActivity = () => {
  const activities = [
    {
      type: 'connection',
      user: 'Sarah Chen',
      action: 'connected with you',
      time: '2h ago',
      avatar: '/professional-woman.png',
      icon: <FiUser className="w-4 h-4" />,
    },
    {
      type: 'like',
      user: 'Mike Johnson',
      action: 'liked your post about React hooks',
      time: '4h ago',
      avatar: '/professional-man.png',
      icon: <FiHeart className="w-4 h-4" />,
    },
    {
      type: 'comment',
      user: 'Alex Rodriguez',
      action: 'commented on your project',
      time: '6h ago',
      avatar: '/developer-man.png',
      icon: <FiMessageCircle className="w-4 h-4" />,
    },
    {
      type: 'share',
      user: 'Emma Wilson',
      action: 'shared your article',
      time: '1d ago',
      avatar: '/tech-woman.png',
      icon: <FiShare2 className="w-4 h-4" />,
    },
  ]

  const getActivityColor = (type) => {
    switch (type) {
      case 'connection':
        return 'bg-blue-100 text-blue-600'
      case 'like':
        return 'bg-red-100 text-red-600'
      case 'comment':
        return 'bg-green-100 text-green-600'
      case 'share':
        return 'bg-purple-100 text-purple-600'
      default:
        return 'bg-slate-100 text-slate-600'
    }
  }

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
      <h3 className="text-lg font-semibold text-slate-900 mb-4">
        Recent Activity
      </h3>
      <div className="space-y-4">
        {activities.map((activity, index) => (
          <div
            key={index}
            className="flex items-start space-x-3 p-3 hover:bg-slate-50 rounded-xl transition-colors cursor-pointer"
          >
            <div className="relative">
              <img
                src={activity.avatar || '/placeholder.svg'}
                alt={activity.user}
                className="w-10 h-10 rounded-full object-cover"
              />
              <div
                className={`absolute -bottom-1 -right-1 p-1 rounded-full ${getActivityColor(
                  activity.type
                )}`}
              >
                {activity.icon}
              </div>
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-sm">
                <span className="font-medium text-slate-900">
                  {activity.user}
                </span>
                <span className="text-slate-600 ml-1">{activity.action}</span>
              </div>
              <div className="text-xs text-slate-500 mt-1">{activity.time}</div>
            </div>
          </div>
        ))}
      </div>
      <button className="w-full mt-4 text-sm text-blue-600 hover:text-blue-700 font-medium transition-colors">
        View all activity →
      </button>
    </div>
  )
}

export default NetworkActivity
