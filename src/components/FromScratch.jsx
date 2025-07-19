import { useInfiniteScroll } from '../hooks/useInfiniteScroll'
import { PostCard } from './PostCard'
import ProfileButton from './ProfileButton'

export const FromScratch = ({ posts, fetchData, loading, error }) => {
  useInfiniteScroll(fetchData)

  console.log("posts are here on fromscratch component ", posts)
  return (
    <div>
      <div className="flex justify-between bg-base-100 py-1 px-2 rounded-xl border border-gray-300">
        <div className="flex flex-col justify-center">
          <p className="text-xl  text-gray-900">Posts</p>
        </div>
          <div className='pt-1'>
            <ProfileButton text={'Recent'} />
            <ProfileButton text={'Popular'} />
          </div>
      </div>
      <div>
        {posts.map((post, index) => (
          <PostCard post={post} key={index} />
        ))}
      </div>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error.message}</p>}
    </div>
  )
}
