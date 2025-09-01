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

function App() {
  const dispatch = useDispatch()
  const { notificationsCount, chatsCount, friendRequestsCount } = useSelector(
    (state) => state.activityCount
  )
  
  useEffect(() => {
    const setupFCM = async () => {
      const token = await requestForToken()
      if (token) {
        console.log('FCM Token from frontend:', token)
        await saveFcmToken(token)
      }
    }

    setupFCM()

    onMessageListener()
      .then((payload) => {
        console.log('Foreground notification received:', payload)
        // Instead of alert, increase count in Redux
       dispatch(setNotificationsCount(notificationsCount+1))
      })
      .catch((err) => console.log('Notification listener error: ', err))

    // optional cleanup
    // return () => unsubscribe()
  }, [dispatch])



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
                  <Home />
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
            <Route path="/mynetwork/grow" element=
            {
              <ProtectedRoute>
                <MyNetwork/>
              </ProtectedRoute>
            }
            /> 
            <Route
              path="/notifications"
              element={
                <ProtectedRoute>
                  <Notifications/>
                </ProtectedRoute>
              }
            />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
      <Toaster position="top-center" reverseOrder={false} />
    </ThemeProvider>
  )
}

export default App
