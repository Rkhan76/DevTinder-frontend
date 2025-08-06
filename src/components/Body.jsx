import Navbar from './Navbar'
import CreatePost from './CreatePost'
import Feed from './Feed'
import SuggestedFriends from './SuggestedFriends'
import { Outlet } from 'react-router-dom'

const Body = () => {
  return (
    <div className="bg-[#f4f4f4]">
      <Navbar />
      <Outlet />
    </div>
  )
}

export default Body
