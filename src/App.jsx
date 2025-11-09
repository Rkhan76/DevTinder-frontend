import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
// import Body from './components/Body'
import Login from './components/authComponents/Login'
import Profile from './Pages/Profile'
import ProtectedRoute from './components/authComponents/ProtectedRoutes'
import RedirectBasedOnAuth from './components/RedirectBasedOnAuth'
import Signup from './components/authComponents/Signup'
import { ThemeProvider } from './ThemeContext'
import Home from './Pages/Home'
import ChatApp from './Pages/ChatApp'
import NotFound from './components/NotFound'
import SearchResults from './components/SearchResults'
import Notifications from './components/Notifications'
import MyNetwork from './components/MyNetwork'
import { useEffect } from 'react'
import { onMessageListener, requestForToken } from './firebase'
import { saveFcmToken } from './api/notificationApi'
import { useDispatch, useSelector } from 'react-redux'
import {
  setChatsCount,
  setNotificationsCount,
  setFriendRequestsCount,
} from './redux/slices/activityCountsSlice'
import SettingsPage from './components/Setting'
import Layout from './Layout/Layout'
import PostCard from './components/PostCardComponents/PostCard'
import SinglePostPage from './Pages/SinglePost'

function App() {
  const dispatch = useDispatch()
  const { notificationsCount, chatsCount, friendRequestsCount } = useSelector(
    (state) => state.activityCount
  )
  
  useEffect(() => {
    const setupFCM = async () => {
      const token = await requestForToken()
      if (token) {
        await saveFcmToken(token)
      }
    }

    setupFCM()

    onMessageListener()
      .then((payload) => {
        console.log('Foreground notification received:', payload)
        dispatch(setNotificationsCount(notificationsCount + 1))
      })
      .catch((err) => console.log('Notification listener error: ', err))
  }, [dispatch])

  return (
    <ThemeProvider>
      <BrowserRouter basename="/">
        <Routes>
          {/* Routes without navbar/layout */}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="*" element={<NotFound />} />

          {/* Routes with navbar/layout (using Body as layout) */}
          <Route path="/" element={<Layout />}>
            <Route index element={<RedirectBasedOnAuth />} />
            <Route
              path="/home"
              element={
                <ProtectedRoute>
                  <Home />
                </ProtectedRoute>
              }
            />
            <Route
              path="/setting"
              element={
                <ProtectedRoute>
                  <SettingsPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/profile/:id"
              element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              }
            />
            <Route
              path="/profile/:userId"
              element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              }
            />
            <Route
              path="/chat"
              element={
                <ProtectedRoute>
                  <ChatApp />
                </ProtectedRoute>
              }
            />
            <Route
              path="/search"
              element={
                <ProtectedRoute>
                  <SearchResults />
                </ProtectedRoute>
              }
            />
            <Route
              path="/mynetwork/grow"
              element={
                <ProtectedRoute>
                  <MyNetwork />
                </ProtectedRoute>
              }
            />
            <Route
              path="/notifications"
              element={
                <ProtectedRoute>
                  <Notifications />
                </ProtectedRoute>
              }
            />

            <Route
              path="/post/:postId"
              element={
                <ProtectedRoute>
                  <SinglePostPage/>
                </ProtectedRoute>
              }
            />
          </Route>
        </Routes>
      </BrowserRouter>
      <Toaster position="top-center" reverseOrder={false} />
    </ThemeProvider>
  )
}

export default App