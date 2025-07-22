import axios from '../utils/axiosConfig'

const BASE_URL = import.meta.env.VITE_API_BASE_URL

export const addPost = async (formData) => {
  const api = `${BASE_URL}/post/add`
  try {
    const response = await axios.post(api, formData)
    return response.data
  } catch (error) {
    console.error('Add post failed:', error)
    throw error
  }
}

export const fetchPosts = async (page) => {
  const api = `${BASE_URL}/post/self?page=${page}&limit=10`
  try {
    const response = await axios.get(api)
    return response.data
  } catch (error) {
    throw error
  }
}

export const fetchAllPosts = async (page) => {
  const api = `${BASE_URL}/post/all?page=${page}&limit=10`
  try {
    const response = await axios.get(api)
    return response.data
  } catch (error) {
    throw error
  }
}

export const onLikePost = async (postId) => {
  const api = `${BASE_URL}/post/${postId}/like`
  try {
    const res = await axios.patch(api)
    return res.data
  } catch (error) {
    console.error('Error liking post:', error.response?.data || error.message)
    throw error
  }
}

export const addCommentToPost = async (postId, commentText) => {
  const api = `${BASE_URL}/post/${postId}/comment`
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
