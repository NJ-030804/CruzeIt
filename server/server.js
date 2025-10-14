import express from "express";
import "dotenv/config";
import cors from "cors";
import session from "express-session";
import passport from "passport";
import connectDB from "./configs/db.js";
import userRouter from "./routes/userRoutes.js";
import ownerRouter from "./routes/ownerRoutes.js";
import bookingRouter from "./routes/bookingRoutes.js";
import authRouter from "./routes/authRoutes.js";
import passportConfig from "./configs/passport.js";
import testimonialRoute from './routes/testimonialRoute.js'
const app = express();

await connectDB();

// CORS configuration
app.use(cors({
  origin: 'http://localhost:5173', // Vite frontend URL
  credentials: true
}));

app.use(express.json());

// Session middleware (MUST be before passport)
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: process.env.NODE_ENV === 'production',
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000, // 24 hours
    },
  })
);

// Passport config and middleware
passportConfig(passport);
app.use(passport.initialize());
app.use(passport.session());

// Routes
app.get('/', (req, res) => res.send("Server is running"));
app.use('/api/user', userRouter);
app.use('/api/owner', ownerRouter);
app.use('/api/bookings', bookingRouter);
app.use('/auth', authRouter); // Google OAuth routes
app.use('/api/testimonials', testimonialRoute)
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));