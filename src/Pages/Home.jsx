import CreatePost from "../components/homePageComponents/CreatePost";
import Feed from "../components/PostCardComponents/Feed";
import NetworkActivity from "../components/homePageComponents/NetworkAcitivity";
import QuickStats from "../components/homePageComponents/QuickStats"
import SuggestedFriends from "../components/homePageComponents/SuggestedFriends";
import TrendingTopics from "../components/homePageComponents/TrendingTopics";

const Home = () => {
  return (
    <div className="h-full overflow-y-auto">
      <main className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="flex flex-col lg:flex-row gap-8">
            <aside className="hidden lg:block lg:w-80">
              <div className="sticky top-6 h-fit">
                {" "}
                {/* Changed from top-24 to top-6 for earlier sticking */}
                <div className="space-y-6">
                  <QuickStats/>
                  <TrendingTopics />
                </div>
              </div>
            </aside>

            <div className="flex-1 max-w-2xl mx-auto lg:mx-0">
              <div className="space-y-6">
                <CreatePost />
                <Feed />
              </div>
            </div>

            <aside className="lg:w-80">
              <div className="top-24 space-y-6">
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
    </div>
  );
};

export default Home;
