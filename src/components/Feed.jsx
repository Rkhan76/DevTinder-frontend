import { useEffect, useState } from 'react'
import { FromScratch } from './FromScratch'
import { fetchAllPosts } from '../api/postApi'



const Feed = () => {
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  
  const fetchData = async(page)=>{
     try {
      setLoading(true)
      const res = await fetchAllPosts(page)
  
      if(res.data.success){
          const newData = res?.data?.data
            setPosts((prev) => [...prev, ...newData])
            setLoading(false)
       }  
    } catch (err) {
      setError(err)
      setLoading(false)
    }
  }

  useEffect(()=>{
    fetchData(1)
  },[])


  return (
    <div className="w-full  flex flex-col gap-6">
      <FromScratch
        posts={posts}
        fetchData={fetchAllPosts}
        loading={loading}
        error={error}
      />
    </div>
  )
}

export default Feed 