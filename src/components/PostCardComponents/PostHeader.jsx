import { Link } from 'react-router-dom'
import { getAvatarColor, getInitials } from '../../utils/userAvtar'
import { timeAgo } from '../../utils/timeformat'
import PostActionMenu from './PostActionMenu'
import { useRef, useState, useEffect } from 'react'

const PostHeader = ({ post, isRepost, user }) => {
  const { author, createdAt } = post
  const menuRef = useRef(null)
  const [showActionMenu, setShowActionMenu] = useState(false)

  // Handle click outside to close menu
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setShowActionMenu(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  const handleMenuToggle = () => {
    setShowActionMenu((prev) => !prev)
  }

  return (
    <div
      className={`flex justify-between items-center p-6 ${
        isRepost ? 'pb-4 pt-2' : 'pb-4'
      }`}
    >
      <Link to={`/profile/${author._id}`} className="flex items-center gap-4">
        {author?.image ? (
          <div className="relative group">
            <img
              src={author.image}
              alt={author.fullName}
              className="w-14 h-14 rounded-full object-cover ring-2 ring-blue-100 group-hover:ring-blue-200 transition-all duration-300 transform group-hover:scale-105"
            />
            <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-transparent to-white/10 group-hover:to-white/20 transition-all duration-300"></div>
          </div>
        ) : (
          <div
            className={`${getAvatarColor(
              author.fullName
            )} flex items-center justify-center w-14 h-14 rounded-full ring-2 ring-blue-100 font-semibold text-white`}
          >
            {getInitials(author.fullName)}
          </div>
        )}
        <div className="flex flex-col">
          <h3 className="text-lg font-normal text-gray-900 leading-tight m-0 hover:text-blue-600 transition-colors duration-200 cursor-pointer">
            {author.fullName}
          </h3>
          <p className="text-[13px] text-gray-700 leading-tight m-0 font-light">
            {author.headline || ''}
          </p>
          <p className="text-[10px] text-gray-700 leading-tight m-0">
            {timeAgo(new Date(createdAt))}
          </p>
        </div>
      </Link>

      {/* Three dots menu button */}
      <div ref={menuRef} className="relative">
        <button
          onClick={handleMenuToggle}
          className="relative p-2 rounded-full hover:bg-gray-100 transition-all duration-200 group border-0 bg-transparent"
        >
          {/* Three dots - vertical style */}
          <div className="flex flex-col gap-0.5 items-center justify-center w-5 h-5">
            <span className="w-1 h-1 bg-gray-400 rounded-full group-hover:bg-gray-600 transition-colors duration-200"></span>
            <span className="w-1 h-1 bg-gray-400 rounded-full group-hover:bg-gray-600 transition-colors duration-200"></span>
            <span className="w-1 h-1 bg-gray-400 rounded-full group-hover:bg-gray-600 transition-colors duration-200"></span>
          </div>
        </button>

        {/* Post Action Menu */}
        {showActionMenu && (
          <PostActionMenu
            postId={post._id}
            isOwner={user._id === author._id}
            onClose={() => setShowActionMenu(false)}
          />
        )}
      </div>
    </div>
  )
}

export default PostHeader
