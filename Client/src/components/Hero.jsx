import React, { useState } from 'react'
import { assets, cityList } from '../assets/assets'
import { useAppContext } from '../context/AppContext'
import { motion, useScroll, useTransform } from 'motion/react'

const Hero = () => {
  const [pickupLocation, setPickupLocation] = useState('')
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const [filteredCities, setFilteredCities] = useState(cityList)
  const { pickupDate, setPickupDate, returnDate, setReturnDate, navigate } = useAppContext()
  
  // Scroll animation for the car
  const { scrollY } = useScroll()
  const carX = useTransform(scrollY, [0, 400], ['0%', '-150%'])

  const handleLocationChange = (e) => {
    const value = e.target.value
    setPickupLocation(value)
    setIsDropdownOpen(true)
    
    if (value.trim() === '') {
      setFilteredCities(cityList)
    } else {
      setFilteredCities(
        cityList.filter(city =>
          city.toLowerCase().includes(value.toLowerCase())
        )
      )
    }
  }

  const handleSelectCity = (city) => {
    setPickupLocation(city)
    setIsDropdownOpen(false)
  }

  const handleSearch = (e) => {
    e.preventDefault()
    navigate('/cars?pickupLocation=' + pickupLocation + '&pickupDate=' + pickupDate + '&returnDate=' + returnDate)
  }

  return (
    <motion.div 
      className="min-h-screen flex flex-col items-center bg-borderColor text-center pt-16 pb-32 md:pb-40 relative overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      <motion.h1 
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="text-4xl md:text-5xl font-semibold mb-6 px-4"
      >
        Cars on Rent
      </motion.h1>

      <motion.form 
        initial={{ scale: 0.95, y: 50, opacity: 0 }}
        animate={{ scale: 1, y: 0, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        onSubmit={handleSearch} 
        className="flex flex-col md:flex-row items-start md:items-center justify-between py-4 px-6 rounded-xl md:rounded-full w-full max-w-[56rem] bg-white shadow-xl mx-4"
      >
        <div className="flex flex-col md:flex-row items-start md:items-center gap-6 md:gap-10 w-full md:ml-6">
          {/* Pickup Location - Custom Dropdown */}
          <div className="flex flex-col items-start gap-2 w-full md:w-auto relative">
            <label className="text-sm font-medium text-gray-700">Pickup Location</label>
            <input
              type="text"
              required
              value={pickupLocation}
              onChange={handleLocationChange}
              onFocus={() => setIsDropdownOpen(true)}
              onBlur={() => setTimeout(() => setIsDropdownOpen(false), 200)}
              className="text-gray-800 border border-gray-300 rounded-lg px-3 py-2 w-full md:w-48 placeholder:text-gray-400 focus:outline-primary focus:border-primary"
              placeholder="Please select or type"
            />
            
            {isDropdownOpen && filteredCities.length > 0 && (
              <div className="absolute top-full left-0 mt-1 w-full md:w-48 bg-white border border-gray-300 rounded-lg shadow-lg z-50 max-h-40 overflow-y-auto">
                {filteredCities.map((city) => (
                  <button
                    key={city}
                    type="button"
                    onMouseDown={() => handleSelectCity(city)}
                    className="w-full text-left px-3 py-2 text-sm text-gray-800 hover:bg-gray-100 transition-colors border-b border-gray-100 last:border-b-0"
                  >
                    {city}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Pickup Date */}
          <div className="flex flex-col items-start gap-2 w-full md:w-auto">
            <label htmlFor="pickup-date" className="text-sm font-medium text-gray-700">
              Pick-up Date
            </label>
            <input 
              value={pickupDate} 
              onChange={(e) => setPickupDate(e.target.value)}
              type="date"
              id="pickup-date"
              min={new Date().toISOString().split('T')[0]}
              className="text-gray-400 border border-gray-300 rounded-lg px-3 py-2 w-full md:w-auto focus:outline-primary focus:border-primary"
              required
            />
          </div>

          {/* Return Date */}
          <div className="flex flex-col items-start gap-2 w-full md:w-auto">
            <label htmlFor="return-date" className="text-sm font-medium text-gray-700">
              Return Date
            </label>
            <input 
              value={returnDate} 
              onChange={(e) => setReturnDate(e.target.value)}
              type="date"
              id="return-date"
              min={pickupDate || new Date().toISOString().split('T')[0]}
              className="text-gray-800 border border-gray-300 rounded-lg px-3 py-2 w-full md:w-auto focus:outline-primary focus:border-primary"
              required
            />
          </div>
        </div>

        {/* Search Button */}
        <motion.button 
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }} 
          className="flex items-center justify-center gap-2 px-8 py-3 mt-4 md:mt-0 md:ml-4 bg-primary hover:bg-primary-dull text-white rounded-full cursor-pointer font-medium shadow-md w-full md:w-auto"
        >
          <img src={assets.search_icon} alt="search" className="brightness-200 w-4 h-4" />
          Search
        </motion.button>
      </motion.form>

      {/* Animated Car with scroll behavior */}
      <motion.div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[800px] pointer-events-none px-4"
        style={{ x: carX }}
        initial={{ x: '100vw' }}
        animate={{ x: '0%' }}
        transition={{
          duration: 2,
          ease: [0.22, 1, 0.36, 1]
        }}
      >
        <motion.img
          src={assets.main_car}
          alt="car"
          className="w-full h-auto object-contain"
          animate={{ 
            y: [0, -8, 0],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </motion.div>
    </motion.div>
  )
}

export default Hero