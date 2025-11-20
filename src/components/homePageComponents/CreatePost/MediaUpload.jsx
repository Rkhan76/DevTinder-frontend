import { IoMdImages, IoMdVideocam } from 'react-icons/io'
import toast from 'react-hot-toast'
import { useRef } from 'react'

const MediaUpload = ({ onMediaChange }) => {
  const fileInputRef = useRef(null)

  const handleFileSelect = (type) => {
    if (!fileInputRef.current) {
      console.error('File input not found')
      return
    }

    // Set file type filter
    fileInputRef.current.accept = type === 'image' ? 'image/*' : 'video/*'

    // Clear previous event listeners
    fileInputRef.current.onchange = null

    // Set up new event listener
    fileInputRef.current.onchange = (e) => {
      const file = e.target.files[0]
      if (!file) return

      // Validate file size (10MB limit)
      const maxSize = 10 * 1024 * 1024
      if (file.size > maxSize) {
        toast.error('File size too large. Maximum size is 10MB.')
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

      // If valid, call the parent function
      onMediaChange(file, type)

      // Reset the input for next selection
      e.target.value = ''
    }

    // Trigger the file input click
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
