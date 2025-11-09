import ReadMoreText from '../Reusable-Ui/ReadMoreText'

const PostContent = ({ content, tags, isRepost = false }) => {
  return (
    <div
      className={`px-6 py-2 ${
        isRepost ? 'bg-gray-50 rounded-lg mx-6 mb-4 border border-gray-200' : ''
      }`}
    >
      {content && (
        <div className="text-base leading-relaxed text-gray-800 m-0 break-words font-normal">
          <ReadMoreText text={content} />
        </div>
      )}

      {/* Show tags sepratly */}
      {/* {tags && tags.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-4">
          {tags.map((tag, index) => (
            <span
              key={index}
              className="text-sm text-blue-600 bg-blue-50 px-3 py-1.5 rounded-full font-medium hover:bg-blue-100 transition-colors duration-200 cursor-pointer"
            >
              #{tag}
            </span>
          ))}
        </div>
      )} */}
    </div>
  )
}

export default PostContent
