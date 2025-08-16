import { useState, useRef } from 'react'
import { IoMdImages } from 'react-icons/io'
import { addPost } from '../api/postApi'
import toast from 'react-hot-toast'
import { useSelector } from 'react-redux'
import { getAvatarColor, getInitials } from '../utils/userAvtar'

const CreatePost = () => {
  const [modalOpen, setModalOpen] = useState(false)
  const [content, setContent] = useState('')
  const [image, setImage] = useState(null)
  const [creatingPostLoading, setCreatingPostLoading] = useState(false)
  const [imagePreview, setImagePreview] = useState(null)
  const fileInputRef = useRef(null)
  const user = useSelector((state) => state.auth.user)

  console.log(user, ' user details in current login')

  const WORD_LIMIT = 300
  const wordCount = content.trim() ? content.trim().split(/\s+/).length : 0
  const overLimit = wordCount > WORD_LIMIT

  const handleOpenModal = () => setModalOpen(true)
  const handleCloseModal = () => {
    setModalOpen(false)
    setContent('')
    setImage(null)
    setImagePreview(null)

    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  const handleImageChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      setImage(file)
      setImagePreview(URL.createObjectURL(file))
      if (!modalOpen) {
        handleOpenModal()
      }
    }
  }

  const handlePost = async () => {
    if (!content.trim() && !image) {
      toast.error('Post content or image required')
      return
    }

    const formData = new FormData()
    formData.append('content', content)
    if (image) {
      formData.append('media', image) // key must match multer field name
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
          <button
            className="p-3 rounded-full hover:bg-blue-50 text-blue-600 hover:text-blue-700 transition-all duration-200 group"
            onClick={(e) => {
              e.stopPropagation()
              if (fileInputRef.current) {
                fileInputRef.current.click()
              }
            }}
          >
            <IoMdImages className="text-2xl group-hover:scale-110 transition-transform duration-200" />
          </button>
          <input
            type="file"
            accept="image/*"
            className="hidden"
            ref={fileInputRef}
            onChange={handleImageChange}
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

              {imagePreview && (
                <div className="mt-6 p-4 bg-gray-50 rounded-2xl">
                  <img
                    src={imagePreview || '/placeholder.svg'}
                    alt="Preview"
                    className="rounded-xl max-h-60 object-contain mx-auto shadow-sm"
                  />
                  <button
                    className="mt-3 px-4 py-2 bg-red-50 hover:bg-red-100 text-red-600 rounded-lg text-sm font-medium transition-colors duration-200"
                    onClick={() => {
                      setImage(null)
                      setImagePreview(null)
                    }}
                  >
                    Remove Image
                  </button>
                </div>
              )}
            </div>

            <div className="px-8 py-6 bg-gray-50 border-t border-gray-100 flex items-center justify-between">
              <button
                className="p-3 rounded-full hover:bg-blue-50 text-blue-600 hover:text-blue-700 transition-all duration-200 group"
                onClick={(e) => {
                  e.preventDefault()
                  fileInputRef.current.click()
                }}
              >
                <IoMdImages className="text-2xl group-hover:scale-110 transition-transform duration-200" />
              </button>

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
                  disabled={(!content.trim() && !image) || overLimit}
                >
                  Post
                </button>
              </div>
            </div>

            <input
              type="file"
              accept="image/*"
              className="hidden"
              ref={fileInputRef}
              onChange={handleImageChange}
            />

            {creatingPostLoading && (
              <div className="absolute inset-0 bg-white/95 backdrop-blur-sm flex flex-col items-center justify-center rounded-3xl">
                <div className="w-16 h-16 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mb-4"></div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  Creating Post...
                </h3>
                <p className="text-gray-600">Uploading your content</p>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  )
}

export default CreatePost
