import { useEffect, useState } from "react"
import { fetchPosts } from "../api/postApi"
import { FromScratch } from "./FromScratch"


const UserFeed = () => {
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  
  const fetchData = async(page)=>{
     try {
      setLoading(true)
      const res = await fetchPosts(page)
  
      if(res.data.success){
          const newData = res?.data?.data
            console.log(newData, " data i need")
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
        posts = {posts}
        fetchData={fetchData}
        loading={loading}
        error={error}
      />
    </div>
  )
}

export default UserFeed
