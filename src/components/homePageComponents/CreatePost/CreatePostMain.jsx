import { useState, useRef } from 'react'
import { useSelector } from 'react-redux'
import { addPost } from '../../../api/postApi'
import toast from 'react-hot-toast'
import PostModal from './PostModal'
import MediaUpload from './MediaUpload'
import UserAvatar from './UserAvatar'
import { handlePostMediaImmediately } from '../../../api/mediaApi'

const CreatePost = () => {
  const [modalOpen, setModalOpen] = useState(false)
  const [content, setContent] = useState('')
  const [media, setMedia] = useState(null)
  const [mediaType, setMediaType] = useState(null)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [mediaPreview, setMediaPreview] = useState(null)
  const [tempMediaId, setTempMediaId] = useState(null)

  // ⭐ NEW STATES
  const [cloudUrl, setCloudUrl] = useState(null)
  const [isUploaded, setIsUploaded] = useState(false)

  const fileInputRef = useRef(null)
  const user = useSelector((state) => state.auth.user)

  const handleOpenModal = () => setModalOpen(true)

  const handleCloseModal = async() => {
    if (tempMediaId && !isUploaded) {
    await deleteTempMedia(tempMediaId)
  }
    setModalOpen(false)
    setContent('')
    setMedia(null)
    setMediaType(null)
    setMediaPreview(null)
    setUploadProgress(0)
    setCloudUrl(null)
    setIsUploaded(false)
  }

  // When the user selects media from frontend
  const handleMediaChange = (file, type) => {
    // 1. Save local file info
    setMedia(file)
    setMediaType(type)
    setMediaPreview(URL.createObjectURL(file))
    setModalOpen(true)

    // 2. Start background upload
    handlePostImmediately(file, type)
  }

  // Upload media immediately after selection
  const handlePostImmediately = async (file, type) => {
    if (!file) return

    const formData = new FormData()
    formData.append('media', file)

    try {
      setUploadProgress(10)
      setIsUploaded(false)
      setCloudUrl(null)

      // Fake progress until 90%
     const progressInterval = setInterval(() => {
       setUploadProgress((prev) => {
         if (prev >= 90) {
           clearInterval(progressInterval)
           return prev
         }

         // Dynamic speed:
         let increment = 0

         if (prev < 50) increment = 3 // fast start
         else if (prev < 80) increment = 2 // medium
         else increment = 1 // slow near 90%

         return prev + increment
       })
     }, 500)


      // Actual upload API call
      const res = await handlePostMediaImmediately(formData)

      console.log("response of handlePostMediaImmidiatly : ", res)

      clearInterval(progressInterval)
      setUploadProgress(100)

      if (res.success) {
        // ⭐ Save cloudinary URL and mark upload complete
        setTempMediaId(res.tempMediaId) 
        setCloudUrl(res.url)
        setIsUploaded(true)

        toast.success(`${type} uploaded successfully`)
      } else {
        toast.error(res.message || `Failed to upload ${type}`)
        setUploadProgress(0)
      }
    } catch (err) {
      console.error(err)
      toast.error('Something went wrong while posting')
      setUploadProgress(0)
    }
  }

  // Final create post button
  const handlePost = async () => {
    if (!content.trim() && !media) {
      toast.error('Post content or media required')
      return
    }

    const formData = new FormData()
    formData.append('content', content)

    // If media was uploaded — save Cloudinary URL instead of file
    if (isUploaded && cloudUrl) {
      formData.append('mediaUrl', cloudUrl)
      formData.append('mediaType', mediaType)
    }

    try {
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
    }
  }

  return (
    <>
      {/* Main Post Box */}
      <div className="w-full max-w-xl bg-white rounded-2xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-all duration-300">
        <div className="flex items-center gap-4">
          <UserAvatar user={user} size="md" />

          <div
            className="flex-1 bg-gray-50 hover:bg-gray-100 rounded-full px-6 py-4 cursor-pointer transition-all duration-200 border border-gray-200 hover:border-gray-300"
            onClick={handleOpenModal}
          >
            <span className="text-gray-600 text-base">Start a post...</span>
          </div>

          <MediaUpload
            onMediaChange={handleMediaChange}
            fileInputRef={fileInputRef}
          />
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
          uploadProgress={uploadProgress}
          cloudUrl={cloudUrl}
          isUploaded={isUploaded}
          tempMediaId={tempMediaId}
          setCloudUrl={setCloudUrl}
        />
      )}
    </>
  )
}

export default CreatePost
