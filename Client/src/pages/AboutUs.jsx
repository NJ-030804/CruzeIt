import React from 'react'
import { motion } from 'framer-motion'
import Title from '../components/Title'
import { assets } from '../assets/assets'

const AboutUs = () => {
  // Team members data
  const teamMembers = [
    {
      name: 'Noel Narte Jr.',
      role: 'Scrum Master',
      image: assets.noel,
      social: {
        github: 'https://github.com/NJ-030804'
      }
    },
    {
      name: 'Lance Barbosa',
      role: 'Software Architect',
      image: assets.lance,
      social: {
        github: 'https://github.com/Miaowty'
      }
    },
    {
      name: 'Gio Paulo Cuanan',
      role: 'Frontend Developer',
      image: assets.gio,
      social: {
        github: 'https://github.com/draknuight'
      }
    },
    {
      name: 'John Mark Valdez',
      role: 'Backend Developer',
      image: assets.jm,
      social: {
        github: 'https://github.com/kramogs-bug'
      }
    },
    {
      name: 'Ayen Chavez',
      role: 'QA Engineer',
      image: assets.ayen,
      social: {
        github: 'https://github.com/ayencha1412-ux'
      }
    }
  ]

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.3
      }
    }
  }

  const cardVariants = {
    hidden: { 
      opacity: 0, 
      y: 50,
      scale: 0.9
    },
    visible: { 
      opacity: 1, 
      y: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1]
      }
    }
  }

  const heroVariants = {
    hidden: { opacity: 0, y: -30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.8,
        ease: 'easeOut'
      }
    }
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <motion.div 
        variants={heroVariants}
        initial="hidden"
        animate="visible"
        className='flex flex-col items-center py-20 bg-gradient-to-b from-[#344E41]/10 to-white max-md:px-4'
      >
        <Title 
          title='About CruzeIt' 
          subTitle='Meet the talented team behind your seamless car rental experience' 
        />
        
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className='max-w-3xl text-center text-gray-600 mt-6 px-4 leading-relaxed'
        >
          We are a passionate team of developers and designers dedicated to revolutionizing 
          the car rental experience. Our mission is to make vehicle sharing accessible, 
          convenient, and secure for everyone.
        </motion.p>
      </motion.div>

      {/* Team Section */}
      <div className='px-6 md:px-16 lg:px-24 xl:px-32 py-16'>
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto'
        >
          {teamMembers.map((member, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              whileHover={{ 
                y: -10, 
                scale: 1.03,
                transition: { duration: 0.3 }
              }}
              className='bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300 border border-gray-100'
            >
              {/* Image Container with Overlay */}
              <div className='relative h-72 overflow-hidden group'>
                <motion.img
                  src={member.image}
                  alt={member.name}
                  className='w-full h-full object-cover'
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.4 }}
                />
                
                {/* Gradient Overlay */}
                <div className='absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300' />
                
                {/* Social Icons - Appear on Hover */}
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  whileHover={{ opacity: 1, y: 0 }}
                  className='absolute bottom-4 left-0 right-0 flex justify-center gap-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300'
                >

                  <motion.a
                    href={member.social.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.2, y: -3 }}
                    whileTap={{ scale: 0.9 }}
                    className='w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-lg'
                  >
                    <svg className="w-5 h-5 text-gray-800" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                    </svg>
                  </motion.a>
                </motion.div>
              </div>

              {/* Content */}
              <div className='p-6'>
                <motion.h3 
                  className='text-xl font-bold text-gray-800 mb-1'
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 }}
                >
                  {member.name}
                </motion.h3>
                
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 }}
                  className='inline-block'
                >
                  <span className='inline-block px-3 py-1 bg-gradient-to-r from-[#344E41] to-[#588157] text-white text-sm rounded-full font-medium'>
                    {member.role}
                  </span>
                </motion.div>
                
                <motion.p 
                  className='text-gray-600 text-sm mt-3 leading-relaxed'
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4 }}
                >
                  {member.description}
                </motion.p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Mission Section */}
      <motion.div 
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className='bg-gradient-to-r from-[#344E41] to-[#588157] text-white py-20 px-6 md:px-16 lg:px-24 xl:px-32 mt-16'
      >
        <div className='max-w-4xl mx-auto text-center'>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className='text-3xl md:text-4xl font-bold mb-6'
          >
            Our Mission
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className='text-lg leading-relaxed text-white/90'
          >
            At CruzeIt, we believe in making car sharing accessible to everyone. Our platform 
            connects car owners with renters, creating a sustainable ecosystem that benefits 
            both parties. We're committed to providing a secure, reliable, and user-friendly 
            experience that transforms how people think about vehicle access.
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className='grid grid-cols-1 md:grid-cols-3 gap-8 mt-12'
          >
            {[
              { number: '1000+', label: 'Happy Customers' },
              { number: '500+', label: 'Available Cars' },
              { number: '50+', label: 'Cities Covered' }
            ].map((stat, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.05 }}
                className='bg-white/10 backdrop-blur-sm rounded-2xl p-6'
              >
                <h3 className='text-4xl font-bold mb-2'>{stat.number}</h3>
                <p className='text-white/80'>{stat.label}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.div>
    </div>
  )
}

export default AboutUs