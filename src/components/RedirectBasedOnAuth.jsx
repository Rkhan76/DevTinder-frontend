// src/components/RedirectBasedOnAuth.jsx
import { Navigate } from 'react-router-dom'
import Cookies from 'js-cookie'

const RedirectBasedOnAuth = () => {
  const token = Cookies.get('token')

  return token ? (
    <Navigate to="/home" replace />
  ) : (
    <Navigate to="/login" replace />
  )
}

export default RedirectBasedOnAuth
