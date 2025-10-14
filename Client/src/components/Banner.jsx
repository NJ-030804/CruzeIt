import React from 'react'
import { assets } from '../assets/assets'
import { motion } from 'motion/react'
import { useAppContext } from '../context/AppContext'
import toast from 'react-hot-toast'

const Banner = () => {
  const { user, setShowLogin, navigate, isOwner } = useAppContext()

  const handleListCarClick = () => {
    if (!user) {
      toast.error('Please log in or create an account to list your car', {
        duration: 4000,
        icon: '',
        style: {
          borderRadius: '12px',
          background: '#344E41',
          color: '#fff',
          padding: '16px',
        },
      })
      setShowLogin(true)
    } else if (isOwner) {
      navigate('/owner')
    } else {
      // Redirect to change role or owner dashboard
      navigate('/owner')
      toast.success('Complete your profile to start listing cars!', {
        icon: '🚗',
        style: {
          borderRadius: '12px',
        },
      })
    }
  }

  return (
    <motion.div 
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
      className='relative flex flex-col md:flex-row md:items-center items-center justify-between px-8 md:px-14 py-12 md:py-10 bg-gradient-to-r from-[#344E41] to-[#DAD7CD] max-w-8xl min-h-[280px] mx-3 md:mx-auto rounded-2xl overflow-hidden shadow-2xl'
    >
      {/* Decorative Background Elements */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#344E41]/20 rounded-full blur-3xl"></div>
      
      <motion.div 
        initial={{ opacity: 0, x: -50 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
        className='relative z-10 text-white max-w-xl'
      > 
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full mb-4 border border-white/30"
        >
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path d="M10 3.5a1.5 1.5 0 013 0V4a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-.5a1.5 1.5 0 000 3h.5a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-.5a1.5 1.5 0 00-3 0v.5a1 1 0 01-1 1H6a1 1 0 01-1-1v-3a1 1 0 00-1-1h-.5a1.5 1.5 0 010-3H4a1 1 0 001-1V6a1 1 0 011-1h3a1 1 0 001-1v-.5z" />
          </svg>
          <span className="text-sm font-medium">Earn Extra Income</span>
        </motion.div>

        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className='text-4xl md:text-5xl font-bold leading-tight mb-4'
        >
          Do You Own a Car?
        </motion.h2>
        
        <motion.p 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className='text-lg mb-3 text-white/90'
        >
          Monetize your vehicle effortlessly by listing it on <span className="font-semibold">CruzeIt</span>.
        </motion.p>
        
        <motion.p 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className='text-white/80 mb-6 leading-relaxed'
        >
          We take care of insurance, driver verification, and secure payments - so you can earn passive income, stress-free.
        </motion.p>
     
        {/* Features List */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="flex flex-wrap gap-3 mb-6"
        >
          {['Insurance Covered', 'Verified Drivers', 'Secure Payments'].map((feature, index) => (
            <motion.div
              key={feature}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.7 + (index * 0.1) }}
              className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-3 py-1.5 rounded-lg border border-white/20"
            >
              <svg className="w-4 h-4 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span className="text-sm">{feature}</span>
            </motion.div>
          ))}
        </motion.div>

        <motion.button
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.8 }}
          whileHover={{ scale: 1.05, y: -2, boxShadow: '0 20px 40px rgba(0,0,0,0.2)' }}
          whileTap={{ scale: 0.98 }}
          onClick={handleListCarClick}
          className='group relative px-8 py-3.5 bg-white hover:bg-slate-50 transition-all text-[#344E41] rounded-xl text-base font-semibold cursor-pointer shadow-xl overflow-hidden'
        >
          <span className="relative z-10 flex items-center gap-2">
            List Your Car
            <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </span>
          {/* Animated gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
        </motion.button>
      </motion.div>
   
      <motion.div
        initial={{ opacity: 0, x: 100, scale: 0.8 }}
        whileInView={{ opacity: 1, x: 0, scale: 1 }}
        viewport={{ once: true }}
        transition={{ 
          duration: 1, 
          delay: 0.3, 
          ease: [0.22, 1, 0.36, 1]
        }}
        className="relative z-10 w-full max-w-md ml-auto mt-8 md:mt-0"
      >
        {/* Glow effect behind car */}
        <div className="absolute inset-0 bg-white/10 rounded-full blur-3xl scale-150"></div>
        
        <motion.img 
          animate={{ 
            y: [0, -10, 0],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          src={assets.carbanner} 
          alt="car" 
          className='relative z-10 w-full drop-shadow-2xl' 
          style={{
            transform: 'scaleX(-1)', 
            marginTop: '-60px', 
            marginBottom: '-160px',
            filter: 'drop-shadow(0 25px 50px rgba(0,0,0,0.3))'
          }} 
        />
        
        {/* Decorative circles */}
        <motion.div
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3]
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 border-4 border-white/20 rounded-full"
        ></motion.div>
      </motion.div>
    </motion.div>
  )
}

export default Banner

