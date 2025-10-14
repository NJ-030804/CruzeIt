import React from 'react'
import { useNavigate } from 'react-router-dom'
import { assets } from '../assets/assets' 
import { motion } from 'framer-motion'

const CarCards = ({ car }) => {
  const currency = import.meta.env.VITE_CURRENCY 
  const navigate = useNavigate()

  const handleCardClick = () => {
    if (car.isAvailable) {
      navigate(`/car-details/${car._id}`)
      scrollTo(0, 0)
    }
  }

  return (
    <div
      onClick={handleCardClick}
      className={`relative group rounded-xl overflow-hidden shadow-lg transition-all duration-500 ${
        car.isAvailable 
          ? 'hover:-translate-y-1 cursor-pointer' 
          : 'opacity-60 cursor-not-allowed'
      }`}
    >
      {/* Unavailable Overlay */}
      {!car.isAvailable && (
        <div className="absolute inset-0 bg-black/50 backdrop-blur-[2px] z-20 flex items-center justify-center">
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: 'spring', stiffness: 200, damping: 15 }}
            className="bg-red-500 text-white px-6 py-3 rounded-full font-bold text-lg shadow-2xl"
          >
            Unavailable
          </motion.div>
        </div>
      )}

      {/* Car Image */}
      <div className="relative h-48 overflow-hidden">
        <img
          src={car.image}
          alt="Car"
          className={`w-full h-full object-cover transition-transform duration-500 ${
            car.isAvailable ? 'group-hover:scale-105' : ''
          }`}
        />

        {car.isAvailable && (
          <p className="absolute top-4 left-4 z-10 bg-primary/90 text-white text-xs px-2.5 py-1 rounded-full">
            Available Now
          </p>
        )}

        <div className="absolute bottom-4 right-4 bg-black/80 backdrop-blur-sm text-white px-3 py-2 rounded-lg">
          <span className="font-semibold">
            {currency}
            {car.price_per_day}
          </span>
          <span className="text-sm text-white/80"> / day </span>
        </div>
      </div>

      {/* Car Info */}
      <div className="p-4 sm:p-5">
        <div className="flex justify-between items-start mb-2">
          <div>
            <h3 className="text-lg font-medium">
              {car.brand} {car.model}
            </h3>
            <p className="text-muted-foreground text-sm">
              {car.category} • {car.year}
            </p>
          </div>
        </div>

        <div className="mt-4 grid grid-cols-2 gap-y-2 text-gray-600">
          <div className="flex items-center text-sm text-muted-foreground">
            <img src={assets.users_icon} alt="" className="h-4 mr-2" />
            <span>{car.seating_capacity} Seats</span>
          </div>

          <div className="flex items-center text-sm text-muted-foreground">
            <img src={assets.fuel_icon} alt="" className="h-4 mr-2" />
            <span>{car.fuel_type}</span>
          </div>

          <div className="flex items-center text-sm text-muted-foreground">
            <img src={assets.car_icon} alt="" className="h-4 mr-2" />
            <span>{car.transmission}</span>
          </div>

          <div className="flex items-center text-sm text-muted-foreground">
            <img src={assets.location_icon} alt="" className="h-4 mr-2" />
            <span>{car.location}</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CarCards

