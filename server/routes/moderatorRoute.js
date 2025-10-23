import express from 'express'
import { protect } from '../middleware/auth.js'
import {
  checkModerator,
  getAllTestimonialsForModeration,
  getAllCarsForModeration,
  deleteTestimonialByModerator,
  deleteCarByModerator,
  getModerationStats
} from '../controllers/moderatorController.js'

const router = express.Router()

// All routes require authentication and moderator role
router.use(protect, checkModerator)

// Get all content for moderation
router.get('/testimonials', getAllTestimonialsForModeration)
router.get('/cars', getAllCarsForModeration)
router.get('/stats', getModerationStats)

// Delete content
router.delete('/testimonials/:id', deleteTestimonialByModerator)
router.delete('/cars/:id', deleteCarByModerator)

export default router
