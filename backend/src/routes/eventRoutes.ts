import { Router } from 'express';
import {
  getEventsByBikePark,
  getEventById,
  createEvent,
  updateEvent,
  deleteEvent,
} from '../controllers/eventController';
import { protect } from '../middleware/authMiddleware';

const router = Router();

// Public routes
router.get('/bikepark/:bikeParkId', getEventsByBikePark as any);
router.get('/:id', getEventById as any);

// Protected routes (admin only in a real app)
router.post('/bikepark/:bikeParkId', protect, createEvent as any);
router.put('/:id', protect, updateEvent as any);
router.delete('/:id', protect, deleteEvent as any);

export default router; 