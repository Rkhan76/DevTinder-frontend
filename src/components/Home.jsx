import React from 'react'
import CreatePost from './CreatePost'
import Feed from './Feed'
import SuggestedFriends from './SuggestedFriends'


const Home = () => {
  return (
    <>
      <main className="flex flex-col md:flex-row bg-base-200 min-h-screen py-6 w-full justify-center items-start">
        <div className="w-full max-w-xl flex flex-col items-center min-w-0">
          <CreatePost />
          <Feed />
        </div>
        <aside className="hidden md:flex md:flex-col md:items-start md:justify-start md:w-[320px] lg:w-[350px] xl:w-[380px] ml-6 mr-6">
          <SuggestedFriends />
        </aside>
      </main>
    </>
  )
  
}

export default Home
