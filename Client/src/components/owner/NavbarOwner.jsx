import React from 'react'
import { assets } from '../../assets/assets'
import { Link } from 'react-router-dom'
import { useAppContext } from '../../context/AppContext'
import { motion } from 'framer-motion'

const NavbarOwner = () => {
  const { user } = useAppContext()

  return (
    <motion.div 
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="flex items-center justify-between px-6 md:px-10 py-4 text-gray-500 border-b border-borderColor relative transition-all bg-white shadow-sm"
    >
      {/* Logo with hover effect */}
      <Link to="/">
        <motion.img 
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          src={assets.Logo} 
          alt="logo" 
          className="h-7" 
        />
      </Link>

      {/* Welcome Message with Animation */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="flex items-center gap-3"
      >
        {/* Profile Picture */}
        <motion.div
          whileHover={{ scale: 1.1, rotate: 5 }}
          transition={{ type: "spring", stiffness: 300 }}
          className="hidden sm:block"
        >
          {user?.image && user.image !== ' ' ? (
            <img 
              src={user.image} 
              alt={user.name}
              className="w-8 h-8 rounded-full object-cover border-2 border-primary shadow-md"
            />
          ) : (
            <div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center font-semibold text-sm border-2 border-primary shadow-md">
              {user?.name?.charAt(0).toUpperCase()}
            </div>
          )}
        </motion.div>

        {/* Welcome Text */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-right"
        >
          <p className="text-xs text-gray-400 hidden sm:block">Welcome back,</p>
          <p className="text-sm font-semibold text-gray-700">
            {user?.name || 'Owner'}
          </p>
        </motion.div>

        {/* Dashboard Badge */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", delay: 0.4 }}
          className="hidden md:flex items-center gap-1 bg-primary/10 text-primary px-3 py-1 rounded-full text-xs font-medium"
        >
          <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
            <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"/>
          </svg>
          Dashboard
        </motion.div>
      </motion.div>
    </motion.div>
  )
}

export default NavbarOwner

