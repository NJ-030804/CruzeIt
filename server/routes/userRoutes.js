import express from 'express';
import { 
    loginUser, 
    registerUser, 
    getUserData, 
    getCars, 
    deleteAccount,
    sendVerification,
    verifyRegister,
    resendVerification,
    updateUserRole
} from '../controllers/userController.js';
import { protect } from '../middleware/auth.js';

const userRouter = express.Router();

//Email verification routes
userRouter.post('/send-verification', sendVerification)
userRouter.post('/verify-register', verifyRegister)
userRouter.post('/resend-verification', resendVerification)

//User routes
userRouter.post('/register', registerUser) 
userRouter.post('/login', loginUser)
userRouter.get('/data', protect, getUserData)
userRouter.get('/cars', getCars)
userRouter.delete('/delete-account', protect, deleteAccount)
userRouter.put('/update-role', protect, updateUserRole)
export default userRouter;
