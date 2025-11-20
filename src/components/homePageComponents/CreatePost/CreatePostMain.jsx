import { useState, useRef } from 'react'
import { useSelector } from 'react-redux'
import { addPost } from '../../../api/postApi'
import toast from 'react-hot-toast'
// import { getAvatarColor, getInitials } from '../../utils/userAvtar'
import PostModal from './PostModal'
import MediaUpload from './MediaUpload'
import UserAvatar from './UserAvatar'

const CreatePost = () => {
  const [modalOpen, setModalOpen] = useState(false)
  const [content, setContent] = useState('')
  const [media, setMedia] = useState(null)
  const [mediaType, setMediaType] = useState(null)
  const [creatingPostLoading, setCreatingPostLoading] = useState(false)
  const [mediaPreview, setMediaPreview] = useState(null)
  const [uploadProgress, setUploadProgress] = useState(0)
  const user = useSelector((state) => state.auth.user)

  const handleOpenModal = () => setModalOpen(true)

  const handleCloseModal = () => {
    setModalOpen(false)
    setContent('')
    setMedia(null)
    setMediaType(null)
    setMediaPreview(null)
    setUploadProgress(0)
  }

  const handleMediaChange = (file, type) => {
    // 1. Set media state and open modal immediately
    setMedia(file)
    setMediaType(type)
    setMediaPreview(URL.createObjectURL(file))
    setModalOpen(true)

    // 2. Start upload immediately in background
    handlePostImmediately(file, type)
  }

  const handlePostImmediately = async (file, type) => {
    if (!file) return

    const formData = new FormData()
    formData.append('content', content)
    formData.append('media', file)

    try {
      setCreatingPostLoading(true)
      setUploadProgress(10)

      const progressInterval = setInterval(() => {
        setUploadProgress((prev) => {
          if (prev >= 90) {
            clearInterval(progressInterval)
            return prev
          }
          return prev + 10
        })
      }, 300)

      const res = await addPost(formData)

      clearInterval(progressInterval)
      setUploadProgress(100)

      if (res.success) {
        toast.success('Post created successfully!')
        setTimeout(() => {
          handleCloseModal()
        }, 1000)
      } else {
        toast.error(res.message || 'Failed to create post')
        setCreatingPostLoading(false)
        setUploadProgress(0)
      }
    } catch (err) {
      console.error(err)
      toast.error('Something went wrong while posting')
      setCreatingPostLoading(false)
      setUploadProgress(0)
    }
  }

  const handlePost = async () => {
    if (!content.trim() && !media) {
      toast.error('Post content or media required')
      return
    }

    const formData = new FormData()
    formData.append('content', content)
    if (media) formData.append('media', media)

    try {
      setCreatingPostLoading(true)
      const res = await addPost(formData)
      if (res.success) {
        toast.success('Post created successfully')
        handleCloseModal()
      } else {
        toast.error(res.message || 'Failed to create post')
      }
    } catch (err) {
      console.error(err)
      toast.error('Something went wrong while posting')
    } finally {
      setCreatingPostLoading(false)
    }
  }

  return (
    <>
      {/* Post Creation Trigger */}
      <div className="w-full max-w-xl bg-white rounded-2xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-all duration-300">
        <div className="flex items-center gap-4">
          <UserAvatar user={user} size="md" />

          <div
            className="flex-1 bg-gray-50 hover:bg-gray-100 rounded-full px-6 py-4 cursor-pointer transition-all duration-200 border border-gray-200 hover:border-gray-300"
            onClick={handleOpenModal}
          >
            <span className="text-gray-600 text-base">Start a post...</span>
          </div>

          <MediaUpload onMediaChange={handleMediaChange} />
        </div>
      </div>

      {/* Modal */}
      {modalOpen && (
        <PostModal
          user={user}
          content={content}
          setContent={setContent}
          media={media}
          mediaType={mediaType}
          mediaPreview={mediaPreview}
          setMedia={setMedia}
          setMediaType={setMediaType}
          setMediaPreview={setMediaPreview}
          onPost={handlePost}
          onClose={handleCloseModal}
          isLoading={creatingPostLoading}
          uploadProgress={uploadProgress}
        />
      )}
    </>
  )
}

export default CreatePost
