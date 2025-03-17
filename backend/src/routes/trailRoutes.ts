import { Router } from 'express';
import {
  getTrailsByBikePark,
  getTrailById,
  createTrail,
  updateTrail,
  deleteTrail
} from '../controllers/trailController';
import { protect } from '../middleware/authMiddleware';

const router = Router();

// Public routes
router.get('/bikepark/:bikeParkId', getTrailsByBikePark as any);
router.get('/:id', getTrailById as any);

// Protected routes (admin only in a real app)
router.post('/bikepark/:bikeParkId', protect, createTrail as any);
router.put('/:id', protect, updateTrail as any);
router.delete('/:id', protect, deleteTrail as any);

export default router; 