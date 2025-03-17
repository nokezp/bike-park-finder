import { Request, Response } from 'express';
import Trail from '../models/Trail';
import BikePark from '../models/BikePark';

// Get all trails for a bike park
export const getTrailsByBikePark = async (req: Request, res: Response) => {
  try {
    const { bikeParkId } = req.params;
    
    const trails = await Trail.find({ bikeParkId })
      .sort({ difficulty: 1 });
    
    res.status(200).json(trails);
  } catch (error) {
    console.error('Error getting trails:', error);
    res.status(500).json({ message: 'Error getting trails', error });
  }
};

// Get a single trail by ID
export const getTrailById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    
    const trail = await Trail.findById(id)
      .populate('bikeParkId', 'id name');
    
    if (!trail) {
      return res.status(404).json({ message: 'Trail not found' });
    }
    
    res.status(200).json(trail);
  } catch (error) {
    console.error('Error getting trail:', error);
    res.status(500).json({ message: 'Error getting trail', error });
  }
};

// Create a new trail
export const createTrail = async (req: Request, res: Response) => {
  try {
    const { bikeParkId } = req.params;
    const trailData = { ...req.body, bikeParkId };
    
    // Verify bike park exists
    const bikePark = await BikePark.findById(bikeParkId);
    if (!bikePark) {
      return res.status(404).json({ message: 'Bike park not found' });
    }
    
    const newTrail = await Trail.create(trailData);
    
    res.status(201).json({
      message: 'Trail created successfully',
      trail: newTrail,
    });
  } catch (error) {
    console.error('Error creating trail:', error);
    res.status(500).json({ message: 'Error creating trail', error });
  }
};

// Update a trail
export const updateTrail = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const updates = req.body;
    
    const trail = await Trail.findByIdAndUpdate(
      id,
      updates,
      { new: true }
    );
    
    if (!trail) {
      return res.status(404).json({ message: 'Trail not found' });
    }
    
    res.status(200).json({
      message: 'Trail updated successfully',
      trail,
    });
  } catch (error) {
    console.error('Error updating trail:', error);
    res.status(500).json({ message: 'Error updating trail', error });
  }
};

// Delete a trail
export const deleteTrail = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    
    const trail = await Trail.findById(id);
    if (!trail) {
      return res.status(404).json({ message: 'Trail not found' });
    }
    
    await Trail.findByIdAndDelete(id);
    
    res.status(200).json({
      message: 'Trail deleted successfully',
    });
  } catch (error) {
    console.error('Error deleting trail:', error);
    res.status(500).json({ message: 'Error deleting trail', error });
  }
}; 