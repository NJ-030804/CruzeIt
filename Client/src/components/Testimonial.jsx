import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useAppContext } from '../context/AppContext'
import toast from 'react-hot-toast'

// Star Icon Component
const StarIcon = ({ filled, className }) => (
  <svg 
    className={className}
    fill={filled ? "currentColor" : "none"}
    stroke="currentColor"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      strokeWidth={2} 
      d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" 
    />
  </svg>
)

// Filter Icon Component
const FilterIcon = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
  </svg>
)

const Testimonial = () => {
  const { axios, user, setShowLogin } = useAppContext()
  const [testimonials, setTestimonials] = useState([])
  const [filteredTestimonials, setFilteredTestimonials] = useState([])
  const [showForm, setShowForm] = useState(false)
  const [loading, setLoading] = useState(true)
  const [selectedFilter, setSelectedFilter] = useState('all')
  const [showFilterMenu, setShowFilterMenu] = useState(false)
  const [formData, setFormData] = useState({
    rating: 0,
    testimonial: ''
  })
  const [hoveredRating, setHoveredRating] = useState(0)

  // Carousel state
  const [currentPage, setCurrentPage] = useState(0)
  const [direction, setDirection] = useState(0)
  const itemsPerPage = 3

  // Enhanced bad words list for filtering
  const badWords = [
    'gago', 'putang', 'tangina', 'tanginamo', 'bobo', 'tanga', 'puta', 'punyeta',
    'shit', 'fuck', 'bullshit', 'ass', 'damn', 'hell', 'stupid', 'idiot', 
    'bitch', 'bastard', 'crap', 'suck', 'awful', 'terrible', 'worst', 'horrible', 
    'ulol', 'tarantado', 'leche', 'yawa', 'animal', 'hayop', 'peste', 'kupal',
    'kingina', 'pokpok', 'tamod', 'kantot', 'hindot', 'tite', 'bilat', 'puke',
    'inutil', 'walangya', 'putragis', 'pucha', 'buwisit', 'walanghiya'
  ]

  // Enhanced function to normalize text (remove numbers and special characters)
  const normalizeText = (text) => {
    return text
      .toLowerCase()
      .replace(/[0-9]/g, '') // Remove all numbers
      .replace(/[@#$%^&*()_+=\[\]{};':"\\|,.<>?]/g, '') // Remove special characters
      .replace(/\s+/g, '') // Remove spaces
  }

  // Enhanced function to check if text contains bad words (with leet speak detection)
  const containsBadWords = (text) => {
    const normalizedText = normalizeText(text)
    
    return badWords.some(word => {
      const normalizedWord = normalizeText(word)
      
      // Check direct match
      if (normalizedText.includes(normalizedWord)) {
        return true
      }
      
      // Check with common leet speak replacements
      const leetVariations = text
        .toLowerCase()
        .replace(/[0]/g, 'o')
        .replace(/[1]/g, 'i')
        .replace(/[3]/g, 'e')
        .replace(/[4]/g, 'a')
        .replace(/[5]/g, 's')
        .replace(/[7]/g, 't')
        .replace(/[8]/g, 'b')
        .replace(/[@]/g, 'a')
        .replace(/[$]/g, 's')
      
      const normalizedLeet = normalizeText(leetVariations)
      return normalizedLeet.includes(normalizedWord)
    })
  }

  // Function to censor bad words
  const censorBadWords = (text) => {
    let censoredText = text
    const normalizedInput = normalizeText(text)
    
    badWords.forEach(word => {
      const normalizedWord = normalizeText(word)
      
      // Create a regex that matches the word with any numbers/special chars in between
      const chars = word.split('')
      const pattern = chars.join('[0-9@#$%^&*()_+=\\[\\]{};\':"\\\\|,.<>?]*')
      const regex = new RegExp(pattern, 'gi')
      
      censoredText = censoredText.replace(regex, (match) => '*'.repeat(match.length))
    })
    
    return censoredText
  }

  // Fetch testimonials from database
  const fetchTestimonials = async () => {
    try {
      setLoading(true)
      const { data } = await axios.get('/api/testimonials/latest')
      if (data.success) {
        // Censor bad words in testimonials
        const censoredTestimonials = data.testimonials.map(testimonial => ({
          ...testimonial,
          testimonial: censorBadWords(testimonial.testimonial),
          name: censorBadWords(testimonial.name)
        }))
        setTestimonials(censoredTestimonials)
        setFilteredTestimonials(censoredTestimonials)
      }
    } catch (error) {
      console.error('Error fetching testimonials:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchTestimonials()
  }, [])

  // Filter testimonials by rating
  useEffect(() => {
    if (selectedFilter === 'all') {
      setFilteredTestimonials(testimonials)
    } else {
      const rating = parseInt(selectedFilter)
      setFilteredTestimonials(testimonials.filter(t => t.rating === rating))
    }
    setCurrentPage(0) // Reset to first page when filter changes
  }, [selectedFilter, testimonials])

  // Calculate total pages
  const totalPages = Math.ceil(filteredTestimonials.length / itemsPerPage)

  // Auto-slide effect
  useEffect(() => {
    if (filteredTestimonials.length <= itemsPerPage) return
    
    const timer = setInterval(() => {
      setDirection(1)
      setCurrentPage((prev) => (prev + 1) % totalPages)
    }, 5000) // Auto-slide every 5 seconds
    
    return () => clearInterval(timer)
  }, [filteredTestimonials.length, totalPages, itemsPerPage])

  // Handle write review button click
  const handleWriteReviewClick = () => {
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
      return
    }
    setShowForm(!showForm)
  }

  // Submit new testimonial
  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!user) {
      toast.error('Please log in to submit a review', {
        duration: 4000,
        icon: ''
      })
      return
    }

    if (formData.rating > 0 && formData.testimonial) {
      // Check for bad words before submitting
      if (containsBadWords(formData.testimonial)) {
        toast.error('Please avoid using inappropriate language in your review. This includes variations with numbers or special characters (e.g., "pu74ng").')
        return
      }

      try {
        const { data } = await axios.post('/api/testimonials/create', {
          name: user.name, // Use logged-in user's name
          rating: formData.rating,
          testimonial: formData.testimonial
        })
        
        if (data.success) {
          toast.success('Thank you for your review!')
          
          // Reset form
          setFormData({ rating: 0, testimonial: '' })
          setShowForm(false)
          
          // Refresh testimonials to show the new one
          fetchTestimonials()
        } else {
          toast.error(data.message || 'Failed to submit review')
        }
      } catch (error) {
        toast.error(error.response?.data?.message || 'Error submitting review')
      }
    }
  }

  const handleRatingClick = (rating) => {
    setFormData({ ...formData, rating })
  }

  // Format date helper - now shows minutes and hours
  const formatDate = (dateString) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffTime = Math.abs(now - date)
    const diffMinutes = Math.floor(diffTime / (1000 * 60))
    const diffHours = Math.floor(diffTime / (1000 * 60 * 60))
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24))
    
    if (diffMinutes < 1) return 'Just now'
    if (diffMinutes < 60) return `${diffMinutes} minute${diffMinutes !== 1 ? 's' : ''} ago`
    if (diffHours < 24) return `${diffHours} hour${diffHours !== 1 ? 's' : ''} ago`
    if (diffDays < 7) return `${diffDays} day${diffDays !== 1 ? 's' : ''} ago`
    if (diffDays < 30) return `${Math.floor(diffDays / 7)} week${Math.floor(diffDays / 7) !== 1 ? 's' : ''} ago`
    return `${Math.floor(diffDays / 30)} month${Math.floor(diffDays / 30) !== 1 ? 's' : ''} ago`
  }

  // Navigation handlers
  const handlePrev = () => {
    setDirection(-1)
    setCurrentPage((prev) => (prev === 0 ? totalPages - 1 : prev - 1))
  }

  const handleNext = () => {
    setDirection(1)
    setCurrentPage((prev) => (prev + 1) % totalPages)
  }

  // Get current page testimonials
  const getCurrentTestimonials = () => {
    const startIndex = currentPage * itemsPerPage
    const endIndex = startIndex + itemsPerPage
    return filteredTestimonials.slice(startIndex, endIndex)
  }

  // Slide variants for animation
  const slideVariants = {
    enter: (direction) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0
    }),
    center: {
      x: 0,
      opacity: 1
    },
    exit: (direction) => ({
      x: direction > 0 ? -1000 : 1000,
      opacity: 0
    })
  }

  return (
    <div className="py-28 px-6 md:px-16 lg:px-24 xl:px-44">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.8 }}
        className="text-center mb-12"
      >
        <h2 className="text-3xl md:text-4xl font-bold mb-4">What our Customers Say</h2>
        <p className="text-gray-500 max-w-2xl mx-auto">
          Discover why discerning travelers choose CruzIt for their Car accommodation around the world.
        </p>
      </motion.div>

      {/* Action Buttons */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="flex flex-wrap justify-center gap-4 mb-12"
      >
        {/* Write Review Button */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleWriteReviewClick}
          className="bg-primary text-white px-8 py-3 rounded-lg font-medium shadow-lg hover:bg-primary-dull transition-colors flex items-center gap-2"
        >
          <StarIcon filled={true} className="w-5 h-5" />
          {showForm ? 'Cancel' : 'Write a Review'}
        </motion.button>

        {/* Filter Dropdown */}
        <div className="relative">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowFilterMenu(!showFilterMenu)}
            className="bg-white border-2 border-primary text-primary px-8 py-3 rounded-lg font-medium shadow-lg hover:bg-primary hover:text-white transition-colors flex items-center gap-2"
          >
            <FilterIcon className="w-5 h-5" />
            Filter by Rating
          </motion.button>

          {/* Filter Menu */}
          <AnimatePresence>
            {showFilterMenu && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="absolute top-full mt-2 right-0 bg-white rounded-lg shadow-xl border border-gray-200 overflow-hidden z-10 min-w-[200px]"
              >
                <button
                  onClick={() => {
                    setSelectedFilter('all')
                    setShowFilterMenu(false)
                  }}
                  className={`w-full px-4 py-3 text-left hover:bg-gray-50 transition-colors flex items-center gap-2 ${
                    selectedFilter === 'all' ? 'bg-primary text-white hover:bg-primary-dull' : 'text-gray-700'
                  }`}
                >
                  All Reviews
                </button>
                {[5, 4, 3, 2, 1].map((rating) => (
                  <button
                    key={rating}
                    onClick={() => {
                      setSelectedFilter(rating.toString())
                      setShowFilterMenu(false)
                    }}
                    className={`w-full px-4 py-3 text-left hover:bg-gray-50 transition-colors flex items-center gap-2 ${
                      selectedFilter === rating.toString() ? 'bg-primary text-white hover:bg-primary-dull' : 'text-gray-700'
                    }`}
                  >
                    <div className="flex items-center gap-1">
                      {Array(rating).fill(0).map((_, i) => (
                        <StarIcon key={i} filled={true} className="w-4 h-4 text-yellow-400" />
                      ))}
                    </div>
                    <span>{rating} Star{rating !== 1 ? 's' : ''}</span>
                  </button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>

      {/* Active Filter Display */}
      {selectedFilter !== 'all' && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex justify-center mb-6"
        >
          <div className="bg-primary/10 text-primary px-6 py-2 rounded-full flex items-center gap-2">
            <span className="font-medium">Showing {selectedFilter} Star Reviews</span>
            <button
              onClick={() => setSelectedFilter('all')}
              className="ml-2 hover:bg-primary hover:text-white rounded-full p-1 transition-colors"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </motion.div>
      )}

      {/* Login Required Message - Show when not logged in and form is attempted */}
      {!user && showForm && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="max-w-2xl mx-auto mb-12"
        >
          <div className="bg-white rounded-2xl shadow-xl p-8 text-center">
            {/* Lock Icon */}
            <motion.div
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="w-20 h-20 mb-6 bg-primary/10 rounded-full flex items-center justify-center mx-auto"
            >
              <svg 
                className="w-10 h-10 text-primary" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" 
                />
              </svg>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-2xl font-semibold text-gray-800 mb-2"
            >
              Authentication Required
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-gray-500 mb-8 max-w-md mx-auto"
            >
              Please log in or create an account to write a review and share your experience with others.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="flex flex-col sm:flex-row justify-center gap-4"
            >
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  setShowForm(false)
                  setShowLogin(true)
                }}
                className="px-8 py-3 bg-primary text-white rounded-xl font-semibold hover:bg-primary-dull transition-all shadow-md flex items-center justify-center gap-2"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                </svg>
                Log In
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowForm(false)}
                className="px-8 py-3 bg-gray-100 text-gray-700 rounded-xl font-semibold hover:bg-gray-200 transition-all flex items-center justify-center gap-2"
              >
                Cancel
              </motion.button>
            </motion.div>

            {/* Decorative elements */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              transition={{ delay: 0.6 }}
              className="mt-8 grid grid-cols-3 gap-6 text-gray-400"
            >
              <div className="text-center">
                <div className="w-10 h-10 mx-auto mb-2 bg-gray-100 rounded-full flex items-center justify-center">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                  </svg>
                </div>
                <p className="text-xs">Rate Service</p>
              </div>
              <div className="text-center">
                <div className="w-10 h-10 mx-auto mb-2 bg-gray-100 rounded-full flex items-center justify-center">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                  </svg>
                </div>
                <p className="text-xs">Share Feedback</p>
              </div>
              <div className="text-center">
                <div className="w-10 h-10 mx-auto mb-2 bg-gray-100 rounded-full flex items-center justify-center">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <p className="text-xs">Help Others</p>
              </div>
            </motion.div>
          </div>
        </motion.div>
      )}

      {/* Review Form - Only for logged in users */}
      <AnimatePresence>
        {showForm && user && (
          <motion.form
            initial={{ opacity: 0, height: 0, marginBottom: 0 }}
            animate={{ opacity: 1, height: 'auto', marginBottom: 48 }}
            exit={{ opacity: 0, height: 0, marginBottom: 0 }}
            transition={{ duration: 0.5 }}
            onSubmit={handleSubmit}
            className="max-w-2xl mx-auto bg-white p-8 rounded-xl shadow-xl overflow-hidden"
          >
            <h3 className="text-2xl font-bold mb-6">Share Your Experience</h3>
            
            <div className="space-y-6">
              {/* Display User Name (Read-only) */}
              <div>
                <label className="block text-gray-700 font-medium mb-2">
                  Your Name
                </label>
                <div className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-50 text-gray-600">
                  {user?.name || 'User'}
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  Reviews are posted with your account name
                </p>
              </div>

              {/* Rating Input */}
              <div>
                <label className="block text-gray-700 font-medium mb-2">
                  Rating *
                </label>
                <div className="flex gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <motion.button
                      key={star}
                      type="button"
                      whileHover={{ scale: 1.2 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => handleRatingClick(star)}
                      onMouseEnter={() => setHoveredRating(star)}
                      onMouseLeave={() => setHoveredRating(0)}
                      className="focus:outline-none"
                    >
                      <StarIcon
                        filled={star <= (hoveredRating || formData.rating)}
                        className={`w-8 h-8 transition-all ${
                          star <= (hoveredRating || formData.rating)
                            ? 'text-yellow-400'
                            : 'text-gray-300'
                        }`}
                      />
                    </motion.button>
                  ))}
                </div>
              </div>

              {/* Testimonial Input */}
              <div>
                <label className="block text-gray-700 font-medium mb-2">
                  Your Review *
                </label>
                <textarea
                  value={formData.testimonial}
                  onChange={(e) => setFormData({ ...formData, testimonial: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all resize-none"
                  placeholder="Share your experience with us..."
                  rows="4"
                  required
                />
                <p className="text-xs text-gray-500 mt-2">
                  Please keep your review respectful and appropriate. Inappropriate language including variations with numbers or special characters (e.g., "pu74ng") will be detected and blocked.
                </p>
              </div>

              {/* Submit Button */}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                className="w-full bg-primary text-white py-3 rounded-lg font-medium shadow-lg hover:bg-primary-dull transition-colors"
              >
                Submit Review
              </motion.button>
            </div>
          </motion.form>
        )}
      </AnimatePresence>

      {/* Testimonials Carousel */}
      {loading ? (
        <div className="text-center py-12">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        </div>
      ) : filteredTestimonials.length > 0 ? (
        <div className="relative">
          {/* Navigation Buttons - Only show if more than 3 reviews */}
          {filteredTestimonials.length > itemsPerPage && (
            <>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={handlePrev}
                className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 md:-translate-x-12 z-10 bg-white shadow-xl rounded-full p-3 hover:bg-primary hover:text-white transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={handleNext}
                className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 md:translate-x-12 z-10 bg-white shadow-xl rounded-full p-3 hover:bg-primary hover:text-white transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </motion.button>
            </>
          )}

          {/* Carousel Container */}
          <div className="overflow-visible px-4 py-4">
            <div className="overflow-hidden">
              <AnimatePresence initial={false} custom={direction} mode="wait">
                <motion.div 
                  key={currentPage}
                  custom={direction}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{
                    x: { type: "spring", stiffness: 300, damping: 30 },
                    opacity: { duration: 0.2 }
                  }}
                  className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
                >
                  {getCurrentTestimonials().map((testimonial) => (
                    <motion.div 
                      key={testimonial._id}
                      whileHover={{ 
                        y: -8, 
                        scale: 1.02,
                        transition: { duration: 0.3 }
                      }}
                      className="bg-white p-6 rounded-xl shadow-lg cursor-pointer"
                    >
                      <div className="flex items-center gap-3">
                        <motion.div
                          whileHover={{ scale: 1.1, rotate: 5 }}
                          transition={{ duration: 0.3 }}
                          className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-primary-dull flex items-center justify-center text-white font-bold text-xl"
                        >
                          {testimonial.name.charAt(0).toUpperCase()}
                        </motion.div>
                        <div>
                          <p className="text-lg font-semibold">{testimonial.name}</p>
                          <p className="text-gray-400 text-sm">{formatDate(testimonial.createdAt)}</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-1 mt-4">
                        {Array(testimonial.rating).fill(0).map((_, starIndex) => (
                          <StarIcon key={starIndex} filled={true} className="w-5 h-5 text-yellow-400" />
                        ))}
                      </div>

                      <p className="text-gray-600 mt-4 leading-relaxed">
                        "{testimonial.testimonial}"
                      </p>
                    </motion.div>
                  ))}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {/* Carousel Indicators - Only show if more than 3 reviews */}
          {filteredTestimonials.length > itemsPerPage && (
            <div className="flex justify-center gap-2 mt-8">
              {Array.from({ length: totalPages }).map((_, index) => (
                <motion.button
                  key={index}
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => {
                    setDirection(index > currentPage ? 1 : -1)
                    setCurrentPage(index)
                  }}
                  className={`h-2 rounded-full transition-all ${
                    index === currentPage 
                      ? 'w-8 bg-primary' 
                      : 'w-2 bg-gray-300 hover:bg-primary/50'
                  }`}
                />
              ))}
            </div>
          )}
        </div>
      ) : (
        <div className="text-center py-12 text-gray-500">
          <p className="text-lg">
            {selectedFilter === 'all' 
              ? 'No reviews yet. Be the first to share your experience!' 
              : `No ${selectedFilter} star reviews found. Try a different filter.`
            }
          </p>
        </div>
      )}
    </div>
  )
}

export default Testimonial
