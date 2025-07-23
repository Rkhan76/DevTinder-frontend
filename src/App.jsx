import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import Body from './components/Body'
import Login from './components/Login'
import Profile from './components/Profile'
import ProtectedRoute from './components/ProtectedRoutes'
import RedirectBasedOnAuth from './components/RedirectBasedOnAuth'
import Signup from './components/Signup'
import { ThemeProvider } from './ThemeContext'
import Home from './components/Home'
import ChatApp from './components/ChatApp'

function App() {
  return (
    <ThemeProvider>
      <BrowserRouter basename="/">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          
          <Route path="/" element={<Body />}>
            <Route index element={<RedirectBasedOnAuth />} />

            <Route
              path="/home"
              element={
                <ProtectedRoute>
                  <Home/>
                </ProtectedRoute>
              }
            />
            <Route
              path="/profile"
              element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              }
            />
            <Route path="/chat" element={<ProtectedRoute><ChatApp /></ProtectedRoute>} />
          </Route>
        </Routes>
      </BrowserRouter>
      <Toaster position="top-center" reverseOrder={false} />
    </ThemeProvider>
  )
}

export default App
