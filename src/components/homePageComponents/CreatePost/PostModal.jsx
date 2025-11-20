import { IoMdImages, IoMdVideocam } from 'react-icons/io'
import UserAvatar from './UserAvatar'
import PostForm from './PostForm'
import MediaPreview from './MediaPreview'
import LoadingOverlay from './LoadingOverlay'

const PostModal = ({
  user,
  content,
  setContent,
  media,
  mediaType,
  mediaPreview,
  setMedia,
  setMediaType,
  setMediaPreview,
  onPost,
  onClose,
  isLoading,
  uploadProgress,
}) => {
  const canPost = (content.trim() || media) && !isLoading

  const removeMedia = () => {
    setMedia(null)
    setMediaType(null)
    setMediaPreview(null)
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-2xl relative max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 px-8 py-6 border-b border-gray-100">
          <button
            className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/80 hover:bg-white shadow-sm hover:shadow-md flex items-center justify-center text-gray-500 hover:text-gray-700 transition-all duration-200"
            onClick={onClose}
            disabled={isLoading}
          >
            <span className="text-xl font-light">&times;</span>
          </button>
          <div className="flex items-center gap-4">
            <UserAvatar user={user} size="lg" />
            <div>
              <h3 className="font-semibold text-gray-900 text-lg">
                Create a post
              </h3>
              <p className="text-gray-600 text-sm">
                Share your thoughts with the community
              </p>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-8 overflow-y-auto max-h-[60vh]">
          <PostForm content={content} setContent={setContent} />
          <MediaPreview
            media={media}
            mediaType={mediaType}
            mediaPreview={mediaPreview}
            onRemove={removeMedia}
            uploadProgress={uploadProgress}
            isLoading={isLoading}
          />
        </div>

        {/* Footer */}
        <div className="px-8 py-6 bg-gray-50 border-t border-gray-100 flex items-center justify-between">
          <div className="flex gap-2">
            <button
              className="p-3 rounded-full hover:bg-blue-50 text-blue-600 hover:text-blue-700 transition-all duration-200 group disabled:opacity-50 disabled:cursor-not-allowed"
              onClick={onClose}
              disabled={isLoading}
              title="Close"
            >
              <IoMdImages className="text-2xl group-hover:scale-110 transition-transform duration-200" />
            </button>
            <button
              className="p-3 rounded-full hover:bg-green-50 text-green-600 hover:text-green-700 transition-all duration-200 group disabled:opacity-50 disabled:cursor-not-allowed"
              onClick={onClose}
              disabled={isLoading}
              title="Close"
            >
              <IoMdVideocam className="text-2xl group-hover:scale-110 transition-transform duration-200" />
            </button>
          </div>

          <div className="flex gap-3">
            <button
              className="px-6 py-3 text-gray-600 hover:text-gray-800 font-medium rounded-xl hover:bg-gray-100 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              onClick={onClose}
              disabled={isLoading}
            >
              Cancel
            </button>
            <button
              className="px-8 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
              onClick={onPost}
              disabled={!canPost || isLoading}
            >
              {isLoading ? 'Uploading...' : 'Post'}
            </button>
          </div>
        </div>

        {/* Loading overlay */}
        {isLoading && (
          <LoadingOverlay
            mediaType={mediaType}
            uploadProgress={uploadProgress}
          />
        )}
      </div>
    </div>
  )
}

export default PostModal
