import { Router } from 'express';
import { 
  getCheckInsByBikePark,
  createCheckIn,
  deleteCheckIn,
  getUserCheckIns
} from '../controllers/checkInController';
import { protect } from '../middleware/authMiddleware';

const router = Router();

// Public routes
router.get('/bikepark/:bikeParkId', getCheckInsByBikePark as any);

// Protected routes
router.post('/bikepark/:bikeParkId', protect, createCheckIn as any);
router.delete('/:checkInId', protect, deleteCheckIn as any);
router.get('/user', protect, getUserCheckIns as any);

export default router; 