const MediaPreview = ({ media, mediaType, mediaPreview, onRemove }) => {
  if (!mediaPreview) return null

  return (
    <div className="mt-6 p-4 bg-gray-50 rounded-2xl">
      {mediaType === 'image' ? (
        <img
          src={mediaPreview}
          alt="Preview"
          className="rounded-xl max-h-60 object-contain mx-auto shadow-sm"
        />
      ) : (
        <video
          src={mediaPreview}
          controls
          className="rounded-xl max-h-60 object-contain mx-auto shadow-sm"
        >
          Your browser does not support the video tag.
        </video>
      )}
      <div className="flex items-center justify-between mt-3">
        <span className="text-sm text-gray-600 capitalize">
          {mediaType} • {media?.name}
        </span>
        <button
          className="px-4 py-2 bg-red-50 hover:bg-red-100 text-red-600 rounded-lg text-sm font-medium transition-colors duration-200"
          onClick={onRemove}
        >
          Remove {mediaType}
        </button>
      </div>
    </div>
  )
}

export default MediaPreview
