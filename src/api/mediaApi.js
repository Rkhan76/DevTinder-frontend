// src/api/mediaApi.js
import axios from '../utils/axiosConfig'

const BASE_URL = import.meta.env.VITE_API_BASE_URL

// 🔥 Global AbortController
let currentUploadController = null

/**
 * STREAMING upload using fetch() – NO BUFFERING
 * Cancel works instantly!
 */
export const handlePostMediaImmediately = async (file) => {
  const api = `${BASE_URL}/media/upload`

  // Cancel previous upload if needed
  if (currentUploadController) {
    try {
      currentUploadController.abort()
    } catch {}
  }

  currentUploadController = new AbortController()
  const signal = currentUploadController.signal

  console.log('📤 Streaming upload started…')

  const start = performance.now()

  try {
    const response = await fetch(api, {
      method: 'POST',
      body: file, // ⭐ RAW FILE STREAM
      signal, // ⭐ support cancellation
      credentials: 'include', // ⭐ SEND COOKIES / JWT
    })

    const end = performance.now()
    const ms = end - start
    const m = Math.floor(ms / 60000)
    const s = Math.floor((ms % 60000) / 1000)

    console.log(`⏱ Upload completed in ${m}m ${s}s`)

    currentUploadController = null

    return await response.json()
  } catch (error) {
    const end = performance.now()
    const ms = end - start
    const m = Math.floor(ms / 60000)
    const s = Math.floor((ms % 60000) / 1000)

    const cancelled =
      error?.name === 'AbortError' ||
      error?.message?.toLowerCase?.().includes('abort') ||
      error?.message?.toLowerCase?.().includes('cancel')

    if (cancelled) {
      console.warn(`⛔ Upload canceled after ${m}m ${s}s`)
      currentUploadController = null
      return { cancelled: true }
    }

    console.error(`❌ Upload failed after ${m}m ${s}s`)
    console.error('Upload error:', error)

    currentUploadController = null
    throw error
  }
}

/**
 * Cancel the ongoing upload instantly
 */
export const cancelMediaUpload = () => {
  if (currentUploadController) {
    try {
      currentUploadController.abort()
    } catch {}
    console.log('🚫 Upload aborted by user (frontend)')
    currentUploadController = null
  }
}

/**
 * Delete temp media from backend + Cloudinary
 * (axios used → auto sends cookies)
 */
export const deleteTempMedia = async (tempMediaId) => {
  try {
    const api = `${BASE_URL}/media/temp/${tempMediaId}`
    const response = await axios.delete(api) // axios auto-sends cookies
    return response.data
  } catch (error) {
    console.error('Failed to delete temp media:', error)
    throw error
  }
}
