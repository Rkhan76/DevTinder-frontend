import { Navigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { isAuthenticated } from '../api/authApi'

const ProtectedRoute = ({ children }) => {
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

  return auth ? children : <Navigate to="/login" replace />
}

export default ProtectedRoute
