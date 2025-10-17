import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useAppContext } from '../context/AppContext'
import toast from 'react-hot-toast'

const DeleteAccountModal = ({ isOpen, onClose, userEmail, onConfirmDelete }) => {
  const [confirmEmail, setConfirmEmail] = useState('')
  const [isDeleting, setIsDeleting] = useState(false)

  const handleDelete = async () => {
    if (confirmEmail !== userEmail) {
      toast.error('Email does not match. Please try again.')
      return
    }

    setIsDeleting(true)
    await onConfirmDelete()
    setIsDeleting(false)
  }

  const handleClose = () => {
    setConfirmEmail('')
    onClose()
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/60 flex items-center justify-center z-[200] px-4 backdrop-blur-sm"
          onClick={handleClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            transition={{ type: "spring", duration: 0.5 }}
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-8"
          >
            {/* Warning Icon */}
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center">
                <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              </div>
            </div>

            {/* Title */}
            <h2 className="text-2xl font-bold text-gray-900 text-center mb-2">
              Delete Account
            </h2>

            {/* Warning Message */}
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
              <p className="text-sm text-red-800 font-medium mb-2">
                ⚠️ This action cannot be undone!
              </p>
              <p className="text-sm text-red-700">
                This will permanently delete your account and remove all your data from our servers, including:
              </p>
              <ul className="list-disc list-inside text-sm text-red-700 mt-2 space-y-1">
                <li>All your bookings</li>
                <li>Your profile information</li>
                <li>Your booking history</li>
                <li>All associated data</li>
              </ul>
            </div>

            {/* Confirmation Input */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Please type <span className="font-bold text-gray-900">{userEmail}</span> to confirm:
              </label>
              <input
                type="email"
                value={confirmEmail}
                onChange={(e) => setConfirmEmail(e.target.value)}
                placeholder="Enter your email"
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none transition-all"
                disabled={isDeleting}
              />
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleDelete}
                disabled={confirmEmail !== userEmail || isDeleting}
                className={`flex-1 py-3 rounded-lg font-medium transition-all ${
                  confirmEmail === userEmail && !isDeleting
                    ? 'bg-red-600 hover:bg-red-700 text-white'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
              >
                {isDeleting ? (
                  <div className="flex items-center justify-center gap-2">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Deleting...
                  </div>
                ) : (
                  'Delete Account'
                )}
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleClose}
                disabled={isDeleting}
                className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 py-3 rounded-lg font-medium transition-all disabled:opacity-50"
              >
                Cancel
              </motion.button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

const DeleteAccountButton = () => {
  const { userData, axios, navigate, setToken, setUser } = useAppContext()
  const [showDeleteModal, setShowDeleteModal] = useState(false)

  const handleDeleteAccount = async () => {
    try {
      const { data } = await axios.delete('/api/user/delete-account')
      
      if (data.success) {
        // Clear all user data
        localStorage.removeItem('token')
        setToken(null)
        setUser(null)
        
        toast.success('Account deleted successfully')
        navigate('/')
        setShowDeleteModal(false)
      } else {
        toast.error(data.message || 'Failed to delete account')
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Error deleting account')
    }
  }

  return (
    <>
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={() => setShowDeleteModal(true)}
        className="w-full bg-red-600 hover:bg-red-700 text-white py-3 px-6 rounded-lg font-medium transition-all flex items-center justify-center gap-2 shadow-lg"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
        </svg>
        Delete Account
      </motion.button>

      <DeleteAccountModal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        userEmail={userData?.email || ''}
        onConfirmDelete={handleDeleteAccount}
      />
    </>
  )
}

export default DeleteAccountButton
