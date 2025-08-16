import { X } from 'lucide-react'

const suggestions = [
  {
    id: 1,
    name: 'Emily Rodriguez',
    title: 'UX Designer at Adobe',
    mutualConnections: 15,
    avatar: 'https://randomuser.me/api/portraits/women/45.jpg',
  },
  {
    id: 2,
    name: 'David Kim',
    title: 'Data Scientist at Netflix',
    mutualConnections: 23,
    avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
  },
  {
    id: 3,
    name: 'Lisa Thompson',
    title: 'Marketing Director at Spotify',
    mutualConnections: 7,
    avatar: 'https://randomuser.me/api/portraits/women/68.jpg',
  },
  {
    id: 4,
    name: 'James Wilson',
    title: 'DevOps Engineer at Amazon',
    mutualConnections: 19,
    avatar: 'https://randomuser.me/api/portraits/men/54.jpg',
  },
  {
    id: 5,
    name: 'Anna Martinez',
    title: 'Product Designer at Figma',
    mutualConnections: 11,
    avatar: 'https://randomuser.me/api/portraits/women/29.jpg',
  },
  {
    id: 6,
    name: 'Robert Taylor',
    title: 'Full Stack Developer at Stripe',
    mutualConnections: 6,
    avatar: 'https://randomuser.me/api/portraits/men/76.jpg',
  },
]


export function PeopleYouMayKnow() {
  return (
    <div className="card bg-base-100 shadow-xl border border-base-200 hover:shadow-2xl transition-all duration-300">
      <div className="card-body">
        <div className="flex flex-row items-center justify-between mb-4">
          <h2 className="card-title text-lg flex items-center gap-2">
            <div className="w-2 h-2 bg-gradient-to-r from-success to-info rounded-full"></div>
            People you may know
          </h2>
          <button className="btn btn-ghost btn-sm text-primary hover:text-primary-focus font-medium">
            See all
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {suggestions.map((person) => (
            <div
              key={person.id}
              className="card bg-gradient-to-br from-base-100 to-base-200/50 border border-base-300 hover:shadow-lg hover:border-primary/30 transition-all duration-300 group"
            >
              <div className="card-body p-5">
                <div className="flex justify-between items-start mb-4">
                  <div className="avatar">
                    <div className="w-16 h-16 rounded-full ring ring-primary/20 ring-offset-2 group-hover:ring-primary/40 transition-all duration-300">
                      <img
                        src={person.avatar || '/placeholder.svg'}
                        alt={person.name}
                      />
                    </div>
                  </div>
                  <button className="btn btn-ghost btn-sm text-base-content/40 hover:text-error hover:bg-error/10 transition-all duration-300">
                    <X className="w-4 h-4" />
                  </button>
                </div>

                <div className="mb-4">
                  <h3 className="font-semibold text-sm mb-2 text-base-content">
                    {person.name}
                  </h3>
                  <p className="text-sm text-base-content/70 mb-3 leading-relaxed">
                    {person.title}
                  </p>
                  <p className="text-xs text-base-content/50 flex items-center gap-1">
                    <div className="w-1 h-1 bg-base-content/40 rounded-full"></div>
                    {person.mutualConnections} mutual connections
                  </p>
                </div>

                <button className="btn btn-outline btn-primary btn-sm w-full font-medium transition-all duration-300 hover:btn-primary">
                  Connect
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
