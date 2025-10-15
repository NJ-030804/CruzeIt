import express from 'express';
import passport from 'passport';
import jwt from 'jsonwebtoken';

const authRouter = express.Router();

// Get frontend URL based on environment
const getFrontendURL = () => {
  return process.env.NODE_ENV === 'production' 
    ? process.env.FRONTEND_URL_PROD || 'https://cruze-it.vercel.app'
    : process.env.FRONTEND_URL_LOCAL || 'http://localhost:5173';
};

// Test route to verify authRoutes is working
authRouter.get('/test', (req, res) => {
  res.json({ success: true, message: 'Auth routes working' });
});

// @route   GET /auth/google
// @desc    Authenticate with Google
authRouter.get(
  '/google',
  (req, res, next) => {
    console.log('Google OAuth route hit');
    next();
  },
  passport.authenticate('google', { scope: ['profile', 'email'] })
);

// @route   GET /auth/google/callback
// @desc    Google callback
authRouter.get(
  '/google/callback',
  passport.authenticate('google', { 
    failureRedirect: `${getFrontendURL()}?error=auth_failed` 
  }),
  (req, res) => {
    try {
      console.log('Google callback successful, user:', req.user);
      
      // Create JWT token
      const token = jwt.sign(
        { id: req.user._id },
        process.env.JWT_SECRET,
        { expiresIn: '7d' }
      );
      console.log('Token created:', token);
      
      // Get frontend URL and redirect with token
      const frontendURL = getFrontendURL();
      res.redirect(`${frontendURL}?token=${token}`);
    } catch (error) {
      console.error('Callback error:', error);
      const frontendURL = getFrontendURL();
      res.redirect(`${frontendURL}?error=auth_failed`);
    }
  }
);

// @route   GET /auth/logout
// @desc    Logout user
authRouter.get('/logout', (req, res, next) => {
  req.logout((err) => {
    if (err) return next(err);
    res.json({ success: true, message: 'Logged out successfully' });
  });
});

// @route   GET /auth/current
// @desc    Get current user
authRouter.get('/current', (req, res) => {
  if (req.isAuthenticated()) {
    res.json({ success: true, user: req.user });
  } else {
    res.status(401).json({ success: false, message: 'Not authenticated' });
  }
});

export default authRouter;
