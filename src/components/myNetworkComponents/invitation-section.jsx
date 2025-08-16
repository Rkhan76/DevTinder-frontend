import { X } from 'lucide-react'

const invitations = [
  {
    id: 1,
    name: 'Sarah Johnson',
    title: 'Product Manager at Google',
    mutualConnections: 12,
    avatar: 'https://i.pravatar.cc/150?u=SarahJohnson',
  },
  {
    id: 2,
    name: 'Michael Chen',
    title: 'Software Engineer at Microsoft',
    mutualConnections: 8,
    avatar: 'https://i.pravatar.cc/150?u=MichaelChen',
  },
]

export function InvitationsSection() {
  return (
    <div className="card bg-base-100 shadow-xl hover:shadow-2xl transition-all duration-300">
      <div className="card-body">
        <div className="flex flex-row items-center justify-between mb-4">
          <h2 className="card-title flex items-center gap-2">
            <div className="w-2 h-2 bg-gradient-to-r from-orange-500 to-red-500 rounded-full"></div>
            Invitations
          </h2>
          <button className="btn btn-ghost btn-sm text-primary hover:text-primary-focus">
            See all
          </button>
        </div>

        <div className="space-y-4">
          {invitations.map((invitation) => (
            <div
              key={invitation.id}
              className="flex items-center space-x-4 p-4 hover:bg-primary hover:bg-opacity-5 rounded-xl border border-base-300 hover:border-primary transition-all duration-300 group"
            >
              <div className="avatar">
                <div className="w-14 h-14 rounded-full ring ring-primary ring-opacity-20 ring-offset-base-100 ring-offset-2 group-hover:ring-opacity-40 transition-all duration-300">
                  <img
                    src={invitation.avatar || '/placeholder.svg'}
                    alt={invitation.name}
                  />
                </div>
              </div>

              <div className="flex-1">
                <h3 className="font-semibold text-sm mb-1">
                  {invitation.name}
                </h3>
                <p className="text-sm text-base-content text-opacity-70 mb-2">
                  {invitation.title}
                </p>
                <p className="text-xs text-base-content text-opacity-50 flex items-center gap-1">
                  <div className="w-1 h-1 bg-base-content bg-opacity-40 rounded-full"></div>
                  {invitation.mutualConnections} mutual connections
                </p>
              </div>

              <div className="flex items-center space-x-2">
                <button className="btn btn-primary btn-sm">Accept</button>
                <button className="btn btn-outline btn-sm hover:btn-error">
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
