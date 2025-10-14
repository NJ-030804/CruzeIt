import mongoose from 'mongoose'

const testimonialSchema = new mongoose.Schema({
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
  }
}, {
  timestamps: true
})

const Testimonial = mongoose.model('Testimonial', testimonialSchema)

export default Testimonial