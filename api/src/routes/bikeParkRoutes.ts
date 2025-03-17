import express, { Request, Response } from 'express';
import { BikePark } from '../models/BikePark';
import adminAuth from '../middleware/adminAuth';

const router = express.Router();

// Public routes
// Get all bike parks
router.get('/', async (_req: Request, res: Response): Promise<void> => {
  try {
    const bikeParks = await BikePark.find();
    res.json(bikeParks);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching bike parks' });
  }
});

// Search bike parks
router.get('/search', async (req: Request, res: Response) => {
  try {
    const { query } = req.query;
    const searchQuery = query ? { $text: { $search: query as string } } : {};
    const bikeParks = await BikePark.find(searchQuery);
    res.status(200).json(bikeParks);
  } catch (error) {
    res.status(500).json({ error: 'Failed to search bike parks' });
  }
});

// Get bike park by ID
router.get('/:id', async (req: Request, res: Response): Promise<void> => {
  try {
    const bikePark = await BikePark.findById(req.params.id);
    if (!bikePark) {
      res.status(404).json({ error: 'Bike park not found' });
      return;
    }
    res.json(bikePark);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching bike park' });
  }
});

// Create new bike park (admin only)
router.post('/', adminAuth, async (req: Request, res: Response): Promise<void> => {
  try {
    const bikePark = new BikePark(req.body);
    await bikePark.save();
    res.status(201).json(bikePark);
  } catch (error) {
    res.status(400).json({ error: 'Error creating bike park' });
  }
});

// Update bike park (admin only)
router.patch('/:id', adminAuth, async (req: Request, res: Response): Promise<void> => {
  const updates = Object.keys(req.body);
  const allowedUpdates = [
    'name',
    'description',
    'location',
    'coordinates',
    'difficulty',
    'features',
    'amenities',
    'hasLiftAccess',
    'hasTechnicalSections',
    'hasJumps',
    'hasDrops'
  ];

  const isValidOperation = updates.every(update => allowedUpdates.includes(update));

  if (!isValidOperation) {
    res.status(400).json({ error: 'Invalid updates' });
    return;
  }

  try {
    const bikePark = await BikePark.findById(req.params.id);

    if (!bikePark) {
      res.status(404).json({ error: 'Bike park not found' });
      return;
    }

    updates.forEach(update => {
      if (update in bikePark) {
        (bikePark as any)[update] = req.body[update];
      }
    });

    await bikePark.save();
    res.json(bikePark);
  } catch (error) {
    res.status(400).json({ error: 'Error updating bike park' });
  }
});

// Delete bike park (admin only)
router.delete('/:id', adminAuth, async (req: Request, res: Response): Promise<void> => {
  try {
    const bikePark = await BikePark.findByIdAndDelete(req.params.id);
    if (!bikePark) {
      res.status(404).json({ error: 'Bike park not found' });
      return;
    }
    res.json(bikePark);
  } catch (error) {
    res.status(500).json({ error: 'Error deleting bike park' });
  }
});

const bikeParkRouter = router;
export { bikeParkRouter }; 