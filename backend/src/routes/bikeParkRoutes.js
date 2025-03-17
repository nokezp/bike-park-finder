const express = require('express');
const BikePark = require('../models/BikePark');
const { protect } = require('../middleware/authMiddleware');
const adminAuth = require('../middleware/adminAuth');

// Create router
const router = express.Router();

// Public routes
// Get all bike parks
router.get('/', (req, res) => {
  BikePark.find({})
    .then(bikeParks => res.status(200).send(bikeParks))
    .catch(error => res.status(500).send({ error: 'Failed to fetch bike parks' }));
});

// Search bike parks
router.get('/search', (req, res) => {
  const { query } = req.query;
  
  const searchQuery = query 
    ? { $text: { $search: query } }
    : {};
    
  BikePark.find(searchQuery)
    .then(bikeParks => res.status(200).send(bikeParks))
    .catch(error => res.status(500).send({ error: 'Failed to search bike parks' }));
});

// Get bike park by ID
router.get('/:id', (req, res) => {
  BikePark.findById(req.params.id)
    .then(bikePark => {
      if (!bikePark) {
        return res.status(404).send({ error: 'Bike park not found' });
      }
      res.status(200).send(bikePark);
    })
    .catch(error => res.status(500).send({ error: 'Failed to fetch bike park' }));
});

// Create a new bike park (admin only)
const createBikePark = (req, res) => {
  const bikePark = new BikePark({
    ...req.body,
    createdBy: req.user._id
  });
  
  bikePark.save()
    .then(savedPark => res.status(201).send(savedPark))
    .catch(error => res.status(400).send({ error: 'Failed to create bike park' }));
};

// Update a bike park (admin only)
const updateBikePark = (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = [
    'name', 'location', 'coordinates', 'description', 'difficulty',
    'features', 'amenities', 'images', 'website', 'contactPhone',
    'contactEmail', 'hours', 'pricing', 'hasLiftAccess',
    'hasTechnicalSections', 'hasJumps', 'hasDrops'
  ];
  
  const isValidOperation = updates.every(update => allowedUpdates.includes(update));
  
  if (!isValidOperation) {
    return res.status(400).send({ error: 'Invalid updates' });
  }
  
  let parkToUpdate = null;
  
  BikePark.findById(req.params.id)
    .then(bikePark => {
      if (!bikePark) {
        return Promise.reject('not_found');
      }
      
      parkToUpdate = bikePark;
      updates.forEach(update => {
        parkToUpdate[update] = req.body[update];
      });
      
      return parkToUpdate.save();
    })
    .then(updatedPark => {
      res.status(200).send(updatedPark);
    })
    .catch(error => {
      if (error === 'not_found') {
        return res.status(404).send({ error: 'Bike park not found' });
      }
      res.status(400).send({ error: 'Failed to update bike park' });
    });
};

// Delete a bike park (admin only)
const deleteBikePark = (req, res) => {
  BikePark.findByIdAndDelete(req.params.id)
    .then(bikePark => {
      if (!bikePark) {
        return res.status(404).send({ error: 'Bike park not found' });
      }
      res.status(200).send(bikePark);
    })
    .catch(error => res.status(500).send({ error: 'Failed to delete bike park' }));
};

// Apply middleware to protected routes
router.post('/', protect, adminAuth, createBikePark);
router.patch('/:id', protect, adminAuth, updateBikePark);
router.delete('/:id', protect, adminAuth, deleteBikePark);

module.exports = router; 