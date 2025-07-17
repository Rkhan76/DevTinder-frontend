import { useEffect, useState } from 'react'
import { Navigate } from 'react-router-dom'
import { isAuthenticated } from '../api/authApi'

const RedirectBasedOnAuth = () => {
  const [loading, setLoading] = useState(true)
  const [auth, setAuth] = useState(false)

  useEffect(() => {
    const checkAuth = async () => {
      const isAuth = await isAuthenticated()
      setAuth(isAuth)
      setLoading(false)
    }

    checkAuth()
  }, [])

  if (loading) return <div>Loading...</div>

  return <Navigate to={auth ? '/home' : '/login'} replace />
}

export default RedirectBasedOnAuth
