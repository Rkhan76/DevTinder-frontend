import axios from '../utils/axiosConfig'

const BASE_URL = import.meta.env.VITE_API_BASE_URL


export const addPost = async (content) => {
  const api = `${BASE_URL}${import.meta.env.VITE_API_ADD_POST}`
  try {
    const response = await axios.post(api, { content })
    return response.data
  } catch (error) {
    console.error('Login failed:', error)
    throw error
  }
}

export const fetchPosts = async (page) => {
  return axios.get(`/post/self?page=${page}&limit=10`)
}

export const fetchAllPosts = async (page) => {
  return axios.get(`/post/all?page=${page}&limit=10`)
}

export const onLikePost = async (postId) => {
  console.log(postId, " post id on onLike post function")
  try {
    const res = await axios.patch(`/post/${postId}/like`)
    console.log(res, ' response of like function')
    return res.data
  } catch (error) {
    console.error('Error liking post:', error.response?.data || error.message)
    throw error
  }
}

export const addCommentToPost = async (postId, commentText) => {
  try {
    const res = await axiosInstance.post(`/post/${postId}/comment`, {
      text: commentText,
    })
    console.log(res, ' response of comments function')
    return res.data // contains success, message, comment, commentsCount
  } catch (error) {
    console.error(
      'Error adding comment:',
      error.response?.data || error.message
    )
    throw error
  }
}
