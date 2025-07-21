import { useState } from 'react'
import toast from 'react-hot-toast'
import { onLikePost } from '../api/postApi'
import { getAvatarColor, getInitials } from '../utils/userAvtar'

const PostCard = ({ post }) => {
  const {
    _id: postId,
    content,
    createdAt,
    updatedAt,
    visibility,
    location,
    media,
    tags,
    likesCount = 0,
    commentsCount = 0,
    sharesCount = 0,
    isEdited,
    bookmarkedBy,
    comments,
    mentions,
    __v,
    isLiked = false,
    author: { _id: authorId, fullName, email, image },
    likedBy = [],
  } = post

  const [liked, setLiked] = useState(isLiked)
  const [likeCount, setLikeCount] = useState(likesCount)

  const handleLike = async () => {
    try {
      const updated = await onLikePost(postId)
      setLiked(updated.liked)
      setLikeCount(updated.likesCount)
    } catch (err) {
      toast.error('Failed to like')
      console.error('Failed to like:', err)
    }
  }

  const handleShare = () => {
    console.log('Post shared')
  }

  const handleComment = () => {
    console.log('Comment button clicked')
  }

  // const avatarColor = getAvatarColor(fullName)
  // const userInitials = getInitials(fullName)

  return (
    <div className="bg-gray-50 rounded-xl shadow-md my-4 overflow-hidden mx-auto font-sans">
      {/* Header */}
      <div className="flex justify-between items-center p-4 bg-white">
        <div className="flex items-center gap-3">
          {image ? (
            <img
              src={image}
              alt={fullName}
              className="w-12 h-12 rounded-full object-cover border-2 border-gray-200"
            />
          ) : (
            <div
              className={`${getAvatarColor(fullName)} flex items-center justify-center w-12 h-12 rounded-full  border-2 border-gray-200 font-semibold text-gray-700 text-lg shadow-sm`}
            >
              {getInitials(fullName)}
            </div>
          )}
          <div className="flex flex-col">
            <h3 className="text-base font-semibold text-gray-900 leading-tight m-0">
              {fullName}
            </h3>
            <p className="text-sm text-gray-500 leading-tight m-0">
              {new Date(createdAt).toLocaleString('en-US', {
                month: 'long',
                day: 'numeric',
                year: 'numeric',
                hour: 'numeric',
                minute: '2-digit',
                hour12: true,
              })}
            </p>
          </div>
        </div>
        <button className="bg-transparent border-none cursor-pointer p-2 rounded-full hover:bg-gray-50 transition-colors duration-200">
          <span className="text-lg text-gray-500 font-bold">⋮</span>
        </button>
      </div>

      {/* Content */}
      <div className="px-4 pb-4 bg-white">
        <p className="text-sm leading-relaxed text-gray-900 m-0">{content}</p>
      </div>

      {/* Image */}
      {media?.url && (
        <div className="relative bg-white">
          <img
            src={media.url}
            alt="Post content"
            className="w-full h-auto block object-cover"
          />

          {/* Action buttons overlay */}
          <div className="absolute bottom-4 right-4 flex flex-col gap-2">
            <button
              className="w-11 h-11 rounded-full bg-blue-500 hover:bg-blue-600 shadow-lg text-white"
              onClick={handleComment}
            >
              💬
            </button>
            <button
              className="w-11 h-11 rounded-full bg-blue-500 hover:bg-blue-600 shadow-lg text-white"
              onClick={handleShare}
            >
              🔗
            </button>
            <button
              className={`w-11 h-11 rounded-full shadow-lg transition-all duration-200 ${
                liked ? 'bg-red-500 scale-110 text-white' : 'bg-white'
              }`}
              onClick={handleLike}
            >
              {liked ? '🤍' : '❤️'}
            </button>
          </div>
        </div>
      )}

      {/* Footer */}
      <div className="p-4 bg-white border-t border-gray-200">
        <div className="flex items-center gap-2 mb-3">
          <div className="flex -space-x-2">
            {likedBy.slice(0, 3).map((user, index) => (
              <img
                key={index}
                src={user.image}
                alt={user.fullName}
                className="w-6 h-6 rounded-full border-2 border-white object-cover"
                title={user.fullName}
              />
            ))}
          </div>
          <span className="text-sm text-gray-500">
            {likedBy[0]?.fullName}
            {likeCount > likedBy.length
              ? ` and ${likeCount - likedBy.length} others`
              : ''}{' '}
            liked this
          </span>
        </div>

        <div className="flex justify-end gap-4">
          <div className="flex items-center gap-1">
            <span className="text-base text-gray-500">❤️</span>
            <span className="text-sm text-gray-900 font-medium">
              {likeCount}
            </span>
          </div>
          <div className="flex items-center gap-1">
            <span className="text-base text-gray-500">🔗</span>
            <span className="text-sm text-gray-900 font-medium">
              {sharesCount}
            </span>
          </div>
          <div className="flex items-center gap-1">
            <span className="text-base text-gray-500">💬</span>
            <span className="text-sm text-gray-900 font-medium">
              {commentsCount}
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PostCard
