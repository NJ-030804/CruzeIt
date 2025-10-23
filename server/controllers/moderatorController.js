import Testimonial from '../models/TestimonialModel.js'
import Car from '../models/Car.js'

// Middleware to check if user is moderator
export const checkModerator = (req, res, next) => {
  if (req.user.role !== 'moderator') {
    return res.status(403).json({
      success: false,
      message: 'Access denied. Moderators only.'
    })
  }
  next()
}

// Get all testimonials for moderation
export const getAllTestimonialsForModeration = async (req, res) => {
  try {
    const testimonials = await Testimonial.find()
      .sort({ createdAt: -1 })
      .populate('userId', 'name email')
    
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

// Get all cars for moderation
export const getAllCarsForModeration = async (req, res) => {
  try {
    const cars = await Car.find()
      .sort({ createdAt: -1 })
      .populate('owner', 'name email')
    
    res.json({
      success: true,
      cars
    })
  } catch (error) {
    console.error('Error fetching cars:', error)
    res.json({
      success: false,
      message: error.message
    })
  }
}

// Delete testimonial (moderator only)
export const deleteTestimonialByModerator = async (req, res) => {
  try {
    const { id } = req.params
    
    const testimonial = await Testimonial.findById(id)
    
    if (!testimonial) {
      return res.json({
        success: false,
        message: 'Review not found'
      })
    }
    
    await Testimonial.findByIdAndDelete(id)
    
    console.log('✅ Moderator deleted review:', id)
    
    res.json({
      success: true,
      message: 'Review deleted successfully'
    })
  } catch (error) {
    console.error('Error deleting testimonial:', error)
    res.json({
      success: false,
      message: error.message
    })
  }
}

// Delete car (moderator only)
export const deleteCarByModerator = async (req, res) => {
  try {
    const { id } = req.params
    
    const car = await Car.findById(id)
    
    if (!car) {
      return res.json({
        success: false,
        message: 'Car not found'
      })
    }
    
    await Car.findByIdAndDelete(id)
    
    console.log('✅ Moderator deleted car:', id)
    
    res.json({
      success: true,
      message: 'Car listing deleted successfully'
    })
  } catch (error) {
    console.error('Error deleting car:', error)
    res.json({
      success: false,
      message: error.message
    })
  }
}

// Get moderation statistics
export const getModerationStats = async (req, res) => {
  try {
    const totalTestimonials = await Testimonial.countDocuments()
    const reportedTestimonials = await Testimonial.countDocuments({
      'reportedBy.0': { $exists: true }
    })
    const totalCars = await Car.countDocuments()
    
    res.json({
      success: true,
      stats: {
        totalTestimonials,
        reportedTestimonials,
        totalCars
      }
    })
  } catch (error) {
    console.error('Error fetching stats:', error)
    res.json({
      success: false,
      message: error.message
    })
  }
}
