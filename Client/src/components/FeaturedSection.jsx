import React, { use } from 'react'
import Title from './Title'
import { assets, dummyCarData } from '../assets/assets'
import CarCards from './CarCards'
import { useNavigate } from 'react-router-dom'
import { useAppContext } from '../context/AppContext'
import {motion} from 'motion/react'

const FeaturedSection = () => {
  const navigate = useNavigate()
  const {cars} = useAppContext()

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

      {/* Car Cards Grid */}
      <motion.div 
        initial={{opacity:0, y:50}}
        whileInView={{opacity: 1, y: 0}}
        transition={{duration:0.8, delay:0.4}}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-16"
      >
        {cars.slice(0, 3).map((car, index) => (
          <motion.div 
            key={car._id}
            initial={{opacity:0, scale:0.9}}
            whileInView={{opacity: 1, scale:1}}
            transition={{duration:0.5, delay:0.5 + (index * 0.1)}}
          >
            <CarCards car={car} />
          </motion.div>
        ))}
      </motion.div>

      {/* Explore Button */}
      <motion.button
        initial={{opacity:0, y:20}}
        whileInView={{opacity: 1, y: 0}}
        transition={{duration:0.6, delay:0.8}}
        onClick={() => {
          navigate('/cars'); 
          scrollTo(0,0)
        }}
        className="flex items-center justify-center gap-2 px-6 py-2 border border-borderColor hover:bg-gray-50 rounded-md mt-16 cursor-pointer"
      >
        Explore all cars 
        <img src={assets.arrow_icon} alt="arrow" />
      </motion.button>
    </motion.div>
  )
}

export default FeaturedSection
