import { FiUserPlus } from 'react-icons/fi'

const friends = [
  {
    name: 'Nelly Schwartz',
    location: 'Melbourne',
    avatar: 'https://randomuser.me/api/portraits/women/68.jpg',
    color: 'bg-blue-100',
  },
  {
    name: 'Lana Henrikssen',
    location: 'Helsinki',
    avatar: 'https://randomuser.me/api/portraits/women/65.jpg',
    color: 'bg-green-100',
  },
  {
    name: 'Gaelle Morris',
    location: 'Lyon',
    avatar: 'https://randomuser.me/api/portraits/women/66.jpg',
    color: 'bg-purple-100',
  },
  {
    name: 'Mike Lasalle',
    location: 'Toronto',
    avatar: 'https://randomuser.me/api/portraits/men/68.jpg',
    color: 'bg-orange-100',
  },
  {
    name: 'Rolf Krupp',
    location: 'Berlin',
    avatar: 'https://randomuser.me/api/portraits/men/69.jpg',
    color: 'bg-pink-100',
  },
]

const SuggestedFriends = () => (
  <div className="bg-white rounded-2xl shadow p-4 w-full max-w-xs mx-auto mb-8">
    <div className="flex items-center justify-between mb-2">
      <span className="font-semibold text-base text-gray-700">Suggested Friends</span>
      <button className="btn btn-ghost btn-xs btn-circle text-lg text-gray-400"><span>⋮</span></button>
    </div>
    <ul className="divide-y divide-gray-100">
      {friends.map((f, i) => (
        <li key={f.name} className="flex items-center gap-3 py-3">
          <div className={`avatar ${f.color} rounded-full p-1`}>
            <div className="w-10 h-10 rounded-full overflow-hidden">
              <img src={f.avatar} alt={f.name} />
            </div>
          </div>
          <div className="flex-1 min-w-0">
            <div className="font-semibold text-gray-800 text-sm truncate">{f.name}</div>
            <div className="text-xs text-gray-400 truncate">{f.location}</div>
          </div>
          <button className="btn btn-ghost btn-circle text-xl text-gray-400 hover:text-primary">
            <FiUserPlus />
          </button>
        </li>
      ))}
    </ul>
  </div>
)

export default SuggestedFriends 