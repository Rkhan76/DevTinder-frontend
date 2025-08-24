import UserFeed from '../UserFeed'

const TimelineSection = ({ userId, currentUser, displayUser, profileData }) => {
  return (
    <div className="flex flex-col lg:flex-row gap-6">
      {/* Main Feed - Reduced width */}
      <div className="flex-1 lg:max-w-2xl">
        <UserFeed userId={userId || currentUser?._id} />
      </div>

      {/* Sidebar for additional info */}
      <div className="lg:w-80 space-y-4">
        {/* Quick Stats Card */}
        <div className="card bg-gradient-to-br from-primary/10 to-secondary/10 shadow-md">
          <div className="card-body p-4">
            <h4 className="font-semibold text-base-content mb-3">
              Profile Highlights
            </h4>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
                  <span className="text-primary text-sm">👥</span>
                </div>
                <div>
                  <div className="font-medium text-sm">
                    {displayUser?.friendsCount} Connections
                  </div>
                  <div className="text-xs text-base-content/60">
                    Growing network
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-secondary/20 flex items-center justify-center">
                  <span className="text-secondary text-sm">👁️</span>
                </div>
                <div>
                  <div className="font-medium text-sm">
                    {displayUser?.profileViews} Profile Views
                  </div>
                  <div className="text-xs text-base-content/60">This month</div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-accent/20 flex items-center justify-center">
                  <span className="text-accent text-sm">📅</span>
                </div>
                <div>
                  <div className="font-medium text-sm">Member since</div>
                  <div className="text-xs text-base-content/60">
                    {displayUser?.joinedDate}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Quick About Card */}
        <div className="card bg-base-100 shadow-md">
          <div className="card-body p-4">
            <h4 className="font-semibold text-base-content mb-3">About</h4>
            <p className="text-sm text-base-content/70 line-clamp-3">
              {profileData.bio}
            </p>
          </div>
        </div>

        {/* Skills Preview */}
        <div className="card bg-base-100 shadow-md">
          <div className="card-body p-4">
            <h4 className="font-semibold text-base-content mb-3">Top Skills</h4>
            <div className="flex flex-wrap gap-2">
              {Array.isArray(profileData.skills) &&
                profileData.skills.slice(0, 4).map((skill, index) => (
                  <span key={index} className="badge badge-primary badge-sm">
                    {skill}
                  </span>
                ))}
              {Array.isArray(profileData.skills) &&
                profileData.skills.length > 4 && (
                  <span className="badge badge-ghost badge-sm">
                    +{profileData.skills.length - 4} more
                  </span>
                )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TimelineSection
