import { useState } from 'react'
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
import { CiBookmark } from 'react-icons/ci'
import DeleteConfirmationModal from './DeleteConfirmationModal'
import { deletePost, savePost } from '../../api/postApi'
import toast from 'react-hot-toast'

const PostActionMenu = ({ isOwner = false, postId, onClose }) => {

   const [showDeleteModal, setShowDeleteModal] = useState(false)
   const [deleting, setDeleting] = useState(false)

  // 🔹 --------------- Owner Actions ---------------

  const handleEditPost = () => {
    console.log('Edit post:', postId)
    onClose()
    // Example: open edit modal or navigate to edit page
    // navigate(`/edit/${postId}`)
  }

   const handleDeletePost = () => {
     setShowDeleteModal(true)
   }

  const handleConfirmDelete = async () => {
    try {
      setDeleting(true)

      // Call the actual delete API
      const response = await deletePost(postId)

      if (response.success) {
        console.log('Post deleted successfully:', postId)
        toast.success('Post deleted successfully')

        onClose()

        // Callback to refresh posts list or update UI
        // if (onPostDeleted) {
        //   onPostDeleted(postId)
        // }

        // Optional: If you're on the single post page, navigate away
        // if (isSinglePostPage) {
        //   navigate('/') // Navigate to home or feed
        // }
      }
    } catch (error) {
      console.error('Error deleting post:', error)
      toast.error(error.message || 'Failed to delete post')
    } finally {
      setDeleting(false)
      setShowDeleteModal(false)
    }
  }

   const handleCancelDelete = () => {
     setShowDeleteModal(false)
   }

  const handlePinToProfile = () => {
    console.log('Pinned post to profile:', postId)
    onClose()
    // Example: API call to pin post
  }

  const handleToggleComments = () => {
    console.log('Toggled comments for post:', postId)
    onClose()
    // Example: toggle comments on/off
  }

  const handleViewAnalytics = () => {
    console.log('View analytics for post:', postId)
    onClose()
    // Example: navigate(`/analytics/${postId}`)
  }

  const handleCopyLink = () => {
    const link = `${window.location.origin}/post/${postId}`
    navigator.clipboard.writeText(link)
    toast.success('Post link copied to clipboard! 🔗')
    onClose()
    // Optional: show toast notification
  }

  const handleSaveToCollection = () => {
    console.log('Saved to collection:', postId)
    onClose()
    // Example: savePostToCollection(postId)
  }

  // 🔹 --------------- Viewer Actions ---------------

  const handleSavePost = async () => {
    try {
      console.log(postId, " i am in handle save post function")
      const res = await savePost(postId)
      console.log(res, ' response after saving the post')
      toast.success('Post saved!')
      onClose()
    } catch (err) {
      toast.error('Failed to save post')
    }
  }

  const handleReportPost = () => {
    console.log('Reported post:', postId)
    onClose()
    // Example: open report modal
  }

  const handleUnfollowAuthor = () => {
    console.log('Unfollowed author of post:', postId)
    onClose()
    // Example: unfollowUser(authorId)
  }

  const handleHidePost = () => {
    console.log('Hid post from feed:', postId)
    onClose()
    // Example: hidePost(postId)
  }

  const handleBlockUser = () => {
    console.log('Blocked user from post:', postId)
    onClose()
    // Example: blockUser(authorId)
  }

  const handleMuteNotifications = () => {
    console.log('Muted notifications for post:', postId)
    onClose()
    // Example: mutePostNotifications(postId)
  }

  // 🔹 --------------- JSX ---------------

  return (
    <div className="absolute right-0 mt-2 w-56 bg-white border border-gray-200 rounded-xl shadow-lg z-50 max-h-80 overflow-y-auto">
      {isOwner ? (
        <div className="flex flex-col p-1">
          <button
            onClick={handleEditPost}
            className="flex items-center gap-3 px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
          >
            <FaEdit className="text-gray-500 text-sm" />
            Edit Post
          </button>

          <button
            onClick={handleDeletePost}
            className="flex items-center gap-3 px-4 py-3 text-sm text-red-600 hover:bg-red-50 rounded-lg transition-colors"
          >
            <FaTrash className="text-red-500 text-sm" />
            Delete Post
          </button>

          <button
            onClick={handlePinToProfile}
            className="flex items-center gap-3 px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
          >
            <FaThumbtack className="text-gray-500 text-sm" />
            Pin to Profile
          </button>

          <button
            onClick={handleToggleComments}
            className="flex items-center gap-3 px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
          >
            <FaCommentSlash className="text-gray-500 text-sm" />
            Turn Off Comments
          </button>

          <div className="border-t border-gray-100 my-1"></div>

          <button
            onClick={handleViewAnalytics}
            className="flex items-center gap-3 px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
          >
            <FaChartLine className="text-gray-500 text-sm" />
            View Analytics
          </button>

          <button
            onClick={handleCopyLink}
            className="flex items-center gap-3 px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
          >
            <FaLink className="text-gray-500 text-sm" />
            Copy Link to Post
          </button>

          <button
            onClick={handleSaveToCollection}
            className="flex items-center gap-3 px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
          >
            <FaBookmark className="text-gray-500 text-sm" />
            Save to Collection
          </button>
        </div>
      ) : (
        <div className="flex flex-col p-1">
          <button
            onClick={handleSavePost}
            className="flex items-center gap-3 px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
          >
            <FaBookmark className="text-gray-500 text-sm" />
            Save Post
          </button>

          <button
            onClick={handleCopyLink}
            className="flex items-center gap-3 px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
          >
            <FaLink className="text-gray-500 text-sm" />
            Copy Link
          </button>

          <div className="border-t border-gray-100 my-1"></div>

          {/* <button
            onClick={handleReportPost}
            className="flex items-center gap-3 px-4 py-3 text-sm text-red-600 hover:bg-red-50 rounded-lg transition-colors"
          >
            <FaFlag className="text-red-500 text-sm" />
            Report Post
          </button> */}

          <button
            onClick={handleUnfollowAuthor}
            className="flex items-center gap-3 px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
          >
            <FaUserSlash className="text-gray-500 text-sm" />
            UnFriend Author
          </button>

          {/* <button
            onClick={handleHidePost}
            className="flex items-center gap-3 px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
          >
            <FaEyeSlash className="text-gray-500 text-sm" />
            Hide Post
          </button> */}

          {/* <div className="border-t border-gray-100 my-1"></div>

          <button
            onClick={handleBlockUser}
            className="flex items-center gap-3 px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
          >
            <FaBan className="text-gray-500 text-sm" />
            Block User
          </button>

          <button
            onClick={handleMuteNotifications}
            className="flex items-center gap-3 px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
          >
            <FaBellSlash className="text-gray-500 text-sm" />
            Mute Notifications
          </button> */}
        </div>
      )}

      {/* Delete Confirmation Modal */}
      <DeleteConfirmationModal
        isOpen={showDeleteModal}
        onClose={handleCancelDelete}
        onConfirm={handleConfirmDelete}
        isLoading={deleting}
      />
    </div>
  )
}

export default PostActionMenu
