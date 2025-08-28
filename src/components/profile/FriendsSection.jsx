import { MessageCircle, UserMinus,UserPlus, MoreHorizontal } from 'lucide-react'

// Dummy friends data
const friends = [
  {
    id: 1,
    name: 'Sarah Johnson',
    username: '@sarahj',
    avatar: '/professional-woman-headshot.png',
    status: 'online',
    mutualFriends: 12,
    lastActive: '2 min ago',
  },
  {
    id: 2,
    name: 'Mike Chen',
    username: '@mikechen',
    avatar: '/casual-man-headshot.png',
    status: 'away',
    mutualFriends: 8,
    lastActive: '1 hour ago',
  },
  {
    id: 3,
    name: 'Emma Rodriguez',
    username: '@emmarodz',
    avatar: '/woman-friendly-headshot.png',
    status: 'online',
    mutualFriends: 15,
    lastActive: 'Just now',
  },
  {
    id: 4,
    name: 'Alex Thompson',
    username: '@alexthompson',
    avatar: '/professional-headshot.png',
    status: 'offline',
    mutualFriends: 6,
    lastActive: '3 days ago',
  },
  {
    id: 5,
    name: 'Lisa Park',
    username: '@lisapark',
    avatar: '/business-woman-headshot.png',
    status: 'online',
    mutualFriends: 20,
    lastActive: '5 min ago',
  },
  {
    id: 6,
    name: 'David Wilson',
    username: '@davidw',
    avatar: '/man-friendly-headshot.png',
    status: 'away',
    mutualFriends: 4,
    lastActive: '30 min ago',
  },
]

const getStatusColor = (status) => {
  switch (status) {
    case 'online':
      return 'bg-green-500'
    case 'away':
      return 'bg-yellow-500'
    case 'offline':
      return 'bg-gray-400'
    default:
      return 'bg-gray-400'
  }
}

const FriendsSection = () => {
  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="mb-8">
        <h2 className="text-3xl font-bold mb-2">Friends</h2>
        <p className="text-base-content/60">
          Stay connected with your network of {friends.length} friends
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {friends.map((friend) => (
          <div
            key={friend.id}
            className="card bg-base-100 shadow-md hover:shadow-lg transition-shadow"
          >
            <div className="card-body p-4">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <div className="avatar">
                      <div className="w-12 h-12 rounded-full">
                        <img
                          src={friend.avatar || '/placeholder.svg'}
                          alt={friend.name}
                        />
                      </div>
                    </div>
                    <div
                      className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-base-100 ${getStatusColor(
                        friend.status
                      )}`}
                      title={friend.status}
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold truncate">{friend.name}</h3>
                    <p className="text-sm text-base-content/60 truncate">
                      {friend.username}
                    </p>
                  </div>
                </div>
                <button className="btn btn-ghost btn-sm">
                  <MoreHorizontal className="h-4 w-4" />
                </button>
              </div>

              <div className="space-y-2 mb-4">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-base-content/60">Mutual friends</span>
                  <div className="badge badge-secondary">
                    {friend.mutualFriends}
                  </div>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-base-content/60">Last active</span>
                  <span>{friend.lastActive}</span>
                </div>
              </div>

              <div className="flex gap-2">
                <button className="btn btn-primary btn-sm flex-1">
                  <MessageCircle className="h-4 w-4 mr-2" />
                  Message
                </button>
                <button className="btn btn-outline btn-sm">
                  <UserMinus className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 text-center">
        <button className="btn btn-outline btn-lg">
          <UserPlus className="h-4 w-4 mr-2" />
          Find More Friends
        </button>
      </div>
    </div>
  )
}

export default FriendsSection
