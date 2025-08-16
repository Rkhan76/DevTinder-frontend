// import { MyNetworkHeader } from './mynetwork/mynetwork-header'
import { InvitationsSection } from './myNetworkComponents/invitation-section'
import { PeopleYouMayKnow } from './myNetworkComponents/people-you-may-know'
import { NetworkStats } from './myNetworkComponents/network-stats'
import { RecentActivity } from './myNetworkComponents/recent-activites'

export default function MyNetworkPage() {
  return (
    <div className="min-h-screen bg-base-200">
      {/* <MyNetworkHeader /> */}

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Left Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-24">
              <NetworkStats />
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            <InvitationsSection />
            <PeopleYouMayKnow />
          </div>

          {/* Right Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-24">
              <RecentActivity />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
