import React from 'react'
import { assets } from '../assets/assets'
import { motion } from 'motion/react'
import { useAppContext } from '../context/AppContext'

const Footer = () => {
  const { navigate, user, setShowLogin, isOwner } = useAppContext()

  // Scroll to top function
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }

  // Handle navigation with scroll to top
  const handleNavigate = (path) => {
    navigate(path)
    scrollToTop()
  }

  // Handle List Your Car click
  const handleListCarClick = (e) => {
    e.preventDefault()
    if (!user) {
      setShowLogin(true)
    } else if (isOwner) {
      navigate('/owner')
      scrollToTop()
    } else {
      navigate('/owner')
      scrollToTop()
    }
  }

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: 'easeOut'
      }
    }
  }

  const socialIconVariants = {
    hidden: { opacity: 0, scale: 0 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        type: 'spring',
        stiffness: 260,
        damping: 20
      }
    }
  }

  // Define navigation links
  const quickLinks = [
    { text: 'Home', path: '/' },
    { text: 'Browse Cars', path: '/cars' },
    { text: 'List Your Car', path: '/owner', requiresAuth: true },
    { text: 'About Us', path: '/about' }
  ]

  const resourceLinks = [
    { text: 'Help Center',}, // path: '/help' },
    { text: 'Terms of Service',}, // path: '/terms' },
    { text: 'Privacy Policy',}, // path: '/privacy' },
    { text: 'Insurance',} // path: '/insurance' }
  ]

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.8 }}
      className="px-6 md:px-16 lg:px-24 xl:px-32 mt-60 text-sm text-gray-500"
    >
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        className="flex flex-wrap justify-between items-start gap-8 pb-6 border-b border-borderColor"
      >
        {/* Logo and Description */}
        <motion.div 
          variants={itemVariants}
          className="flex flex-col items-start space-y-2"
        >
          <motion.img 
            whileHover={{ scale: 1.05, rotate: 2 }}
            transition={{ duration: 0.3 }}
            src={assets.Logo} 
            alt="logo" 
            className="h-40 w-40 cursor-pointer" 
            onClick={() => handleNavigate('/')}
          />
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="max-w-[20rem] mt-3"
          >
            Car rental service with a wide selection of vehicle for all your driving needs
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex items-center gap-3 mt-4"
          >
            {[
              { icon: assets.facebook_logo, alt: 'facebook', href: 'https://facebook.com' },
              { icon: assets.instagram_logo, alt: 'instagram', href: 'https://instagram.com' },
              { icon: assets.twitter_logo, alt: 'twitter', href: 'https://twitter.com' },
              { icon: assets.gmail_logo, alt: 'gmail', href: 'mailto:contact@cruzeit.com' }
            ].map((social, index) => (
              <motion.a
                key={index}
                href={social.href}
                target={social.alt !== 'gmail' ? '_blank' : undefined}
                rel={social.alt !== 'gmail' ? 'noopener noreferrer' : undefined}
                variants={socialIconVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                whileHover={{ scale: 1.2, y: -3 }}
                whileTap={{ scale: 0.9 }}
                transition={{ delay: 0.5 + (index * 0.1) }}
              >
                <img src={social.icon} className="w-5 h-5" alt={social.alt} />
              </motion.a>
            ))}
          </motion.div>
        </motion.div>

        {/* Quick Links */}
        <motion.div variants={itemVariants}>
          <h2 className="text-base font-medium text-gray-800 uppercase">Quick Links</h2>
          <motion.ul 
            className="mt-3 flex flex-col gap-1.5"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={{
              visible: {
                transition: {
                  staggerChildren: 0.1
                }
              }
            }}
          >
            {quickLinks.map((link, index) => (
              <motion.li
                key={index}
                variants={{
                  hidden: { opacity: 0, x: -10 },
                  visible: { opacity: 1, x: 0 }
                }}
              >
                <motion.button
                  onClick={(e) => {
                    if (link.requiresAuth) {
                      handleListCarClick(e)
                    } else {
                      handleNavigate(link.path)
                    }
                  }}
                  whileHover={{ x: 5, color: '#3b82f6' }}
                  transition={{ duration: 0.2 }}
                  className="text-left hover:underline cursor-pointer"
                >
                  {link.text}
                </motion.button>
              </motion.li>
            ))}
          </motion.ul>
        </motion.div>

        {/* Resources */}
        <motion.div variants={itemVariants}>
          <h2 className="text-base font-medium text-gray-800 uppercase">Resources</h2>
          <motion.ul 
            className="mt-3 flex flex-col gap-1.5"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={{
              visible: {
                transition: {
                  staggerChildren: 0.1
                }
              }
            }}
          >
            {resourceLinks.map((link, index) => (
              <motion.li
                key={index}
                variants={{
                  hidden: { opacity: 0, x: -10 },
                  visible: { opacity: 1, x: 0 }
                }}
              >
                <motion.button
                  onClick={() => handleNavigate(link.path)}
                  whileHover={{ x: 5, color: '#3b82f6' }}
                  transition={{ duration: 0.2 }}
                  className="text-left hover:underline cursor-pointer"
                >
                  {link.text}
                </motion.button>
              </motion.li>
            ))}
          </motion.ul>
        </motion.div>

        {/* Contact */}
        <motion.div variants={itemVariants}>
          <h2 className="text-base font-medium text-gray-800 uppercase">Contact</h2>
          <motion.ul 
            className="mt-3 flex flex-col gap-1.5"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={{
              visible: {
                transition: {
                  staggerChildren: 0.1
                }
              }
            }}
          >
            {[
              { text: '1234 Drive', type: 'address' },
              { text: 'Cabanatuan, Nueva Ecija', type: 'address' },
              { text: '+1(555)123-4567',}, // type: 'phone', href: 'tel:+15551234567' },
              { text: 'car@example.com',} // type: 'email', href: 'mailto:car@example.com' }
            ].map((info, index) => (
              <motion.li
                key={index}
                variants={{
                  hidden: { opacity: 0, x: -10 },
                  visible: { opacity: 1, x: 0 }
                }}
              >
                {info.href ? (
                  <motion.a
                    href={info.href}
                    whileHover={{ x: 5, color: '#3b82f6' }}
                    transition={{ duration: 0.2 }}
                    className="hover:underline"
                  >
                    {info.text}
                  </motion.a>
                ) : (
                  info.text
                )}
              </motion.li>
            ))}
          </motion.ul>
        </motion.div>
      </motion.div>

      {/* Bottom Bar */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="flex flex-col md:flex-row gap-2 items-center justify-between py-5"
      >
        <p>
          © {new Date().getFullYear()} <span className="hover:text-blue-500 transition-colors cursor-pointer" onClick={() => handleNavigate('/')}>CruzeIt</span>. All rights reserved.
        </p>
        <motion.ul 
          className="flex items-center gap-4"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={{
            visible: {
              transition: {
                staggerChildren: 0.1
              }
            }
          }}
        >
          {[
            { text: 'Term',}, // path: '/terms' },
            { text: '|',}, // divider: true },
            { text: 'Privacy',}, // path: '/privacy' },
            { text: '|', divider: true },
            { text: 'Cookies',} // path: '/cookies' }
          ].map((item, index) => (
            <motion.li
              key={index}
              variants={{
                hidden: { opacity: 0, y: 10 },
                visible: { opacity: 1, y: 0 }
              }}
            >
              {item.divider ? (
                item.text
              ) : (
                <motion.button
                  onClick={() => handleNavigate(item.path)}
                  whileHover={{ y: -2, color: '#3b82f6' }}
                  transition={{ duration: 0.2 }}
                  className="hover:underline cursor-pointer"
                >
                  {item.text}
                </motion.button>
              )}
            </motion.li>
          ))}
        </motion.ul>
      </motion.div>
    </motion.div>
  )
}

export default Footer
