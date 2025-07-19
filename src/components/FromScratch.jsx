import { useInfiniteScroll } from '../hooks/useInfiniteScroll'
import { PostCard } from './PostCard'

export const FromScratch = ({ posts, fetchData, loading, error }) => {
  useInfiniteScroll(fetchData)

  console.log("posts are here on fromscratch component ", posts)
  return (
    <div>
      <div>
        {posts.map((post, index) => { 
             console.log(post.content, 'post coentend is here on map function')
            return (
          <PostCard post={post} key={index} />
        )})}
      </div>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error.message}</p>}
    </div>
  )
}
