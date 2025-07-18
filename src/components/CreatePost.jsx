import { useState, useRef } from 'react'
import { IoMdImages } from 'react-icons/io'
import { handledecodeToken } from '../utils/userDetailByToken'
import { addPost } from '../api/postApi'
import toast from 'react-hot-toast'

const CreatePost = () => {
  const [modalOpen, setModalOpen] = useState(false)
  const [content, setContent] = useState('')
  const [image, setImage] = useState(null)
  const [imagePreview, setImagePreview] = useState(null)
  const fileInputRef = useRef(null)

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
    }
  }

  const handlePost = async() => {
    const res = await addPost(content)
    if(res.success){
      console.log("post created successfully")
      console.log(res.post.content)
      toast.success("Post created successfully")
    }
    handleCloseModal()
  }

  return (
    <>
      {/* Rounded rectangle clickable area to open modal */}
      <div className="w-full max-w-xl flex items-center gap-4 mb-6">
        <div className="avatar">
          <div className="w-12 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
            <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" alt="User avatar" />
          </div>
        </div>
        <div
          className="flex-1 input input-bordered bg-white rounded-full px-6 py-3 text-base-content/70 cursor-pointer hover:bg-base-200 transition text-lg font-normal border border-base-300 shadow"
          onClick={handleOpenModal}
        >
          Start a post...
        </div>
        <button className="btn btn-ghost btn-circle text-2xl" onClick={e => {e.stopPropagation(); fileInputRef.current.click();}}>
          <IoMdImages />
        </button>
        <input type="file" accept="image/*" className="hidden" ref={fileInputRef} onChange={handleImageChange} />
      </div>

      {/* Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="bg-white rounded-xl shadow-lg w-full max-w-3xl p-12 relative">
            <button className="absolute top-2 right-2 btn btn-sm btn-circle btn-ghost" onClick={handleCloseModal}>&times;</button>
            <div className="flex items-center gap-3 mb-4">
              <div className="avatar">
                <div className="w-12 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                  <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" alt="User avatar" />
                </div>
              </div>
              <div className="font-semibold">You</div>
            </div>
            <textarea
              className="textarea textarea-bordered w-full min-h-[260px] max-h-[500px] resize-none focus:outline-none mb-1 text-xl"
              placeholder="What's on your mind?"
              value={content}
              onChange={e => setContent(e.target.value)}
              maxLength={WORD_LIMIT * 10} // Prevents absurdly long input
            />
            <div className="flex items-center justify-between mb-2">
              <span className={`text-sm ${overLimit ? 'text-error font-semibold' : 'text-base-content/60'}`}>{wordCount} / {WORD_LIMIT} words</span>
              {overLimit && <span className="text-error text-xs ml-2">Word limit exceeded!</span>}
            </div>
            {imagePreview && (
              <div className="mb-3">
                <img src={imagePreview} alt="Preview" className="rounded-lg max-h-60 object-contain mx-auto" />
                <button className="btn btn-xs btn-error mt-2" onClick={() => {setImage(null); setImagePreview(null);}}>Remove Image</button>
              </div>
            )}
            <div className="flex gap-2 mt-2 justify-end">
              <button className="btn btn-ghost" onClick={handleCloseModal}>Cancel</button>
              <button className="btn btn-primary" onClick={handlePost} disabled={(!content.trim() && !image) || overLimit}>Post</button>
            </div>
            <input type="file" accept="image/*" className="hidden" ref={fileInputRef} onChange={handleImageChange} />
            <button className="btn btn-ghost btn-circle text-2xl absolute bottom-8 left-8" onClick={e => {e.preventDefault(); fileInputRef.current.click();}}>
              <IoMdImages />
            </button>
          </div>
        </div>
      )}
    </>
  )
}

export default CreatePost 