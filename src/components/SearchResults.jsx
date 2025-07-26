import React, { useState, useEffect } from 'react'
import { useSearchParams, Link } from 'react-router-dom'
import { searchUsers } from '../api/authApi'
import { searchPosts } from '../api/postApi'
import { getAvatarColor, getInitials } from '../utils/userAvtar'
import { formatDateTime } from '../utils/timeformat'

const SearchResults = () => {
  const [searchParams] = useSearchParams()
  const query = searchParams.get('q')

  const [results, setResults] = useState({ users: [], posts: [] })
  const [loading, setLoading] = useState(true)
  const [activeFilter, setActiveFilter] = useState('all')

  // Fetch search results
  useEffect(() => {
    const fetchResults = async () => {
      if (!query) return

      setLoading(true)
      try {
        const [usersResponse, postsResponse] = await Promise.all([
          searchUsers(query),
          searchPosts(query),
        ])

        setResults({
          users: usersResponse?.data || [],
          posts: postsResponse?.data || [],
        })
      } catch (error) {
        console.error('Search error:', error)
        setResults({ users: [], posts: [] })
      } finally {
        setLoading(false)
      }
    }

    fetchResults()
  }, [query])

  const UserCard = ({ user }) => (
    <div className="flex items-center justify-between p-4 bg-white rounded-lg border border-gray-200 hover:shadow-md transition-shadow">
      <div className="flex items-center gap-3">
        {user.image ? (
          <img
            src={user.image}
            alt={user.fullName}
            className="w-12 h-12 rounded-full"
          />
        ) : (
          <div
            className={`w-12 h-12 rounded-full flex items-center justify-center ${getAvatarColor(
              user.fullName
            )} text-white font-semibold`}
          >
            {getInitials(user.fullName)}
          </div>
        )}
        <div>
          <h3 className="font-semibold text-gray-900">{user.fullName}</h3>
          <p className="text-sm text-gray-600">{user.email}</p>
          {user.location && (
            <p className="text-xs text-gray-500">{user.location}</p>
          )}
        </div>
      </div>
      <button className="btn btn-primary btn-sm">Connect</button>
    </div>
  )

  const PostCard = ({ post }) => (
    <div className="p-4 bg-white rounded-lg border border-gray-200 hover:shadow-md transition-shadow">
      <div className="flex items-center gap-3 mb-3">
        {post.author?.image ? (
          <img
            src={post.author.image}
            alt={post.author.fullName}
            className="w-10 h-10 rounded-full"
          />
        ) : (
          <div
            className={`w-10 h-10 rounded-full flex items-center justify-center ${getAvatarColor(
              post.author?.fullName
            )} text-white text-sm font-semibold`}
          >
            {getInitials(post.author?.fullName)}
          </div>
        )}
        <div>
          <h4 className="font-semibold text-gray-900">
            {post.author?.fullName}
          </h4>
          <p className="text-xs text-gray-500">
            {formatDateTime(post.createdAt)}
          </p>
        </div>
      </div>
      <p className="text-gray-800 mb-3">{post.content}</p>
      {post.media?.[0]?.url && (
        <img
          src={post.media[0].url}
          alt="Post media"
          className="w-full h-48 object-cover rounded-lg mb-3"
        />
      )}
      <div className="flex items-center gap-4 text-sm text-gray-500">
        <span>❤️ {post.likesCount || 0}</span>
        <span>💬 {post.commentsCount || 0}</span>
        <span>🔗 {post.sharesCount || 0}</span>
      </div>
    </div>
  )

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="loading loading-spinner loading-lg"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="flex gap-6">
          {/* Left Sidebar */}
          <div className="w-64 flex-shrink-0">
            <div className="bg-white rounded-lg p-4 shadow-sm">
              <h3 className="font-semibold text-gray-900 mb-3">On this page</h3>
              <nav className="space-y-2">
                <a
                  href="#people"
                  className={`block px-3 py-2 rounded-lg text-sm ${
                    activeFilter === 'people'
                      ? 'bg-blue-50 text-blue-600 border-l-4 border-blue-600'
                      : 'text-gray-600 hover:bg-gray-50'
                  }`}
                  onClick={() => setActiveFilter('people')}
                >
                  People ({results.users.length})
                </a>
                <a
                  href="#posts"
                  className={`block px-3 py-2 rounded-lg text-sm ${
                    activeFilter === 'posts'
                      ? 'bg-blue-50 text-blue-600 border-l-4 border-blue-600'
                      : 'text-gray-600 hover:bg-gray-50'
                  }`}
                  onClick={() => setActiveFilter('posts')}
                >
                  Posts ({results.posts.length})
                </a>
              </nav>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            <div className="mb-6">
              <h1 className="text-2xl font-bold text-gray-900 mb-2">
                Search results for "{query}"
              </h1>
              <p className="text-gray-600">
                {results.users.length + results.posts.length} results found
              </p>
            </div>

            {/* People Section */}
            {results.users.length > 0 && (
              <div id="people" className="mb-8">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-semibold text-gray-900">
                    People
                  </h2>
                  <div className="flex gap-2">
                    <button className="btn btn-sm btn-outline">1st</button>
                    <button className="btn btn-sm btn-outline">2nd</button>
                    <button className="btn btn-sm btn-outline">3rd+</button>
                    <button className="btn btn-sm btn-outline">
                      <span className="mr-1">💼</span>
                      Actively hiring
                    </button>
                  </div>
                </div>

                <div className="space-y-3">
                  {results.users.slice(0, 5).map((user) => (
                    <UserCard key={user._id} user={user} />
                  ))}
                </div>

                {results.users.length > 5 && (
                  <div className="mt-4 text-center">
                    <Link
                      to={`/search/users?q=${encodeURIComponent(query)}`}
                      className="btn btn-primary btn-wide"
                    >
                      See all people results ({results.users.length})
                    </Link>
                  </div>
                )}
              </div>
            )}

            {/* Posts Section */}
            {results.posts.length > 0 && (
              <div id="posts">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-semibold text-gray-900">Posts</h2>
                  <div className="flex gap-2">
                    <button className="btn btn-sm btn-outline">
                      From my network
                    </button>
                    <button className="btn btn-sm btn-outline">
                      Past 24 hours
                    </button>
                    <button className="btn btn-sm btn-outline">
                      Past week
                    </button>
                  </div>
                </div>

                <div className="space-y-4">
                  {results.posts.slice(0, 3).map((post) => (
                    <PostCard key={post._id} post={post} />
                  ))}
                </div>

                {results.posts.length > 3 && (
                  <div className="mt-4 text-center">
                    <Link
                      to={`/search/posts?q=${encodeURIComponent(query)}`}
                      className="btn btn-primary btn-wide"
                    >
                      See all post results ({results.posts.length})
                    </Link>
                  </div>
                )}
              </div>
            )}

            {/* No Results */}
            {results.users.length === 0 && results.posts.length === 0 && (
              <div className="text-center py-12">
                <div className="text-6xl mb-4">🔍</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  No results found
                </h3>
                <p className="text-gray-600">
                  Try adjusting your search terms or browse our suggestions
                </p>
              </div>
            )}
          </div>

          {/* Right Sidebar */}
          <div className="w-64 flex-shrink-0">
            <div className="bg-white rounded-lg p-4 shadow-sm">
              <h3 className="font-semibold text-gray-900 mb-3">Quick Links</h3>
              <nav className="space-y-2 text-sm">
                <a href="#" className="block text-gray-600 hover:text-blue-600">
                  About
                </a>
                <a href="#" className="block text-gray-600 hover:text-blue-600">
                  Help Center
                </a>
                <a href="#" className="block text-gray-600 hover:text-blue-600">
                  Privacy & Terms
                </a>
                <a href="#" className="block text-gray-600 hover:text-blue-600">
                  Advertising
                </a>
                <a href="#" className="block text-gray-600 hover:text-blue-600">
                  Business Services
                </a>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SearchResults
