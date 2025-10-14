import User from "../models/User.js"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import Car from "../models/Car.js";

const generateToken = (userId) => {
    const payload = { id: userId };  // ← Changed to object with id property
    return jwt.sign(payload, process.env.JWT_SECRET)
}

// user registration
export const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body

        if (!name || !email || !password || password.length < 8) {
            return res.json({success: false, message: ' Minimum Password is 8-Character'})
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
