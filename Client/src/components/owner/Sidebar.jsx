import React, { useState } from 'react'
import { assets, ownerMenuLinks } from '../../assets/assets'
import { NavLink, useLocation } from 'react-router-dom'
import { useAppContext } from '../../context/AppContext'
import { motion, AnimatePresence } from 'framer-motion'
import toast from 'react-hot-toast'

const Sidebar = () => {
  const { user, axios, fetchUser } = useAppContext()
  const location = useLocation()
  const [image, setImage] = useState(null)
  const [isUploading, setIsUploading] = useState(false)

  const updateImage = async () => {
    try {
      setIsUploading(true)
      const formData = new FormData()
      formData.append('image', image)

      const { data } = await axios.post('/api/owner/update-image', formData)

      if (data.success) {
        fetchUser()
        toast.success(data.message)
        setImage(null)
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    } finally {
      setIsUploading(false)
    }
  }

  const handleImageChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        toast.error('Image size should be less than 5MB')
        return
      }
      // Validate file type
      if (!file.type.startsWith('image/')) {
        toast.error('Please select a valid image file')
        return
      }
      setImage(file)
    }
  }

  return (
    <motion.div 
      initial={{ x: -100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="relative min-h-screen md:flex flex-col items-center pt-8 max-w-13 md:max-w-60 w-full border-r border-gray-200 text-sm bg-white"
    >
      {/* Profile Image Upload */}
      <motion.div 
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", delay: 0.2 }}
        className="group relative"
      >
        <label htmlFor="image" className="cursor-pointer block">
          <motion.img
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            src={
              image
                ? URL.createObjectURL(image)
                : user?.image && user.image !== ' '
                ? user.image
                : 'https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=300'
            }
            alt="profile"
            className="h-9 w-9 md:h-20 md:w-20 rounded-full mx-auto object-cover border-4 border-primary/20 shadow-lg"
          />
          <input
            type="file"
            id="image"
            accept="image/*"
            hidden
            onChange={handleImageChange}
          />
          <motion.div 
            initial={{ opacity: 0 }}
            whileHover={{ opacity: 1 }}
            className="absolute top-0 right-0 left-0 bottom-0 bg-black/50 rounded-full flex items-center justify-center"
          >
            <motion.img 
              whileHover={{ rotate: 180 }}
              transition={{ duration: 0.3 }}
              src={assets.edit_icon} 
              alt="edit" 
              className="w-5 h-5"
            />
          </motion.div>
        </label>

        {/* Upload Status Badge */}
        <AnimatePresence>
          {image && (
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              className="absolute -top-1 -right-1 bg-green-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs"
            >
              ✓
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Save Button */}
      <AnimatePresence>
        {image && (
          <motion.button
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -20, opacity: 0 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="mt-3 flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dull transition-colors shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
            onClick={updateImage}
            disabled={isUploading}
          >
            {isUploading ? (
              <>
                <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"/>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/>
                </svg>
                Uploading...
              </>
            ) : (
              <>
                Save
                <img src={assets.check_icon} width={13} alt="check" />
              </>
            )}
          </motion.button>
        )}
      </AnimatePresence>

      {/* User Name */}
      <motion.p 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="mt-3 text-base font-semibold text-gray-800 max-md:hidden"
      >
        {user?.name}
      </motion.p>

      {/* User Role Badge */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.4 }}
        className="mt-1 px-3 py-1 bg-primary/10 text-primary rounded-full text-xs font-medium max-md:hidden"
      >
        Car Owner
      </motion.div>

      {/* Sidebar Menu */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="w-full mt-6"
      >
        {ownerMenuLinks.map((link, index) => (
          <motion.div
            key={index}
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.6 + index * 0.1 }}
          >
            <NavLink
              to={link.path}
              className={`relative flex items-center gap-3 w-full py-3.5 pl-4 transition-all ${
                link.path === location.pathname
                  ? 'bg-primary/5 text-primary'
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
              }`}
            >
              <motion.img
                whileHover={{ scale: 1.2, rotate: 5 }}
                transition={{ type: "spring", stiffness: 300 }}
                src={link.path === location.pathname ? link.ColoredIcon : link.icon}
                alt={link.name}
                className="w-5 h-5"
              />
              <span className="max-md:hidden font-medium">{link.name}</span>
              
              {/* Active Indicator */}
              <AnimatePresence>
                {link.path === location.pathname && (
                  <motion.div
                    initial={{ scaleY: 0 }}
                    animate={{ scaleY: 1 }}
                    exit={{ scaleY: 0 }}
                    transition={{ type: "spring", stiffness: 300 }}
                    className="bg-primary w-1 h-8 rounded-l absolute right-0"
                  />
                )}
              </AnimatePresence>
            </NavLink>
          </motion.div>
        ))}
      </motion.div>

      {/* Bottom Decoration */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="mt-auto mb-6 max-md:hidden"
      >
        <div className="w-40 h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent"></div>
        <p className="text-xs text-gray-400 text-center mt-4">
          Owner Dashboard
        </p>
      </motion.div>
    </motion.div>
  )
}

export default Sidebar
