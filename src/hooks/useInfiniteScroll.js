import { useEffect, useState, useCallback, useRef } from 'react'

const debounce = (func, delay) => {
  let timeoutId

  return function (...args) {
    if (timeoutId) {
      clearTimeout(timeoutId)
    }

    timeoutId = setTimeout(() => {
      func(...args)
    }, delay)
  }
}

export const useInfiniteScroll = (onLoadMore, isLoading = false) => {
  const [page, setPage] = useState(1)
  const isLoadingRef = useRef(isLoading)
  const onLoadMoreRef = useRef(onLoadMore)

  // Keep refs up to date
  useEffect(() => {
    isLoadingRef.current = isLoading
    onLoadMoreRef.current = onLoadMore
  }, [isLoading, onLoadMore])

  const handleScroll = useCallback(() => {
    if (isLoadingRef.current) return

    const scrollTop = window.scrollY || document.documentElement.scrollTop
    const scrollHeight = document.documentElement.scrollHeight
    const clientHeight = document.documentElement.clientHeight

    if (scrollTop + clientHeight >= scrollHeight - 200) {
      setPage((prevPage) => {
        const nextPage = prevPage + 1
        onLoadMoreRef.current(nextPage)
        return nextPage
      })
    }
  }, [])

  useEffect(() => {
    const scrollHandler = handleScroll
    window.addEventListener('scroll', scrollHandler)
    return () => {
      window.removeEventListener('scroll', scrollHandler)
      // Clean up any pending debounced calls
      if (scrollHandler.cancel) {
        scrollHandler.cancel()
      }
    }
  }, [handleScroll])
}
