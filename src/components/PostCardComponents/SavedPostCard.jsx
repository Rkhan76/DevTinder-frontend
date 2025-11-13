import { useState, useRef, useEffect } from 'react'
import { MoreVertical, Link as LinkIcon, BookmarkMinus } from 'lucide-react'

export default function SavedPostCard({
  id,
  author,
  title,
  profileImage,
  content,
  image,
  timestamp,
  onUnsave,
}) {
  const [menuOpen, setMenuOpen] = useState(false)
  const menuRef = useRef(null)

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleCopyLink = () => {
    const link = `${window.location.origin}/post/${id}`
    navigator.clipboard.writeText(link)
    alert('Post link copied!')
    setMenuOpen(false)
  }

  return (
    <div className="relative bg-white rounded-2xl shadow-sm border border-slate-200 p-6 mb-4">
      {/* Three-dot menu button */}
      <div className="absolute top-4 right-4" ref={menuRef}>
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="p-2 rounded-full hover:bg-slate-100"
        >
          <MoreVertical className="w-5 h-5 text-slate-600" />
        </button>

        {/* Dropdown Menu */}
        {menuOpen && (
          <div className="absolute right-0 mt-2 w-40 bg-white border border-slate-200 rounded-xl shadow-lg z-50">
            {/* Unsave */}
            <button
              onClick={() => {
                onUnsave?.(id)
                setMenuOpen(false)
              }}
              className="w-full flex items-center gap-2 px-4 py-2 text-sm text-slate-700 hover:bg-slate-50"
            >
              <BookmarkMinus className="w-4 h-4 text-slate-500" />
              Unsave Post
            </button>

            {/* Copy Link */}
            <button
              onClick={handleCopyLink}
              className="w-full flex items-center gap-2 px-4 py-2 text-sm text-slate-700 hover:bg-slate-50"
            >
              <LinkIcon className="w-4 h-4 text-slate-500" />
              Copy Link
            </button>
          </div>
        )}
      </div>

      {/* Author Info */}
      <div className="flex items-center gap-3 mb-4">
        <img
          src={profileImage || '/placeholder.svg'}
          alt={author}
          width={48}
          height={48}
          className="rounded-full object-cover"
        />

        <div className="flex-1">
          <h4 className="font-bold text-slate-900">{author}</h4>
          <p className="text-xs text-slate-500">{title}</p>
          <p className="text-xs text-slate-400">{timestamp}</p>
        </div>
      </div>

      {/* Post Content */}
      <div className="mb-4">
        <p className="text-slate-700 text-sm leading-relaxed">{content}</p>
      </div>

      {/* Post Image */}
      {image && (
        <div className="mb-4 rounded-xl overflow-hidden">
          <img
            src={image}
            alt="Post content"
            className="w-full h-auto object-cover rounded-xl"
          />
        </div>
      )}
    </div>
  )
}
