import Testimonial from '../models/testimonialModel.js'

// Create a new testimonial
export const createTestimonial = async (req, res) => {
  try {
    const { name, rating, testimonial } = req.body

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
      name,
      rating,
      testimonial
    })

    await newTestimonial.save()

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

// Get latest 3 testimonials
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

