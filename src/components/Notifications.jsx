import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
  getFriendRequests,
  acceptFriendRequest,
  rejectFriendRequest,
} from '../api/userApi'
import { setUser } from '../redux/slices/authSlice'
import { getAvatarColor, getInitials } from '../utils/userAvtar'
import toast from 'react-hot-toast'

const Notifications = () => {
  const [friendRequests, setFriendRequests] = useState([])
  const [loading, setLoading] = useState(false)
  const [actionLoading, setActionLoading] = useState({})
  const user = useSelector((state) => state.auth.user)
  const dispatch = useDispatch()

  const fetchFriendRequests = async () => {
    try {
      setLoading(true)
      const response = await getFriendRequests()
      if (response.success) {
        setFriendRequests(response.receivedRequests || [])
      }
    } catch (error) {
      console.error('Error fetching friend requests:', error)
      toast.error('Failed to load friend requests')
    } finally {
      setLoading(false)
    }
  }

  const handleAcceptFriendRequest = async (userId) => {
    try {
      setActionLoading((prev) => ({ ...prev, [userId]: true }))
      const response = await acceptFriendRequest(userId)
      if (response.success) {
        // Update current user data
        const updatedCurrentUser = {
          ...user,
          connections: [...(user.connections || []), userId],
          receivedFriendRequests: (user.receivedFriendRequests || []).filter(
            (id) => id !== userId
          ),
        }
        dispatch(setUser(updatedCurrentUser))

        // Remove from local state
        setFriendRequests((prev) => prev.filter((req) => req._id !== userId))
        toast.success('Friend request accepted!')
      }
    } catch (error) {
      console.error('Error accepting friend request:', error)
      toast.error('Failed to accept friend request')
    } finally {
      setActionLoading((prev) => ({ ...prev, [userId]: false }))
    }
  }

  const handleRejectFriendRequest = async (userId) => {
    try {
      setActionLoading((prev) => ({ ...prev, [userId]: true }))
      const response = await rejectFriendRequest(userId)
      if (response.success) {
        // Update current user data
        const updatedCurrentUser = {
          ...user,
          receivedFriendRequests: (user.receivedFriendRequests || []).filter(
            (id) => id !== userId
          ),
        }
        dispatch(setUser(updatedCurrentUser))

        // Remove from local state
        setFriendRequests((prev) => prev.filter((req) => req._id !== userId))
        toast.success('Friend request rejected')
      }
    } catch (error) {
      console.error('Error rejecting friend request:', error)
      toast.error('Failed to reject friend request')
    } finally {
      setActionLoading((prev) => ({ ...prev, [userId]: false }))
    }
  }

  useEffect(() => {
    if (user) {
      fetchFriendRequests()
    }
  }, [user])

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex justify-center items-center">
        <div className="loading loading-spinner loading-lg"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Notifications
          </h1>
          <p className="text-gray-600">
            Stay updated with your latest friend requests and activities
          </p>
        </div>

        {/* Friend Requests Section */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900 mb-2">
              Friend Requests
            </h2>
            <p className="text-gray-600">
              {friendRequests.length} pending request
              {friendRequests.length !== 1 ? 's' : ''}
            </p>
          </div>

          <div className="divide-y divide-gray-200">
            {friendRequests.length === 0 ? (
              <div className="p-8 text-center">
                <div className="text-gray-400 mb-4">
                  <svg
                    className="w-16 h-16 mx-auto"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1}
                      d="M15 17h5l-5 5v-5zM4 19h6v-2H4v2zM4 15h6v-2H4v2zM4 11h6V9H4v2zM4 7h6V5H4v2z"
                    />
                  </svg>
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  No pending friend requests
                </h3>
                <p className="text-gray-500">
                  When someone sends you a friend request, it will appear here.
                </p>
              </div>
            ) : (
              friendRequests.map((request) => (
                <div
                  key={request._id}
                  className="p-6 hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-center gap-4">
                    {request.image ? (
                      <img
                        src={request.image}
                        alt={request.fullName}
                        className="w-16 h-16 rounded-full object-cover border-2 border-gray-200"
                      />
                    ) : (
                      <div
                        className={`w-16 h-16 rounded-full flex items-center justify-center text-white text-xl font-semibold border-2 border-gray-200 ${getAvatarColor(
                          request.fullName
                        )}`}
                      >
                        {getInitials(request.fullName)}
                      </div>
                    )}

                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-gray-900 mb-1">
                        {request.fullName}
                      </h3>
                      <p className="text-gray-600 mb-2">{request.email}</p>
                      <p className="text-sm text-gray-500">
                        Wants to connect with you
                      </p>
                    </div>

                    <div className="flex gap-3">
                      <button
                        onClick={() => handleAcceptFriendRequest(request._id)}
                        disabled={actionLoading[request._id]}
                        className="btn btn-primary"
                      >
                        {actionLoading[request._id] ? (
                          <div className="loading loading-spinner loading-sm"></div>
                        ) : (
                          'Accept'
                        )}
                      </button>
                      <button
                        onClick={() => handleRejectFriendRequest(request._id)}
                        disabled={actionLoading[request._id]}
                        className="btn btn-outline btn-error"
                      >
                        {actionLoading[request._id] ? (
                          <div className="loading loading-spinner loading-sm"></div>
                        ) : (
                          'Reject'
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Future: Other notification types can be added here */}
        <div className="mt-8 bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            Other Notifications
          </h2>
          <div className="text-center py-8">
            <div className="text-gray-400 mb-4">
              <svg
                className="w-12 h-12 mx-auto"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1}
                  d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <p className="text-gray-500">
              More notification types will be added soon!
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Notifications
