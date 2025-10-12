import { useCallback } from 'react'
import { useInfiniteScroll } from '../hooks/useInfiniteScroll'
import PostCard from './PostCardComponents/PostCard'
import ProfileButton from './ProfileButton'

export const FromScratch = ({ posts, fetchData, loading, error }) => {
  // Memoize fetchData to prevent unnecessary re-renders
  const handleLoadMore = useCallback((page) => fetchData(page), [fetchData])

  // Pass loading state to useInfiniteScroll to prevent requests while loading
  useInfiniteScroll(handleLoadMore, loading)

  return (
    <div>
      <div className="friendkit-card mb-6 p-6">
        <div className="flex justify-between items-center">
          <div className="flex flex-col">
            <h2 className="text-2xl font-bold text-slate-800">Posts</h2>
            <p className="text-slate-600 mt-1">Discover what's happening</p>
          </div>
          <div className="flex gap-3">
            <ProfileButton text={'Recent'} />
            <ProfileButton text={'Popular'} />
          </div>
        </div>
      </div>

      <div className="space-y-6">
        {posts.map((post, index) => (
          <PostCard post={post} key={index} />
        ))}
      </div>

      {loading && (
        <div className="flex justify-center py-8">
          <div className="loading loading-spinner loading-lg text-indigo-600"></div>
        </div>
      )}

      {error && (
        <div className="friendkit-card p-6 text-center">
          <p className="text-red-500">Error: {error.message}</p>
        </div>
      )}
    </div>
  )
}
