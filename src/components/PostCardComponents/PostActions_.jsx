import {
  FaRegCommentDots,
  FaRetweet,
  FaHeart,
  FaRegHeart,
} from 'react-icons/fa'
import { IoIosShareAlt } from 'react-icons/io'

const PostActions = ({
  likeCount,
  liked,
  commentsCount,
  sharesCount,
  onLike,
  onCommentToggle,
  onRepost,
  onShare,
}) => {
  const buttonClasses =
    'flex-1 flex items-center justify-center gap-2 p-3 hover:bg-gray-50 rounded-lg transition-all duration-200 group border-0 bg-transparent'

  return (
    <div className="border-t border-gray-100 flex items-center py-2 w-full">
      <button onClick={onLike} className={buttonClasses}>
        {liked ? (
          <FaHeart className="w-5 h-5 text-red-500 group-hover:scale-110 transition-transform duration-200" />
        ) : (
          <FaRegHeart className="w-5 h-5 text-gray-500 group-hover:text-red-500 group-hover:scale-110 transition-all duration-200" />
        )}
        <span
          className={`text-sm font-medium ${
            liked ? 'text-red-500' : 'text-gray-600 group-hover:text-red-500'
          } transition-colors duration-200`}
        >
          {likeCount}
        </span>
      </button>

      <button onClick={onCommentToggle} className={buttonClasses}>
        <FaRegCommentDots className="w-5 h-5 text-gray-500 group-hover:text-blue-500 group-hover:scale-110 transition-all duration-200" />
        <span className="text-sm font-medium text-gray-600 group-hover:text-blue-500 transition-colors duration-200">
          {commentsCount}
        </span>
      </button>

      <button className={buttonClasses} onClick={onRepost}>
        <FaRetweet className="w-5 h-5 text-gray-500 group-hover:text-green-500 group-hover:scale-110 transition-all duration-200" />
        <span className="text-sm font-medium text-gray-600 group-hover:text-green-500 transition-colors duration-200">
          {sharesCount}
        </span>
      </button>

      <button onClick={onShare} className={buttonClasses}>
        <IoIosShareAlt className="w-5 h-5 text-gray-500 group-hover:text-purple-500 group-hover:scale-110 transition-all duration-200" />
      </button>
    </div>
  )
}

export default PostActions
