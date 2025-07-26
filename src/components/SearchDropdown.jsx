import React, { useState, useRef, useEffect } from 'react'
import { searchUsers } from '../api/authApi'
import { getAvatarColor, getInitials } from '../utils/userAvtar'

const SearchDropdown = ({ navigate }) => {
  const [searchTerm, setSearchTerm] = useState('')
  const [userResults, setUserResults] = useState([])
  const [showDropdown, setShowDropdown] = useState(false)
  const [loading, setLoading] = useState(false)
  const searchTimeout = useRef()
  const dropdownRef = useRef()

  // Debounced search for users
  useEffect(() => {
    if (!searchTerm.trim()) {
      setUserResults([])
      setShowDropdown(false)
      return
    }

    setShowDropdown(true)
    if (searchTimeout.current) clearTimeout(searchTimeout.current)

    searchTimeout.current = setTimeout(async () => {
      try {
        setLoading(true)
        const response = await searchUsers(searchTerm)
        setUserResults(response?.users || [])
      } catch (error) {
        console.error('User search error:', error)
        setUserResults([])
      } finally {
        setLoading(false)
      }
    }, 300)

    return () => clearTimeout(searchTimeout.current)
  }, [searchTerm])

  // Hide dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleSearch = (e) => {
    e.preventDefault()
    if (searchTerm.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchTerm.trim())}`)
      setShowDropdown(false)
    }
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch(e)
    }
  }

  const handleUserClick = (user) => {
    navigate(`/search?q=${encodeURIComponent(user.fullName)}`)
    setShowDropdown(false)
    setSearchTerm(user.fullName)
  }

  return (
    <div className="relative" ref={dropdownRef}>
      <input
        type="text"
        placeholder="Search for users or posts..."
        className="input input-bordered w-32 md:w-56 rounded-full shadow-sm focus:outline-none focus:ring-2 focus:ring-primary"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        onKeyDown={handleKeyPress}
        onFocus={() => searchTerm.trim() && setShowDropdown(true)}
      />

      {/* User Dropdown */}
      {showDropdown && searchTerm.trim() && (
        <div className="absolute left-1/2 transform -translate-x-1/2 mt-2 w-80 bg-base-100 rounded-lg shadow-lg z-50 border border-base-200">
          <div className="p-2">
            {loading ? (
              <div className="flex items-center justify-center py-4">
                <div className="loading loading-spinner loading-sm"></div>
                <span className="ml-2 text-sm text-gray-500">Searching...</span>
              </div>
            ) : userResults.length > 0 ? (
              <div>
                <div className="font-semibold text-xs text-gray-400 mb-2 px-2">
                  Users
                </div>
                <ul className="space-y-1">
                  {userResults.slice(0, 5).map((user) => (
                    <li
                      key={user._id}
                      className="flex items-center gap-3 p-2 hover:bg-base-200 rounded cursor-pointer transition-colors"
                      onClick={() => handleUserClick(user)}
                    >
                      {user.image ? (
                        <img
                          src={user.image}
                          alt={user.fullName}
                          className="w-8 h-8 rounded-full"
                        />
                      ) : (
                        <div
                          className={`w-8 h-8 rounded-full flex items-center justify-center ${getAvatarColor(
                            user.fullName
                          )} text-white text-xs font-semibold`}
                        >
                          {getInitials(user.fullName)}
                        </div>
                      )}
                      <div className="flex-1 min-w-0">
                        <div className="font-medium text-gray-900 truncate">
                          {user.fullName}
                        </div>
                        {user.email && (
                          <div className="text-xs text-gray-500 truncate">
                            {user.email}
                          </div>
                        )}
                      </div>
                    </li>
                  ))}
                </ul>

                {/* Show all users button */}
                {userResults.length > 5 && (
                  <div className="mt-2 pt-2 border-t border-base-200">
                    <button
                      className="w-full text-center text-sm text-blue-600 hover:text-blue-800 py-1"
                      onClick={() => {
                        navigate(
                          `/search?q=${encodeURIComponent(searchTerm.trim())}`
                        )
                        setShowDropdown(false)
                      }}
                    >
                      See all {userResults.length} users
                    </button>
                  </div>
                )}

                {/* Search for posts option */}
                <div className="mt-2 pt-2 border-t border-base-200">
                  <button
                    className="w-full text-left text-sm text-gray-600 hover:text-gray-800 py-1 px-2"
                    onClick={() => {
                      navigate(
                        `/search?q=${encodeURIComponent(searchTerm.trim())}`
                      )
                      setShowDropdown(false)
                    }}
                  >
                    🔍 Search for "{searchTerm}" in posts and users
                  </button>
                </div>
              </div>
            ) : (
              <div className="text-center py-4">
                <div className="text-sm text-gray-500 mb-2">No users found</div>
                <button
                  className="text-sm text-blue-600 hover:text-blue-800"
                  onClick={() => {
                    navigate(
                      `/search?q=${encodeURIComponent(searchTerm.trim())}`
                    )
                    setShowDropdown(false)
                  }}
                >
                  🔍 Search for "{searchTerm}" anyway
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

export default SearchDropdown
