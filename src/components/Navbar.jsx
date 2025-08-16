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
import { MdPeopleOutline } from 'react-icons/md'



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
    <nav className="navbar bg-gradient-to-r from-base-100/95 to-base-200/95 backdrop-blur-md shadow-xl px-6 sticky top-0 z-50 border-b border-base-content/5">
      <div className="flex-1 flex items-center gap-6">
        <Link
          to="/"
          className="flex items-center gap-2 hover:opacity-90 transition-all"
        >
          <img
            src={logo}
            alt="logo"
            className="w-14 h-12 object-contain filter drop-shadow-[0_0_15px_rgba(var(--primary-rgb),0.3)] hover:scale-105 transition-transform"
          />
        </Link>
        <ul className="flex gap-3 ml-2">
          <li className="relative" ref={friendRequestsRef}>
            <button
              className="btn btn-circle btn-ghost text-2xl tooltip tooltip-bottom relative bg-base-200/50 hover:bg-primary/10 transition-all duration-300"
              data-tip="Notifications"
              onMouseEnter={() => setShowFriendRequests(true)}
              onClick={() => navigate('/notifications')}
            >
              <IoIosNotificationsOutline className="text-base-content/70 hover:text-primary transition-colors" />
              {friendRequests.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-primary text-primary-content text-xs rounded-full w-5 h-5 flex items-center justify-center animate-pulse shadow-lg">
                  {friendRequests.length}
                </span>
              )}
            </button>

            {/* Friend Requests Dropdown */}
            {showFriendRequests && (
              <div className="absolute top-full right-0 mt-3 w-80 bg-base-100 rounded-xl shadow-xl border border-base-content/10 z-50 backdrop-blur-sm">
                <div className="p-4 border-b border-base-content/10">
                  <h3 className="text-lg font-semibold">Friend Requests</h3>
                  <p className="text-sm opacity-75">
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
                        className="p-4 border-b border-base-content/5 hover:bg-base-200/50 transition-colors"
                      >
                        <div className="flex items-center gap-3">
                          {request.image ? (
                            <div className="relative group">
                              <img
                                src={request.image}
                                alt={request.fullName}
                                className="w-12 h-12 rounded-full object-cover ring-2 ring-primary/20 group-hover:ring-primary/40 transition-all"
                              />
                              <div className="absolute inset-0 rounded-full bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                            </div>
                          ) : (
                            <div
                              className={`w-12 h-12 rounded-full flex items-center justify-center text-white font-semibold ring-2 ring-primary/20 hover:ring-primary/40 transition-all ${getAvatarColor(
                                request.fullName
                              )}`}
                            >
                              {getInitials(request.fullName)}
                            </div>
                          )}{' '}
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
                              className="btn btn-sm bg-primary/20 hover:bg-primary/30 text-primary-content border-none shadow-lg hover:shadow-xl transition-all duration-300"
                            >
                              {loading ? (
                                <div className="loading loading-spinner loading-xs text-primary"></div>
                              ) : (
                                'Accept'
                              )}
                            </button>
                            <button
                              onClick={() =>
                                handleRejectFriendRequest(request._id)
                              }
                              disabled={loading}
                              className="btn btn-sm bg-error/10 hover:bg-error/20 text-error border-none shadow-lg hover:shadow-xl transition-all duration-300"
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
              className="btn btn-circle btn-ghost text-xl tooltip tooltip-bottom hover:bg-primary/20 transition-colors"
              data-tip="Likes"
            >
              <CiHeart className="hover:scale-110 transition-transform" />
            </button>
          </li>
          <li>
            <Link
              to={`/chat`}
              className="btn btn-circle btn-ghost text-xl tooltip tooltip-bottom hover:bg-primary/20 transition-colors"
              data-tip="Messages"
            >
              <FiMessageSquare className="hover:scale-110 transition-transform" />
            </Link>
          </li>
          <li>
            <Link
              to={`/mynetwork/grow`}
              className="btn btn-circle btn-ghost text-xl tooltip tooltip-bottom hover:bg-primary/20 transition-colors"
              data-tip="My Network"
            >
              <MdPeopleOutline className="hover:scale-110 transition-transform" />
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
              <div className="w-10 rounded-full ring-2 ring-primary/70 ring-offset-base-100 ring-offset-2 overflow-hidden hover:scale-105 transition-all duration-200 shadow-md">
                <img
                  alt="User avatar"
                  src={user?.image}
                  className="hover:scale-110 transition-transform duration-200"
                />
              </div>
            ) : (
              <div
                className={`flex items-center justify-center w-10 h-10 rounded-full ring-2 ring-primary/70 ring-offset-base-100 ring-offset-2 overflow-hidden hover:scale-105 transition-all duration-200 shadow-md ${getAvatarColor(
                  user?.fullName
                )}`}
              >
                <p className="flex items-center justify-center leading-none h-full font-semibold">
                  {getInitials(user?.fullName)}
                </p>
              </div>
            )}
          </div>

          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100/95 backdrop-blur-md rounded-xl z-10 mt-3 w-56 p-3 shadow-2xl border border-base-content/5"
            onClick={handleDropdownClick}
          >
            {/* Dark/Light Toggle */}
            <li className="mb-1">
              <button
                className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-primary/10 transition-all duration-300 font-medium group"
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
                className="px-3 py-2 rounded-lg justify-between font-semibold hover:bg-primary/10 transition-all duration-300 group"
              >
                Profile
                <span className="opacity-0 group-hover:opacity-100 transition-opacity">
                  👤
                </span>
              </Link>
            </li>
            <li>
              <a className="px-3 py-2 rounded-lg font-semibold hover:bg-primary/10 transition-all duration-300 group">
                Settings
                <span className="opacity-0 group-hover:opacity-100 transition-opacity">
                  ⚙️
                </span>
              </a>
            </li>
            <div className="divider my-1 opacity-50" />
            <li>
              <button
                onClick={handleLogout}
                className="px-3 py-2 rounded-lg text-error font-semibold hover:bg-error/10 transition-all duration-300 group"
              >
                Logout
                <span className="opacity-0 group-hover:opacity-100 transition-opacity">
                  🚪
                </span>
              </button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
