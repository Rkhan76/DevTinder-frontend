'use client'

import { getInitials } from '../../utils/userAvtar'

const ProfileHeader = ({
  displayUser,
  currentUser,
  friendStatus,
  friendActionLoading,
  handleFriendAction,
  handleAcceptFriendRequest,
  handleRejectFriendRequest,
}) => {

  return (
    <>
      {/* Cover Image Section */}
      <div className="max-w-6xl mx-auto px-4 pt-4">
        <div className="relative h-80 bg-gradient-to-br from-primary to-secondary rounded-2xl overflow-hidden shadow-xl">
          <img
            src={
              displayUser.coverImage ||
              '/placeholder.svg?height=320&width=800&query=modern tech workspace'
            }
            className="w-full h-full object-cover"
            alt="Cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>

          {currentUser?._id === displayUser?._id && (
            <button className="btn btn-sm btn-ghost absolute top-4 right-4 bg-white/90 hover:bg-white text-gray-700 border-0">
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
              Edit Cover
            </button>
          )}
        </div>
      </div>

      {/* Profile Picture and User Info */}
      <div className="relative max-w-6xl mx-auto px-4">
        <div className="relative -mt-20 mb-6 flex justify-center">
          <div className="relative">
            <div className="avatar">
              <div className="w-32 h-32 rounded-full ring ring-white ring-offset-4 ring-offset-base-100 shadow-2xl">
                {displayUser?.image ? (
                  <img
                    src={displayUser.image || '/placeholder.svg'}
                    alt={displayUser.fullName}
                    className="object-cover"
                  />
                ) : (
                  <div
                    className={`w-full h-full rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white text-4xl font-bold`}
                  >
                    {getInitials(displayUser?.fullName)}
                  </div>
                )}
              </div>
            </div>

            {currentUser?._id !== displayUser?._id && (
              <div className="absolute -bottom-2 -right-2 flex gap-2">
                {friendStatus === 'received' && (
                  <button
                    onClick={handleRejectFriendRequest}
                    disabled={friendActionLoading}
                    className="btn btn-sm btn-circle btn-error text-white shadow-lg"
                  >
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                )}
                <button
                  onClick={handleFriendAction}
                  disabled={friendActionLoading || friendStatus === 'friends'}
                  className={`btn btn-sm btn-circle shadow-lg ${
                    friendStatus === 'friends'
                      ? 'btn-success'
                      : friendStatus === 'sent'
                      ? 'btn-warning'
                      : friendStatus === 'received'
                      ? 'btn-info'
                      : 'btn-primary'
                  }`}
                >
                  {friendActionLoading ? (
                    <span className="loading loading-spinner loading-xs"></span>
                  ) : friendStatus === 'friends' ? (
                    <svg
                      className="w-4 h-4"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                    </svg>
                  ) : (
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                      />
                    </svg>
                  )}
                </button>
              </div>
            )}

            {displayUser.isVerified && (
              <div className="absolute -top-2 -right-2">
                <div className="badge badge-primary badge-sm">
                  <svg
                    className="w-3 h-3"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-base-content mb-2">
            {displayUser?.fullName || 'User Name'}
          </h1>
          <p className="text-xl text-base-content/70 mb-4">
            {displayUser?.headline || ''}
          </p>
          <p className="text-base-content/60 mb-6">
            📍 {displayUser?.location} • Joined {displayUser?.joinedDate}
          </p>
        </div>
      </div>
    </>
  )
}

export default ProfileHeader
