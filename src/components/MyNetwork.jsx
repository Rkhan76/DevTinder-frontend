// import { MyNetworkHeader } from '@/components/mynetwork/my-network-header'
import { InvitationsSection } from './myNetworkComponents/invitation-section'
import { PeopleYouMayKnow } from './myNetworkComponents/people-you-may-know'
import { NetworkStats } from './myNetworkComponents/network-stats'
import { RecentActivity } from './myNetworkComponents/recent-activites'

const MyNetwork = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* <MyNetworkHeader /> */}

      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Left Sidebar */}
          <div className="lg:col-span-1">
            <NetworkStats />
          </div>

          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            <InvitationsSection />
            <PeopleYouMayKnow />
          </div>

          {/* Right Sidebar */}
          <div className="lg:col-span-1">
            <RecentActivity />
          </div>
        </div>
      </div>
    </div>
  )
}

export default MyNetwork