import Testimonial from '../models/TestimonialModel.js'

// Create a new testimonial
export const createTestimonial = async (req, res) => {
  try {
    const { name, rating, testimonial } = req.body
    const userId = req.user._id // From auth middleware (req.user is set by protect middleware)
    
    console.log('Creating testimonial for user:', userId) // Debug log
    
    // Validation
    if (!name || !rating || !testimonial) {
      return res.json({
        success: false,
        message: 'All fields are required'
      })
    }
    if (rating < 1 || rating > 5) {
      return res.json({
        success: false,
        message: 'Rating must be between 1 and 5'
      })
    }
    
    // Create testimonial
    const newTestimonial = new Testimonial({
      userId,
      name,
      rating,
      testimonial,
      reportedBy: []
    })
    
    await newTestimonial.save()
    
    console.log('Testimonial created:', newTestimonial) // Debug log
    
    res.json({
      success: true,
      message: 'Thank you for your review!',
      testimonial: newTestimonial
    })
  } catch (error) {
    console.error('Error creating testimonial:', error)
    res.json({
      success: false,
      message: error.message
    })
  }
}

// Get latest testimonials (LIMIT TO 3 FOR MAIN PAGE)
export const getLatestTestimonials = async (req, res) => {
  try {
    const testimonials = await Testimonial.find()
      .sort({ createdAt: -1 })
      .limit(3) 
    
    res.json({
      success: true,
      testimonials
    })
  } catch (error) {
    console.error('Error fetching testimonials:', error)
    res.json({
      success: false,
      message: error.message
    })
  }
}

// Get all testimonials (optional - for admin panel)
export const getAllTestimonials = async (req, res) => {
  try {
    const testimonials = await Testimonial.find()
      .sort({ createdAt: -1 })
    
    res.json({
      success: true,
      testimonials
    })
  } catch (error) {
    console.error('Error fetching testimonials:', error)
    res.json({
      success: false,
      message: error.message
    })
  }
}

// Update testimonial (user can only edit their own)
export const updateTestimonial = async (req, res) => {
  try {
    const { id } = req.params
    const { rating, testimonial } = req.body
    const userId = req.user._id // From auth middleware
    
    // Find testimonial
    const existingTestimonial = await Testimonial.findById(id)
    
    if (!existingTestimonial) {
      return res.json({
        success: false,
        message: 'Review not found'
      })
    }
    
    // Check if user owns this testimonial
    if (existingTestimonial.userId.toString() !== userId.toString()) {
      return res.json({
        success: false,
        message: 'You can only edit your own reviews'
      })
    }
    
    // Validation
    if (!rating || !testimonial) {
      return res.json({
        success: false,
        message: 'All fields are required'
      })
    }
    if (rating < 1 || rating > 5) {
      return res.json({
        success: false,
        message: 'Rating must be between 1 and 5'
      })
    }
    
    // Update testimonial
    existingTestimonial.rating = rating
    existingTestimonial.testimonial = testimonial
    existingTestimonial.updatedAt = Date.now()
    
    await existingTestimonial.save()
    
    res.json({
      success: true,
      message: 'Review updated successfully!',
      testimonial: existingTestimonial
    })
  } catch (error) {
    console.error('Error updating testimonial:', error)
    res.json({
      success: false,
      message: error.message
    })
  }
}

// Delete testimonial (user can only delete their own)
export const deleteTestimonial = async (req, res) => {
  try {
    const { id } = req.params
    const userId = req.user._id 

    const testimonial = await Testimonial.findById(id)
    
    if (!testimonial) {
      return res.json({
        success: false,
        message: 'Review not found'
      })
    }
    
    // Check if user owns this testimonial
    if (testimonial.userId.toString() !== userId.toString()) {
      return res.json({
        success: false,
        message: 'You can only delete your own reviews'
      })
    }
    
    // Delete testimonial
    await Testimonial.findByIdAndDelete(id)
    
    res.json({
      success: true,
      message: 'Review deleted successfully!'
    })
  } catch (error) {
    console.error('Error deleting testimonial:', error)
    res.json({
      success: false,
      message: error.message
    })
  }
}

// Report testimonial
export const reportTestimonial = async (req, res) => {
  try {
    const { id } = req.params
    const userId = req.user._id // From auth middleware
    
    // Find testimonial
    const testimonial = await Testimonial.findById(id)
    
    if (!testimonial) {
      return res.json({
        success: false,
        message: 'Review not found'
      })
    }
    
    // Check if user already reported this testimonial
    if (testimonial.reportedBy.some(reportId => reportId.toString() === userId.toString())) {
      return res.json({
        success: false,
        message: 'You have already reported this review'
      })
    }
    
    // Add user to reportedBy array
    testimonial.reportedBy.push(userId)
    
    // Check if reports threshold reached (5 reports)
    if (testimonial.reportedBy.length >= 5) {
      // Auto-delete testimonial
      await Testimonial.findByIdAndDelete(id)
      
      return res.json({
        success: true,
        message: 'Review has been removed due to multiple reports',
        deleted: true
      })
    }
    
    await testimonial.save()
    
    res.json({
      success: true,
      message: 'Review reported successfully. Thank you for your feedback.',
      reportCount: testimonial.reportedBy.length
    })
  } catch (error) {
    console.error('Error reporting testimonial:', error)
    res.json({
      success: false,
      message: error.message
    })
  }
}

