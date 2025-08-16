import { Users, UserPlus, Eye } from 'lucide-react'

export function NetworkStats() {
  return (
    <div className="card bg-base-100 shadow-xl hover:shadow-2xl transition-all duration-300">
      <div className="card-body p-0">
        <div className="bg-gradient-to-r from-primary to-secondary p-6 rounded-t-2xl">
          <h2 className="card-title text-base-100 flex items-center gap-2">
            <Users className="w-5 h-5" />
            Manage my network
          </h2>
        </div>

        <div className="p-6 space-y-2">
          <div className="flex items-center justify-between p-4 hover:bg-primary hover:bg-opacity-10 rounded-lg cursor-pointer transition-all duration-200 group">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-primary bg-opacity-20 rounded-lg group-hover:bg-opacity-30 transition-colors">
                <Users className="w-4 h-4 text-primary" />
              </div>
              <span className="text-sm font-medium">Connections</span>
            </div>
            <span className="badge badge-primary badge-lg font-bold">847</span>
          </div>

          <div className="flex items-center justify-between p-4 hover:bg-secondary hover:bg-opacity-10 rounded-lg cursor-pointer transition-all duration-200 group">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-secondary bg-opacity-20 rounded-lg group-hover:bg-opacity-30 transition-colors">
                <UserPlus className="w-4 h-4 text-secondary" />
              </div>
              <span className="text-sm font-medium">Following & followers</span>
            </div>
            <span className="badge badge-secondary badge-lg font-bold">
              1,234
            </span>
          </div>

          <div className="flex items-center justify-between p-4 hover:bg-accent hover:bg-opacity-10 rounded-lg cursor-pointer transition-all duration-200 group">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-accent bg-opacity-20 rounded-lg group-hover:bg-opacity-30 transition-colors">
                <Eye className="w-4 h-4 text-accent" />
              </div>
              <span className="text-sm font-medium">Profile views</span>
            </div>
            <span className="badge badge-accent badge-lg font-bold">89</span>
          </div>

          <div className="divider"></div>

          <div className="space-y-2">
            <div className="text-sm hover:text-primary cursor-pointer p-2 rounded-lg hover:bg-primary hover:bg-opacity-10 transition-all duration-200 flex items-center gap-3">
              <div className="w-2 h-2 bg-primary rounded-full"></div>
              Events
            </div>
            <div className="text-sm hover:text-secondary cursor-pointer p-2 rounded-lg hover:bg-secondary hover:bg-opacity-10 transition-all duration-200 flex items-center gap-3">
              <div className="w-2 h-2 bg-secondary rounded-full"></div>
              Pages
            </div>
            <div className="text-sm hover:text-accent cursor-pointer p-2 rounded-lg hover:bg-accent hover:bg-opacity-10 transition-all duration-200 flex items-center gap-3">
              <div className="w-2 h-2 bg-accent rounded-full"></div>
              Groups
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
