const WORD_LIMIT = 300

const PostForm = ({ content, setContent }) => {
  const wordCount = content.trim() ? content.trim().split(/\s+/).length : 0
  const overLimit = wordCount > WORD_LIMIT

  return (
    <>
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
    </>
  )
}

export default PostForm
