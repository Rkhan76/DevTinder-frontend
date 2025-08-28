import { useEffect, useState } from 'react'
import { NotificationHeader } from './notificationComponents/notifications-header'
import { NotificationFilters } from './notificationComponents/notifications-filters'
import { NotificationList } from './notificationComponents/notifications-list'
import {
  fetchNotifications,
  markNotificationAsRead,
  markAllNotificationsAsRead,
  deleteNotification,
} from '../api/notificationApi'
import toast from 'react-hot-toast'
import { setNotificationsCount } from '../redux/slices/activityCountsSlice'
import { useDispatch, useSelector } from 'react-redux'

const Notifications = () => {
  const [activeFilter, setActiveFilter] = useState('all')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [notifications, setNotifications] = useState([])
  const notificationsCount = useSelector(
    (state) => state.activityCount.notifications
  )
  const dispatch = useDispatch()

  const mapNotification = (notif) => ({
    id: notif._id,
    type: notif.type,
    title: notif.content || 'New Notification',
    description: notif.link || '',
    time: new Date(notif.createdAt).toLocaleString(),
    read: notif.isRead,
    avatar: notif.sender?.image || '/default-avatar.png',
    action: notif.type,
  })

  // ✅ Fetch notifications
  useEffect(() => {
    const getData = async () => {
      try {
        setLoading(true)
        const data = await fetchNotifications()
        const mapped = (data.notifications || []).map(mapNotification)
        setNotifications(mapped)
      } catch (err) {
        console.error(err)
        setError('Failed to load notifications')
      } finally {
        setLoading(false)
      }
    }

    getData()
  }, [])

  // ✅ Mark single notification as read
  const handleMarkAsRead = async (id) => {
    try {
      await markNotificationAsRead(id)
      dispatch(setNotificationsCount(notificationsCount - 1))
      toast.success("successfully mark as read")
      setNotifications((prev) =>
        prev.map((notif) =>
          notif.id === id ? { ...notif, read: true } : notif
        )
      )
    } catch (err) {
      console.error('Error marking as read:', err)
    }
  }

  // ✅ Mark all as read
  const handleMarkAllAsRead = async () => {
    try {
      await markAllNotificationsAsRead()
      dispatch(setNotificationsCount(0))
      toast.success('successfully all notification mark as read')
      setNotifications((prev) =>
        prev.map((notif) => ({ ...notif, read: true }))
      )
    } catch (err) {
      console.error('Error marking all as read:', err)
    }
  }

  // ✅ Delete notification
  const handleDelete = async (id) => {
    try {
      await deleteNotification(id)
      dispatch(setNotificationsCount(notificationsCount - 1))
      toast.success('successfully delete the notification')
      setNotifications((prev) => prev.filter((notif) => notif.id !== id))
    } catch (err) {
      console.error('Error deleting notification:', err)
    }
  }

  const filteredNotifications = notifications.filter((notif) => {
    if (activeFilter === 'all') return true
    if (activeFilter === 'unread') return !notif.read
    return notif.type === activeFilter
  })

  return (
    <div className="min-h-screen bg-gray-50">
      <NotificationHeader
        unreadCount={notifications.filter((n) => !n.read).length}
        onMarkAllRead={handleMarkAllAsRead}
      />

      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Filters Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-8">
              <NotificationFilters
                activeFilter={activeFilter}
                onFilterChange={setActiveFilter}
                notifications={notifications}
              />
            </div>
          </div>

          {/* Notifications List */}
          <div className="lg:col-span-3">
            {loading ? (
              <p>Loading notifications...</p>
            ) : error ? (
              <p className="text-red-500">{error}</p>
            ) : filteredNotifications.length === 0 ? (
              <p className="text-gray-500">No notifications found.</p>
            ) : (
              <NotificationList
                notifications={filteredNotifications}
                onMarkAsRead={handleMarkAsRead}
                onDelete={handleDelete}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Notifications
