import { Router } from 'express';
import {
  getPhotosByBikePark,
  uploadPhotoVideo,
  deletePhotoVideo,
} from '../controllers/photoVideoController';
import { protect } from '../middleware/authMiddleware';

const router = Router();

// Public routes
router.get('/bikepark/:bikeParkId', getPhotosByBikePark as any);

// Protected routes
router.post('/bikepark/:bikeParkId/upload', protect, uploadPhotoVideo as any);
router.delete('/:id', protect, deletePhotoVideo as any);

export default router; 