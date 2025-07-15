import { Link, useNavigate } from 'react-router-dom'
import Cookies from 'js-cookie'
import { useRef, useState, useEffect } from 'react'
import { useTheme } from '../ThemeContext'
import { IoIosNotificationsOutline } from 'react-icons/io'
import { CiHeart } from 'react-icons/ci'
import { FiMessageSquare } from 'react-icons/fi'
import logo from '../assets/logo.png'

const Navbar = () => {
  const navigate = useNavigate()
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef(null)
  const { theme, toggleTheme } = useTheme()

  const handleLogout = () => {
    Cookies.remove('token')
    setIsOpen(false)
    navigate('/login')
  }

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  // Close dropdown when clicking any item inside
  const handleDropdownClick = () => {
    setIsOpen(false)
  }

  return (
    <nav className="navbar bg-base-300 shadow-sm px-4 sticky top-0 z-50">
      <div className="flex-1 flex items-center gap-4">
        <Link to="/" className="flex items-center gap-2 hover:opacity-90">
          <img src={logo} alt="logo" className="w-14 h-14 object-contain drop-shadow-md" />
        </Link>
        <ul className="flex gap-3 ml-2">
          <li>
            <button className="btn btn-circle btn-ghost text-2xl tooltip tooltip-bottom" data-tip="Notifications">
              <IoIosNotificationsOutline />
            </button>
          </li>
          <li>
            <button className="btn btn-circle btn-ghost text-2xl tooltip tooltip-bottom" data-tip="Likes">
              <CiHeart />
            </button>
          </li>
          <li>
            <button className="btn btn-circle btn-ghost text-2xl tooltip tooltip-bottom" data-tip="Messages">
              <FiMessageSquare />
            </button>
          </li>
        </ul>
      </div>
      <div className="flex items-center gap-3">
        <input
          type="text"
          placeholder="Search"
          className="input input-bordered w-32 md:w-56 rounded-full shadow-sm focus:outline-none focus:ring-2 focus:ring-primary"
        />
        <div
          className={`dropdown dropdown-end mx-1 ${isOpen ? 'dropdown-open' : ''}`}
        >
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost btn-circle avatar focus:ring-2 focus:ring-primary"
            onClick={() => setIsOpen(!isOpen)}
            ref={dropdownRef}
          >
            <div className="w-10 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2 overflow-hidden">
              <img
                alt="User avatar"
                src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
              />
            </div>
          </div>

          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-10 mt-3 w-56 p-2 shadow-lg"
            onClick={handleDropdownClick}
          >
            {/* Dark/Light Toggle */}
            <li className="mb-1">
              <button
                className="flex items-center gap-2 px-2 py-2 rounded hover:bg-base-200 transition-colors font-medium"
                onClick={e => {
                  e.stopPropagation();
                  toggleTheme();
                }}
              >
                {theme === 'dark' ? (
                  <>
                    <span className="text-lg">🌙</span>
                    <span>Dark Mode</span>
                  </>
                ) : (
                  <>
                    <span className="text-lg">☀️</span>
                    <span>Light Mode</span>
                  </>
                )}
              </button>
            </li>
            <div className="divider my-0" />
            <li>
              <Link to="/" className="justify-between font-semibold hover:bg-base-200">
                Profile
              </Link>
            </li>
            <li>
              <a className="font-semibold hover:bg-base-200">Settings</a>
            </li>
            <div className="divider my-0" />
            <li>
              <button
                onClick={handleLogout}
                className="text-error font-semibold hover:bg-error hover:text-base-100 transition-colors"
              >
                Logout
              </button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
