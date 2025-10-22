import Navbar from '../Navbar'
import { Outlet } from 'react-router-dom'

export default function Layout()  {
  return (
    <div className="flex flex-col h-screen bg-[#f4f4f4]">
      <Navbar />
      <div className="flex-1 overflow-hidden">
        <Outlet />
      </div>
    </div>
  )
}
