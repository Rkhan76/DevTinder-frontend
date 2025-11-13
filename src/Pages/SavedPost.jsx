'use client'

import { useState, useMemo } from 'react'
import { Search } from 'lucide-react'
import SavedPostCard from '../components/PostCardComponents/SavedPostCard'

// Mock data with REAL internet images
const mockSavedPosts = [
  {
    id: '1',
    author: 'Sarah Johnson',
    title: 'Full Stack Developer',
    profileImage: 'https://i.pravatar.cc/150?img=47',
    content:
      'Just launched our new web application! It took 6 months of hard work, but it was worth every second. Check it out and let me know what you think!',
    image:
      'https://images.unsplash.com/photo-1529107386315-e1a2ed48a620?auto=format&fit=crop&w=800&q=60',
    timestamp: '2 hours ago',
  },
  {
    id: '2',
    author: 'Alex Chen',
    title: 'Product Designer',
    profileImage: 'https://i.pravatar.cc/150?img=12',
    content:
      'Design principle I learned today: Always prioritize user accessibility from the start. It makes a huge difference in the end product quality.',
    timestamp: '5 hours ago',
  },
  {
    id: '3',
    author: 'Emma Watson',
    title: 'Tech Writer',
    profileImage: 'https://i.pravatar.cc/150?img=32',
    content:
      'Writing about the future of AI and its impact on society. The possibilities are endless, but we need to be thoughtful about implementation.',
    image:
      'https://images.unsplash.com/photo-1534751516642-a1af1ef26a56?auto=format&fit=crop&w=800&q=60',
    timestamp: '1 day ago',
  },
  {
    id: '4',
    author: 'Michael Rodriguez',
    title: 'DevOps Engineer',
    profileImage: 'https://i.pravatar.cc/150?img=18',
    content:
      "Infrastructure as Code is a game changer. If you're not using it yet, you're missing out on so much efficiency and scalability.",
    timestamp: '2 days ago',
  },
  {
    id: '5',
    author: 'Lisa Park',
    title: 'Data Scientist',
    profileImage: 'https://i.pravatar.cc/150?img=55',
    content:
      'Machine learning models are only as good as the data you feed them. Spent today cleaning and normalizing our dataset. Worth the effort!',
    timestamp: '3 days ago',
  },
]

export default function SavedPostsPage() {
  const [searchQuery, setSearchQuery] = useState('')

  // Filter posts based on search query
  const filteredPosts = useMemo(() => {
    if (!searchQuery.trim()) return mockSavedPosts

    const query = searchQuery.toLowerCase()
    return mockSavedPosts.filter(
      (post) =>
        post.author.toLowerCase().includes(query) ||
        post.content.toLowerCase().includes(query) ||
        post.title.toLowerCase().includes(query)
    )
  }, [searchQuery])

  return (
    <main className="min-h-screen bg-slate-50 p-4">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Saved Posts - Main Content */}
        <section className="lg:col-span-3">
          {/* Header */}
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-slate-900 mb-2">
              Saved Posts
            </h1>
            <p className="text-slate-600">
              View all your saved posts in one place
            </p>
          </div>

          {/* Search Bar */}
          <div className="mb-6 sticky top-4 z-10">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
              <input
                type="text"
                placeholder="Search by author name, title, or content..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-white border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-900 placeholder-slate-400"
              />
            </div>
          </div>

          {/* Posts List */}
          <div>
            {filteredPosts.length > 0 ? (
              filteredPosts.map((post) => (
                <SavedPostCard key={post.id} {...post} />
              ))
            ) : (
              <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-12 text-center">
                <p className="text-slate-600 font-medium mb-2">
                  No posts found
                </p>
                <p className="text-slate-400 text-sm">
                  Try adjusting your search query
                </p>
              </div>
            )}
          </div>
        </section>
      </div>
    </main>
  )
}
