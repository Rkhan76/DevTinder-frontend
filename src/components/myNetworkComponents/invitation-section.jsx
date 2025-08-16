import { X } from 'lucide-react'

const invitations = [
  {
    id: 1,
    name: 'Sarah Johnson',
    title: 'Product Manager at Google',
    mutualConnections: 12,
    avatar: '/professional-woman-diverse.png',
  },
  {
    id: 2,
    name: 'Michael Chen',
    title: 'Software Engineer at Microsoft',
    mutualConnections: 8,
    avatar: '/professional-man.png',
  },
]

export function InvitationsSection() {
  return (
    <div className="card bg-base-100 shadow-md">
      {/* Header */}
      <div className="card-title flex flex-row items-center justify-between p-4">
        <h2 className="text-lg">Invitations</h2>
        <button className="btn btn-ghost btn-sm text-blue-600">See all</button>
      </div>

      {/* Content */}
      <div className="card-body space-y-4 pt-0">
        {invitations.map((invitation) => (
          <div
            key={invitation.id}
            className="flex items-center space-x-4 p-4 hover:bg-gray-50 rounded-lg"
          >
            {/* Avatar */}
            <div className="avatar">
              <div className="w-12 h-12 rounded-full">
                <img
                  src={invitation.avatar || '/placeholder.svg'}
                  alt={invitation.name}
                />
              </div>
            </div>

            {/* Details */}
            <div className="flex-1">
              <h3 className="font-semibold text-sm">{invitation.name}</h3>
              <p className="text-sm text-gray-600">{invitation.title}</p>
              <p className="text-xs text-gray-500">
                {invitation.mutualConnections} mutual connections
              </p>
            </div>

            {/* Actions */}
            <div className="flex items-center space-x-2">
              <button className="btn btn-sm bg-blue-600 hover:bg-blue-700 text-white">
                Accept
              </button>
              <button className="btn btn-outline btn-sm">
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
