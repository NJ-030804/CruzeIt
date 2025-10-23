import mongoose from 'mongoose'

const testimonialSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  name: {
    type: String,
    required: true,
    trim: true
  },
  rating: {
    type: Number,
    required: true,
    min: 1,
    max: 5
  },
  testimonial: {
    type: String,
    required: true,
    trim: true
  },
  reportedBy: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }]
}, {
  timestamps: true
})

const Testimonial = mongoose.model('Testimonial', testimonialSchema)

export default Testimonial
