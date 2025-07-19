import { useEffect, useState } from 'react'

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

export const useInfiniteScroll = (fetchData) => {
  const [page, setPage] = useState(1)

  const handleScroll = debounce(() => {
    const bottom =
      Math.ceil(window.innerHeight + window.scrollY) >=
      document.documentElement.scrollHeight - 200

    if (bottom) {
      setPage((prevPage) => {
        const nextPage = prevPage + 1
        fetchData(nextPage)
        return nextPage
      })
    }
  }, 300)

  useEffect(() => {
    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])
}
