import { useRef, useState } from 'react'
import { FaExpandAlt } from 'react-icons/fa'
import { getAvatarColor, getInitials } from '../../utils/userAvtar'
import { timeAgo } from '../../utils/timeformat'
import { addCommentToPost } from '../../api/postApi'
import toast from 'react-hot-toast'

const CommentModal = ({ isOpen, comments = [], user, postId, onClose }) => {
  const [commentInputValue, setCommentInputValue] = useState('')
  const [commentsList, setCommentsList] = useState(comments)
  const textareaRef = useRef(null)

  if (!isOpen) return null

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

  const handleFetchMoreComments = () => {
    console.log('Fetching more comments...')
  }

  return (
    <div className="border-t border-gray-100 bg-gray-50">
      <div className="p-6 w-full flex items-start gap-4">
        <div className="flex-shrink-0">
          {user?.image ? (
            <img
              alt="User avatar"
              src={user.image || '/placeholder.svg'}
              className="w-10 h-10 rounded-full object-cover ring-2 ring-blue-100"
            />
          ) : (
            <div
              className={`${getAvatarColor(
                user?.fullName
              )} flex items-center justify-center w-10 h-10 rounded-full font-semibold text-white ring-2 ring-blue-100`}
            >
              {getInitials(user?.fullName)}
            </div>
          )}
        </div>
        <div className="flex flex-col gap-3 flex-1">
          <textarea
            ref={textareaRef}
            value={commentInputValue}
            onChange={handleCommentInput}
            placeholder="Add a comment..."
            rows={1}
            className="w-full resize-none bg-white rounded-xl px-4 py-3 text-gray-700 placeholder-gray-400 focus:outline-none border border-gray-200 focus:border-blue-300 focus:ring-2 focus:ring-blue-100 text-sm overflow-hidden transition-all duration-200"
          />
          {commentInputValue && (
            <button
              onClick={handleAddComment}
              className="self-end px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium transition-colors duration-200 shadow-sm hover:shadow-md"
            >
              Comment
            </button>
          )}
        </div>
      </div>

      {/* Comments List */}
      {commentsList.length > 0 &&
        commentsList.map((comment) => (
          <CommentItem key={comment._id} comment={comment} />
        ))}

      {/* Load more */}
      <div className="flex justify-start p-6 bg-white border-t border-gray-200">
        <button
          onClick={handleFetchMoreComments}
          className="flex items-center gap-3 text-gray-600 text-sm font-medium hover:text-blue-600 transition-colors duration-200 group"
        >
          <div className="p-2 rounded-full bg-gray-100 border border-gray-200 group-hover:bg-blue-50 group-hover:border-blue-200 transition-all duration-200">
            <FaExpandAlt className="text-gray-500 group-hover:text-blue-600 w-3 h-3 transition-colors duration-200" />
          </div>
          <span>Load more comments</span>
        </button>
      </div>
    </div>
  )
}

// Separate component for individual comment
const CommentItem = ({ comment }) => (
  <div className="border-t border-gray-200 last:border-b">
    <div className="p-6 flex items-start gap-4 bg-white hover:bg-gray-50 transition-colors duration-200">
      <div className="w-9 h-9 rounded-full overflow-hidden flex-shrink-0">
        {comment.user?.image ? (
          <img
            alt="User avatar"
            src={comment.user.image || '/placeholder.svg'}
            className="w-full h-full object-cover"
          />
        ) : (
          <div
            className={`${getAvatarColor(
              comment.user?.fullName
            )} flex items-center justify-center w-full h-full rounded-full font-semibold text-white text-sm`}
          >
            {getInitials(comment.user?.fullName)}
          </div>
        )}
      </div>
      <div className="flex-1">
        <div className="flex justify-between items-start">
          <div className="flex items-center gap-3">
            <h3 className="text-sm font-semibold text-gray-900">
              {comment.user?.fullName}
            </h3>
            <p className="text-xs text-gray-500 font-medium">
              {timeAgo(comment.createdAt)}
            </p>
          </div>
          <button className="p-1 rounded-full hover:bg-gray-100 transition-colors duration-200">
            <span className="text-gray-400 hover:text-gray-600">⋮</span>
          </button>
        </div>
        <p className="text-xs text-gray-500 font-medium">
          {comment.user?.headline}
        </p>
        <div className="text-sm text-gray-800 break-words whitespace-pre-wrap leading-relaxed">
          {comment.text}
        </div>
      </div>
    </div>
  </div>
)

export default CommentModal
