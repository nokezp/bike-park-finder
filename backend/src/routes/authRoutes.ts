import { Router } from 'express';
import { register, login, getProfile, updateProfile } from '../controllers/authController';
import { protect } from '../middleware/authMiddleware';

const router = Router();

// Public routes
router.post('/register', register as any);
router.post('/login', login as any);

// Protected routes
router.get('/profile', protect, getProfile as any);
router.put('/profile', protect, updateProfile as any);

export default router; 