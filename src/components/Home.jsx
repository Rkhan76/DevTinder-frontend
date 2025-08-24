import CreatePost from "./CreatePost"
import Feed from "./Feed"
import NetworkActivity from "./homePageComponents/NetworkAcitivity"
import QuickStats from "./homePageComponents/QuickStats"
import SuggestedFriends from "./homePageComponents/SuggestedFriends"
import TrendingTopics from "./homePageComponents/TrendingTopics"



const Home = () => {
  return (
    <>
      <main className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
        {/* <div className="bg-white border-b border-slate-200 shadow-sm">
          <div className="max-w-7xl mx-auto px-4 py-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold text-slate-900">
                  Welcome back to DevTinder
                </h1>
                <p className="text-slate-600 mt-1">
                  Connect with developers, share your projects, and grow your
                  network
                </p>
              </div>
              <div className="hidden md:flex items-center space-x-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">1.2k</div>
                  <div className="text-xs text-slate-500">Connections</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">89</div>
                  <div className="text-xs text-slate-500">Posts</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-600">456</div>
                  <div className="text-xs text-slate-500">Views</div>
                </div>
              </div>
            </div>
          </div>
        </div> */}

        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="flex flex-col lg:flex-row gap-8">
            <aside className="hidden lg:block lg:w-80">
              <div className="sticky top-24 space-y-6">
                <QuickStats/>
                <TrendingTopics />
              </div>
            </aside>

            <div className="flex-1 max-w-2xl mx-auto lg:mx-0">
              <div className="space-y-6">
                <CreatePost />
                <Feed/>
              </div>
            </div>

            <aside className="lg:w-80">
              <div className="sticky top-24 space-y-6">
                <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
                  <SuggestedFriends />
                </div>
                <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
                  <NetworkActivity />
                </div>
              </div>
            </aside>
          </div>
        </div>
      </main>
    </>
  )
}

export default Home
