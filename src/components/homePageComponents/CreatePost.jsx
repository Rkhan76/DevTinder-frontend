import { useState, useRef } from 'react'
import { IoMdImages, IoMdVideocam } from 'react-icons/io'
import { addPost } from '../../api/postApi'
import toast from 'react-hot-toast'
import { useSelector } from 'react-redux'
import { getAvatarColor, getInitials } from '../../utils/userAvtar'

const CreatePost = () => {
  const [modalOpen, setModalOpen] = useState(false)
  const [content, setContent] = useState('')
  const [media, setMedia] = useState(null)
  const [mediaType, setMediaType] = useState(null) // 'image' or 'video'
  const [creatingPostLoading, setCreatingPostLoading] = useState(false)
  const [mediaPreview, setMediaPreview] = useState(null)
  const fileInputRef = useRef(null)
  const user = useSelector((state) => state.auth.user)

  const WORD_LIMIT = 300
  const wordCount = content.trim() ? content.trim().split(/\s+/).length : 0
  const overLimit = wordCount > WORD_LIMIT

  const handleOpenModal = () => setModalOpen(true)
  const handleCloseModal = () => {
    setModalOpen(false)
    setContent('')
    setMedia(null)
    setMediaType(null)
    setMediaPreview(null)

    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  const handleMediaChange = (e, type) => {
    const file = e.target.files[0]
    if (file) {
      // Validate file size (10MB limit)
      const maxSize = 10 * 1024 * 1024 // 10MB in bytes
      if (file.size > maxSize) {
        toast.error(`File size too large. Maximum size is 10MB.`)
        return
      }

      // Validate file type
      if (type === 'image' && !file.type.startsWith('image/')) {
        toast.error('Please select a valid image file')
        return
      }

      if (type === 'video' && !file.type.startsWith('video/')) {
        toast.error('Please select a valid video file')
        return
      }

      setMedia(file)
      setMediaType(type)
      setMediaPreview(URL.createObjectURL(file))

      if (!modalOpen) {
        handleOpenModal()
      }
    }
  }

  const handleImageUpload = () => {
    if (fileInputRef.current) {
      fileInputRef.current.accept = 'image/*'
      fileInputRef.current.click()
    }
  }

  const handleVideoUpload = () => {
    if (fileInputRef.current) {
      fileInputRef.current.accept = 'video/*'
      fileInputRef.current.click()
    }
  }

  const handlePost = async () => {
    if (!content.trim() && !media) {
      toast.error('Post content or media required')
      return
    }

    const formData = new FormData()
    formData.append('content', content)
    if (media) {
      formData.append('media', media)
    }

    try {
      setCreatingPostLoading(true)
      const res = await addPost(formData)
      if (res.success) {
        toast.success('Post created successfully')
        handleCloseModal()
      } else {
        toast.error(res.message || 'Failed to create post')
      }
      setCreatingPostLoading(false)
    } catch (err) {
      console.error(err)
      setCreatingPostLoading(false)
      toast.error('Something went wrong while posting')
    }
  }

  return (
    <>
      <div className="w-full max-w-xl bg-white rounded-2xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-all duration-300">
        <div className="flex items-center gap-4">
          <div className="relative">
            {user?.image ? (
              <div className="w-12 h-12 rounded-full overflow-hidden ring-2 ring-blue-100 hover:ring-blue-200 transition-all duration-200">
                <img
                  alt="User avatar"
                  src={user?.image || '/placeholder.svg'}
                  className="w-full h-full object-cover"
                />
              </div>
            ) : (
              <div
                className={`flex items-center justify-center w-12 h-12 rounded-full ring-2 ring-blue-100 hover:ring-blue-200 transition-all duration-200 ${getAvatarColor(
                  user?.fullName
                )}`}
              >
                <span className="text-white font-semibold text-sm">
                  {getInitials(user?.fullName)}
                </span>
              </div>
            )}
          </div>
          <div
            className="flex-1 bg-gray-50 hover:bg-gray-100 rounded-full px-6 py-4 cursor-pointer transition-all duration-200 border border-gray-200 hover:border-gray-300"
            onClick={handleOpenModal}
          >
            <span className="text-gray-600 text-base">Start a post...</span>
          </div>

          {/* Media Upload Buttons */}
          <div className="flex gap-2">
            <button
              className="p-3 rounded-full hover:bg-blue-50 text-blue-600 hover:text-blue-700 transition-all duration-200 group"
              onClick={(e) => {
                e.stopPropagation()
                handleImageUpload()
              }}
              title="Add image"
            >
              <IoMdImages className="text-2xl group-hover:scale-110 transition-transform duration-200" />
            </button>
            <button
              className="p-3 rounded-full hover:bg-green-50 text-green-600 hover:text-green-700 transition-all duration-200 group"
              onClick={(e) => {
                e.stopPropagation()
                handleVideoUpload()
              }}
              title="Add video"
            >
              <IoMdVideocam className="text-2xl group-hover:scale-110 transition-transform duration-200" />
            </button>
          </div>

          <input
            type="file"
            className="hidden"
            ref={fileInputRef}
            onChange={(e) => {
              if (fileInputRef.current.accept === 'image/*') {
                handleMediaChange(e, 'image')
              } else {
                handleMediaChange(e, 'video')
              }
            }}
          />
        </div>
      </div>

      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-2xl relative max-h-[90vh] overflow-hidden">
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 px-8 py-6 border-b border-gray-100">
              <button
                className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/80 hover:bg-white shadow-sm hover:shadow-md flex items-center justify-center text-gray-500 hover:text-gray-700 transition-all duration-200"
                onClick={handleCloseModal}
              >
                <span className="text-xl font-light">&times;</span>
              </button>
              <div className="flex items-center gap-4">
                <div className="relative">
                  {user?.image ? (
                    <div className="w-14 h-14 rounded-full overflow-hidden ring-3 ring-white shadow-md">
                      <img
                        alt="User avatar"
                        src={user?.image || '/placeholder.svg'}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ) : (
                    <div
                      className={`flex items-center justify-center w-14 h-14 rounded-full ring-3 ring-white shadow-md ${getAvatarColor(
                        user?.fullName
                      )}`}
                    >
                      <span className="text-white font-semibold">
                        {getInitials(user?.fullName)}
                      </span>
                    </div>
                  )}
                </div>
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

            <div className="p-8 overflow-y-auto max-h-[60vh]">
              <textarea
                className="w-full min-h-[200px] max-h-[300px] resize-none border-none outline-none text-lg text-gray-800 placeholder-gray-400 leading-relaxed"
                placeholder="What's on your mind?"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                maxLength={WORD_LIMIT * 10}
              />

              <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100">
                <span
                  className={`text-sm font-medium ${
                    overLimit ? 'text-red-500' : 'text-gray-500'
                  }`}
                >
                  {wordCount} / {WORD_LIMIT} words
                </span>
                {overLimit && (
                  <span className="text-red-500 text-sm bg-red-50 px-3 py-1 rounded-full">
                    Word limit exceeded!
                  </span>
                )}
              </div>

              {mediaPreview && (
                <div className="mt-6 p-4 bg-gray-50 rounded-2xl">
                  {mediaType === 'image' ? (
                    <img
                      src={mediaPreview || '/placeholder.svg'}
                      alt="Preview"
                      className="rounded-xl max-h-60 object-contain mx-auto shadow-sm"
                    />
                  ) : (
                    <video
                      src={mediaPreview}
                      controls
                      className="rounded-xl max-h-60 object-contain mx-auto shadow-sm"
                    >
                      Your browser does not support the video tag.
                    </video>
                  )}
                  <div className="flex items-center justify-between mt-3">
                    <span className="text-sm text-gray-600 capitalize">
                      {mediaType} • {media?.name}
                    </span>
                    <button
                      className="px-4 py-2 bg-red-50 hover:bg-red-100 text-red-600 rounded-lg text-sm font-medium transition-colors duration-200"
                      onClick={() => {
                        setMedia(null)
                        setMediaType(null)
                        setMediaPreview(null)
                      }}
                    >
                      Remove {mediaType}
                    </button>
                  </div>
                </div>
              )}
            </div>

            <div className="px-8 py-6 bg-gray-50 border-t border-gray-100 flex items-center justify-between">
              <div className="flex gap-2">
                <button
                  className="p-3 rounded-full hover:bg-blue-50 text-blue-600 hover:text-blue-700 transition-all duration-200 group"
                  onClick={handleImageUpload}
                  title="Add image"
                >
                  <IoMdImages className="text-2xl group-hover:scale-110 transition-transform duration-200" />
                </button>
                <button
                  className="p-3 rounded-full hover:bg-green-50 text-green-600 hover:text-green-700 transition-all duration-200 group"
                  onClick={handleVideoUpload}
                  title="Add video"
                >
                  <IoMdVideocam className="text-2xl group-hover:scale-110 transition-transform duration-200" />
                </button>
              </div>

              <div className="flex gap-3">
                <button
                  className="px-6 py-3 text-gray-600 hover:text-gray-800 font-medium rounded-xl hover:bg-gray-100 transition-all duration-200"
                  onClick={handleCloseModal}
                >
                  Cancel
                </button>
                <button
                  className="px-8 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                  onClick={handlePost}
                  disabled={(!content.trim() && !media) || overLimit}
                >
                  Post
                </button>
              </div>
            </div>

            <input
              type="file"
              className="hidden"
              ref={fileInputRef}
              onChange={(e) => {
                if (fileInputRef.current.accept === 'image/*') {
                  handleMediaChange(e, 'image')
                } else {
                  handleMediaChange(e, 'video')
                }
              }}
            />

            {creatingPostLoading && (
              <div className="absolute inset-0 bg-white/95 backdrop-blur-sm flex flex-col items-center justify-center rounded-3xl">
                <div className="w-16 h-16 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mb-4"></div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  Creating Post...
                </h3>
                <p className="text-gray-600">
                  {mediaType === 'video'
                    ? 'Processing video...'
                    : 'Uploading your content'}
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  )
}

export default CreatePost
