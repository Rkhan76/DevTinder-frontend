'use client'

import { useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import ProfileHeader from './profile/ProfileHeader'
import ProfileNavigation from './profile/ProfileNavigation'
import AboutSection from './profile/AboutSection'
import TimelineSection from './profile/TiemlineSection'
import FriendsSection from './profile/FriendsSection'
import {
  getUserById,
  sendFriendRequest,
  acceptFriendRequest,
  rejectFriendRequest,
  cancelFriendRequest,
} from '../api/userApi'
import { setUser } from '../redux/slices/authSlice'
import toast from 'react-hot-toast'

const Profile = () => {
  const { id: userId } = useParams()
  const currentUser = useSelector((state) => state.auth.user)
  const dispatch = useDispatch()
  const [userDetails, setUserDetails] = useState(null)
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState('timeline')
  const [friendStatus, setFriendStatus] = useState('none') // 'none', 'friends', 'sent', 'received'
  const [friendActionLoading, setFriendActionLoading] = useState(false)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const user = useSelector((state) => state.auth.user)

  const [profileData, setProfileData] = useState({
    bio: 'Add a short bio about yourself (e.g., your passion, goals, or background)',
    currentRole:
      'Enter your current role (e.g., Software Engineer, UI/UX Designer)',
    currentCompany: 'Enter your current company (e.g., DevTinder Pvt. Ltd.)',
    skills:
      'List your skills (e.g., JavaScript, React, Node.js, Express, MongoDB, Prisma)',
    experience:
      'Enter your experience (e.g., 2+ years in full-stack web development)',
    education:
      'Enter your education details (e.g., B.Tech in Computer Science, XYZ University)',
    location: 'Enter your location (e.g., Bangalore, India)',
    interests:
      'List your interests (e.g., Open Source, Competitive Programming, Cloud Computing, UI/UX Design)',
  })

  const isOwnProfile = user._id === userId

  

  const dummyUserData = {
    _id: 'dummy-user-123',
    fullName: 'Alex Johnson',
    email: 'alex.johnson@devtinder.com',
    profession: 'Senior Full Stack Developer',
    location: 'San Francisco, CA',
    friendsCount: '2.4K',
    connectionsCount: '500+',
    profileViews: '1.2K',
    image: '/professional-developer-avatar.png',
    coverImage: '/placeholder-dsq20.png',
    joinedDate: 'January 2022',
    isVerified: true,
  }

  const handleSendFriendRequest = async () => {
    if (!userId || friendActionLoading) return

    try {
      setFriendActionLoading(true)
      const response = await sendFriendRequest(userId)

      if (response.success) {
        const updatedCurrentUser = {
          ...currentUser,
          sentFriendRequests: [
            ...(currentUser.sentFriendRequests || []),
            userDetails._id,
          ],
        }
        dispatch(setUser(updatedCurrentUser))
        setFriendStatus('sent')
        toast.success('Friend request sent!')
      }
    } catch (error) {
      console.error('Error sending friend request:', error)
      toast.error('Failed to send friend request')
    } finally {
      setFriendActionLoading(false)
    }
  }

  const handleAcceptFriendRequest = async () => {
    if (!userId || friendActionLoading) return

    try {
      setFriendActionLoading(true)
      const response = await acceptFriendRequest(userId)

      if (response.success) {
        const updatedCurrentUser = {
          ...currentUser,
          connections: [...(currentUser.connections || []), userDetails._id],
          receivedFriendRequests: (
            currentUser.receivedFriendRequests || []
          ).filter((id) => id !== userDetails._id),
        }
        dispatch(setUser(updatedCurrentUser))
        setFriendStatus('friends')
        toast.success('Friend request accepted!')
      }
    } catch (error) {
      console.error('Error accepting friend request:', error)
      toast.error('Failed to accept friend request')
    } finally {
      setFriendActionLoading(false)
    }
  }

  const handleRejectFriendRequest = async () => {
    if (!userId || friendActionLoading) return

    try {
      setFriendActionLoading(true)
      const response = await rejectFriendRequest(userId)

      if (response.success) {
        const updatedCurrentUser = {
          ...currentUser,
          receivedFriendRequests: (
            currentUser.receivedFriendRequests || []
          ).filter((id) => id !== userDetails._id),
        }
        dispatch(setUser(updatedCurrentUser))
        setFriendStatus('none')
        toast.success('Friend request rejected')
      }
    } catch (error) {
      console.error('Error rejecting friend request:', error)
      toast.error('Failed to reject friend request')
    } finally {
      setFriendActionLoading(false)
    }
  }

  const handleCancelFriendRequest = async () => {
    if (!userId || friendActionLoading) return

    try {
      setFriendActionLoading(true)
      const response = await cancelFriendRequest(userId)

      if (response.success) {
        const updatedCurrentUser = {
          ...currentUser,
          sentFriendRequests: (currentUser.sentFriendRequests || []).filter(
            (id) => id !== userDetails._id
          ),
        }
        dispatch(setUser(updatedCurrentUser))
        setFriendStatus('none')
        toast.success('Friend request cancelled')
      }
    } catch (error) {
      console.error('Error cancelling friend request:', error)
      toast.error('Failed to cancel friend request')
    } finally {
      setFriendActionLoading(false)
    }
  }

  const handleFriendAction = () => {
    switch (friendStatus) {
      case 'none':
        handleSendFriendRequest()
        break
      case 'received':
        handleAcceptFriendRequest()
        break
      case 'sent':
        handleCancelFriendRequest()
        break
      default:
        break
    }
  }

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        setLoading(true)

        if (userId) {
          const response = await getUserById(userId)
          console.log(response, ' response from getUserById')
          if (response.success) {
            const userData = response.user

            setProfileData({
              bio: userData.bio
                ? userData.bio
                : isOwnProfile
                ? 'Add a short bio about yourself (e.g., your passion, goals, or background)'
                : 'This user has not added a bio yet',

              currentRole: userData.currentRole
                ? userData.currentRole
                : isOwnProfile
                ? 'Enter your current role (e.g., Software Engineer, UI/UX Designer)'
                : 'Not provided',

              currentCompany: userData.currentCompany
                ? userData.currentCompany
                : isOwnProfile
                ? 'Enter your current company (e.g., DevTinder Pvt. Ltd.)'
                : 'Not provided',

              skills: userData.skills?.length
                ? userData.skills
                : isOwnProfile
                ? [
                    'List your skills (e.g., JavaScript, React, Node.js, Express, MongoDB, Prisma)',
                  ]
                : ['Not provided'],

              experience: userData.experience
                ? userData.experience
                : isOwnProfile
                ? 'Enter your experience (e.g., 2+ years in full-stack web development)'
                : 'Not provided',

              education: userData.education
                ? userData.education
                : isOwnProfile
                ? 'Enter your education details (e.g., B.Tech in Computer Science, XYZ University)'
                : 'Not provided',

              location: userData.location
                ? userData.location
                : isOwnProfile
                ? 'Enter your location (e.g., Bangalore, India)'
                : 'Not provided',

              interests: userData.interests?.length
                ? userData.interests
                : isOwnProfile
                ? [
                    'List your interests (e.g., Open Source, Competitive Programming, Cloud Computing, UI/UX Design)',
                  ]
                : ['Not provided'],
            })
          }

          setUserDetails(response.user)
        } else {
          setUserDetails(currentUser)
        }
      } catch (error) {
        console.error('Error fetching user details:', error)
        setUserDetails(
          currentUser || {
            _id: 'current-user',
            fullName: 'Current User',
            email: 'user@example.com',
            image: null,
            location: 'Location',
            profession: 'Professional',
            friendsCount: '1.2K',
          }
        )
      } finally {
        setLoading(false)
      }
    }

    fetchUserDetails()
  }, [userId, currentUser])

  useEffect(() => {
    if (currentUser && userId && userDetails) {
      const isFriend = currentUser?.connections?.includes(userDetails._id)
      const hasSentRequest = currentUser?.sentFriendRequests?.includes(
        userDetails._id
      )
      const hasReceivedRequest = currentUser?.receivedFriendRequests?.includes(
        userDetails._id
      )

      if (isFriend) {
        setFriendStatus('friends')
      } else if (hasSentRequest) {
        setFriendStatus('sent')
      } else if (hasReceivedRequest) {
        setFriendStatus('received')
      } else {
        setFriendStatus('none')
      }
    }
  }, [currentUser, userDetails, userId])

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-base-100">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    )
  }

  const displayUser = userDetails || dummyUserData

  return (
    <div className="min-h-screen bg-gradient-to-br from-base-100 to-base-200">
      <ProfileHeader
        displayUser={displayUser}
        currentUser={currentUser}
        friendStatus={friendStatus}
        friendActionLoading={friendActionLoading}
        handleFriendAction={handleFriendAction}
        handleAcceptFriendRequest={handleAcceptFriendRequest}
        handleRejectFriendRequest={handleRejectFriendRequest}
      />

      <div className="relative max-w-6xl mx-auto px-4">
        <ProfileNavigation activeTab={activeTab} setActiveTab={setActiveTab} />

        <div className="card bg-base-100 shadow-xl mb-8">
          <div className="card-body">
            {activeTab === 'timeline' && (
              <TimelineSection
                userId={userId}
                currentUser={currentUser}
                displayUser={displayUser}
                profileData={profileData}
              />
            )}

            {activeTab === 'about' && (
              <AboutSection
                profileData={profileData}
                setProfileData={setProfileData}
                displayUser={displayUser}
                currentUser={currentUser}
                isEditModalOpen={isEditModalOpen}
                setIsEditModalOpen={setIsEditModalOpen}
              />
            )}

            {activeTab === 'friends' && <FriendsSection />}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Profile
