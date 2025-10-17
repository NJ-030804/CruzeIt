import express from 'express';
import { loginUser, registerUser, getUserData, getCars, deleteAccount } from '../controllers/userController.js';
import { protect } from '../middleware/auth.js';

const userRouter = express.Router();

userRouter.post('/register', registerUser)
userRouter.post('/login', loginUser)
userRouter.get('/data', protect, getUserData)
userRouter.get('/cars', getCars)
userRouter.delete('/delete-account', protect, deleteAccount)
export default userRouter;
