import {
  FaEdit,
  FaTrash,
  FaThumbtack,
  FaCommentSlash,
  FaChartLine,
  FaLink,
  FaBookmark,
  FaFlag,
  FaUserSlash,
  FaEyeSlash,
  FaBan,
  FaBellSlash,
} from 'react-icons/fa'

const PostActionMenu = ({ isOwner = false, postId }) => {
  // 🔹 --------------- Owner Actions ---------------

  const handleEditPost = () => {
    console.log('Edit post:', postId)
    // Example: open edit modal or navigate to edit page
    // navigate(`/edit/${postId}`)
  }

  const handleDeletePost = () => {
    console.log('Delete post:', postId)
    // Example: show confirmation modal before deleting
    // deletePost(postId)
  }

  const handlePinToProfile = () => {
    console.log('Pinned post to profile:', postId)
    // Example: API call to pin post
  }

  const handleToggleComments = () => {
    console.log('Toggled comments for post:', postId)
    // Example: toggle comments on/off
  }

  const handleViewAnalytics = () => {
    console.log('View analytics for post:', postId)
    // Example: navigate(`/analytics/${postId}`)
  }

  const handleCopyLink = () => {
    const link = `${window.location.origin}/post/${postId}`
    navigator.clipboard.writeText(link)
    console.log('Copied link:', link)
    // Optional: show toast notification
  }

  const handleSaveToCollection = () => {
    console.log('Saved to collection:', postId)
    // Example: savePostToCollection(postId)
  }

  // 🔹 --------------- Viewer Actions ---------------

  const handleSavePost = () => {
    console.log('Saved post:', postId)
    // Example: saveForLater(postId)
  }

  const handleReportPost = () => {
    console.log('Reported post:', postId)
    // Example: open report modal
  }

  const handleUnfollowAuthor = () => {
    console.log('Unfollowed author of post:', postId)
    // Example: unfollowUser(authorId)
  }

  const handleHidePost = () => {
    console.log('Hid post from feed:', postId)
    // Example: hidePost(postId)
  }

  const handleBlockUser = () => {
    console.log('Blocked user from post:', postId)
    // Example: blockUser(authorId)
  }

  const handleMuteNotifications = () => {
    console.log('Muted notifications for post:', postId)
    // Example: mutePostNotifications(postId)
  }

  // 🔹 --------------- JSX ---------------

  return (
    <div className="absolute right-0 mt-1 w-48 bg-white border border-gray-200 rounded-xl shadow-lg z-20 max-h-60 overflow-y-auto">
      {isOwner ? (
        <div className="flex flex-col">
          <button
            onClick={handleEditPost}
            className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
          >
            <FaEdit className="text-gray-500" /> Edit Post
          </button>

          <button
            onClick={handleDeletePost}
            className="flex items-center gap-3 px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
          >
            <FaTrash className="text-red-500" /> Delete Post
          </button>

          <button
            onClick={handlePinToProfile}
            className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
          >
            <FaThumbtack className="text-gray-500" /> Pin to Profile
          </button>

          <button
            onClick={handleToggleComments}
            className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
          >
            <FaCommentSlash className="text-gray-500" /> Turn Off Comments
          </button>

          <button
            onClick={handleViewAnalytics}
            className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors border-t border-gray-200"
          >
            <FaChartLine className="text-gray-500" /> View Analytics
          </button>

          <button
            onClick={handleCopyLink}
            className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
          >
            <FaLink className="text-gray-500" /> Copy Link to Post
          </button>

          <button
            onClick={handleSaveToCollection}
            className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
          >
            <FaBookmark className="text-gray-500" /> Save to Collection
          </button>
        </div>
      ) : (
        <div className="flex flex-col">
          <button
            onClick={handleSavePost}
            className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
          >
            <FaBookmark className="text-gray-500" /> Save Post
          </button>

          <button
            onClick={handleCopyLink}
            className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
          >
            <FaLink className="text-gray-500" /> Copy Link
          </button>

          <button
            onClick={handleReportPost}
            className="flex items-center gap-3 px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors border-t border-gray-200"
          >
            <FaFlag className="text-red-500" /> Report Post
          </button>

          <button
            onClick={handleUnfollowAuthor}
            className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
          >
            <FaUserSlash className="text-gray-500" /> Unfollow Author
          </button>

          <button
            onClick={handleHidePost}
            className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
          >
            <FaEyeSlash className="text-gray-500" /> Hide Post
          </button>

          <button
            onClick={handleBlockUser}
            className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors border-t border-gray-200"
          >
            <FaBan className="text-gray-500" /> Block User
          </button>

          <button
            onClick={handleMuteNotifications}
            className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
          >
            <FaBellSlash className="text-gray-500" /> Mute Notifications
          </button>
        </div>
      )}
    </div>
  )
}

export default PostActionMenu
