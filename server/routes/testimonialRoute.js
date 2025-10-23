import express from 'express'
import { 
  createTestimonial, 
  getLatestTestimonials, 
  getAllTestimonials,
  updateTestimonial,
  deleteTestimonial,
  reportTestimonial
} from '../controllers/TestimonialController.js'
import { protect } from '../middleware/auth.js'

const router = express.Router()

// Public routes
router.get('/latest', getLatestTestimonials)
router.get('/all', getAllTestimonials)

// Protected routes (require authentication)
router.post('/create', protect, createTestimonial)
router.put('/update/:id', protect, updateTestimonial)
router.delete('/delete/:id', protect, deleteTestimonial)
router.post('/report/:id', protect, reportTestimonial)

export default router
