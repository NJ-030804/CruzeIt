import React, { useState, useEffect } from 'react'
import { assets, menuLinks } from '../assets/assets'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useAppContext } from '../context/AppContext'
import { toast } from "react-hot-toast"
import { motion, AnimatePresence } from 'motion/react'

const Navbar = () => {
  const { setShowLogin, user, logout, isOwner, axios, setIsOwner } = useAppContext()

  const location = useLocation()   
  const [open, setOpen] = useState(false)
  const [showDropdown, setShowDropdown] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const navigate = useNavigate()

  const changeRole = async () => {
    try {
      const { data } = await axios.post('/api/owner/change-role')
      if (data.success) {
        setIsOwner(true)
        toast.success(data.message)
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
  }

  // Handle search
  const handleSearch = (e) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      navigate(`/cars?search=${encodeURIComponent(searchQuery.trim())}`)
      setSearchQuery('') // Clear search after navigation
    } else {
      toast.error('Please enter a search term')
    }
  }

  // Handle search input key press
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch(e)
    }
  }

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (showDropdown && !event.target.closest('.profile-dropdown')) {
        setShowDropdown(false)
      }
    }
    
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [showDropdown])

  // Close mobile menu when route changes
  useEffect(() => {
    setOpen(false)
  }, [location.pathname])

  return (
    <motion.div
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className={`flex items-center justify-between px-6 md:px-16 lg:px-24 xl:px-32
      py-4 text-gray-b border-b border-gray-400 relative transition-all
        ${location.pathname === "/" && "bg-borderColor"} `}
    >
      <Link to='/'>
        <motion.img whileHover={{ scale: 1.05 }} src={assets.Logo} alt="Logo" className="h-15" />
      </Link>

      <div
        className={`
          max-sm:fixed max-sm:h-screen max-sm:w-full max-sm:top-16 max-sm:border-t 
          border-borderColor right-0 flex flex-col sm:flex-row items-start sm:items-center gap-4 
          sm:gap-8 max-sm:p-4 transition-all duration-300 z-50
          ${location.pathname === "/" ? "bg-borderColor" : "bg-white"}
          ${open ? "max-sm:translate-x-0" : "max-sm:translate-x-full"} `}
      >
        {menuLinks.map((link, index) => (
          <Link 
            key={index} 
            to={link.path}
            onClick={() => setOpen(false)}
          >
            {link.name}
          </Link>
        ))}

        {/* Search Bar */}
        <form 
          onSubmit={handleSearch}
          className='hidden lg:flex items-center text-sm gap-2 border border-gray-500 px-3 rounded-full max-w-56 hover:border-primary transition-colors focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/20'
        >
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyPress={handleKeyPress}
            className="py-1.5 w-full bg-transparent outline-none placeholder-gray-500"
            placeholder="Search cars..."
          />
          <button 
            type="submit"
            className="cursor-pointer hover:opacity-70 transition-opacity"
            aria-label="Search"
          >
            <img src={assets.search_icon} alt="search" className="w-4 h-4" />
          </button>
        </form>

        <div className='flex max-sm:flex-col items-start sm:items-center gap-6 max-sm:w-full'>
          <button 
            onClick={() => {
              isOwner ? navigate('/owner') : changeRole()
              setOpen(false)
            }}
            className="cursor-pointer hover:text-primary transition-colors"
          >
            {isOwner ? 'Dashboard' : 'List cars'}
          </button>

          {user ? (
            <div className="relative profile-dropdown max-sm:w-full">
              {/* Profile Button with Picture */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                onClick={() => setShowDropdown(!showDropdown)}
                className="flex items-center gap-2 cursor-pointer max-sm:w-full"
              >
                {user.image && user.image !== ' ' ? (
                  <img 
                    src={user.image} 
                    alt={user.name}
                    className="w-10 h-10 rounded-full object-cover border-2 border-primary shadow-md"
                    onError={(e) => {
                      e.target.style.display = 'none'
                      e.target.nextSibling.style.display = 'flex'
                    }}
                  />
                ) : null}
                
                {/* Fallback Avatar with Initials */}
                <div 
                  className={`w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center font-semibold text-sm border-2 border-primary shadow-md ${user.image && user.image !== ' ' ? 'hidden' : 'flex'}`}
                >
                  {user.name?.charAt(0).toUpperCase()}
                </div>
                
                {/* Dropdown Arrow */}
                <svg 
                  className={`w-4 h-4 text-gray-600 transition-transform ${showDropdown ? 'rotate-180' : ''}`} 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </motion.button>

              {/* Dropdown Menu */}
              <AnimatePresence>
                {showDropdown && (
                  <motion.div
                    initial={{ opacity: 0, y: -10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -10, scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                    className="absolute right-0 sm:right-0 max-sm:left-0 max-sm:right-auto mt-2 w-64 max-sm:w-full bg-white rounded-xl shadow-2xl border border-gray-200 py-2 z-[60]"
                  >
                    {/* User Info */}
                    <div className="px-4 py-3 border-b border-gray-200">
                      <div className="flex items-center gap-3">
                        {user.image && user.image !== ' ' ? (
                          <img 
                            src={user.image} 
                            alt={user.name}
                            className="w-12 h-12 rounded-full object-cover border-2 border-primary"
                          />
                        ) : (
                          <div className="w-12 h-12 rounded-full bg-primary text-white flex items-center justify-center font-semibold text-lg border-2 border-primary">
                            {user.name?.charAt(0).toUpperCase()}
                          </div>
                        )}
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-semibold text-gray-800 truncate">{user.name}</p>
                          <p className="text-xs text-gray-500 truncate">{user.email}</p>
                          {user.authProvider === 'google' && (
                            <div className="flex items-center gap-1 mt-1">
                              <svg className="w-3 h-3" viewBox="0 0 24 24">
                                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                              </svg>
                              <span className="text-xs text-gray-500">Google Account</span>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                    
                    {/* Logout Button */}
                    <button
                      onClick={() => {
                        logout()
                        setShowDropdown(false)
                        setOpen(false)
                      }}
                      className="w-full text-left px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition-colors flex items-center gap-2 touch-manipulation"
                      style={{ 
                        WebkitTapHighlightColor: 'transparent',
                        userSelect: 'none'
                      }}
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                      </svg>
                      Logout
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ) : (
            <button 
              onClick={() => {
                setShowLogin(true)
                setOpen(false)
              }}
              className="cursor-pointer px-8 py-2 bg-primary hover:bg-primary-dull transition-all text-white rounded-lg"
            >
              Login
            </button>
          )}
        </div>
      </div>

      {/* Mobile menu toggle */}
      <button
        className='sm:hidden cursor-pointer'
        aria-label="Toggle menu"
        onClick={() => setOpen(!open)}
      >
        <img
          src={open ? assets.close_icon : assets.menu_icon}
          alt="menu"
        />
      </button>
    </motion.div>
  )
}

export default Navbar
