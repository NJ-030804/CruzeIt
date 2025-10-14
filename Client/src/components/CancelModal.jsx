import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const CancelModal = ({ isOpen, onClose, onConfirm, bookingDetails, actionType = 'cancel' }) => {
  const isDelete = actionType === 'delete';
  
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[100] flex items-center justify-center p-4"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-3xl shadow-2xl max-w-md w-full p-8 space-y-6"
          >
            {/* Warning Icon */}
            <div className="flex justify-center">
              <motion.div 
                className={`w-20 h-20 rounded-full flex items-center justify-center ${
                  isDelete ? 'bg-red-100' : 'bg-yellow-100'
                }`}
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ repeat: Infinity, duration: 2 }}
              >
                {isDelete ? (
                  <svg className="w-10 h-10 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                ) : (
                  <svg className="w-10 h-10 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                )}
              </motion.div>
            </div>

            {/* Title */}
            <div className="text-center">
              <h2 className="text-2xl font-bold text-gray-800 mb-2">
                {isDelete ? 'Delete Booking?' : 'Cancel Booking?'}
              </h2>
              <p className="text-gray-600">
                {isDelete 
                  ? 'This will permanently delete the booking from your history. This action cannot be undone.'
                  : 'Are you sure you want to cancel this booking? This action cannot be undone.'
                }
              </p>
            </div>

            {/* Booking Details */}
            {bookingDetails && (
              <div className="bg-gray-50 rounded-2xl p-4 space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600 text-sm">Car:</span>
                  <span className="font-semibold">{bookingDetails.carName}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600 text-sm">Pickup:</span>
                  <span className="font-semibold">{bookingDetails.pickupDate}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600 text-sm">Return:</span>
                  <span className="font-semibold">{bookingDetails.returnDate}</span>
                </div>
              </div>
            )}

            {/* Warning Note for Delete */}
            {isDelete && (
              <div className="bg-red-50 border border-red-200 rounded-xl p-3 flex items-start gap-2">
                <svg className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
                <div className="text-sm text-red-800">
                  <p className="font-semibold">Warning</p>
                  <p>The booking will be automatically cancelled before deletion.</p>
                </div>
              </div>
            )}

            {/* Buttons */}
            <div className="flex gap-3 pt-2">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={onClose}
                className="flex-1 px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-xl font-medium hover:bg-gray-50 transition-colors"
              >
                Keep Booking
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={onConfirm}
                className={`flex-1 px-6 py-3 text-white rounded-xl font-medium transition-colors shadow-lg ${
                  isDelete 
                    ? 'bg-red-600 hover:bg-red-700 shadow-red-200' 
                    : 'bg-yellow-600 hover:bg-yellow-700 shadow-yellow-200'
                }`}
              >
                {isDelete ? 'Yes, Delete' : 'Yes, Cancel'}
              </motion.button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CancelModal;