import React, { useState } from 'react'
import { motion } from 'motion/react'

const Newsletter = () => {
  const [email, setEmail] = useState('')
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    // Add your subscription logic here
    setIsSubmitted(true)
    setTimeout(() => {
      setIsSubmitted(false)
      setEmail('')
    }, 3000)
  }

  return (
    <motion.div 
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
      className="flex flex-col items-center justify-center text-center space-y-2 max-md:px-4 my-10 relative"
    >
      <motion.h1 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="md:text-4xl text-2xl font-semibold"
      >
        Never Miss a Deal!
      </motion.h1>
      
      <motion.p 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="md:text-lg text-gray-500/70 pb-8"
      >
        Subscribe to get the latest offers, new collections, and exclusive discounts
      </motion.p>

      <motion.form 
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.4 }}
        onSubmit={handleSubmit}
        className="flex items-center justify-between max-w-2xl w-full md:h-14 h-12 relative"
      >
        <motion.input
          whileFocus={{ scale: 1.02 }}
          transition={{ duration: 0.2 }}
          className="border border-gray-300 rounded-md h-full border-r-0 outline-none w-full rounded-r-none px-3 text-gray-500"
          type="email"  
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        
        <motion.button
          type="submit"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.98 }}
          className="md:px-12 px-8 h-full text-white bg-primary hover:bg-primary-dull transition-all cursor-pointer rounded-md rounded-l-none whitespace-nowrap relative overflow-hidden"
        >
          <motion.span
            animate={isSubmitted ? { y: -50, opacity: 0 } : { y: 0, opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            Subscribe Now
          </motion.span>
          
          <motion.span
            className="absolute inset-0 flex items-center justify-center"
            initial={{ y: 50, opacity: 0 }}
            animate={isSubmitted ? { y: 0, opacity: 1 } : { y: 50, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            ✓ Subscribed!
          </motion.span>
        </motion.button>

        {/* Success message */}
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.8 }}
          animate={isSubmitted ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 20, scale: 0.8 }}
          transition={{ duration: 0.4 }}
          className="absolute -bottom-12 left-1/2 -translate-x-1/2 bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg whitespace-nowrap"
        >
          🎉 Thank you for subscribing!
        </motion.div>
      </motion.form>
    </motion.div>
  )
}

export default Newsletter

