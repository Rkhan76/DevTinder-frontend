// src/components/homePageComponents/CreatePost/PostModal.jsx
import { IoMdImages, IoMdVideocam } from 'react-icons/io'
import UserAvatar from './UserAvatar'
import PostForm from './PostForm'
import LoadingOverlay from './LoadingOverlay'
import { deleteTempMedia, cancelMediaUpload } from '../../../api/mediaApi'
import toast from 'react-hot-toast'

const PostModal = ({
  user,
  content,
  setContent,
  media,
  mediaType,
  mediaPreview,
  cloudUrl,
  isUploaded,
  setMedia,
  setMediaType,
  setMediaPreview,
  setCloudUrl,
  setIsUploaded,
  setTempMediaId,
  onPost,
  onClose,
  isLoading,
  uploadProgress,
  tempMediaId,

  // NEW
  handleMediaChange,
  fileInputRef,
}) => {
  const canPost = (content.trim() || cloudUrl) && !isLoading

  // click image/video button in modal
  const triggerMediaUpload = (type) => {
    if (!fileInputRef?.current) {
      console.error('File input ref missing')
      return
    }

    // prevent starting new upload while one is in progress
    if (!isUploaded && uploadProgress > 0) {
      toast.error('Upload already in progress')
      return
    }

    fileInputRef.current.accept = type === 'image' ? 'image/*' : 'video/*'

    fileInputRef.current.onchange = (e) => {
      const file = e.target.files[0]
      if (!file) return

      handleMediaChange(file, type)
      e.target.value = ''
    }

    fileInputRef.current.click()
  }

  const removeMedia = async () => {
    try {
      // Cancel any in-progress upload on remove
      cancelMediaUpload()

      if (tempMediaId) {
        await deleteTempMedia(tempMediaId)
      }

      setMedia(null)
      setMediaType(null)
      setMediaPreview(null)
      setCloudUrl(null)
      setIsUploaded(false)
      setTempMediaId(null)
      toast.success('Media removed')
    } catch (err) {
      console.error('Failed to delete temp media', err)
      toast.error('Failed to remove media')
    }
  }

  // Cancel in-progress upload (user action)
  const handleCancelUpload = async () => {
    try {
      cancelMediaUpload()

      if (tempMediaId) {
        // if server already created a temp record, delete it
        await deleteTempMedia(tempMediaId)
      }

      setMedia(null)
      setMediaType(null)
      setMediaPreview(null)
      setCloudUrl(null)
      setIsUploaded(false)
      setTempMediaId(null)
      // reset progress in parent by emitting something or rely on parent props; here we expect uploadProgress prop to update to 0
      toast('Upload cancelled', { icon: '✖️' })
    } catch (err) {
      console.error('Cancel upload failed', err)
      toast.error('Failed to cancel upload')
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-2xl relative max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 px-8 py-6 border-b border-gray-100">
          <button
            className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/80 hover:bg-white shadow-sm flex items-center justify-center text-gray-500 hover:text-gray-700 transition"
            onClick={onClose}
            disabled={isLoading}
          >
            <span className="text-xl">&times;</span>
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

        {/* Body */}
        <div className="p-8 overflow-y-auto max-h-[60vh]">
          <PostForm content={content} setContent={setContent} />

          {/* Upload Progress */}
          {!isUploaded && uploadProgress > 0 && uploadProgress < 100 && (
            <div className="my-4 space-y-2">
              <p className="text-gray-700 font-medium animate-pulse text-center">
                {uploadProgress < 90
                  ? 'Uploading your media...'
                  : 'Finalizing... Processing...'}
              </p>

              <div className="w-full bg-gray-300 rounded-full h-3 relative">
                <div
                  className="bg-blue-600 h-3 rounded-full transition-all duration-200"
                  style={{ width: `${uploadProgress}%` }}
                ></div>

                <span className="absolute inset-0 flex items-center justify-center text-sm font-semibold text-gray-900">
                  {uploadProgress}%
                </span>
              </div>

              {/* Cancel Upload button */}
              <div className="mt-3 flex gap-2 justify-center">
                <button
                  onClick={handleCancelUpload}
                  className="px-4 py-2 bg-red-100 text-red-700 rounded-md hover:bg-red-200"
                >
                  Cancel Upload
                </button>
              </div>
            </div>
          )}

          {/* Preview */}
          {isUploaded && cloudUrl && (
            <>
              {mediaType === 'video' ? (
                <video
                  src={cloudUrl}
                  controls
                  className="w-full rounded-xl mt-4"
                />
              ) : (
                <img src={cloudUrl} className="w-full rounded-xl mt-4" />
              )}

              <button
                onClick={removeMedia}
                className="mt-2 px-4 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100"
              >
                Remove
              </button>
            </>
          )}
        </div>

        {/* Footer */}
        <div className="px-8 py-6 bg-gray-50 border-t border-gray-100 flex items-center justify-between">
          <div className="flex gap-2">
            {/* disable starting new upload if current upload in progress */}
            <button
              className="p-3 rounded-full hover:bg-blue-50 text-blue-600 transition"
              onClick={(e) => {
                e.stopPropagation()
                triggerMediaUpload('image')
              }}
              disabled={!isUploaded && uploadProgress > 0}
            >
              <IoMdImages className="text-2xl" />
            </button>

            <button
              className="p-3 rounded-full hover:bg-green-50 text-green-600 transition"
              onClick={(e) => {
                e.stopPropagation()
                triggerMediaUpload('video')
              }}
              disabled={!isUploaded && uploadProgress > 0}
            >
              <IoMdVideocam className="text-2xl" />
            </button>
          </div>

          <div className="flex gap-3">
            <button
              className="px-6 py-3 text-gray-600 hover:text-gray-800 rounded-xl hover:bg-gray-100 transition"
              onClick={onClose}
              disabled={isLoading}
            >
              Cancel
            </button>

            <button
              className="px-8 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition disabled:opacity-50"
              onClick={onPost}
              disabled={!canPost}
            >
              {isLoading ? 'Uploading…' : 'Post'}
            </button>
          </div>
        </div>

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
