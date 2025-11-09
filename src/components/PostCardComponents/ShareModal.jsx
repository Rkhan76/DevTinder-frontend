// components/ShareModal.js
import { useState, useEffect } from 'react'
import {
  FaSearch,
  FaCopy,
  FaTimes,
  FaUserCircle,
  FaCheck,
} from 'react-icons/fa'
import toast from 'react-hot-toast'

const ShareModal = ({ isOpen, onClose, postId, postData }) => {
  const [friends, setFriends] = useState([])
  const [filteredFriends, setFilteredFriends] = useState([])
  const [selectedFriends, setSelectedFriends] = useState([])
  const [searchQuery, setSearchQuery] = useState('')
  const [loading, setLoading] = useState(false)
  const [sharing, setSharing] = useState(false)

  // Dummy friends data
  const dummyFriends = [
    {
      _id: '1',
      fullName: 'John Doe',
      email: 'john.doe@example.com',
      image: '',
      headline: 'Software Engineer at Tech Corp',
    },
    {
      _id: '2',
      fullName: 'Jane Smith',
      email: 'jane.smith@example.com',
      image:
        'https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=100&q=80',
      headline: 'Product Manager',
    },
    {
      _id: '3',
      fullName: 'Mike Johnson',
      email: 'mike.johnson@example.com',
      image: '',
      headline: 'UX Designer',
    },
    {
      _id: '4',
      fullName: 'Sarah Wilson',
      email: 'sarah.wilson@example.com',
      image:
        'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=100&q=80',
      headline: 'Marketing Specialist',
    },
    {
      _id: '5',
      fullName: 'Alex Chen',
      email: 'alex.chen@example.com',
      image: '',
      headline: 'Data Scientist',
    },
    {
      _id: '6',
      fullName: 'Emily Davis',
      email: 'emily.davis@example.com',
      image:
        'https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=100&q=80',
      headline: 'Frontend Developer',
    },
    {
      _id: '7',
      fullName: 'David Brown',
      email: 'david.brown@example.com',
      image:
        'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=100&q=80',
      headline: 'Backend Engineer',
    },
    {
      _id: '8',
      fullName: 'Lisa Taylor',
      email: 'lisa.taylor@example.com',
      image: '',
      headline: 'Project Manager',
    },
  ]

  useEffect(() => {
    if (isOpen) {
      // Simulate API call with timeout
      setLoading(true)
      const timer = setTimeout(() => {
        setFriends(dummyFriends)
        setFilteredFriends(dummyFriends)
        setLoading(false)
      }, 1000)

      return () => clearTimeout(timer)
    } else {
      // Reset state when modal closes
      setSelectedFriends([])
      setSearchQuery('')
    }
  }, [isOpen])

  useEffect(() => {
    if (searchQuery) {
      const filtered = friends.filter(
        (friend) =>
          friend.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
          friend.email.toLowerCase().includes(searchQuery.toLowerCase())
      )
      setFilteredFriends(filtered)
    } else {
      setFilteredFriends(friends)
    }
  }, [searchQuery, friends])

  const toggleFriendSelection = (friendId) => {
    setSelectedFriends((prev) =>
      prev.includes(friendId)
        ? prev.filter((id) => id !== friendId)
        : [...prev, friendId]
    )
  }

  const handleShare = async () => {
    if (selectedFriends.length === 0) {
      toast.error('Please select at least one friend')
      return
    }

    try {
      setSharing(true)
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500))

      const selectedNames = selectedFriends
        .map((id) => {
          const friend = friends.find((f) => f._id === id)
          return friend.fullName
        })
        .join(', ')

      toast.success(`Post shared with ${selectedNames}`)
      onClose()
      setSelectedFriends([])
    } catch (error) {
      toast.error('Failed to share post')
      console.error('Error sharing post:', error)
    } finally {
      setSharing(false)
    }
  }

  const handleCopyLink = () => {
    const link = `${window.location.origin}/post/${postId}`
    navigator.clipboard.writeText(link)
    toast.success('Post link copied to clipboard!')
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl w-full max-w-md max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">Share Post</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <FaTimes className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        {/* Post Preview */}
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-start gap-3">
            <div className="flex-shrink-0">
              {postData.avatar ? (
                <img
                  src={postData.avatar}
                  alt={postData.author}
                  className="w-10 h-10 rounded-full object-cover"
                />
              ) : (
                <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center text-white font-semibold">
                  {postData.author?.charAt(0)}
                </div>
              )}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 truncate">
                {postData.author}
              </p>
              <p className="text-sm text-gray-500 mt-1 line-clamp-2">
                {postData.content}
              </p>
            </div>
          </div>
        </div>

        {/* Search */}
        <div className="p-4 border-b border-gray-200">
          <div className="relative">
            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search friends..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>

        {/* Friends List */}
        <div className="flex-1 overflow-y-auto max-h-64">
          {loading ? (
            <div className="flex justify-center items-center py-8">
              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-500"></div>
            </div>
          ) : filteredFriends.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              {searchQuery ? 'No friends found' : 'No friends available'}
            </div>
          ) : (
            <div className="p-2">
              {filteredFriends.map((friend) => (
                <div
                  key={friend._id}
                  onClick={() => toggleFriendSelection(friend._id)}
                  className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-colors ${
                    selectedFriends.includes(friend._id)
                      ? 'bg-blue-50 border border-blue-200'
                      : 'hover:bg-gray-50'
                  }`}
                >
                  <div className="flex-shrink-0">
                    {friend.image ? (
                      <img
                        src={friend.image}
                        alt={friend.fullName}
                        className="w-10 h-10 rounded-full object-cover"
                      />
                    ) : (
                      <FaUserCircle className="w-10 h-10 text-gray-400" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">
                      {friend.fullName}
                    </p>
                    <p className="text-xs text-gray-500 truncate">
                      {friend.headline || friend.email}
                    </p>
                  </div>
                  <div
                    className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                      selectedFriends.includes(friend._id)
                        ? 'bg-blue-500 border-blue-500'
                        : 'border-gray-300'
                    }`}
                  >
                    {selectedFriends.includes(friend._id) && (
                      <FaCheck className="w-3 h-3 text-white" />
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="p-4 border-t border-gray-200">
          <div className="flex gap-3">
            <button
              onClick={handleCopyLink}
              className="flex-1 flex items-center justify-center gap-2 py-2 px-4 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
            >
              <FaCopy className="w-4 h-4" />
              Copy Link
            </button>
            <button
              onClick={handleShare}
              disabled={sharing || selectedFriends.length === 0}
              className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 disabled:bg-blue-300 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2"
            >
              {sharing ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  Sharing...
                </>
              ) : (
                `Share (${selectedFriends.length})`
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ShareModal
