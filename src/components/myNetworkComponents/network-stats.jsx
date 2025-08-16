import { Users, UserPlus, Eye } from 'lucide-react'

export function NetworkStats() {
  return (
    <div className="card bg-base-100 shadow-md">
      {/* Header */}
      <div className="card-title p-4 text-lg">Manage my network</div>

      {/* Content */}
      <div className="card-body space-y-4 pt-0">
        {/* Connections */}
        <div className="flex items-center justify-between py-2 hover:bg-gray-50 rounded px-2 cursor-pointer">
          <div className="flex items-center space-x-3">
            <Users className="w-4 h-4 text-gray-600" />
            <span className="text-sm">Connections</span>
          </div>
          <span className="text-sm font-semibold text-gray-600">847</span>
        </div>

        {/* Following & followers */}
        <div className="flex items-center justify-between py-2 hover:bg-gray-50 rounded px-2 cursor-pointer">
          <div className="flex items-center space-x-3">
            <UserPlus className="w-4 h-4 text-gray-600" />
            <span className="text-sm">Following & followers</span>
          </div>
          <span className="text-sm font-semibold text-gray-600">1,234</span>
        </div>

        {/* Profile views */}
        <div className="flex items-center justify-between py-2 hover:bg-gray-50 rounded px-2 cursor-pointer">
          <div className="flex items-center space-x-3">
            <Eye className="w-4 h-4 text-gray-600" />
            <span className="text-sm">Profile views</span>
          </div>
          <span className="text-sm font-semibold text-gray-600">89</span>
        </div>

        {/* Divider */}
        <hr className="my-4" />

        {/* Links */}
        <div className="text-sm text-gray-600 hover:text-blue-600 cursor-pointer">
          Events
        </div>
        <div className="text-sm text-gray-600 hover:text-blue-600 cursor-pointer">
          Pages
        </div>
        <div className="text-sm text-gray-600 hover:text-blue-600 cursor-pointer">
          Groups
        </div>
      </div>
    </div>
  )
}
