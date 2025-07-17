import Navbar from './Navbar'
import CreatePost from './CreatePost'
import Feed from './Feed'
import SuggestedFriends from './SuggestedFriends'
import { Outlet } from 'react-router-dom'

const Body = () => {
  return (
    <>
      <Navbar />
      <Outlet/>
    </>
  )
}

export default Body
