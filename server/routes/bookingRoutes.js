import express from "express";
import { 
    changeBookingStatus, 
    checkAvailabilityofCar, 
    createBooking, 
    getOwnerBookings, 
    getUserBookings,
    cancelBooking,
    deleteBooking  // Add this
} from "../controllers/bookingController.js";
import { protect } from "../middleware/auth.js";

const bookingRouter = express.Router();

bookingRouter.post('/check-availability', checkAvailabilityofCar)
bookingRouter.post('/create', protect, createBooking)
bookingRouter.get('/user', protect, getUserBookings)
bookingRouter.get('/owner', protect, getOwnerBookings)
bookingRouter.post('/change-status', protect, changeBookingStatus)
bookingRouter.post('/cancel', protect, cancelBooking)
bookingRouter.post('/delete', protect, deleteBooking)  // Add this route

export default bookingRouter;