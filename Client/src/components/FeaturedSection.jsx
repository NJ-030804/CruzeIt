import React, { useState, useEffect } from 'react'
import Title from './Title'
import CarCards from './CarCards'
import { useNavigate } from 'react-router-dom'
import { useAppContext } from '../context/AppContext'
import { motion, AnimatePresence } from 'motion/react'

const FeaturedSection = () => {
  const navigate = useNavigate()
  const { cars } = useAppContext()
  const [currentIndex, setCurrentIndex] = useState(0)

  // Auto-rotate cars every 10 seconds
  useEffect(() => {
    if (cars.length <= 3) return

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => {
        const nextIndex = prevIndex + 3
        return nextIndex >= cars.length ? 0 : nextIndex
      })
    }, 10000)

    return () => clearInterval(interval)
  }, [cars.length])

  // Get 3 cars starting from currentIndex
  const displayedCars = cars.slice(currentIndex, currentIndex + 3)
  
  // If we don't have enough cars, wrap around to the beginning
  const carsToShow = displayedCars.length < 3 && cars.length > 3
    ? [...displayedCars, ...cars.slice(0, 3 - displayedCars.length)]
    : cars.length <= 3 
    ? cars 
    : displayedCars

  return (
    <motion.div 
      initial={{opacity:0, y:40}}
      whileInView={{opacity: 1, y: 0}}
      transition={{duration:1, ease: 'easeOut'}}
      className="flex flex-col items-center py-24 px-6 md:px-16 lg:px-24 xl:px-32"
    >
      {/* Decorative bar */}
      <motion.div 
        initial={{opacity:0, scaleX:0}}
        whileInView={{opacity: 1, scaleX: 1}}
        transition={{duration:0.6, delay:0.2}}
        className="w-20 h-1 bg-primaryColor mb-4 rounded-full"
      />
      
      {/* Title */}
      <motion.div
        initial={{opacity:0, y:20}}
        whileInView={{opacity: 1, y: 0}}
        transition={{duration:0.8, delay:0.3}}
      >
        <Title 
          title="Featured Vehicles" 
          subTitle="Explore our selection of vehicles available for your next adventure." 
        />
      </motion.div>

      {/* Car Cards Grid with Animation */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-16">
        <AnimatePresence mode="wait">
          {carsToShow.map((car, index) => (
            <motion.div 
              key={`${car._id}-${currentIndex}-${index}`}
              initial={{opacity:0, scale:0.8, y:20}}
              animate={{opacity: 1, scale:1, y:0}}
              exit={{opacity:0, scale:0.8, y:-20}}
              transition={{duration:0.5, delay: index * 0.1}}
            >
              <CarCards car={car} />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Pagination Dots */}
      {cars.length > 3 && (
        <div className="flex gap-2 mt-8">
          {Array.from({ length: Math.ceil(cars.length / 3) }).map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index * 3)}
              className={`w-2 h-2 rounded-full transition-all ${
                Math.floor(currentIndex / 3) === index 
                  ? 'bg-primaryColor w-8' 
                  : 'bg-gray-300'
              }`}
            />
          ))}
        </div>
      )}

      {/* Explore Button */}
      <motion.button
        initial={{opacity:0, y:20}}
        whileInView={{opacity: 1, y: 0}}
        transition={{duration:0.6, delay:0.8}}
        onClick={() => {
          navigate('/cars'); 
          scrollTo(0,0)
        }}
        className="flex items-center justify-center gap-2 px-6 py-2 border border-borderColor hover:bg-gray-50 rounded-md mt-8 cursor-pointer"
      >
        Explore all cars 
        <img src={assets.arrow_icon} alt="arrow" />
      </motion.button>
    </motion.div>
  )
}

export default FeaturedSection
