import { FiUsers, FiTrendingUp, FiHeart } from 'react-icons/fi'

const QuickStats = () => {
  const stats = [
    {
      icon: <FiUsers className="w-5 h-5" />,
      label: 'Profile Views',
      value: '234',
      change: '+12%',
      changeType: 'positive',
    },
    {
      icon: <FiTrendingUp className="w-5 h-5" />,
      label: 'Post Impressions',
      value: '1.2k',
      change: '+8%',
      changeType: 'positive',
    },
    {
      icon: <FiHeart className="w-5 h-5" />,
      label: 'Connections',
      value: '456',
      change: '+3%',
      changeType: 'positive',
    },
  ]

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
      <h3 className="text-lg font-semibold text-slate-900 mb-4">
        Your Analytics
      </h3>
      <div className="space-y-4">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="flex items-center justify-between p-3 bg-slate-50 rounded-xl hover:bg-slate-100 transition-colors"
          >
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-blue-100 text-blue-600 rounded-lg">
                {stat.icon}
              </div>
              <div>
                <div className="text-sm font-medium text-slate-900">
                  {stat.value}
                </div>
                <div className="text-xs text-slate-500">{stat.label}</div>
              </div>
            </div>
            <div
              className={`text-xs font-medium px-2 py-1 rounded-full ${
                stat.changeType === 'positive'
                  ? 'bg-green-100 text-green-700'
                  : 'bg-red-100 text-red-700'
              }`}
            >
              {stat.change}
            </div>
          </div>
        ))}
      </div>
      <button className="w-full mt-4 text-sm text-blue-600 hover:text-blue-700 font-medium transition-colors">
        View detailed analytics →
      </button>
    </div>
  )
}

export default QuickStats
