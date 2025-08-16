import { FiHash, FiTrendingUp } from 'react-icons/fi'

const TrendingTopics = () => {
  const topics = [
    { tag: 'ReactJS', posts: '2.3k posts', trending: true },
    { tag: 'NextJS', posts: '1.8k posts', trending: true },
    { tag: 'TypeScript', posts: '3.1k posts', trending: false },
    { tag: 'TailwindCSS', posts: '1.2k posts', trending: true },
    { tag: 'NodeJS', posts: '2.7k posts', trending: false },
    { tag: 'DevOps', posts: '890 posts', trending: true },
  ]

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-slate-900">
          Trending in Tech
        </h3>
        <FiTrendingUp className="w-5 h-5 text-green-500" />
      </div>
      <div className="space-y-3">
        {topics.map((topic, index) => (
          <div
            key={index}
            className="flex items-center justify-between p-3 hover:bg-slate-50 rounded-xl transition-colors cursor-pointer group"
          >
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-slate-100 group-hover:bg-blue-100 text-slate-600 group-hover:text-blue-600 rounded-lg transition-colors">
                <FiHash className="w-4 h-4" />
              </div>
              <div>
                <div className="text-sm font-medium text-slate-900 group-hover:text-blue-600 transition-colors">
                  #{topic.tag}
                </div>
                <div className="text-xs text-slate-500">{topic.posts}</div>
              </div>
            </div>
            {topic.trending && (
              <div className="flex items-center space-x-1">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-xs text-green-600 font-medium">Hot</span>
              </div>
            )}
          </div>
        ))}
      </div>
      <button className="w-full mt-4 text-sm text-blue-600 hover:text-blue-700 font-medium transition-colors">
        See all trending topics →
      </button>
    </div>
  )
}

export default TrendingTopics
