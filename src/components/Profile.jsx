import { useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import coverimage from '../assets/mountain-background.jpg'
import BasicInfo from './BasicInfo'
import ProfileButton from './ProfileButton'
import UserFeed from './UserFeed'
import { getAvatarColor, getInitials } from '../utils/userAvtar'
import {
  getUserById,
  sendFriendRequest,
  acceptFriendRequest,
  rejectFriendRequest,
  cancelFriendRequest,
} from '../api/userApi'
import { setUser } from '../redux/slices/authSlice'
import toast from 'react-hot-toast'

const Profile = () => {
  const { userId } = useParams()
  const currentUser = useSelector((state) => state.auth.user)
  const dispatch = useDispatch()
  const [userDetails, setUserDetails] = useState(null)
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState('timeline')
  const [friendStatus, setFriendStatus] = useState('none') // 'none', 'friends', 'sent', 'received'
  const [friendActionLoading, setFriendActionLoading] = useState(false)

  const handleSendFriendRequest = async () => {
    if (!userId || friendActionLoading) return

    try {
      setFriendActionLoading(true)
      const response = await sendFriendRequest(userId)

      if (response.success) {
        // Update current user data with sent request
        const updatedCurrentUser = {
          ...currentUser,
          sentFriendRequests: [
            ...(currentUser.sentFriendRequests || []),
            userDetails._id,
          ],
        }
        dispatch(setUser(updatedCurrentUser))
        setFriendStatus('sent')
        toast.success('Friend request sent!')
      }
    } catch (error) {
      console.error('Error sending friend request:', error)
      toast.error('Failed to send friend request')
    } finally {
      setFriendActionLoading(false)
    }
  }

  const handleAcceptFriendRequest = async () => {
    if (!userId || friendActionLoading) return

    try {
      setFriendActionLoading(true)
      const response = await acceptFriendRequest(userId)

      if (response.success) {
        // Update current user data
        const updatedCurrentUser = {
          ...currentUser,
          connections: [...(currentUser.connections || []), userDetails._id],
          receivedFriendRequests: (
            currentUser.receivedFriendRequests || []
          ).filter((id) => id !== userDetails._id),
        }
        dispatch(setUser(updatedCurrentUser))
        setFriendStatus('friends')
        toast.success('Friend request accepted!')
      }
    } catch (error) {
      console.error('Error accepting friend request:', error)
      toast.error('Failed to accept friend request')
    } finally {
      setFriendActionLoading(false)
    }
  }

  const handleRejectFriendRequest = async () => {
    if (!userId || friendActionLoading) return

    try {
      setFriendActionLoading(true)
      const response = await rejectFriendRequest(userId)

      if (response.success) {
        // Update current user data
        const updatedCurrentUser = {
          ...currentUser,
          receivedFriendRequests: (
            currentUser.receivedFriendRequests || []
          ).filter((id) => id !== userDetails._id),
        }
        dispatch(setUser(updatedCurrentUser))
        setFriendStatus('none')
        toast.success('Friend request rejected')
      }
    } catch (error) {
      console.error('Error rejecting friend request:', error)
      toast.error('Failed to reject friend request')
    } finally {
      setFriendActionLoading(false)
    }
  }

  const handleCancelFriendRequest = async () => {
    if (!userId || friendActionLoading) return

    try {
      setFriendActionLoading(true)
      const response = await cancelFriendRequest(userId)

      if (response.success) {
        // Update current user data
        const updatedCurrentUser = {
          ...currentUser,
          sentFriendRequests: (currentUser.sentFriendRequests || []).filter(
            (id) => id !== userDetails._id
          ),
        }
        dispatch(setUser(updatedCurrentUser))
        setFriendStatus('none')
        toast.success('Friend request cancelled')
      }
    } catch (error) {
      console.error('Error cancelling friend request:', error)
      toast.error('Failed to cancel friend request')
    } finally {
      setFriendActionLoading(false)
    }
  }

  const handleFriendAction = () => {
    switch (friendStatus) {
      case 'none':
        handleSendFriendRequest()
        break
      case 'received':
        handleAcceptFriendRequest()
        break
      case 'sent':
        handleCancelFriendRequest()
        break
      default:
        break
    }
  }

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        setLoading(true)

        if (userId) {
          // Fetching other user's profile
          const response = await getUserById(userId)
          setUserDetails(response.user)
        } else {
          // Using current user's data from Redux
          setUserDetails(currentUser)
        }
      } catch (error) {
        console.error('Error fetching user details:', error)
        // Fallback to current user data if API fails
        setUserDetails(
          currentUser || {
            _id: 'current-user',
            fullName: 'Current User',
            email: 'user@example.com',
            image: null,
            location: 'Location',
            profession: 'Professional',
            friendsCount: '1.2K',
          }
        )
      } finally {
        setLoading(false)
      }
    }

    fetchUserDetails()
  }, [userId, currentUser])

  // Check friend status between current user and profile user
  useEffect(() => {
    if (currentUser && userId && userDetails) {
      const isFriend = currentUser?.connections?.includes(userDetails._id)
      const hasSentRequest = currentUser?.sentFriendRequests?.includes(
        userDetails._id
      )
      const hasReceivedRequest = currentUser?.receivedFriendRequests?.includes(
        userDetails._id
      )

      if (isFriend) {
        setFriendStatus('friends')
      } else if (hasSentRequest) {
        setFriendStatus('sent')
      } else if (hasReceivedRequest) {
        setFriendStatus('received')
      } else {
        setFriendStatus('none')
      }
    }
  }, [currentUser, userDetails, userId])

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="loading loading-spinner loading-lg"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Cover Image Section */}
      <div className="max-w-4xl mx-auto px-4">
        <div className="relative h-80 bg-gradient-to-br from-blue-400 to-blue-600 rounded-lg overflow-hidden">
          <img
            src={coverimage}
            className="w-full h-full object-cover"
            alt="Cover"
          />

          {/* Edit Cover Button */}
          {currentUser?._id === userDetails?._id && (
            <button className="absolute top-4 left-4 bg-white/90 hover:bg-white text-gray-700 px-3 py-2 rounded-lg text-sm font-medium flex items-center gap-2 transition-colors">
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
              Edit cover image
            </button>
          )}
        </div>
      </div>

      {/* Profile Picture and User Info Section */}
      <div className="relative max-w-4xl mx-auto px-4">
        {/* Profile Picture - Overlapping Cover Image */}
        <div className="relative -mt-20 mb-4 flex justify-center">
          <div className="relative inline-block">
            {userDetails?.image ? (
              <img
                src={userDetails.image}
                alt={userDetails.fullName}
                className="w-32 h-32 rounded-full border-4 border-white shadow-lg object-cover"
              />
            ) : (
              <div
                className={`w-32 h-32 rounded-full border-4 border-white shadow-lg flex items-center justify-center text-white text-4xl font-bold ${getAvatarColor(
                  userDetails?.fullName
                )}`}
              >
                {getInitials(userDetails?.fullName)}
              </div>
            )}

            {/* Overlay Icons */}
            {currentUser?._id !== userDetails?._id && (
              <div className="absolute -bottom-0 -right-1 flex gap-1">
                {friendStatus === 'received' && (
                  <button
                    onClick={handleRejectFriendRequest}
                    disabled={friendActionLoading}
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-white shadow-lg transition-colors bg-red-500 hover:bg-red-600 ${
                      friendActionLoading ? 'opacity-50 cursor-not-allowed' : ''
                    }`}
                  >
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                )}
                <button
                  onClick={handleFriendAction}
                  disabled={friendActionLoading || friendStatus === 'friends'}
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-white shadow-lg transition-colors ${
                    friendStatus === 'friends'
                      ? 'bg-green-500 cursor-not-allowed'
                      : friendStatus === 'sent'
                      ? 'bg-yellow-500 hover:bg-yellow-600'
                      : friendStatus === 'received'
                      ? 'bg-blue-500 hover:bg-blue-600'
                      : 'bg-blue-500 hover:bg-blue-600'
                  } ${
                    friendActionLoading || friendStatus === 'friends'
                      ? 'opacity-50 cursor-not-allowed'
                      : ''
                  }`}
                >
                  {friendActionLoading ? (
                    <div className="loading loading-spinner loading-xs text-white"></div>
                  ) : friendStatus === 'friends' ? (
                    <svg
                      className="w-4 h-4"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                    </svg>
                  ) : friendStatus === 'sent' ? (
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  ) : friendStatus === 'received' ? (
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  ) : (
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                      />
                    </svg>
                  )}
                </button>
              </div>
            )}
          </div>
        </div>

        {/* User Information and Navigation Tabs - Same Row */}
        <div className="flex justify-between items-center mb-6">
          {/* Left side tabs */}
          <div className="flex gap-2">
            <button
              onClick={() => setActiveTab('timeline')}
              className={`px-6 py-3 rounded-lg font-medium transition-colors ${
                activeTab === 'timeline'
                  ? 'bg-blue-500 text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200'
              }`}
            >
              Timeline
            </button>
            <button
              onClick={() => setActiveTab('about')}
              className={`px-6 py-3 rounded-lg font-medium transition-colors ${
                activeTab === 'about'
                  ? 'bg-blue-500 text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200'
              }`}
            >
              About
            </button>
          </div>

          {/* Center - User Information */}
          <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-900 mb-1">
              {userDetails?.fullName || 'User Name'}
            </h1>
            <p className="text-lg text-gray-600 mb-2">
              {userDetails?.profession || 'Professional'}
            </p>

            {/* Friends Count */}
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-900">
                {userDetails?.friendsCount || '1.2K'}
              </div>
              <div className="text-sm text-gray-500 uppercase tracking-wide">
                Friends
              </div>
            </div>
          </div>

          {/* Right side tabs */}
          <div className="flex gap-2">
            <button
              onClick={() => setActiveTab('friends')}
              className={`px-6 py-3 rounded-lg font-medium transition-colors ${
                activeTab === 'friends'
                  ? 'bg-blue-500 text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200'
              }`}
            >
              Friends
            </button>
            <button
              onClick={() => setActiveTab('photos')}
              className={`px-6 py-3 rounded-lg font-medium transition-colors ${
                activeTab === 'photos'
                  ? 'bg-blue-500 text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200'
              }`}
            >
              Photos
            </button>
          </div>
        </div>

        {/* Content Area */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          {activeTab === 'timeline' && (
            <UserFeed userId={userId || currentUser?._id} />
          )}
          {activeTab === 'about' && (
            <div className="text-center py-12">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                About
              </h3>
              <p className="text-gray-600">
                About section content will go here
              </p>
            </div>
          )}
          {activeTab === 'friends' && (
            <div className="text-center py-12">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Friends
              </h3>
              <p className="text-gray-600">Friends list will go here</p>
            </div>
          )}
          {activeTab === 'photos' && (
            <div className="text-center py-12">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Photos
              </h3>
              <p className="text-gray-600">Photo gallery will go here</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Profile
