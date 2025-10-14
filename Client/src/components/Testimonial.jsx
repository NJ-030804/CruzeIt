import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useAppContext } from '../context/AppContext'
import toast from 'react-hot-toast'
import { assets } from '../assets/assets'

// Star Icon Component
const StarIcon = ({ filled, className }) => (
  <svg 
    className={className}
    fill={filled ? "currentColor" : "none"}
    stroke="currentColor"
    viewBox="0 0 24 24"
    xmlns= "http://www.w3.org/2000/svg"
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
  const { axios } = useAppContext()
  const [testimonials, setTestimonials] = useState([])
  const [filteredTestimonials, setFilteredTestimonials] = useState([])
  const [showForm, setShowForm] = useState(false)
  const [loading, setLoading] = useState(true)
  const [selectedFilter, setSelectedFilter] = useState('all')
  const [showFilterMenu, setShowFilterMenu] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    rating: 0,
    testimonial: ''
  })
  const [hoveredRating, setHoveredRating] = useState(0)

  // Bad words list for filtering
  const badWords = [
    'gago', 'putang', 'tangina', 'bobo', 'tanga', 'puta', 'shit', 'fuck', 
    'bullshit', 'ass', 'damn', 'hell', 'stupid', 'idiot', 'bitch', 'bastard',
    'crap', 'suck', 'awful', 'terrible', 'worst', 'horrible', 'ulol', 'tarantado',
    'leche', 'yawa', 'animal', 'hayop', 'peste', 'kupal'
  ]

  // Function to censor bad words
  const censorBadWords = (text) => {
    let censoredText = text
    badWords.forEach(word => {
      const regex = new RegExp(word, 'gi')
      censoredText = censoredText.replace(regex, (match) => '*'.repeat(match.length))
    })
    return censoredText
  }

  // Function to check if text contains bad words
  const containsBadWords = (text) => {
    return badWords.some(word => 
      text.toLowerCase().includes(word.toLowerCase())
    )
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
  }, [selectedFilter, testimonials])

  // Submit new testimonial
  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (formData.name && formData.rating > 0 && formData.testimonial) {
      // Check for bad words before submitting
      if (containsBadWords(formData.name)) {
        toast.error('Please avoid using inappropriate language in your name')
        return
      }

      if (containsBadWords(formData.testimonial)) {
        toast.error('Please avoid using inappropriate language in your review')
        return
      }

      try {
        const { data } = await axios.post('/api/testimonials/create', {
          name: formData.name,
          rating: formData.rating,
          testimonial: formData.testimonial
        })
        
        if (data.success) {
          toast.success('Thank you for your review!')
          
          // Reset form
          setFormData({ name: '', rating: 0, testimonial: '' })
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

  // Format date helper
  const formatDate = (dateString) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffTime = Math.abs(now - date)
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24))
    
    if (diffDays === 0) return 'Today'
    if (diffDays === 1) return 'Yesterday'
    if (diffDays < 7) return `${diffDays} days ago`
    if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`
    return `${Math.floor(diffDays / 30)} months ago`
  }

  // Container animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  }

  // Card animation variants
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
          onClick={() => setShowForm(!showForm)}
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

      {/* Review Form */}
      <AnimatePresence>
        {showForm && (
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
              {/* Name Input */}
              <div>
                <label className="block text-gray-700 font-medium mb-2">
                  Your Name *
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                  placeholder="Enter your name"
                  required
                />
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
                  Please keep your review respectful and appropriate.
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

      {/* Testimonials Grid */}
      {loading ? (
        <div className="text-center py-12">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        </div>
      ) : (
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          <AnimatePresence>
            {filteredTestimonials.length > 0 ? (
              filteredTestimonials.map((testimonial, index) => (
                <motion.div 
                  key={testimonial._id}
                  variants={cardVariants}
                  initial="hidden"
                  animate="visible"
                  exit={{ opacity: 0, scale: 0.8 }}
                  layout
                  whileHover={{ 
                    y: -8, 
                    scale: 1.02,
                    transition: { duration: 0.3 }
                  }}
                  className="bg-white p-6 rounded-xl shadow-lg cursor-pointer"
                >
                  <motion.div 
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 + (index * 0.1) }}
                    className="flex items-center gap-3"
                  >
                    <motion.div
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      transition={{ duration: 0.3 }}
                      className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-primary-dull flex items-center justify-center text-white font-bold"
                    >
                      {testimonial.name.charAt(0).toUpperCase()}
                    </motion.div>
                    <div>
                      <p className="text-lg font-semibold">{testimonial.name}</p>
                      <p className="text-gray-400 text-sm">{formatDate(testimonial.createdAt)}</p>
                    </div>
                  </motion.div>

                  <motion.div 
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.3 + (index * 0.1) }}
                    className="flex items-center gap-1 mt-4"
                  >
                    {Array(testimonial.rating).fill(0).map((_, starIndex) => (
                      <motion.div
                        key={starIndex}
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ 
                          duration: 0.3, 
                          delay: 0.4 + (index * 0.1) + (starIndex * 0.05)
                        }}
                        whileHover={{ scale: 1.3, rotate: 15 }}
                      >
                        <StarIcon filled={true} className="w-4 h-4 text-yellow-400" />
                      </motion.div>
                    ))}
                  </motion.div>

                  <motion.p 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.6, delay: 0.5 + (index * 0.1) }}
                    className="text-gray-600 mt-4 leading-relaxed"
                  >
                    "{testimonial.testimonial}"
                  </motion.p>
                </motion.div>
              ))
            ) : (
              <div className="col-span-full text-center py-12 text-gray-500">
                <p className="text-lg">
                  {selectedFilter === 'all' 
                    ? 'No reviews yet. Be the first to share your experience!' 
                    : `No ${selectedFilter} star reviews found. Try a different filter.`
                  }
                </p>
              </div>
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </div>
  )
}

export default Testimonial
