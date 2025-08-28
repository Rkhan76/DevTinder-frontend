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
import SearchDropdown from './SearchDropdown'
import { MdPeopleOutline } from 'react-icons/md'
import { fetchActivityCounts } from '../api/others'
import {
  setChatsCount,
  setNotificationsCount,
  setFriendRequestsCount,
} from '../redux/slices/activityCountsSlice'

const Navbar = () => {
  const navigate = useNavigate()
  const [isOpen, setIsOpen] = useState(false)
  const [friendRequests, setFriendRequests] = useState([])
  const [showFriendRequests, setShowFriendRequests] = useState(false)
  const [loading, setLoading] = useState(false)
  const dropdownRef = useRef(null)
   const [activityCounts, setActivityCounts] = useState({
     notifications: 0,
     chats: 0,
     friendRequests: 0,
   })
  const friendRequestsRef = useRef(null)
  const { theme, toggleTheme } = useTheme()
  const user = useSelector((state) => state.auth.user)
  const dispatch = useDispatch()
  const { notificationsCount, chatsCount, friendRequestsCount } = useSelector(
    (state) => state.activityCount
  )


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

   const loadActivityCounts = async () => {
     try {
       const response = await fetchActivityCounts()
       if (response.success) {
         dispatch(setNotificationsCount(response.counts.notifications || 0))
         dispatch(setChatsCount(response.counts.chats || 0))
         dispatch(setFriendRequestsCount(response.counts.friendRequests || 0))
       }
     } catch (error) {
       console.error('Error fetching activity counts:', error)
     }
   }
  useEffect(() => {
    if (user) {
      loadActivityCounts()
      // fetchFriendRequests()

      // ✅ Auto-refresh every 30s
      const interval = setInterval(loadActivityCounts, 30000)
      return () => clearInterval(interval)
    }
  }, [user])

  // Fetch friend requests on component mount
  // useEffect(() => {
  //   if (user) {
  //     fetchFriendRequests()
  //   }
  // }, [user])

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
    <nav className="bg-white/95 backdrop-blur-xl shadow-lg border-b border-gray-200/50 sticky top-0 z-50 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-8">
            <Link
              to="/"
              className="flex items-center space-x-3 group transition-all duration-300 hover:scale-105"
            >
              <div className="relative">
                <img
                  src={logo || '/placeholder.svg'}
                  alt="DevTinder"
                  className="w-10 h-10 object-contain transition-all duration-300 group-hover:drop-shadow-lg"
                />
                <div className="absolute inset-0 bg-blue-500/20 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent hidden sm:block">
                DevTinder
              </span>
            </Link>

            <div className="flex items-center space-x-2 sm:space-x-3">
              {/* 🔔 Notifications */}
              <div className="relative" ref={friendRequestsRef}>
                <button
                  className="relative p-3 rounded-xl bg-gray-50 hover:bg-blue-50 transition-all duration-300 group"
                  onClick={() => navigate('/notifications')}
                >
                  <IoIosNotificationsOutline className="w-5 h-5 text-gray-600 group-hover:text-blue-600 transition-colors" />
                  {notificationsCount > 0 && (
                    <span className="absolute -top-1 -right-1 bg-gradient-to-r from-red-500 to-pink-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-medium shadow-lg animate-pulse">
                      {notificationsCount}
                    </span>
                  )}
                </button>
              </div>

              {/* 💬 Chats */}
              <Link
                to="/chat"
                className="relative p-3 rounded-xl bg-gray-50 hover:bg-green-50 transition-all duration-300 group"
              >
                <FiMessageSquare className="w-5 h-5 text-gray-600 group-hover:text-green-600 transition-colors" />
                {chatsCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-gradient-to-r from-red-500 to-pink-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-medium shadow-lg animate-pulse">
                    {chatsCount}
                  </span>
                )}
              </Link>

              {/* 👥 Friend Requests */}
              <Link
                to="/mynetwork/grow"
                className="relative p-3 rounded-xl bg-gray-50 hover:bg-purple-50 transition-all duration-300 group"
              >
                <MdPeopleOutline className="w-5 h-5 text-gray-600 group-hover:text-purple-600 transition-colors" />
                {friendRequestsCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-gradient-to-r from-red-500 to-pink-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-medium shadow-lg animate-pulse">
                    {friendRequestsCount}
                  </span>
                )}
              </Link>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <div className='hidden sm:flex flex-1 max-w-lg mx-4'>
              <SearchDropdown navigate={navigate} />
              </div>
            

            <div className="relative">
              <button
                className="flex items-center space-x-3 p-2 rounded-xl hover:bg-gray-50 transition-all duration-300 group"
                onClick={() => setIsOpen(!isOpen)}
                ref={dropdownRef}
              >
                {user?.image ? (
                  <div className="relative">
                    <img
                      alt="User avatar"
                      src={user?.image || '/placeholder.svg'}
                      className="w-10 h-10 rounded-full object-cover ring-2 ring-blue-200 group-hover:ring-blue-300 transition-all"
                    />
                    <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-400 rounded-full border-2 border-white" />
                  </div>
                ) : (
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-semibold ring-2 ring-blue-200 group-hover:ring-blue-300 transition-all ${getAvatarColor(
                      user?.fullName
                    )}`}
                  >
                    {getInitials(user?.fullName)}
                  </div>
                )}
                <div className="hidden sm:block text-left">
                  <p className="text-sm font-semibold text-gray-900">
                    {user?.fullName}
                  </p>
                  <p className="text-xs text-gray-500">Developer</p>
                </div>
              </button>

              {isOpen && (
                <div className="absolute right-0 mt-2 w-64 bg-white rounded-2xl shadow-2xl border border-gray-200 z-50 overflow-hidden">
                  <div className="p-4 bg-gradient-to-r from-blue-50 to-purple-50 border-b border-gray-200">
                    <div className="flex items-center space-x-3">
                      {user?.image ? (
                        <img
                          src={user?.image}
                          alt={user?.fullName}
                          className="w-12 h-12 rounded-full object-cover"
                        />
                      ) : (
                        <div
                          className={`w-12 h-12 rounded-full flex items-center justify-center text-white font-semibold ${getAvatarColor(
                            user?.fullName
                          )}`}
                        >
                          {getInitials(user?.fullName)}
                        </div>
                      )}
                      <div>
                        <p className="font-semibold text-gray-900">
                          {user?.fullName}
                        </p>
                        <p className="text-sm text-gray-600">{user?.email}</p>
                      </div>
                    </div>
                  </div>

                  <div className="p-2" onClick={handleDropdownClick}>
                    <button
                      className="w-full flex items-center justify-between px-4 py-3 text-left hover:bg-gray-50 rounded-xl transition-colors group"
                      onClick={(e) => {
                        e.stopPropagation()
                        toggleTheme()
                      }}
                    >
                      <span className="flex items-center space-x-3">
                        <span className="text-lg">
                          {theme === 'dark' ? '🌙' : '☀️'}
                        </span>
                        <span className="font-medium text-gray-700">
                          {theme === 'dark' ? 'Dark Mode' : 'Light Mode'}
                        </span>
                      </span>
                    </button>

                    <div className="h-px bg-gray-200 my-2" />

                    <Link
                      to={`/profile/${user?._id}`}
                      className="w-full flex items-center justify-between px-4 py-3 text-left hover:bg-gray-50 rounded-xl transition-colors group"
                    >
                      <span className="font-medium text-gray-700">Profile</span>
                      <span className="text-gray-400 group-hover:text-gray-600">
                        👤
                      </span>
                    </Link>

                    <button className="w-full flex items-center justify-between px-4 py-3 text-left hover:bg-gray-50 rounded-xl transition-colors group">
                      <span className="font-medium text-gray-700">
                        Settings
                      </span>
                      <span className="text-gray-400 group-hover:text-gray-600">
                        ⚙️
                      </span>
                    </button>

                    <div className="h-px bg-gray-200 my-2" />

                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center justify-between px-4 py-3 text-left hover:bg-red-50 rounded-xl transition-colors group"
                    >
                      <span className="font-medium text-red-600">Logout</span>
                      <span className="text-red-400 group-hover:text-red-600">
                        🚪
                      </span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar

