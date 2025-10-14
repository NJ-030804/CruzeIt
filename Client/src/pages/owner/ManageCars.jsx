import React, { useState, useEffect } from 'react'
import { assets, dummyCarData } from '../../assets/assets'
import Title from '../../components/owner/Title'
import { useAppContext } from '../../context/AppContext'
import { toast } from 'react-hot-toast'
import { motion } from 'framer-motion'
import EditCarModal from '../../components/owner/EditCarModal'

const ManageCars = () => {

  const { isOwner, axios, currency } = useAppContext()

  const [cars, setCars] = useState([])
  const [showEditModal, setShowEditModal] = useState(false)
  const [selectedCar, setSelectedCar] = useState(null)

  const fetchOwnerCars = async () => {
    try {
      const { data } = await axios.get('/api/owner/cars')
      if (data.success) {
        setCars(data.cars)
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
  }

  const toggleAvailability = async (carId) => {
    try {
      const { data } = await axios.post('/api/owner/toggle-car', { carId })
      if (data.success) {
        toast.success(data.message)
        fetchOwnerCars()
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
  }

  const deleteCar = async (carId) => {
    try {
      const confirm = window.confirm("Are you sure you want to delete this car?")
      if (!confirm) return null

      const { data } = await axios.post('/api/owner/delete-car', { carId })
      if (data.success) {
        toast.success(data.message)
        fetchOwnerCars()
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
  }

  const handleEditClick = (car) => {
    setSelectedCar(car)
    setShowEditModal(true)
  }

  const handleEditSuccess = () => {
    fetchOwnerCars()
  }

  useEffect(() => {
    isOwner && fetchOwnerCars()
  }, [isOwner])

  return (
    <div className="px-4 pt-10 md:px-10 w-full">
      <Title
        title="Manage Cars"
        subTitle="View all listed cars, update their details, or remove them from the booking platform"
      />

      <div className="max-w-5xl w-full rounded-md overflow-x-auto border border-borderColor mt-6">
        <table className="w-full border-collapse text-left text-sm text-gray-600">
          <thead className="text-gray-500 bg-gray-50">
            <tr>
              <th className="p-3 font-medium">Car</th>
              <th className="p-3 font-medium max-md:hidden">Category</th>
              <th className="p-3 font-medium">Price</th>
              <th className="p-3 font-medium max-md:hidden">Status</th>
              <th className="p-3 font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {cars.length === 0 ? (
              <tr>
                <td colSpan="5" className="p-8 text-center text-gray-400">
                  No cars listed yet. Add your first car to get started!
                </td>
              </tr>
            ) : (
              cars.map((car, index) => (
                <motion.tr
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  className="border-t border-borderColor hover:bg-gray-50 transition-colors"
                >
                  <td className="p-3 flex items-center gap-3">
                    <img
                      src={car.image}
                      alt=""
                      className="h-16 w-16 aspect-square rounded-md object-cover"
                    />
                    <div className="max-md:hidden">
                      <p className="font-medium text-gray-800">
                        {car.brand} {car.model}
                      </p>
                      <p className="text-xs text-gray-500">
                        {car.seating_capacity} seats · {car.transmission}
                      </p>
                    </div>
                  </td>

                  <td className="p-3 max-md:hidden">
                    <span className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-full">
                      {car.category}
                    </span>
                  </td>
                  
                  <td className="p-3">
                    <span className="font-semibold text-gray-800">
                      {currency}{car.price_per_day}
                    </span>
                    <span className="text-gray-500 text-xs">/day</span>
                  </td>

                  <td className="p-3 max-md:hidden">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${
                        car.isAvailable
                          ? 'bg-green-100 text-green-600'
                          : 'bg-red-100 text-red-600'
                      }`}
                    >
                      {car.isAvailable ? 'Available' : 'Unavailable'}
                    </span>
                  </td>

                  <td className="p-3">
                    <div className="flex items-center gap-2">
                      {/* Edit Button */}
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => handleEditClick(car)}
                        className="p-2 hover:bg-blue-50 rounded-lg transition-colors group"
                        title="Edit car"
                      >
                        <svg 
                          className="w-5 h-5 text-gray-600 group-hover:text-blue-600" 
                          fill="none" 
                          stroke="currentColor" 
                          viewBox="0 0 24 24"
                        >
                          <path 
                            strokeLinecap="round" 
                            strokeLinejoin="round" 
                            strokeWidth={2} 
                            d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" 
                          />
                        </svg>
                      </motion.button>

                      {/* Toggle Availability */}
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => toggleAvailability(car._id)}
                        className="p-2 hover:bg-yellow-50 rounded-lg transition-colors"
                        title={car.isAvailable ? 'Mark as unavailable' : 'Mark as available'}
                      >
                        <img
                          src={car.isAvailable ? assets.eye_close_icon : assets.eye_icon}
                          alt=""
                          className="w-5 h-5"
                        />
                      </motion.button>

                      {/* Delete Button */}
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => deleteCar(car._id)}
                        className="p-2 hover:bg-red-50 rounded-lg transition-colors"
                        title="Delete car"
                      >
                        <img
                          src={assets.delete_icon}
                          alt=""
                          className="w-5 h-5"
                        />
                      </motion.button>
                    </div>
                  </td>
                </motion.tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Edit Modal */}
      <EditCarModal
        isOpen={showEditModal}
        onClose={() => {
          setShowEditModal(false)
          setSelectedCar(null)
        }}
        car={selectedCar}
        onSuccess={handleEditSuccess}
      />
    </div>
  )
}

export default ManageCars

