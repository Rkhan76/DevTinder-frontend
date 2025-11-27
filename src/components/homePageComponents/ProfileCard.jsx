import { CheckCircle } from 'lucide-react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

export default function ProfileCard() {
  const user = useSelector((state) => state.auth.user)

  if (!user) return null

  console.log(user, " user data")
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 mb-4">
      {/* Profile info */}
      <div className="flex gap-4 mb-4">
        <div className="relative">
          <img
            src={user.image || '/placeholder.svg'}
            alt={user.fullName}
            className="w-20 h-20 object-cover rounded-full border-4 border-blue-400"
          />

          <div className="absolute bottom-0 right-0 bg-blue-400 text-white text-xs rounded-full px-2 py-1">
            🏢
          </div>
        </div>

        <div className="flex-1">
          <div className="flex items-center gap-2">
            <Link to={`/profile/${user._id}`}>
              <h3 className="text-lg font-bold text-slate-900">
                {user.fullName}
              </h3>
            </Link>

            {true && <CheckCircle className="w-5 h-5 text-blue-600" />}
          </div>

          <p className="text-sm font-medium text-slate-600">
            {user.headline || 'No headline'}
          </p>

          <p className="text-xs text-slate-500 mt-1">
            {user.bio || 'No bio added'}
          </p>

          <p className="text-xs text-slate-400 mt-1">
            📍 {user.location || 'Location not set'}
          </p>
        </div>
      </div>

      {/* Skills */}
      {user.skills?.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-2">
          {user.skills.map((skill, idx) => (
            <span
              key={idx}
              className="px-2 py-1 bg-blue-50 text-blue-700 rounded-md text-xs font-medium"
            >
              {skill}
            </span>
          ))}
        </div>
      )}
    </div>
  )
}
