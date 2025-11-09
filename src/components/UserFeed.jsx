import { useEffect, useState } from 'react'
import { fetchUserPosts } from '../api/postApi'
import { FromScratch } from './FromScratch'

const UserFeed = ({ userId }) => {
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const fetchData = async (page) => {
    try {
      setLoading(true)
      const res = await fetchUserPosts(userId, page)

      if (res.success) {
        const newData = res?.data
        console.log(res, " post of user profile")
        setPosts((prev) => [...prev, ...newData])
        setLoading(false)
      }
    } catch (err) {
      setError(err)
      setLoading(false)
    }
  }

  useEffect(() => {
    setPosts([]) // Reset posts when userId changes
    fetchData(1)
  }, [userId])

  return (
    <div className="w-full  flex flex-col gap-6">
      <FromScratch
        posts={posts}
        fetchData={fetchData}
        loading={loading}
        error={error}
      />
    </div>
  )
}

export default UserFeed
