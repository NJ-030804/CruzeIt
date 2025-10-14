import React, { useState } from 'react'
import { assets, ownerMenuLinks } from '../../assets/assets'
import { NavLink, useLocation } from 'react-router-dom'
import { useAppContext } from '../../context/AppContext'
import toast from 'react-hot-toast'

const Sidebar = () => {

  const {user, axios, fetchUser} = useAppContext()
  const location = useLocation()
  const [image, setImage] = useState('')

  const updateImage = async () => {
      try {
        const formData = new FormData()
        formData.append('image',image)

        const {data} = await axios.post('/api/owner/update-image',
        formData)

        if (data.success){
          fetchUser()
          toast.success(data.message)
          setImage('')
        }else{ 
          toast.error(data.message)
        }

      } catch (error) {
        toast.error(error.message)
      }
  }

  return (
    <div className="relative min-h-screen md:flex flex-col items-center pt-8 max-w-13 md:max-w-60 w-full border-r border-gray-200 text-sm">
      {/* Profile Image Upload */}
      <div className="group relative">
        <label htmlFor="image" className="cursor-pointer">
          <img
            src={
              image
                ? URL.createObjectURL(image)
                : user?.image ||
                  'https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=300'
            }
            alt="profile"
            className="h-9 w-9 md:h-14 md:w-14 rounded-full mx-auto"
          />
          <input
            type="file"
            id="image"
            accept="image/*"
            hidden
            onChange={(e) => setImage(e.target.files[0])}
          />
          <div className="absolute hidden top-0 right-0 left-0 bottom-0 bg-black/10 rounded-full group-hover:flex items-center justify-center">
            <img src={assets.edit_icon} alt="edit" />
          </div>
        </label>
      </div>

      {/* Save Button */}
      {image && (
        <button 
          className="absolute top-0 right-0 flex p-2 gap-1 bg-gray-100 text-gray-700 hover:bg-gray-200 cursor-pointer transition-colors"
          onClick={updateImage}
        >
          Save <img src={assets.check_icon} width={13} alt="c" />
        </button>
      )}

      {/* User Name */}
      <p className="mt-2 text-base max-md:hidden">{user?.name}</p>

      {/* Sidebar Menu */}
      <div className="w-full">
        {ownerMenuLinks.map((link, index) => (
          <NavLink
            key={index}
            to={link.path}
            className={`relative flex items-center gap-2 w-full py-3 pl-4 first:mt-6 ${
            link.path === location.pathname
           ? 'bg-gray-100 text-gray-900'
             : 'text-gray-600 hover:bg-gray-50'
            }`}
          >
            <img
              src={link.path === location.pathname ? link.ColoredIcon : link.icon}
              alt="car icon"
            />
            <span className="max-md:hidden">{link.name}</span>
            {link.path === location.pathname && (
              <div className="bg-gray-800 w-1.5 h-8 rounded-r absolute right-0" />
            )}
          </NavLink>
        ))}
      </div>
    </div>
  )
}

export default Sidebar