import { useRef, useState } from 'react'
import toast from 'react-hot-toast'
import { addCommentToPost, onLikePost, repostPost } from '../api/postApi'
import { getAvatarColor, getInitials } from '../utils/userAvtar'
import {
  FaRegCommentDots,
  FaRetweet,
  FaHeart,
  FaRegHeart,
  FaExpandAlt,
} from 'react-icons/fa'
import { IoIosShareAlt } from 'react-icons/io'
import { useSelector } from 'react-redux'
import { timeAgo } from '../utils/timeformat'

const PostCard = ({ post }) => {
  const buttonClasses =
    'flex-1 flex items-center justify-center gap-1.5 p-2 hover:bg-base-200/70 rounded-lg transition-colors duration-200'

  const {
    _id: postId,
    content,
    createdAt,
    tags,
    likesCount = 0,
    commentsCount = 0,
    sharesCount = 0,
    media,
    likedBy = [],
    comments = [],
    author: { fullName, image },
  } = post

  const user = useSelector((state) => state.auth.user)

  const isLikedbyCurrentUser = () => {
    return likedBy.some((userLiked) => userLiked._id === user._id)
  }

  const [likeCount, setLikeCount] = useState(likesCount)
  const [liked, setLiked] = useState(isLikedbyCurrentUser())
  const [modalOpen, setModalOpen] = useState(false)
  const [commentModal, setCommentModal] = useState(false)
  const [commentInputValue, setCommentInputValue] = useState('')
  const [commentsList, setCommentsList] = useState(comments || [])
  const textareaRef = useRef(null)

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
    // Share functionality placeholder
  }

  // handle repost
  const handleRepost = async() => {
    const res = await repostPost(postId)
    console.log('Post reposted:', res)
  }

  // Handle comments
  const handleFetchMoreComments = () => {
    console.log('Fetching more comments...')
  }

  const handleCommentInput = (e) => {
    setCommentInputValue(e.target.value)
    textareaRef.current.style.height = 'auto'
    textareaRef.current.style.height = textareaRef.current.scrollHeight + 'px'
  }

  const handleAddComment = async () => {
    try {
      const res = await addCommentToPost(postId, commentInputValue)
      if (res.success) {
        setCommentsList((prev) => [res.comment, ...prev])
        setCommentInputValue('')
        textareaRef.current.style.height = 'auto'
      }
    } catch (err) {
      toast.error('Failed to add comment')
      console.error(err)
    }
  }

  return (
    <div className="relative bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 my-4 mx-auto font-sans border border-base-200">
      {/* Header */}
      <div className="flex justify-between items-center p-4">
        <div className="flex items-center gap-3">
          {image ? (
            <div className="relative group">
              <img
                src={image}
                alt={fullName}
                className="w-12 h-12 rounded-full object-cover ring-2 ring-primary/20 group-hover:ring-primary/40 transition-all duration-300 transform group-hover:scale-105"
              />
            </div>
          ) : (
            <div
              className={`${getAvatarColor(
                fullName
              )} flex items-center justify-center w-12 h-12 rounded-full`}
            >
              {getInitials(fullName)}
            </div>
          )}
          <div className="flex flex-col">
            <h3 className="text-base font-semibold text-base-content leading-tight m-0 hover:text-primary transition-colors duration-200">
              {fullName}
            </h3>
            <p className="text-sm text-base-content/60 leading-tight m-0">
              {timeAgo(new Date(createdAt))}
            </p>
          </div>
        </div>
        <button
          onClick={() => setModalOpen(true)}
          className="bg-base-200/50 border-none cursor-pointer p-2 rounded-full hover:bg-primary/10 transition-all duration-300 group"
        >
          <span className="text-lg text-base-content/70 group-hover:text-primary font-bold transform group-hover:rotate-90 transition-all duration-300">
            {' '}
            ⋮{' '}
          </span>
        </button>
      </div>

      {/* Content */}
      <div className="px-4 py-3">
        <p className="text-base leading-relaxed text-base-content/90 m-0 break-words">
          {content}
        </p>
        {tags && tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-3">
            {tags.map((tag, index) => (
              <span
                key={index}
                className="text-sm text-primary/80 bg-primary/5 px-3 py-1 rounded-full"
              >
                #{tag}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Media */}
      {media[0]?.url && (
        <div className="relative overflow-hidden border-y border-base-200">
          <img
            src={media[0].url}
            alt="Post content"
            className="w-full h-auto object-cover"
          />
        </div>
      )}

      {/* Footer */}
      <div className="px-4 bg-white">
        <div className="flex items-center gap-2 mb-2">
          <div className="flex -space-x-2">
            {likedBy
              .filter((liker) => liker?._id !== user._id)
              .slice(0, 3)
              .map((liker, index) => (
                <img
                  key={index}
                  src={liker.image}
                  alt={liker.fullName}
                  className="w-6 h-6 rounded-full border-2 border-base-100 object-cover"
                />
              ))}
          </div>
        </div>

        {/* Actions */}
        <div className="border-t border-base-200 flex items-center py-2 w-full">
          <button onClick={handleLike} className={buttonClasses}>
            {liked ? (
              <FaHeart className="w-5 h-5 text-error" />
            ) : (
              <FaRegHeart className="w-5 h-5 text-base-content/70" />
            )}
            <span
              className={`text-sm ${
                liked ? 'text-error' : 'text-base-content/70'
              }`}
            >
              {likeCount}
            </span>
          </button>
          <button
            onClick={() => setCommentModal(!commentModal)}
            className={buttonClasses}
          >
            <FaRegCommentDots className="w-5 h-5 text-base-content/70" />
            <span className="text-sm text-base-content/70">
              {commentsList.length}
            </span>
          </button>
          <button className={buttonClasses} onClick={handleRepost}>
            <FaRetweet className="w-5 h-5 text-base-content/70" />
            <span className="text-sm text-base-content/70">{sharesCount}</span>
          </button>
          <button onClick={handleShare} className={buttonClasses}>
            <IoIosShareAlt className="w-5 h-5 text-base-content/70" />
          </button>
        </div>
      </div>

      {/* Comment Modal */}
      {commentModal && (
        <div>
          <div className="px-4 w-full max-w-xl flex items-center gap-4">
            <div className="avatar">
              <div className="w-8 rounded-full">
                {user?.image ? (
                  <img alt="User avatar" src={user.image} />
                ) : (
                  <div
                    className={`${getAvatarColor(
                      user?.fullName
                    )} flex items-center justify-center w-8 h-8 rounded-full`}
                  >
                    {getInitials(user?.fullName)}
                  </div>
                )}
              </div>
            </div>
            <div className="flex flex-col gap-2 flex-1">
              <textarea
                ref={textareaRef}
                value={commentInputValue}
                onChange={handleCommentInput}
                placeholder="Add a comment..."
                rows={1}
                className="w-full resize-none bg-gray-50 rounded-md px-5 py-2.5 text-gray-700 placeholder-gray-400 focus:outline-none border border-gray-300 text-sm overflow-hidden"
              />
              {commentInputValue && (
                <button
                  onClick={handleAddComment}
                  className="self-end px-4 py-1 bg-blue-500 text-white rounded-md text-sm"
                >
                  Comment
                </button>
              )}
            </div>
          </div>

          {/* Comments */}
          {commentsList.length > 0 &&
            commentsList.map((comment) => (
              <div key={comment._id} className="mb-3">
                <div className="px-4 flex items-center bg-white mt-2">
                  <div className="w-8 h-8 rounded-full overflow-hidden mr-3">
                    {comment.user?.image ? (
                      <img
                        alt="User avatar"
                        src={comment.user.image}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div
                        className={`${getAvatarColor(
                          comment.user?.fullName
                        )} flex items-center justify-center w-full h-full rounded-full`}
                      >
                        {getInitials(comment.user?.fullName)}
                      </div>
                    )}
                  </div>
                  <div className='flex-1 flex justify-between items-center'>
                    <div className="flex justify-between gap-2 items-center">
                      <h3 className="text-base font-semibold">
                        {comment.user?.fullName}
                      </h3>
                      <p className="text-xs text-gray-500">
                        {timeAgo(comment.createdAt)}
                      </p>
                    </div>
                    <span>...</span>
                  </div>
                </div>
                <div className="bg-white px-4 rounded-lg text-sm text-gray-800 break-words whitespace-pre-wrap">
                  {comment.text}
                </div>
              </div>
            ))}

          {/* Load more */}
          <div className="flex justify-start my-2 px-4 bg-white">
            <button
              onClick={handleFetchMoreComments}
              className="flex items-center gap-1 text-gray-700 text-sm font-medium"
            >
              <div className="p-1.5 rounded-full bg-gray-100 border border-gray-300">
                <FaExpandAlt className="text-gray-600 w-4 h-4" />
              </div>
              <span>Load more comments</span>
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default PostCard
