import User from "../models/User.js"
import PendingUser from "../models/PendingUser.js"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import Car from "../models/Car.js"
import Booking from "../models/Booking.js"  
import mongoose from "mongoose"
import { sendVerificationEmail } from "../utils/emailService.js"

const generateToken = (userId) => {
    const payload = { id: userId };
    return jwt.sign(payload, process.env.JWT_SECRET, { 
        expiresIn: process.env.JWT_EXPIRE || '7d' 
    })
}

// Send verification code
export const sendVerification = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // Validate input
        if (!name || !email || !password) {
            return res.status(400).json({ 
                success: false, 
                message: "All fields are required" 
            });
        }

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({ 
                success: false, 
                message: "Invalid email format" 
            });
        }

        // Password validation (minimum 8 characters)
        if (password.length < 8) {
            return res.status(400).json({ 
                success: false, 
                message: "Password must be at least 8 characters" 
            });
        }

        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(409).json({ 
                success: false, 
                message: "Email already registered" 
            });
        }

        // Generate 6-digit verification code
        const verificationCode = Math.floor(100000 + Math.random() * 900000).toString();
        
        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Delete any existing pending registration for this email
        await PendingUser.deleteOne({ email });

        // Create pending user
        await PendingUser.create({
            name,
            email,
            password: hashedPassword,
            verificationCode,
            expiresAt: new Date(Date.now() + 15 * 60 * 1000) // 15 minutes
        });

        // Send verification email via SendGrid
        console.log('📧 Attempting to send verification email...');
        const emailSent = await sendVerificationEmail(email, verificationCode);

        if (emailSent) {
            console.log('✅ Verification email sent successfully');
            res.status(200).json({ 
                success: true, 
                message: "Verification code sent to your email. Please check your inbox (and spam folder)." 
            });
        } else {
            console.warn('⚠️ Email sending failed, but registration data saved');
            // Still return success but with a warning message
            res.status(200).json({ 
                success: true, 
                message: "Registration data saved. Verification code: " + (process.env.NODE_ENV === 'development' ? verificationCode : 'sent to your email'),
                warning: "Email service temporarily unavailable. Please check logs for verification code."
            });
        }

    } catch (error) {
        console.error("❌ Send verification error:", error.message);
        res.status(500).json({ 
            success: false, 
            message: "Failed to send verification code. Please try again." 
        });
    }
};

// Verify code and complete registration
export const verifyRegister = async (req, res) => {
    try {
        const { email, code } = req.body;

        // Validate input
        if (!email || !code) {
            return res.status(400).json({ 
                success: false, 
                message: "Email and code are required" 
            });
        }

        // Find pending user
        const pendingUser = await PendingUser.findOne({ 
            email, 
            verificationCode: code,
            expiresAt: { $gt: new Date() } // Check if not expired
        });

        if (!pendingUser) {
            return res.status(400).json({ 
                success: false, 
                message: "Invalid or expired verification code. Please request a new code." 
            });
        }

        // Check if user was created in the meantime
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            await PendingUser.deleteOne({ email });
            return res.status(409).json({ 
                success: false, 
                message: "User already exists. Please login instead." 
            });
        }

        // Create actual user (password is already hashed)
        const user = await User.create({
            name: pendingUser.name,
            email: pendingUser.email,
            password: pendingUser.password,
            verified: true
        });

        // Delete pending registration
        await PendingUser.deleteOne({ email });

        // Generate JWT token
        const token = generateToken(user._id.toString());
        
        const userData = {
            _id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
            image: user.image,
            phone: user.phone
        };

        console.log('✅ User account created and verified:', email);

        res.status(201).json({ 
            success: true, 
            token,
            user: userData,
            message: "Account created successfully! Welcome to CruzeIt!" 
        });

    } catch (error) {
        console.error("❌ Verify register error:", error.message);
        res.status(500).json({ 
            success: false, 
            message: "Verification failed. Please try again." 
        });
    }
};

// Resend verification code
export const resendVerification = async (req, res) => {
    try {
        const { email } = req.body;

        if (!email) {
            return res.status(400).json({ 
                success: false, 
                message: "Email is required" 
            });
        }

        // Find pending registration
        const pendingUser = await PendingUser.findOne({ email });
        
        if (!pendingUser) {
            return res.status(404).json({ 
                success: false, 
                message: "No pending registration found for this email. Please register again." 
            });
        }

        // Generate new verification code
        const verificationCode = Math.floor(100000 + Math.random() * 900000).toString();
        
        // Update pending user
        pendingUser.verificationCode = verificationCode;
        pendingUser.expiresAt = new Date(Date.now() + 15 * 60 * 1000);
        await pendingUser.save();

        // Send new verification email via SendGrid
        console.log('📧 Resending verification email...');
        const emailSent = await sendVerificationEmail(email, verificationCode);

        if (emailSent) {
            console.log('✅ Verification code resent successfully');
            res.status(200).json({ 
                success: true, 
                message: "Verification code resent successfully. Please check your email." 
            });
        } else {
            console.warn('⚠️ Email resend failed');
            res.status(200).json({ 
                success: true, 
                message: "Code regenerated: " + (process.env.NODE_ENV === 'development' ? verificationCode : 'Please check email service'),
                warning: "Email service temporarily unavailable"
            });
        }

    } catch (error) {
        console.error("❌ Resend verification error:", error.message);
        res.status(500).json({ 
            success: false, 
            message: "Failed to resend code. Please try again." 
        });
    }
};

// User login
export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body

        // Validate input
        if (!email || !password) {
            return res.status(400).json({ 
                success: false, 
                message: 'Email and password are required' 
            })
        }

        const user = await User.findOne({ email })
        if (!user) {
            return res.status(401).json({ 
                success: false, 
                message: 'Invalid credentials' 
            })
        }

        const isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch) {
            return res.status(401).json({ 
                success: false, 
                message: 'Invalid credentials' 
            })
        }

        const token = generateToken(user._id.toString())
        
        const userData = {
            _id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
            image: user.image,
            phone: user.phone
        }

        console.log('✅ User logged in successfully:', email);
        
        res.json({ success: true, token, user: userData })

    } catch (error) {
        console.error('❌ Login error:', error.message);
        res.status(500).json({
            success: false, 
            message: 'Server error during login'
        })
    }
}

// Get user data
export const getUserData = async (req, res) => {
    try {
        const { user } = req;
        
        if (!user) {
            return res.status(404).json({ 
                success: false, 
                message: 'User not found' 
            })
        }

        res.json({ success: true, user })
    } catch (error) {
        console.error('❌ Get user data error:', error.message);
        res.status(500).json({
            success: false, 
            message: 'Failed to fetch user data'
        })
    }
}

// ============================================
// Get all available cars
// ============================================
export const getCars = async (req, res) => {
    try {
        const cars = await Car.find({ isAvailable: true })
        res.json({ success: true, cars })
    } catch (error) {
        console.error('❌ Get cars error:', error.message);
        res.status(500).json({
            success: false, 
            message: 'Failed to fetch cars'
        })
    }
}

// Delete account with transactions
export const deleteAccount = async (req, res) => {
    const session = await mongoose.startSession();
    session.startTransaction();
    
    try {
        const { _id, role } = req.user;

        const user = await User.findById(_id).session(session);
        
        if (!user) {
            await session.abortTransaction();
            return res.status(404).json({ 
                success: false, 
                message: 'User not found' 
            });
        }

        // If user is an owner, check for active bookings on their cars
        if (role === 'owner') {
            const activeBookings = await Booking.find({
                owner: _id,
                status: { $in: ['Pending', 'Confirmed'] }
            }).session(session);

            if (activeBookings.length > 0) {
                await session.abortTransaction();
                return res.status(400).json({
                    success: false,
                    message: 'Cannot delete account. You have active bookings. Please complete or cancel all bookings first.'
                });
            }

            // Delete all cars owned by the user
            await Car.deleteMany({ owner: _id }).session(session);
        }

        // Check for active bookings as a customer
        const userActiveBookings = await Booking.find({
            user: _id,
            status: { $in: ['Pending', 'Confirmed'] }
        }).session(session);

        if (userActiveBookings.length > 0) {
            await session.abortTransaction();
            return res.status(400).json({
                success: false,
                message: 'Cannot delete account. You have active bookings. Please cancel all your bookings first.'
            });
        }

        // Delete all bookings
        await Booking.deleteMany({ user: _id }).session(session);
        await Booking.deleteMany({ owner: _id }).session(session);

        // Delete the user account
        await User.findByIdAndDelete(_id).session(session);

        // Commit the transaction
        await session.commitTransaction();

        console.log('✅ Account deleted successfully:', user.email);

        res.json({ 
            success: true, 
            message: 'Account deleted successfully' 
        });

    } catch (error) {
        await session.abortTransaction();
        console.error('❌ Delete account error:', error.message);
        res.status(500).json({ 
            success: false, 
            message: 'Failed to delete account. Please try again.' 
        });
    } finally {
        session.endSession();
    }
}

export const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body

        if (!name || !email || !password) {
            return res.status(400).json({
                success: false, 
                message: 'All fields are required'
            })
        }

        if (password.length < 8) {
            return res.status(400).json({
                success: false, 
                message: 'Password must be at least 8 characters'
            })
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        if (!emailRegex.test(email)) {
            return res.status(400).json({
                success: false, 
                message: 'Invalid email format'
            })
        }

        const userExists = await User.findOne({ email })
        if (userExists) {
            return res.status(409).json({ 
                success: false, 
                message: 'User already exists' 
            })
        }

        const hashedPassword = await bcrypt.hash(password, 10)
        const user = await User.create({ name, email, password: hashedPassword })
        const token = generateToken(user._id.toString())
        
        const userData = {
            _id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
            image: user.image,
            phone: user.phone
        }

        console.warn('⚠️ Using deprecated direct registration. Consider using email verification flow.');
        
        res.status(201).json({ success: true, token, user: userData })

    } catch (error) {
        console.error('❌ Registration error:', error.message);
        res.status(500).json({
            success: false, 
            message: 'Server error during registration'
        })
    }
}
// Update user role to owner
export const updateUserRole = async (req, res) => {
  try {
    const { role } = req.body
    const userId = req.user._id // From protect middleware
    
    // Validate role
    if (!role || !['user', 'owner'].includes(role)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid role. Must be either "user" or "owner"'
      })
    }
    
    // Find and update user
    const user = await User.findByIdAndUpdate(
      userId,
      { role },
      { new: true } // Return updated document
    ).select('-password')
    
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      })
    }

    // Format user data to match the structure used throughout the app
    const userData = {
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      image: user.image,
      phone: user.phone
    }
    
    console.log('✅ User role updated to:', role);
    
    res.json({
      success: true,
      message: `Role updated to ${role} successfully!`,
      user: userData // Now matches the format from login/register
    })
  } catch (error) {
    console.error('❌ Error updating user role:', error)
    res.status(500).json({
      success: false,
      message: 'Failed to update role. Please try again.'
    })
  }
}
