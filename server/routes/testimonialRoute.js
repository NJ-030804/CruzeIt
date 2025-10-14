import express from 'express'
import { 
  createTestimonial, 
  getLatestTestimonials, 
  getAllTestimonials 
} from '../controllers/testimonialController.js'

const router = express.Router()

// Create a new testimonial (public)
router.post('/create', createTestimonial)

// Get latest 3 testimonials (public)
router.get('/latest', getLatestTestimonials)

// Get all testimonials (optional - for admin)
router.get('/all', getAllTestimonials)

export default router
