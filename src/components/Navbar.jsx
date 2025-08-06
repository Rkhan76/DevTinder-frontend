import { Link, useNavigate } from 'react-router-dom'
import { useRef, useState, useEffect } from 'react'
import { useTheme } from '../ThemeContext'
import { IoIosNotificationsOutline } from 'react-icons/io'
import { CiHeart } from 'react-icons/ci'
import { FiMessageSquare } from 'react-icons/fi'
import logo from '../assets/logo.png'
import toast from 'react-hot-toast'
import { userLogout } from '../api/authApi'
import {
  getFriendRequests,
  acceptFriendRequest,
  rejectFriendRequest,
} from '../api/userApi'
import { useSelector } from 'react-redux'
import { getAvatarColor, getInitials } from '../utils/userAvtar'
import { useDispatch } from 'react-redux'
import { logoutUser, setUser } from '../redux/slices/authSlice'
import { searchUsers } from '../api/authApi'
import { searchPosts } from '../api/postApi'
import SearchDropdown from './SearchDropdown'

const Navbar = () => {
  const navigate = useNavigate()
  const [isOpen, setIsOpen] = useState(false)
  const [friendRequests, setFriendRequests] = useState([])
  const [showFriendRequests, setShowFriendRequests] = useState(false)
  const [loading, setLoading] = useState(false)
  const dropdownRef = useRef(null)
  const friendRequestsRef = useRef(null)
  const { theme, toggleTheme } = useTheme()
  const user = useSelector((state) => state.auth.user)
  const dispatch = useDispatch()

  const handleLogout = async () => {
    try {
      const res = await userLogout()
      if (res.success) {
        dispatch(logoutUser())
        toast.success('Logged out successfully')
        navigate('/login')
      } else {
        toast.error(res.message || 'Logout failed')
      }
    } catch (error) {
      toast.error('Something went wrong during logout')
      console.error('Logout error:', error)
    }
  }

  const fetchFriendRequests = async () => {
    try {
      const response = await getFriendRequests()
      if (response.success) {
        setFriendRequests(response.receivedRequests || [])
      }
    } catch (error) {
      console.error('Error fetching friend requests:', error)
    }
  }

  const handleAcceptFriendRequest = async (userId) => {
    try {
      setLoading(true)
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
      setLoading(false)
    }
  }

  const handleRejectFriendRequest = async (userId) => {
    try {
      setLoading(true)
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
      setLoading(false)
    }
  }

  // Fetch friend requests on component mount
  useEffect(() => {
    if (user) {
      fetchFriendRequests()
    }
  }, [user])

  // Close friend requests dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        friendRequestsRef.current &&
        !friendRequestsRef.current.contains(event.target)
      ) {
        setShowFriendRequests(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  // Close dropdown when clicking any item inside
  const handleDropdownClick = () => {
    setIsOpen(false)
  }

  return (
    <nav className="navbar bg-base-300 shadow-sm px-4 sticky top-0 z-50">
      <div className="flex-1 flex items-center gap-4">
        <Link to="/" className="flex items-center gap-2 hover:opacity-90">
          <img
            src={logo}
            alt="logo"
            className="w-16 h-14 object-contain drop-shadow-md"
          />
        </Link>
        <ul className="flex gap-3 ml-2">
          <li className="relative" ref={friendRequestsRef}>
            <button
              className="btn btn-circle btn-ghost text-2xl tooltip tooltip-bottom relative"
              data-tip="Notifications"
              onMouseEnter={() => setShowFriendRequests(true)}
              onClick={() => navigate('/notifications')}
            >
              <IoIosNotificationsOutline />
              {friendRequests.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {friendRequests.length}
                </span>
              )}
            </button>

            {/* Friend Requests Dropdown */}
            {showFriendRequests && (
              <div className="absolute top-full right-0 mt-2 w-80 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
                <div className="p-4 border-b border-gray-200">
                  <h3 className="text-lg font-semibold text-gray-900">
                    Friend Requests
                  </h3>
                  <p className="text-sm text-gray-600">
                    {friendRequests.length} pending request
                    {friendRequests.length !== 1 ? 's' : ''}
                  </p>
                </div>

                <div className="max-h-64 overflow-y-auto">
                  {friendRequests.length === 0 ? (
                    <div className="p-4 text-center text-gray-500">
                      No pending friend requests
                    </div>
                  ) : (
                    friendRequests.map((request) => (
                      <div
                        key={request._id}
                        className="p-4 border-b border-gray-100 hover:bg-gray-50"
                      >
                        <div className="flex items-center gap-3">
                          {request.image ? (
                            <img
                              src={request.image}
                              alt={request.fullName}
                              className="w-12 h-12 rounded-full object-cover"
                            />
                          ) : (
                            <div
                              className={`w-12 h-12 rounded-full flex items-center justify-center text-white font-semibold ${getAvatarColor(
                                request.fullName
                              )}`}
                            >
                              {getInitials(request.fullName)}
                            </div>
                          )}

                          <div className="flex-1 min-w-0">
                            <h4 className="font-semibold text-gray-900 truncate">
                              {request.fullName}
                            </h4>
                            <p className="text-sm text-gray-600 truncate">
                              {request.email}
                            </p>
                          </div>

                          <div className="flex gap-2">
                            <button
                              onClick={() =>
                                handleAcceptFriendRequest(request._id)
                              }
                              disabled={loading}
                              className="btn btn-sm btn-primary"
                            >
                              {loading ? (
                                <div className="loading loading-spinner loading-xs"></div>
                              ) : (
                                'Accept'
                              )}
                            </button>
                            <button
                              onClick={() =>
                                handleRejectFriendRequest(request._id)
                              }
                              disabled={loading}
                              className="btn btn-sm btn-outline btn-error"
                            >
                              {loading ? (
                                <div className="loading loading-spinner loading-xs"></div>
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

                {friendRequests.length > 0 && (
                  <div className="p-3 border-t border-gray-200">
                    <button
                      onClick={() => {
                        setShowFriendRequests(false)
                        navigate('/notifications')
                      }}
                      className="w-full text-center text-blue-600 hover:text-blue-800 font-medium"
                    >
                      View all notifications
                    </button>
                  </div>
                )}
              </div>
            )}
          </li>
          <li>
            <button
              className="btn btn-circle btn-ghost text-2xl tooltip tooltip-bottom"
              data-tip="Likes"
            >
              <CiHeart />
            </button>
          </li>
          <li>
            <Link
              to={`/chat`}
              className="btn btn-circle btn-ghost text-2xl tooltip tooltip-bottom"
              data-tip="Messages"
            >
              <FiMessageSquare />
            </Link>
          </li>
        </ul>
      </div>
      <div className="flex items-center gap-3">
        <SearchDropdown navigate={navigate} />
        <div
          className={`dropdown dropdown-end mx-1 ${
            isOpen ? 'dropdown-open' : ''
          }`}
        >
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost btn-circle avatar focus:ring-2 focus:ring-primary"
            onClick={() => setIsOpen(!isOpen)}
            ref={dropdownRef}
          >
            {user?.image ? (
              <div className="w-10 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2 overflow-hidden">
                <img alt="User avatar" src={user?.image} />
              </div>
            ) : (
              <div
                className={`flex items-center justify-center w-10 h-10 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2 overflow-hidden ${getAvatarColor(
                  user?.fullName
                )}`}
              >
                <p className="flex items-center justify-center leading-none h-full">
                  {getInitials(user?.fullName)}
                </p>
              </div>
            )}
          </div>

          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-10 mt-3 w-56 p-2 shadow-lg"
            onClick={handleDropdownClick}
          >
            {/* Dark/Light Toggle */}
            <li className="mb-1">
              <button
                className="flex items-center gap-2 px-2 py-2 rounded hover:bg-base-200 transition-colors font-medium"
                onClick={(e) => {
                  e.stopPropagation()
                  toggleTheme()
                }}
              >
                {theme === 'dark' ? (
                  <>
                    <span className="text-lg">🌙</span>
                    <span>Dark Mode</span>
                  </>
                ) : (
                  <>
                    <span className="text-lg">☀️</span>
                    <span>Light Mode</span>
                  </>
                )}
              </button>
            </li>
            <div className="divider my-0" />
            <li>
              <Link
                to="/profile"
                className="justify-between font-semibold hover:bg-base-200"
              >
                Profile
              </Link>
            </li>
            <li>
              <a className="font-semibold hover:bg-base-200">Settings</a>
            </li>
            <div className="divider my-0" />
            <li>
              <button
                onClick={handleLogout}
                className="text-error font-semibold hover:bg-error hover:text-base-100 transition-colors"
              >
                Logout
              </button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
