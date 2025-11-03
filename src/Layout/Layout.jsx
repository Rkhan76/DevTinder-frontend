import Navbar from '../components/Navbar'
import { Outlet, useLocation } from 'react-router-dom'

export default function Layout() {
  const location = useLocation()

  // Define pages you want to make non-scrollable
  const nonScrollablePaths = ['/chat'] // add paths here
  const isNonScrollable = nonScrollablePaths.includes(location.pathname)

  return (
    <div className="flex flex-col h-screen bg-[#f4f4f4]">
      <Navbar />
      <div
        className={`flex-1 ${
          isNonScrollable ? 'overflow-hidden' : 'overflow-auto'
        }`}
      >
        <Outlet />
      </div>
    </div>
  )
}
