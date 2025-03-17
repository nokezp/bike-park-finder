import { Request, Response } from 'express';
import Event from '../models/Event';
import BikePark from '../models/BikePark';

// Get all upcoming events for a bike park
export const getEventsByBikePark = async (req: Request, res: Response) => {
  try {
    const { bikeParkId } = req.params;
    const { upcoming } = req.query;
    
    let query: any = { bikeParkId };
    
    // If upcoming is true, only show events that haven't ended yet
    if (upcoming === 'true') {
      query.endDate = { $gte: new Date() };
    }
    
    const events = await Event.find(query)
      .populate('bikeParkId', 'id name')
      .sort({ startDate: 1 });
    
    res.status(200).json(events);
  } catch (error) {
    console.error('Error getting events:', error);
    res.status(500).json({ message: 'Error getting events', error });
  }
};

// Get a single event by ID
export const getEventById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    
    const event = await Event.findById(id)
      .populate('bikeParkId', 'id name address imageUrl');
    
    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }
    
    res.status(200).json(event);
  } catch (error) {
    console.error('Error getting event:', error);
    res.status(500).json({ message: 'Error getting event', error });
  }
};

// Create a new event
export const createEvent = async (req: Request, res: Response) => {
  try {
    const { bikeParkId } = req.params;
    const eventData = { ...req.body, bikeParkId };
    
    // Verify bike park exists
    const bikePark = await BikePark.findById(bikeParkId);
    if (!bikePark) {
      return res.status(404).json({ message: 'Bike park not found' });
    }
    
    // Validate dates
    const startDate = new Date(eventData.startDate);
    const endDate = new Date(eventData.endDate);
    
    if (endDate < startDate) {
      return res.status(400).json({ message: 'End date cannot be before start date' });
    }
    
    const newEvent = await Event.create(eventData);
    
    const eventWithPark = await Event.findById(newEvent._id)
      .populate('bikeParkId', 'id name');
    
    res.status(201).json({
      message: 'Event created successfully',
      event: eventWithPark,
    });
  } catch (error) {
    console.error('Error creating event:', error);
    res.status(500).json({ message: 'Error creating event', error });
  }
};

// Update an event
export const updateEvent = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const updates = req.body;
    
    const event = await Event.findById(id);
    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }
    
    // Validate dates if they're being updated
    if (updates.startDate || updates.endDate) {
      const startDate = new Date(updates.startDate || event.startDate);
      const endDate = new Date(updates.endDate || event.endDate);
      
      if (endDate < startDate) {
        return res.status(400).json({ message: 'End date cannot be before start date' });
      }
    }
    
    const updatedEvent = await Event.findByIdAndUpdate(
      id,
      updates,
      { new: true }
    ).populate('bikeParkId', 'id name');
    
    res.status(200).json({
      message: 'Event updated successfully',
      event: updatedEvent,
    });
  } catch (error) {
    console.error('Error updating event:', error);
    res.status(500).json({ message: 'Error updating event', error });
  }
};

// Delete an event
export const deleteEvent = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    
    const event = await Event.findById(id);
    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }
    
    await Event.findByIdAndDelete(id);
    
    res.status(200).json({
      message: 'Event deleted successfully',
    });
  } catch (error) {
    console.error('Error deleting event:', error);
    res.status(500).json({ message: 'Error deleting event', error });
  }
}; 