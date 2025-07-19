import React, { useState } from 'react';

const PostCard = ({
  user = {
    name: 'Jenna Davis',
    avatar:'https://uttariya.com/cdn/shop/files/Kurta2024-08.jpg?v=1716432538&width=1507',
    timestamp: 'October 17 2018, 11:03am',
  },
  content = "Today i visited this amazing little fashion store in Church street. Everything is handmade, from skirts to bags. Their products really have an outstanding quality. If you don't know them already, well it's time to make your move!",
  image = 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=600&h=400&fit=crop',
  likes = 32,
  shares = 4,
  comments = 5,
  likedBy = ['Milly', 'David'],
  isLiked = false,
  onLike,
  onShare,
  onComment,
}) => {
  const [liked, setLiked] = useState(isLiked)
  const [likeCount, setLikeCount] = useState(likes)

  const handleLike = () => {
    setLiked(!liked)
    setLikeCount(liked ? likeCount - 1 : likeCount + 1)
    if (onLike) onLike(!liked)
  }


   const handleShare = () => {
     console.log('Post shared')
   }

   const handleComment = () => {
     console.log('Comment button clicked')
   }

  return (
    <div className="bg-gray-50 rounded-xl shadow-md my-4 overflow-hidden mx-auto font-sans">
      {/* Header */}
      <div className="flex justify-between items-center p-4 bg-white">
        <div className="flex items-center gap-3">
          <img
            src={user.avatar}
            alt={user.name}
            className="w-12 h-12 rounded-full object-cover border-2 border-gray-200"
          />
          <div className="flex flex-col">
            <h3 className="text-base font-semibold text-gray-900 leading-tight m-0">
              {user.name}
            </h3>
            <p className="text-sm text-gray-500 leading-tight m-0">
              {user.timestamp}
            </p>
          </div>
        </div>
        <button className="bg-transparent border-none cursor-pointer p-2 rounded-full hover:bg-gray-50 transition-colors duration-200">
          <span className="text-lg text-gray-500 font-bold">⋮</span>
        </button>
      </div>

      {/* Content */}
      <div className="px-4 pb-4 bg-white">
        <p className="text-sm leading-relaxed text-gray-900 m-0">{content}</p>
      </div>

      {/* Image */}
      <div className="relative bg-white">
        <img
          src={image}
          alt="Post content"
          className="w-full h-auto block object-cover"
        />

        {/* Action buttons overlay */}
        <div className="absolute bottom-4 right-4 flex flex-col gap-2">
          <button
            className={`w-11 h-11 rounded-full border-none cursor-pointer flex items-center justify-center transition-all duration-200 shadow-lg hover:scale-105 ${
              onComment ? 'bg-blue-500 hover:bg-blue-600' : 'bg-blue-500'
            }`}
            onClick={onComment}
          >
            <span className="text-lg text-white">💬</span>
          </button>
          <button
            className={`w-11 h-11 rounded-full border-none cursor-pointer flex items-center justify-center transition-all duration-200 shadow-lg hover:scale-105 ${
              onShare ? 'bg-blue-500 hover:bg-blue-600' : 'bg-blue-500'
            }`}
            onClick={onShare}
          >
            <span className="text-lg text-white">🔗</span>
          </button>
          <button
            className={`w-11 h-11 rounded-full border-none cursor-pointer flex items-center justify-center transition-all duration-200 shadow-lg hover:scale-105 ${
              liked ? 'bg-red-500 scale-110' : 'bg-red-500'
            }`}
            onClick={handleLike}
          >
            <span className="text-lg text-white">❤️</span>
          </button>
        </div>
      </div>

      {/* Footer */}
      <div className="p-4 bg-white border-t border-gray-200">
        <div className="flex items-center gap-2 mb-3">
          <div className="flex -space-x-2">
            {likedBy.map((name, index) => (
              <div
                key={index}
                className="w-6 h-6 rounded-full bg-blue-500 text-white flex items-center justify-center text-xs font-semibold border-2 border-white"
              >
                {name.charAt(0)}
              </div>
            ))}
          </div>
          <span className="text-sm text-gray-500">
            {likedBy.join(', ')} and {likeCount - likedBy.length} more liked
            this
          </span>
        </div>

        <div className="flex justify-end gap-4">
          <div className="flex items-center gap-1">
            <span className="text-base text-gray-500">❤️</span>
            <span className="text-sm text-gray-900 font-medium">
              {likeCount}
            </span>
          </div>
          <div className="flex items-center gap-1">
            <span className="text-base text-gray-500">🔗</span>
            <span className="text-sm text-gray-900 font-medium">{shares}</span>
          </div>
          <div className="flex items-center gap-1">
            <span className="text-base text-gray-500">💬</span>
            <span className="text-sm text-gray-900 font-medium">
              {comments}
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PostCard