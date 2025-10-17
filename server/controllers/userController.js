import User from "../models/User.js"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import Car from "../models/Car.js";
import Booking from "../models/Booking.js";

const generateToken = (userId) => {
    const payload = { id: userId };  // ← Changed to object with id property
    return jwt.sign(payload, process.env.JWT_SECRET)
}

// user registration
export const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body

        if (!name || !email || !password || password.length < 8) {
            return res.json({success: false, message: ' Fill all the fields'})
        }

        const userExists = await User.findOne({ email })
        if (userExists) {
            return res.json({ success: false, message: 'User already exists' })
        }

        const hashedPassword = await bcrypt.hash(password, 10)
        const user = await User.create({ name, email, password: hashedPassword })
        const token = generateToken(user._id.toString())
        
        // Return user data along with token
        const userData = {
            _id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
            image: user.image,
            phone: user.phone
        }
        
        res.json({ success: true, token, user: userData })

    } catch (error) {
        console.log(error.message);
        res.json({success: false, message: error.message})
    }
}

//user login
export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body
        const user = await User.findOne({ email })
        if (!user) {
            return res.json({ success: false, message: 'User does not exist' })
        }
        const isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch) {
            return res.json({ success: false, message: 'Incorrect password' })
        }
        const token = generateToken(user._id.toString())
        
        // Return user data along with token
        const userData = {
            _id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
            image: user.image,
            phone: user.phone
        }
        
        res.json({ success: true, token, user: userData })

    } catch (error) {
        console.log(error.message);
        res.json({success: false, message: error.message})
    }
}

//get user data
export const getUserData = async (req, res) => {
    try {
        const {user} = req;
        res.json({ success: true, user })
    } catch (error) {
        console.log(error.message);
        res.json({success: false, message: error.message})
    }
}

//get all cars for the frontend
export const getCars = async (req, res) => {
    try {
        const cars = await Car.find({isAvailable: true})
        res.json({success: true, cars})
    } catch (error) {
        console.log(error.message);
        res.json({success: false, message: error.message})
    }

}

export const deleteAccount = async (req, res) => {
    try {
        const { _id, role } = req.user;

        const user = await User.findById(_id);
        
        if (!user) {
            return res.json({ success: false, message: 'User not found' });
        }

        // If user is an owner, check for active bookings on their cars
        if (role === 'owner') {
            const activeBookings = await Booking.find({
                owner: _id,
                status: { $in: ['Pending', 'Confirmed'] }
            });

            if (activeBookings.length > 0) {
                return res.json({
                    success: false,
                    message: 'Cannot delete account. You have active bookings. Please complete or cancel all bookings first.'
                });
            }

            // Delete all cars owned by the user
            await Car.deleteMany({ owner: _id });
        }

        // Check for active bookings as a customer
        const userActiveBookings = await Booking.find({
            user: _id,
            status: { $in: ['Pending', 'Confirmed'] }
        });

        if (userActiveBookings.length > 0) {
            return res.json({
                success: false,
                message: 'Cannot delete account. You have active bookings. Please cancel all your bookings first.'
            });
        }

        // Delete all bookings
        await Booking.deleteMany({ user: _id });
        await Booking.deleteMany({ owner: _id });

        // Delete the user account
        await User.findByIdAndDelete(_id);

        res.json({ 
            success: true, 
            message: 'Account deleted successfully' 
        });

    } catch (error) {
        console.log(error.message);
        res.json({ 
            success: false, 
            message: error.message 
        });
    }
};
