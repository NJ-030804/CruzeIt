import jwt from 'jsonwebtoken';
import User from '../models/User.js';

export const protect = async (req, res, next) => {
    let token = req.headers.authorization;
    
    console.log('Auth middleware - Token received:', token);
    
    if (!token) {
        return res.json({ success: false, message: 'Please Log in or Create Account' });
    }

    try {
        // Remove 'Bearer ' prefix if it exists
        if (token.startsWith('Bearer ')) {
            token = token.replace('Bearer ', '');
        }

        console.log('Token after removing Bearer:', token);

        // Verify the token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log('Decoded token:', decoded);

        // Handle both formats: {id: "..."} and just the string id
        const userId = decoded.id || decoded;
        
        if (!userId) {
            return res.json({ success: false, message: 'Invalid token format' });
        }

        // Find user and attach to request
        req.user = await User.findById(userId).select('-password');
        
        if (!req.user) {
            return res.json({ success: false, message: 'User not found' });
        }

        console.log('User authenticated:', req.user.email);
        next();
    } catch (error) {
        console.error('Auth error:', error.message);
        return res.json({ success: false, message: 'Not authorized, token failed' });
    }
}

