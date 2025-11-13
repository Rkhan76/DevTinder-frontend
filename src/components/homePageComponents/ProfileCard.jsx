import { CheckCircle } from 'lucide-react'

export default function ProfileCard({
  name,
  title,
  description,
  location,
  skills,
  profileImage,
  verified = true,
}) {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 mb-4">
      
      {/* Profile info */}
      <div className="flex gap-4 mb-4">
        <div className="relative">
          <img
            src={profileImage || '/placeholder.svg'}
            alt={name}
            className="w-20 h-20 object-cover rounded-full border-4 border-blue-400"
          />

          <div className="absolute bottom-0 right-0 bg-blue-400 text-white text-xs rounded-full px-2 py-1">
            🏢
          </div>
        </div>

        <div className="flex-1">
          <div className="flex items-center gap-2">
            <h3 className="text-lg font-bold text-slate-900">{name}</h3>
            {verified && <CheckCircle className="w-5 h-5 text-blue-600" />}
          </div>

          <p className="text-sm font-medium text-slate-600">{title}</p>
          <p className="text-xs text-slate-500 mt-1">{description}</p>
          <p className="text-xs text-slate-400 mt-1">📍 {location}</p>
        </div>
      </div>
    </div>
  )
}
