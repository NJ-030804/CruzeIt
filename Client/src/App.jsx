import React, { useState } from 'react'
import Navbar from './components/Navbar'
import { Route, Routes, useLocation } from 'react-router-dom'
import CarDetails from './pages/CarDetails'
import Cars from './pages/Cars'
import MyBookings from './pages/MyBookings'
import Home from './pages/Home'
import AboutUs from './pages/AboutUs'
import Footer from './components/Footer'
import Layout from './pages/owner/Layout'
import Dashboard from './pages/owner/Dashboard'
import AddCar from './pages/owner/AddCar'
import ManageCars from './pages/owner/ManageCars'
import ManageBookings from './pages/owner/ManageBookings'
import ModeratorDashboard from './components/ModeratorDashboard'
import Login from './components/Login'
import ComingSoon from './components/ComingSoon'
import { Toaster } from 'react-hot-toast'
import { useAppContext } from './context/AppContext'

const App = () => {
  const { showLogin } = useAppContext()
  const location = useLocation()
  const isOwnerPath = location.pathname.startsWith('/owner')
  const isModeratorPath = location.pathname.startsWith('/moderator')
  
  return (
    <>
      <Toaster />
      {showLogin && <Login/>}
      {!isOwnerPath && !isModeratorPath && <Navbar/>}
      
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/car-details/:id' element={<CarDetails />} />
        <Route path='/cars' element={<Cars />} />
        <Route path='/my-bookings' element={<MyBookings />} />
        <Route path='/about' element={<AboutUs />} />
        
        {/* Coming Soon Pages */}
        <Route path='/help' element={<ComingSoon />} />
        <Route path='/terms' element={<ComingSoon />} />
        <Route path='/privacy' element={<ComingSoon />} />
        <Route path='/insurance' element={<ComingSoon />} />
        <Route path='/cookies' element={<ComingSoon />} />
        
        {/* Owner Routes */}
        <Route path='/owner' element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path='add-car' element={<AddCar />} />
          <Route path='manage-cars' element={<ManageCars />} />
          <Route path='manage-bookings' element={<ManageBookings />} />
        </Route>

        {/* Moderator Route */}
        <Route path='/moderator' element={<ModeratorDashboard />} />
      </Routes>
      
      {!isOwnerPath && !isModeratorPath && <Footer />}
    </>
  )
}

export default App
