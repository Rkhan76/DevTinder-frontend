import { useState } from 'react'
import toast from 'react-hot-toast'
import { onLikePost } from '../api/postApi'
import { getAvatarColor, getInitials } from '../utils/userAvtar'
import { FaRegCommentDots, FaRetweet } from 'react-icons/fa'
import { FaRegHeart, FaHeart } from 'react-icons/fa'
import { IoIosShareAlt } from 'react-icons/io'
import { useSelector } from 'react-redux'

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

  const isLikedbyCurrentUser = () => {
    const likedByCurrentUser = likedBy.filter(
      (userLiked) => userLiked._id === user._id
    )
    if (likedByCurrentUser.length > 0) return true
    return false
  }
  
  
  const [likeCount, setLikeCount] = useState(likesCount)
  const [modalOpen, setModalOpen] = useState(false)
  const [commentModal,setCommentModal] = useState(false)
  const user = useSelector((state)=> state.auth.user)
  const [liked, setLiked] = useState(isLikedbyCurrentUser())

  

  

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
    // Share functionality can be implemented here
  }

  const handleComment = () => {
    // Comment functionality can be implemented here
  }

  // const avatarColor = getAvatarColor(fullName)
  // const userInitials = getInitials(fullName)

  return (
    <div className="relative bg-gray-50 rounded-xl shadow-md my-4 overflow-hidden mx-auto font-sans">
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
              className={`${getAvatarColor(
                fullName
              )} flex items-center justify-center w-12 h-12 rounded-full  border-2 border-gray-200 font-semibold text-gray-700 text-lg shadow-sm`}
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
        {/* dropdown button */}
        <button
          onClick={() => setModalOpen(true)}
          className="bg-transparent border-none cursor-pointer p-2 rounded-full hover:bg-gray-50 transition-colors duration-200"
        >
          <span className="text-lg text-gray-500 font-bold">⋮</span>
        </button>
      </div>

      {/* Content */}
      <div className="px-4 pb-4 bg-white">
        <p className="text-sm leading-relaxed text-gray-900 m-0">{content}</p>
      </div>

      {/* Image */}
      {media[0]?.url && (
        <div className="relative bg-white">
          <img
            src={media[0].url}
            alt="Post content"
            className="w-full h-auto block object-cover"
          />
        </div>
      )}

      {/* Footer */}
      <div className="px-4 bg-white">
        <div className="flex items-center gap-2 mb-1 mt-1">
          <div className="flex -space-x-2">
            {likedBy
              .filter((liker) => liker?._id !== user._id)
              .slice(0, 3)
              .map((liker, index) => (
                <img
                  key={index}
                  src={liker.image}
                  alt={liker.fullName}
                  className="w-6 h-6 rounded-full border-2 border-white object-cover"
                  title={liker.fullName}
                />
              ))}
          </div>

          {likedBy.length > 0 && (
            <span className="text-sm text-gray-500">
              {(() => {
                const otherLikers = likedBy.filter(
                  (liker) => liker?._id !== user._id
                )

                const firstName = otherLikers[0]?.fullName || ''

                return (
                  (firstName && <>
                    {firstName}
                    {likeCount > likedBy.length
                      ? ` and ${likeCount - likedBy.length} others`
                      : ''}
                    {firstName && ' '}liked this
                  </>)
                )
              })()}
            </span>
          )}
        </div>

        {/* Action buttons for like , comment, repost, share */}
        <div className="border-t border-gray-200 flex items-center py-1 w-full">
          <button
            onClick={handleLike}
            className="flex-1 flex justify-center p-2 transition-colors duration-200 hover:bg-gray-100 hover:rounded-md"
          >
            {liked ? (
              <FaHeart className="w-5 h-5 text-red-500" />
            ) : (
              <FaRegHeart className="w-5 h-5 text-gray-700" />
            )}
          </button>

          <button
            onClick={() => setCommentModal(!commentModal)}
            className="flex-1 flex justify-center p-2 bg-white text-gray-700 transition-colors duration-200 hover:bg-gray-100 hover:rounded-md"
          >
            <FaRegCommentDots className="w-5 h-5" />
          </button>

          <button className="flex-1 flex justify-center p-2 bg-white text-gray-700 transition-colors duration-200 hover:bg-gray-100 hover:rounded-md">
            <FaRetweet className="w-5 h-5" />
          </button>

          <button
            onClick={handleShare}
            className="flex-1 flex justify-center p-2 bg-white text-gray-700 transition-colors duration-200 hover:bg-gray-100 hover:rounded-md"
          >
            <IoIosShareAlt className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Dropdown Modal for Post Card for three dots */}
      {modalOpen && (
        <div className="absolute top-8 right-0 w-48 bg-white  rounded-md shadow-lg z-50 border border-gray-200 dark:border-gray-700">
          <ul className="py-1">
            <li className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer flex items-center">
              <svg
                className="w-4 h-4 mr-2 text-gray-500 dark:text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                />
              </svg>
              Edit Post
            </li>
            <li className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer flex items-center text-red-500">
              <svg
                className="w-4 h-4 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                />
              </svg>
              Delete Post
            </li>
            <li className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer flex items-center">
              <svg
                className="w-4 h-4 mr-2 text-gray-500 dark:text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                />
              </svg>
              Report Post
            </li>
            <li className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer flex items-center">
              <svg
                className="w-4 h-4 mr-2 text-gray-500 dark:text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"
                />
              </svg>
              Share Post
            </li>
          </ul>
        </div>
      )}

      {/* Dropdown modal for comment section */}
     {commentModal && <div>
        hllo iam here
      </div>}
    </div>
  )
}

export default PostCard
