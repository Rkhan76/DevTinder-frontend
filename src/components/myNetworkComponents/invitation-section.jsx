import { useEffect, useState } from 'react'
import { X } from 'lucide-react'
import {
  getPeopleWhoSentYouTheFriendRequest,
  acceptTheFriendRequest,
  rejectTheFriendRequest,
} from '../../api/friendsApi'
import toast from 'react-hot-toast'

export function InvitationsSection() {
  const [invitations, setInvitations] = useState([])
  const [loading, setLoading] = useState(true)
  const [actionLoading, setActionLoading] = useState(null) // track userId being acted on

  useEffect(() => {
    const fetchInvitations = async () => {
      try {
        const res = await getPeopleWhoSentYouTheFriendRequest()
        console.log(res, 'friend requests response')

        const formatted = res?.receivedRequests?.map((user) => ({
          id: user._id,
          name: user.fullName,
          title: user.currentRole || 'Role not specified',
          avatar:
            user.image && user.image !== 'null' && user.image !== ''
              ? user.image
              : null,
          mutualConnections: user.mutualConnections || 0,
        }))

        setInvitations(formatted || [])
      } catch (error) {
        console.error('Error fetching friend requests:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchInvitations()
  }, [])

  const handleAccept = async (userId) => {
    try {
      setActionLoading(userId)
      const res = await acceptTheFriendRequest(userId)
      console.log(res, "accept the friend request")
      if (res.success) {
        toast.success('Friend request accepted')
        setInvitations((prev) => prev.filter((inv) => inv.id !== userId))
      }
    } catch (error) {
      toast.error('Failed to accept request')
      console.error(error)
    } finally {
      setActionLoading(null)
    }
  }

  const handleReject = async (userId) => {
    try {
      setActionLoading(userId)
      const res = await rejectTheFriendRequest(userId)
      console.log(res, 'reject the friend request')
      if (res.success) {
        toast.success('Friend request rejected')
        setInvitations((prev) => prev.filter((inv) => inv.id !== userId))
      }
    } catch (error) {
      toast.error('Failed to reject request')
      console.error(error)
    } finally {
      setActionLoading(null)
    }
  }

  return (
    <div className="card bg-base-100 shadow-xl hover:shadow-2xl transition-all duration-300">
      <div className="card-body">
        <div className="flex flex-row items-center justify-between mb-4">
          <h2 className="card-title flex items-center gap-2">
            <div className="w-2 h-2 bg-gradient-to-r from-orange-500 to-red-500 rounded-full"></div>
            Invitations
          </h2>
          <button className="btn btn-ghost btn-sm text-primary hover:text-primary-focus">
            See all
          </button>
        </div>

        {loading ? (
          <p className="text-sm text-base-content/50">Loading...</p>
        ) : invitations.length === 0 ? (
          <p className="text-sm text-base-content/50">No invitations</p>
        ) : (
          <div className="space-y-4">
            {invitations.map((invitation) => (
              <div
                key={invitation.id}
                className="flex items-center space-x-4 p-4 hover:bg-primary hover:bg-opacity-5 rounded-xl border border-base-300 hover:border-primary transition-all duration-300 group"
              >
                <div className="avatar">
                  <div className="w-14 h-14 rounded-full ring ring-primary ring-opacity-20 ring-offset-base-100 ring-offset-2 group-hover:ring-opacity-40 transition-all duration-300">
                    {invitation.avatar ? (
                      <img src={invitation.avatar} alt={invitation.name} />
                    ) : (
                      <div className="w-14 h-14 rounded-full flex items-center justify-center bg-gray-400 text-white">
                        {invitation.name?.charAt(0).toUpperCase()}
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex-1">
                  <h3 className="font-semibold text-sm mb-1">
                    {invitation.name}
                  </h3>
                  <p className="text-sm text-base-content text-opacity-70 mb-2">
                    {invitation.title}
                  </p>
                  <p className="text-xs text-base-content text-opacity-50 flex items-center gap-1">
                    <span className="w-1 h-1 bg-base-content bg-opacity-40 rounded-full inline-block"></span>
                    {invitation.mutualConnections} mutual connections
                  </p>
                </div>

                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => handleAccept(invitation.id)}
                    disabled={actionLoading === invitation.id}
                    className="btn btn-primary btn-sm"
                  >
                    {actionLoading === invitation.id ? '...' : 'Accept'}
                  </button>
                  <button
                    onClick={() => handleReject(invitation.id)}
                    disabled={actionLoading === invitation.id}
                    className="btn btn-outline btn-sm hover:btn-error"
                  >
                    {actionLoading === invitation.id ? (
                      '...'
                    ) : (
                      <X className="w-4 h-4" />
                    )}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
