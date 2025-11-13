import { useEffect, useState } from 'react'
import { FiUserPlus } from 'react-icons/fi'
import { getSuggestedFriends, sendFriendRequest } from '../../api/friendsApi'
import { toast } from 'react-hot-toast'

const SuggestedFriends = () => {
  const [friends, setFriends] = useState([])
  const [loading, setLoading] = useState(false)
  const [currentFriendRequestHit, setCurrentFriendRequestHit] = useState(null)

  // ========== Fetch Suggested Friends ==========

  useEffect(() => {
    const fetchSuggestions = async () => {
      try {
        const response = await getSuggestedFriends()
        console.log(response, 'response on suggested friends')

        // Add a default status to each suggested user
        const listWithStatus = response.data.map((f) => ({
          ...f,
          status: 'Connect',
        }))

        setFriends(listWithStatus)
      } catch (error) {
        console.error('Error fetching suggestions:', error)
      }
    }

    fetchSuggestions()
  }, [])

  // ========== Handle Friend Request ==========
  const handleConnect = async (userId) => {
    try {
      setLoading(true)
      setCurrentFriendRequestHit(userId)

      const res = await sendFriendRequest(userId)

      if (res.success) {
        setFriends((prev) =>
          prev.map((person) =>
            person._id === userId ? { ...person, status: 'Pending' } : person
          )
        )

        toast.success('Friend request sent!')
      }
    } catch (error) {
      toast.error('Failed to send request')
    } finally {
      setLoading(false)
      setCurrentFriendRequestHit(null)
    }
  }

  // ========== UI ==========

  return (
    <div className="friendkit-suggested-friends w-full max-w-xs mx-auto mb-8">
      <div className="flex items-center justify-between mb-4">
        <span className="font-semibold text-lg text-slate-800">
          Suggested Friends
        </span>
        <button className="btn btn-ghost btn-xs btn-circle text-lg text-slate-500 hover:text-slate-700 transition-colors">
          <span>⋮</span>
        </button>
      </div>

      <ul className="divide-y divide-slate-100">
        {friends.length === 0 && (
          <p className="text-sm text-slate-500 py-4">
            No suggestions available
          </p>
        )}

        {friends.map((f) => (
          <li key={f._id} className="flex items-center gap-3 py-4">
            <div className="avatar bg-blue-100 rounded-full p-1">
              <div className="w-10 h-10 rounded-full overflow-hidden">
                <img src={f.image} alt={f.fullName} />
              </div>
            </div>

            <div className="flex-1 min-w-0">
              <div className="font-semibold text-slate-800 text-sm truncate">
                {f.fullName}
              </div>
              <div className="text-xs text-slate-500 truncate">
                {f.currentRole || 'Developer'}
              </div>
            </div>

            {/* Button depends on status */}
            <button
              className="btn btn-ghost btn-circle text-xl text-slate-500 hover:text-primary transition-colors"
              disabled={loading && currentFriendRequestHit === f._id}
              onClick={() => handleConnect(f._id)}
            >
              {loading && currentFriendRequestHit === f._id ? (
                <span className="loading loading-spinner text-primary"></span>
              ) : f.status === 'Pending' ? (
                <span className="text-sm text-primary">✓</span>
              ) : (
                <FiUserPlus />
              )}
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default SuggestedFriends
