import { useState } from 'react'
import { NotificationHeader } from './notificationComponents/notifications-header'
import { NotificationFilters } from './notificationComponents/notifications-filters'
import { NotificationList } from './notificationComponents/notifications-list'

const  Notifications = () =>{
  const [activeFilter, setActiveFilter] = useState('all')
  const [notifications, setNotifications] = useState([
    {
      id: '1',
      type: 'connection',
      title: 'Sarah Johnson accepted your connection request',
      description: 'You are now connected with Sarah Johnson',
      time: '2 hours ago',
      read: false,
      avatar: '/professional-woman-diverse.png',
      action: 'connection_accepted',
    },
    {
      id: '2',
      type: 'like',
      title: 'Michael Chen and 12 others liked your post',
      description:
        'Your post about React development trends is getting attention',
      time: '4 hours ago',
      read: false,
      avatar: '/professional-man.png',
      action: 'post_liked',
    },
    {
      id: '3',
      type: 'comment',
      title: 'Emma Davis commented on your post',
      description: '"Great insights on the future of web development!"',
      time: '6 hours ago',
      read: true,
      avatar: '/professional-woman-designer.png',
      action: 'post_commented',
    },
    {
      id: '4',
      type: 'job',
      title: 'New job opportunity matches your profile',
      description: 'Senior Frontend Developer at TechCorp - Remote',
      time: '1 day ago',
      read: false,
      avatar: null,
      action: 'job_match',
    },
    {
      id: '5',
      type: 'mention',
      title: 'Alex Rodriguez mentioned you in a post',
      description: 'Check out this amazing work by @you on the latest project',
      time: '2 days ago',
      read: true,
      avatar: '/professional-data-scientist.png',
      action: 'mentioned',
    },
    {
      id: '6',
      type: 'invitation',
      title: 'You have a new invitation to connect',
      description: 'Jennifer Wilson wants to connect with you',
      time: '3 days ago',
      read: false,
      avatar: '/professional-woman-diverse.png',
      action: 'connection_request',
    },
  ])

  const markAsRead = (id) => {
    setNotifications((prev) =>
      prev.map((notif) => (notif.id === id ? { ...notif, read: true } : notif))
    )
  }

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((notif) => ({ ...notif, read: true })))
  }

  const deleteNotification = (id) => {
    setNotifications((prev) => prev.filter((notif) => notif.id !== id))
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
        onMarkAllRead={markAllAsRead}
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
            <NotificationList
              notifications={filteredNotifications}
              onMarkAsRead={markAsRead}
              onDelete={deleteNotification}
            />
          </div>
        </div>
      </div>
    </div>
  )
}


export default Notifications