import { useEffect, useState } from "react"

const posts = [
  {
    id: 1,
    user: {
      name: 'Dan Walker',
      avatar:
        'https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp',
    },
    time: 'July 26 2018, 01:03pm',
    content:
      "Yesterday with @Karen Miller and @Marvin Stemperd at the #Rock'nRolla concert in LA. Was totally fantastic! People were really excited about this one!",
    image:
      'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=600&q=80',
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

const UserFeed = () => {
  const [feedPosts, setFeedPosts] = useState()

  useEffect(()=>{
    
  })
  return (
    <div className="w-full  flex flex-col gap-6">
      {posts.map((post) => (
        <div
          key={post.id}
          className="bg-base-100 rounded-xl shadow p-4 flex flex-col gap-2"
        >
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
          <div className="text-base-content/90 whitespace-pre-line">
            {post.content}
          </div>
          {post.image && (
            <img
              src={post.image}
              alt="post"
              className="rounded-lg mt-2 max-h-72 object-cover w-full"
            />
          )}
        </div>
      ))}
      {/* <div ref={loaderRef} className="flex justify-center py-6">
        {loading && (
          <span className="loading loading-spinner loading-lg text-primary"></span>
        )}
        {!hasMore && (
          <span className="text-base-content/60 text-sm">
            No more posts to load.
          </span>
        )}
      </div> */}
    </div>
  )
}

export default UserFeed
