import axios from '../utils/axiosConfig'

const BASE_URL = import.meta.env.VITE_API_BASE_URL

export const handlePostMediaImmediately = async (file) => {
  const api = `${BASE_URL}/media/upload`

  console.log(
    "uploading has been started"
  )
  const start = performance.now() // Start timer

  try {
    const response = await axios.post(api, file)

    const end = performance.now() // End timer
    const totalMs = end - start // milliseconds

    const minutes = Math.floor(totalMs / 60000) // 60,000 ms = 1 min
    const seconds = Math.floor((totalMs % 60000) / 1000) // remainder / 1000

    console.log(`⏱️ Upload Time: ${minutes} min ${seconds} sec`)

    return response.data
  } catch (error) {
    const end = performance.now()
    const totalMs = end - start

    const minutes = Math.floor(totalMs / 60000)
    const seconds = Math.floor((totalMs % 60000) / 1000)

    console.error(`❌ Upload failed after ${minutes} min ${seconds} sec`)
    console.error('file uploadation failed:', error)

    throw error
  }
}


export const deleteTempMedia = async (tempMediaId) => {
  try {
    const api = `${BASE_URL}/media/temp/${tempMediaId}`
    const response = await axios.delete(api)
    return response.data
  } catch (error) {
    console.error('Failed to delete temp media:', error)
    throw error
  }
}