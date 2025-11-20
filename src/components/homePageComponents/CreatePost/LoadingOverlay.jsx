const LoadingOverlay = ({ mediaType }) => (
  <div className="absolute inset-0 bg-white/95 backdrop-blur-sm flex flex-col items-center justify-center rounded-3xl">
    <div className="w-16 h-16 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mb-4"></div>
    <h3 className="text-xl font-semibold text-gray-800 mb-2">
      Creating Post...
    </h3>
    <p className="text-gray-600">
      {mediaType === 'video' ? 'Processing video...' : 'Uploading your content'}
    </p>
  </div>
)

export default LoadingOverlay
