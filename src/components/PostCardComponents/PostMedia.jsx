const PostMedia = ({ media, isRepost = false }) => {
  if (!media?.[0]?.url) return null

  return (
    <div
      className={`relative overflow-hidden ${
        isRepost ? 'mx-6 mb-4' : 'mt-4'
      } border-t border-gray-100`}
    >
      <img
        src={media[0].url}
        alt="Post content"
        className="w-full h-auto object-cover hover:scale-105 transition-transform duration-500"
      />
    </div>
  )
}

export default PostMedia
