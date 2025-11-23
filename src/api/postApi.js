import axios from '../utils/axiosConfig'

const BASE_URL = import.meta.env.VITE_API_BASE_URL

/* ===========================================
   CREATE POST
=========================================== */
export const addPost = async (content, tempMediaId) => {
  const api = `${BASE_URL}/posts`
  try {
    const response = await axios.post(api, { content, tempMediaId })
    return response.data
  } catch (error) {
    console.error('Add post failed:', error)
    throw error
  }
}

/* ===========================================
   FETCH POSTS
=========================================== */

// Get all posts (feed)
export const fetchAllPosts = async (page = 1) => {
  const api = `${BASE_URL}/posts?page=${page}&limit=10`
  try {
    const response = await axios.get(api)
    return response.data
  } catch (error) {
    throw error
  }
}

// Get posts by a specific user
export const fetchUserPosts = async (userId, page = 1) => {
  const api = `${BASE_URL}/posts/user/${userId}?page=${page}&limit=10`
  try {
    const response = await axios.get(api)
    return response.data
  } catch (error) {
    throw error
  }
}

/* ===========================================
   LIKE, COMMENT, REPOST
=========================================== */

export const onLikePost = async (postId) => {
  const api = `${BASE_URL}/posts/${postId}/like`
  try {
    const res = await axios.patch(api)
    return res.data
  } catch (error) {
    console.error('Error liking post:', error.response?.data || error.message)
    throw error
  }
}

export const addCommentToPost = async (postId, commentText) => {
  const api = `${BASE_URL}/posts/${postId}/comments`
  try {
    const res = await axios.post(api, { text: commentText })
    return res.data
  } catch (error) {
    console.error(
      'Error adding comment:',
      error.response?.data || error.message
    )
    throw error
  }
}

export const repostPost = async (postId, message) => {
  const api = `${BASE_URL}/posts/${postId}/reposts`
  try {
    const response = await axios.post(api, { message })
    return response.data
  } catch (error) {
    console.error(
      'Error reposting post:',
      error.response?.data || error.message
    )
    throw error
  }
}

/* ===========================================
   SAVE / UNSAVE
=========================================== */

export const savePost = async (postId) => {
  const api = `${BASE_URL}/posts/${postId}/save`
  try {
    const response = await axios.post(api)
    console.log(postId, ' Post id in save post api function')
    console.log("response of save post function ", response)
    if (!response.data.success) {
      throw new Error(response.data.message || 'Failed to save post')
    }
    return response.data
  } catch (error) {
    console.error('Error saving post:', error)
    throw error
  }
}

export const getSavedPosts = async () => {
  const api = `${BASE_URL}/posts/saved`
  try {
    const response = await axios.get(api)

    if (!response.data.success) {
      throw new Error(response.data.message || 'Failed to fetch saved posts')
    }

    return response.data
  } catch (error) {
    console.error('Error fetching saved posts:', error)
    throw error
  }
}

/* ===========================================
   DELETE POST
=========================================== */

export const deletePost = async (postId) => {
  const api = `${BASE_URL}/posts/${postId}`
  try {
    const response = await axios.delete(api)

    if (!response.data.success) {
      throw new Error(response.data.message || 'Failed to delete post')
    }

    return response.data
  } catch (error) {
    console.error('Delete post failed:', error)
    throw error
  }
}

/* ===========================================
   SEARCH POSTS
=========================================== */

export const searchPosts = async (query) => {
  const api = `${BASE_URL}/posts/search?query=${encodeURIComponent(query)}`
  const response = await axios.get(api)
  return response.data
}

/* ===========================================
   GET SINGLE POST
=========================================== */

export const getSinglePostById = async (postId) => {
  const api = `${BASE_URL}/posts/${postId}`

  try {
    const response = await axios.get(api)

    if (response.status !== 200) {
      throw new Error(response.data.message || 'Failed to fetch post')
    }

    return response.data
  } catch (error) {
    console.error('Error fetching single post:', error)
    throw error
  }
}



