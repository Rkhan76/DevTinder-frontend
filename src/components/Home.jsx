import React from 'react'
import CreatePost from './CreatePost'
import Feed from './Feed'
import SuggestedFriends from './SuggestedFriends'

const Home = () => {
  return (
    <>
      <main className="flex flex-col md:flex-row bg-gradient-to-br from-base-100 to-base-200 min-h-screen py-8 w-full justify-center items-start gap-8 px-4">
        <div className="w-full max-w-xl flex flex-col items-center min-w-0 gap-6">
          <CreatePost />
          <Feed />
        </div>
        <aside className="hidden md:flex md:flex-col md:items-start md:justify-start md:w-[320px] lg:w-[350px] xl:w-[380px]">
          <div className="sticky top-24 w-full">
            <SuggestedFriends />
          </div>
        </aside>
      </main>
    </>
  )
}

export default Home
