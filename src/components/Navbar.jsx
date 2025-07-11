import { Link, useNavigate } from 'react-router-dom'
import Cookies from 'js-cookie'
import { useRef, useState, useEffect } from 'react'

const Navbar = () => {
  const navigate = useNavigate()
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef(null)

  const handleLogout = () => {
    console.log('hllo i am logout')
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
    <div className="navbar bg-base-300 shadow-sm">
      <div className="flex-1">
        <a className="btn btn-ghost text-xl">DevTinder</a>
      </div>
      <div className="flex gap-2">
        <div
          className={`dropdown dropdown-end mx-3 ${
            isOpen ? 'dropdown-open' : ''
          }`}
        >
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost btn-circle avatar"
            onClick={() => setIsOpen(!isOpen)}
            ref={dropdownRef}
          >
            <div className="w-10 rounded-full">
              <img
                alt="User avatar"
                src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
              />
            </div>
          </div>

          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-10 mt-3 w-52 p-2 shadow"
            onClick={handleDropdownClick} // Add this to close on any click inside
          >
            <li>
              <Link to="/" className="justify-between">
                Profile
              </Link>
            </li>
            <li>
              <a>Settings</a>
            </li>
            <li>
              <button onClick={handleLogout}>Logout</button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default Navbar
