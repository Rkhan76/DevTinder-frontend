// src/components/homePageComponents/CreatePost/MediaUpload.jsx
import { IoMdImages, IoMdVideocam } from 'react-icons/io'
import toast from 'react-hot-toast'
import { useRef } from 'react'

const MediaUpload = ({ onMediaChange, fileInputRef }) => {
  const handleFileSelect = (type) => {
    if (!fileInputRef.current) {
      console.error('File input not found')
      return
    }

    fileInputRef.current.accept = type === 'image' ? 'image/*' : 'video/*'
    fileInputRef.current.onchange = null

    fileInputRef.current.onchange = (e) => {
      const file = e.target.files[0]
      if (!file) return

      const maxSize = 70 * 1024 * 1024
      if (file.size > maxSize) {
        toast.error('File size too large. Maximum size is 50MB.')
        return
      }

      if (type === 'image' && !file.type.startsWith('image/')) {
        toast.error('Please select a valid image file')
        return
      }

      if (type === 'video' && !file.type.startsWith('video/')) {
        toast.error('Please select a valid video file')
        return
      }

      onMediaChange(file, type)
      e.target.value = ''
    }

    fileInputRef.current.click()
  }

  return (
    <div className="flex gap-2">
      <button
        className="p-3 rounded-full hover:bg-blue-50 text-blue-600 hover:text-blue-700 transition-all duration-200 group"
        onClick={(e) => {
          e.stopPropagation()
          handleFileSelect('image')
        }}
        title="Add image"
      >
        <IoMdImages className="text-2xl group-hover:scale-110 transition-transform duration-200" />
      </button>
      <button
        className="p-3 rounded-full hover:bg-green-50 text-green-600 hover:text-green-700 transition-all duration-200 group"
        onClick={(e) => {
          e.stopPropagation()
          handleFileSelect('video')
        }}
        title="Add video"
      >
        <IoMdVideocam className="text-2xl group-hover:scale-110 transition-transform duration-200" />
      </button>

      {/* Hidden file input */}
      <input type="file" className="hidden" ref={fileInputRef} />
    </div>
  )
}

export default MediaUpload
