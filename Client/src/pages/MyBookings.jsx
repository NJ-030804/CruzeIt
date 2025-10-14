import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { assets } from '../assets/assets'
import Title from '../components/Title'
import { useAppContext } from '../context/AppContext'
import toast from 'react-hot-toast'
import CancelModal from '../components/CancelModal'

const MyBookings = () => {
  const { axios, user, currency } = useAppContext()
  const [bookings, setBookings] = useState([])
  const [loading, setLoading] = useState(true)
  const [showModal, setShowModal] = useState(false)
  const [selectedBooking, setSelectedBooking] = useState(null)
  const [actionType, setActionType] = useState('cancel') // 'cancel' or 'delete'

  const fetchMyBookings = async () => {
    try {
      const { data } = await axios.get('/api/bookings/user')
      if (data.success) {
        setBookings(data.bookings)
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (user) fetchMyBookings()
  }, [user])

  // Check if booking can be cancelled
  const canCancelBooking = (booking) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const pickupDate = new Date(booking.pickupDate);
    
    return (
      booking.status !== 'Cancelled' && 
      booking.status !== 'Completed' && 
      pickupDate >= today
    );
  };

  // Handle cancel button click
  const handleCancelClick = (booking) => {
    setSelectedBooking(booking);
    setActionType('cancel');
    setShowModal(true);
  };

  // Handle delete button click
  const handleDeleteClick = (booking) => {
    setSelectedBooking(booking);
    setActionType('delete');
    setShowModal(true);
  };

  // Handle action confirmation
  const handleConfirm = async () => {
    try {
      const endpoint = actionType === 'delete' ? '/api/bookings/delete' : '/api/bookings/cancel';
      
      const { data } = await axios.post(endpoint, {
        bookingId: selectedBooking._id
      });

      if (data.success) {
        toast.success(data.message);
        
        if (actionType === 'delete') {
          // Remove booking from state
          setBookings(bookings.filter(booking => booking._id !== selectedBooking._id));
        } else {
          // Update booking status in state
          setBookings(bookings.map(booking => 
            booking._id === selectedBooking._id 
              ? { ...booking, status: 'Cancelled' }
              : booking
          ));
        }
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setShowModal(false);
      setSelectedBooking(null);
      setActionType('cancel');
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  }

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
    exit: { opacity: 0, y: 50, transition: { duration: 0.4 } },
  }

  return (
    <div className="px-6 md:px-16 lg:px-24 xl:px-32 2xl:px-48 mt-16 text-sm max-w-7xl mx-auto">
      <Title title="My Bookings" subTitle="View and manage all your car bookings" align="left" />

      {/* Loading Skeletons */}
      {loading ? (
        <div className="mt-12 space-y-5">
          {[1, 2, 3].map((n) => (
            <div
              key={n}
              className="animate-pulse grid grid-cols-1 md:grid-cols-4 gap-6 p-6 border border-gray-200 rounded-3xl bg-white shadow-sm"
            >
              <div className="h-40 bg-gray-200 rounded-2xl"></div>
              <div className="col-span-2 space-y-3">
                <div className="h-4 w-2/3 bg-gray-200 rounded-md"></div>
                <div className="h-4 w-1/2 bg-gray-200 rounded-md"></div>
                <div className="h-4 w-1/3 bg-gray-200 rounded-md"></div>
              </div>
              <div className="h-6 w-1/2 bg-gray-200 rounded-md ml-auto"></div>
            </div>
          ))}
        </div>
      ) : bookings.length === 0 ? (
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mt-24 flex flex-col items-center justify-center"
        >
          <motion.img
            src={assets.car_icon}
            alt="No bookings"
            className="w-32 h-32 mb-6 opacity-70"
            animate={{ y: [0, -10, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
          />
          <p className="text-gray-600 text-lg">No bookings yet</p>
          <p className="text-gray-400 text-sm">Once you book a car, it will appear here.</p>
        </motion.div>
      ) : (
        <AnimatePresence>
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="show"
            className="mt-10 space-y-6"
          >
            {bookings.map((booking, index) => (
              <motion.div
                layout
                key={booking._id}
                variants={cardVariants}
                exit="exit"
                whileHover={{
                  y: -5,
                  scale: 1.02,
                  boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)',
                  transition: { duration: 0.3 },
                }}
                className="grid grid-cols-1 md:grid-cols-4 gap-6 p-6 border border-gray-200 rounded-3xl bg-white shadow-md"
              >
                {/* Car Image + Info */}
                <div className="md:col-span-1">
                  <div className="rounded-2xl overflow-hidden mb-3">
                    <img
                      src={booking.car.image}
                      alt={`${booking.car.brand} ${booking.car.model}`}
                      className="w-full h-auto aspect-video object-cover"
                    />
                  </div>
                  <p className="text-lg font-medium mt-2">
                    {booking.car.brand} {booking.car.model}
                  </p>
                  <p className="text-gray-500 text-sm">
                    {booking.car.year} • {booking.car.category} • {booking.car.location}
                  </p>
                </div>

                {/* Booking Info */}
                <div className="md:col-span-2">
                  <div className="flex items-center gap-2 flex-wrap">
                    <p className="px-3 py-1.5 bg-gray-100 rounded-full text-xs text-gray-600">
                      Booking #{index + 1}
                    </p>
                    <p
                      className={`px-3 py-1 text-xs rounded-full font-medium ${
                        booking.status === 'Confirmed'
                          ? 'bg-green-100 text-green-700'
                          : booking.status === 'Cancelled'
                          ? 'bg-red-100 text-red-600'
                          : booking.status === 'Completed'
                          ? 'bg-blue-100 text-blue-600'
                          : 'bg-yellow-100 text-yellow-700'
                      }`}
                    >
                      {booking.status}
                    </p>
                  </div>

                  <div className="flex items-start gap-2 mt-4">
                    <img
                      src={assets.calendar_icon_colored}
                      alt="Calendar"
                      className="w-4 h-4 mt-1"
                    />
                    <div>
                      <p className="text-gray-500 text-sm">Rental Period</p>
                      <p className="font-medium">
                        {booking.pickupDate.split('T')[0]} → {booking.returnDate.split('T')[0]}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-2 mt-3">
                    <img
                      src={assets.location_icon_colored}
                      alt="Location"
                      className="w-4 h-4 mt-1"
                    />
                    <div>
                      <p className="text-gray-500 text-sm">Pick-up Location</p>
                      <p className="font-medium">{booking.car.location}</p>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-2 mt-4">
                    {/* Cancel Button */}
                    {canCancelBooking(booking) && (
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => handleCancelClick(booking)}
                        className="px-4 py-2 bg-yellow-50 text-yellow-600 border border-yellow-200 rounded-xl hover:bg-yellow-100 transition-colors text-sm font-medium flex items-center gap-2"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                        Cancel
                      </motion.button>
                    )}

                    {/* Delete Button - Always show */}
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleDeleteClick(booking)}
                      className="px-4 py-2 bg-red-50 text-red-600 border border-red-200 rounded-xl hover:bg-red-100 transition-colors text-sm font-medium flex items-center gap-2"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                      Delete
                    </motion.button>
                  </div>
                </div>

                {/* Price Info */}
                <div className="md:col-span-1 flex flex-col justify-between gap-6 text-right">
                  <div>
                    <p className="text-gray-500 text-sm">Total Price</p>
                    <motion.h1
                      className="text-2xl font-semibold text-primary"
                      animate={{ scale: [1, 1.05, 1] }}
                      transition={{ repeat: Infinity, duration: 3 }}
                    >
                      {currency}
                      {booking.price}
                    </motion.h1>
                    <p className="text-gray-400 text-xs mt-1">
                      Booked on {booking.createdAt.split('T')[0]}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      )}

      {/* Modal for Cancel/Delete */}
      <CancelModal
        isOpen={showModal}
        onClose={() => {
          setShowModal(false);
          setSelectedBooking(null);
          setActionType('cancel');
        }}
        onConfirm={handleConfirm}
        actionType={actionType}
        bookingDetails={selectedBooking ? {
          carName: `${selectedBooking.car?.brand} ${selectedBooking.car?.model}`,
          pickupDate: selectedBooking.pickupDate.split('T')[0],
          returnDate: selectedBooking.returnDate.split('T')[0]
        } : null}
      />
    </div>
  )
}

export default MyBookings