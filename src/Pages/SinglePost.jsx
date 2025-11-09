// components/SinglePostPage.js
import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { getSinglePostById } from '../api/postApi'
import PostCard from '../components/PostCardComponents/PostCard'
import toast from 'react-hot-toast'

const SinglePostPage = () => {
  const { postId } = useParams()
  const [post, setPost] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchPost = async () => {
      try {
        setLoading(true)
        const response = await getSinglePostById(postId)
        console.log(response, " resp in single post")
        if (response.success) {
          setPost(response.data)
        }
      } catch (err) {
        setError(err.message)
        toast.error('Failed to load post')
      } finally {
        setLoading(false)
      }
    }

    if (postId) {
      fetchPost()
    }
  }, [postId])

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-red-500 text-center">
          <p className="text-lg font-semibold">Failed to load post</p>
          <p className="text-sm">{error}</p>
        </div>
      </div>
    )
  }

  if (!post) {
    return (
      <div className="flex justify-center items-center h-64">
        <p className="text-gray-500">Post not found</p>
      </div>
    )
  }

  return (
    <div className="max-w-2xl mx-auto py-6">
      <PostCard post={post} />
    </div>
  )
}

export default SinglePostPage
