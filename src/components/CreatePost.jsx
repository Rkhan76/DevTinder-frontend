import { useState, useRef } from 'react'
import { IoMdImages } from 'react-icons/io'
import { handledecodeToken } from '../utils/userDetailByToken'
import { addPost } from '../api/postApi'
import toast from 'react-hot-toast'
import { useSelector } from 'react-redux'
import { getAvatarColor, getInitials } from '../utils/userAvtar'

const CreatePost = () => {
  const [modalOpen, setModalOpen] = useState(false)
  const [content, setContent] = useState('')
  const [image, setImage] = useState(null)
  const [creatingPostLoading, setCreatingPostLoading ] = useState(false)
  const [imagePreview, setImagePreview] = useState(null)
  const fileInputRef = useRef(null)
  const user = useSelector((state) => state.auth.user)

  console.log(user, " user details in current login")

  const WORD_LIMIT = 300;
  const wordCount = content.trim() ? content.trim().split(/\s+/).length : 0;
  const overLimit = wordCount > WORD_LIMIT;

  const handleOpenModal = () => setModalOpen(true)
  const handleCloseModal = () => {
    setModalOpen(false)
    setContent('')
    setImage(null)
    setImagePreview(null)
  }

  const handleImageChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      setImage(file)
      setImagePreview(URL.createObjectURL(file))
      if(!modalOpen){
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
      {/* Rounded rectangle clickable area to open modal */}
      <div className="w-full max-w-xl flex items-center gap-4 mb-6 bg-white py-6 px-3 rounded-lg border-[2px] border-base-300">
        <div className="avatar">
          <div className="w-12 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
            {user?.image ? (
              <div className="w-12 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2 overflow-hidden">
                <img alt="User avatar" src={user?.image} />
              </div>
            ) : (
              <div
                className={`flex items-center justify-center w-12 h-12 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2 overflow-hidden ${getAvatarColor(
                  user?.fullName
                )}`}
              >
                <p className="flex items-center justify-center leading-none h-full">
                  {getInitials(user?.fullName)}
                </p>
              </div>
            )}
          </div>
        </div>
        <div
          className="flex-1 input input-bordered bg-white rounded-full px-6 py-6 text-base-content/70 cursor-pointer hover:bg-base-200 transition text-lg font-normal border border-base-300 shadow"
          onClick={handleOpenModal}
        >
          Start a post...
        </div>
        <button
          className="btn btn-ghost btn-circle text-2xl"
          onClick={(e) => {
            e.stopPropagation()
            fileInputRef.current.click()
          }}
        >
          <IoMdImages />
        </button>
        <input
          type="file"
          accept="image/*"
          className="hidden"
          ref={fileInputRef}
          onChange={handleImageChange}
        />
      </div>

      {/* Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="bg-white rounded-xl shadow-lg w-full max-w-3xl p-12 relative max-h-[90vh] overflow-y-auto">
            <button
              className="absolute top-2 right-2 btn btn-sm btn-circle btn-ghost text-2xl"
              onClick={handleCloseModal}
            >
              &times;
            </button>
            <div className="flex items-center gap-3 mb-4">
              <div className="avatar">
                <div className="w-12 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                  {user?.image ? (
                    <div className="w-12 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2 overflow-hidden">
                      <img alt="User avatar" src={user?.image} />
                    </div>
                  ) : (
                    <div
                      className={`flex items-center justify-center w-12 h-12 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2 overflow-hidden ${getAvatarColor(
                        user?.fullName
                      )}`}
                    >
                      <p className="flex items-center justify-center leading-none h-full">
                        {getInitials(user?.fullName)}
                      </p>
                    </div>
                  )}
                </div>
              </div>
              <div className="font-semibold">You</div>
            </div>
            <textarea
              className="textarea textarea-bordered w-full min-h-[260px] max-h-[500px] resize-none focus:outline-none mb-1 text-xl"
              placeholder="What's on your mind?"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              maxLength={WORD_LIMIT * 10}
            />
            <div className="flex items-center justify-between mb-2">
              <span
                className={`text-sm ${
                  overLimit
                    ? 'text-error font-semibold'
                    : 'text-base-content/60'
                }`}
              >
                {wordCount} / {WORD_LIMIT} words
              </span>
              {overLimit && (
                <span className="text-error text-xs ml-2">
                  Word limit exceeded!
                </span>
              )}
            </div>
            {imagePreview && (
              <div className="mb-3">
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="rounded-lg max-h-60 object-contain mx-auto"
                />
                <button
                  className="btn btn-xs btn-error mt-2"
                  onClick={() => {
                    setImage(null)
                    setImagePreview(null)
                  }}
                >
                  Remove Image
                </button>
              </div>
            )}
            <div className="flex gap-2 mt-2 justify-end">
              <button className="btn btn-ghost" onClick={handleCloseModal}>
                Cancel
              </button>
              <button
                className="btn btn-primary"
                onClick={handlePost}
                disabled={(!content.trim() && !image) || overLimit}
              >
                Post
              </button>
            </div>
            <input
              type="file"
              accept="image/*"
              className="hidden"
              ref={fileInputRef}
              onChange={handleImageChange}
            />
            <button
              className="btn btn-ghost btn-circle text-2xl absolute bottom-8 left-8"
              onClick={(e) => {
                e.preventDefault()
                fileInputRef.current.click()
              }}
            >
              <IoMdImages />
            </button>

            {/* Progress Bar Loading Indicator */}
            {creatingPostLoading && (
              <div className="absolute inset-0 bg-white/80 flex flex-col items-center justify-center rounded-xl gap-2">
                <span className="text-lg font-medium">Creating Post...</span>
                <progress className="progress progress-primary w-56"></progress>
                <span className="text-sm text-gray-500">
                  Uploading your content
                </span>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  )
}

export default CreatePost 