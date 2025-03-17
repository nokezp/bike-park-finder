import { Request, Response } from 'express';
import CheckIn from '../models/CheckIn';
import User from '../models/User';
import { BikePark } from '../models/BikePark';

// Get recent check-ins for a bike park
export const getCheckInsByBikePark = async (req: Request, res: Response) => {
  try {
    const { bikeParkId } = req.params;
    
    const checkIns = await CheckIn.find({ bikeParkId })
      .populate('userId', 'id username profileImageUrl')
      .sort({ createdAt: -1 })
      .limit(20);
    
    res.status(200).json(checkIns);
  } catch (error) {
    console.error('Error getting check-ins:', error);
    res.status(500).json({ message: 'Error getting check-ins', error });
  }
};

// Create a new check-in
export const createCheckIn = async (req: Request, res: Response) => {
  try {
    // @ts-ignore
    const userId = req.user.id;
    const { bikeParkId } = req.params;
    const { note, weatherCondition, trailCondition } = req.body;
    
    // Make sure bike park exists
    const bikePark = await BikePark.findById(bikeParkId);
    
    if (!bikePark) {
      return res.status(404).json({ message: 'Bike park not found' });
    }
    
    const newCheckIn = await CheckIn.create({
      userId,
      bikeParkId,
      note,
      weatherCondition,
      trailCondition,
    });
    
    const checkInWithUserAndPark = await CheckIn.findById(newCheckIn._id)
      .populate('userId', 'id username profileImageUrl')
      .populate('bikeParkId', 'id name');
    
    res.status(201).json({
      message: 'Check-in created successfully',
      checkIn: checkInWithUserAndPark,
    });
  } catch (error) {
    console.error('Error creating check-in:', error);
    res.status(500).json({ message: 'Error creating check-in', error });
  }
};

// Delete a check-in
export const deleteCheckIn = async (req: Request, res: Response) => {
  try {
    // @ts-ignore
    const userId = req.user.id;
    const { checkInId } = req.params;
    
    const checkIn = await CheckIn.findById(checkInId);
    
    if (!checkIn) {
      return res.status(404).json({ message: 'Check-in not found' });
    }
    
    // Check if user owns the check-in
    if (checkIn.userId.toString() !== userId) {
      return res.status(403).json({ message: 'You can only delete your own check-ins' });
    }
    
    await CheckIn.findByIdAndDelete(checkInId);
    
    res.status(200).json({
      message: 'Check-in deleted successfully',
    });
  } catch (error) {
    console.error('Error deleting check-in:', error);
    res.status(500).json({ message: 'Error deleting check-in', error });
  }
};

// Get user's check-in history
export const getUserCheckIns = async (req: Request, res: Response) => {
  try {
    // @ts-ignore
    const userId = req.user.id;
    
    const checkIns = await CheckIn.find({ userId })
      .populate('bikeParkId', 'id name imageUrl')
      .sort({ createdAt: -1 });
    
    res.status(200).json(checkIns);
  } catch (error) {
    console.error('Error getting user check-ins:', error);
    res.status(500).json({ message: 'Error getting user check-ins', error });
  }
}; 