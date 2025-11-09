const PostLikesPreview = ({ likedBy, likeCount, currentUserId }) => {
  if (likeCount === 0) return null

  return (
    <div className="flex items-center gap-3 py-3">
      <div className="flex -space-x-2">
        {likedBy
          .filter((liker) => liker?._id !== currentUserId)
          .slice(0, 3)
          .map((liker, index) => (
            <img
              key={index}
              src={liker.image || '/placeholder.svg'}
              alt={liker.fullName}
              className="w-7 h-7 rounded-full border-2 border-white object-cover shadow-sm hover:scale-110 transition-transform duration-200"
            />
          ))}
      </div>
      <span className="text-sm text-gray-600 font-medium">
        {likeCount} {likeCount === 1 ? 'like' : 'likes'}
      </span>
    </div>
  )
}

export default PostLikesPreview
