import { Router } from 'express';
import { 
  getReviewsByBikePark,
  createReview,
  updateReview,
  deleteReview 
} from '../controllers/reviewController';
import { protect } from '../middleware/authMiddleware';

const router = Router();

// Public routes
router.get('/bikepark/:bikeParkId', getReviewsByBikePark as any);

// Protected routes
router.post('/bikepark/:bikeParkId', protect, createReview as any);
router.put('/:reviewId', protect, updateReview as any);
router.delete('/:reviewId', protect, deleteReview as any);

export default router; 