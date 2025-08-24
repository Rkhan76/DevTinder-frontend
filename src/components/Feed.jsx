import { useEffect, useState, useCallback } from 'react'
import { FromScratch } from './FromScratch'
import { fetchAllPosts } from '../api/postApi'

const Feed = () => {
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [hasMore, setHasMore] = useState(true)

  const fetchData = useCallback(
    async (page) => {
      // Store current loading state in a variable to prevent race conditions
      const currentlyLoading = loading
      if (!hasMore || currentlyLoading) return

      try {
        setLoading(true)
        setError(null)
        const res = await fetchAllPosts(page)

        console.log(res, " res in Feed.jsx")
        // Only update state if the component is still mounted
        const newData = res?.data || []
        if (newData.length === 0) {
          setHasMore(false)
        } else {
          setPosts((prev) => [...prev, ...newData])
        }
      } catch (err) {
        console.error('Error fetching posts:', err)
        setError(err)
      } finally {
        setLoading(false)
      }
    },
    [hasMore] // Remove loading from dependencies
  )

  useEffect(() => {
    fetchData(1)
  }, [fetchData])

  return (
    <div className="w-full flex flex-col gap-6">
      <FromScratch
        posts={posts}
        fetchData={fetchData}
        loading={loading}
        error={error}
      />
      {!hasMore && !loading && posts.length > 0 && (
        <div className="text-center p-4 text-gray-600">
          No more posts to load
        </div>
      )}
    </div>
  )
}

export default Feed
