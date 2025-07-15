import { useEffect, useRef, useState } from 'react'

const initialPosts = [
  {
    id: 1,
    user: {
      name: 'Dan Walker',
      avatar: 'https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp',
    },
    time: 'July 26 2018, 01:03pm',
    content: "Yesterday with @Karen Miller and @Marvin Stemperd at the #Rock'nRolla concert in LA. Was totally fantastic! People were really excited about this one!",
    image: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 2,
    user: {
      name: 'Elise Walker',
      avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
    },
    time: 'Last week',
    content: 'Had a great time at the beach! 🌊',
    image: '',
  },
]

// Simulate fetching more posts
const fetchMorePosts = (startId) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const more = Array.from({ length: 3 }).map((_, i) => ({
        id: startId + i,
        user: {
          name: `User ${startId + i}`,
          avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
        },
        time: 'Just now',
        content: `This is a new post #${startId + i}`,
        image: '',
      }))
      resolve(more)
    }, 1500) // Simulate network delay
  })
}

const Feed = () => {
  const [posts, setPosts] = useState(initialPosts)
  const [loading, setLoading] = useState(false)
  const [hasMore, setHasMore] = useState(true)
  const loaderRef = useRef(null)

  useEffect(() => {
    if (!hasMore) return
    const handleScroll = () => {
      if (loading) return
      const scrollY = window.scrollY || window.pageYOffset
      const windowHeight = window.innerHeight
      const docHeight = document.documentElement.scrollHeight
      if (docHeight - (scrollY + windowHeight) < 200) {
        loadMore()
      }
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
    // eslint-disable-next-line
  }, [loading, hasMore])

  const loadMore = async () => {
    setLoading(true)
    const more = await fetchMorePosts(posts.length + 1)
    if (more.length === 0) setHasMore(false)
    setPosts((prev) => [...prev, ...more])
    setLoading(false)
  }

  return (
    <div className="w-full max-w-xl flex flex-col gap-6">
      {posts.map(post => (
        <div key={post.id} className="bg-base-100 rounded-xl shadow p-4 flex flex-col gap-2">
          <div className="flex items-center gap-3 mb-1">
            <div className="avatar">
              <div className="w-10 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                <img src={post.user.avatar} alt={post.user.name} />
              </div>
            </div>
            <div>
              <div className="font-semibold">{post.user.name}</div>
              <div className="text-xs text-base-content/60">{post.time}</div>
            </div>
          </div>
          <div className="text-base-content/90 whitespace-pre-line">{post.content}</div>
          {post.image && (
            <img src={post.image} alt="post" className="rounded-lg mt-2 max-h-72 object-cover w-full" />
          )}
        </div>
      ))}
      <div ref={loaderRef} className="flex justify-center py-6">
        {loading && (
          <span className="loading loading-spinner loading-lg text-primary"></span>
        )}
        {!hasMore && (
          <span className="text-base-content/60 text-sm">No more posts to load.</span>
        )}
      </div>
    </div>
  )
}

export default Feed 