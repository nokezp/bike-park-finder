import { Request, Response } from 'express';
import { BikePark } from '../models/BikePark';
import Trail from '../models/Trail';
import Review from '../models/Review';
import CheckIn from '../models/CheckIn';
import PhotoVideo from '../models/PhotoVideo';
import Event from '../models/Event';
import { Document } from 'mongoose';

interface IBikeParkDocument extends Document {
  _id: any;
  name: string;
  description: string;
  latitude: number;
  longitude: number;
  toObject(): any;
}

// Get all bike parks with filtering
export const getAllBikeParks = async (req: Request, res: Response) => {
  try {
    const { 
      search, 
      difficulty, 
      features,
      lat,
      lng,
      radius = 100, // Default radius in km
    } = req.query;

    const query: any = {};

    // Search by name
    if (search) {
      query.name = { $regex: search, $options: 'i' };
    }

    // Filter by difficulty level
    if (difficulty) {
      const difficultyLevels = (difficulty as string).split(',');
      
      if (difficultyLevels.includes('beginner')) {
        query.hasBeginnerTrails = true;
      }
      
      if (difficultyLevels.includes('intermediate')) {
        query.hasIntermediateTrails = true;
      }
      
      if (difficultyLevels.includes('expert')) {
        query.hasExpertTrails = true;
      }
    }

    // Filter by features
    if (features) {
      const featuresList = (features as string).split(',');
      
      if (featuresList.includes('jumps')) {
        query.hasJumps = true;
      }
      
      if (featuresList.includes('flow')) {
        query.hasFlowTrails = true;
      }
      
      if (featuresList.includes('technical')) {
        query.hasTechnicalSections = true;
      }
      
      if (featuresList.includes('lift')) {
        query.hasLiftAccess = true;
      }
    }

    // Get all bike parks with filters
    const bikeParks = await BikePark.find(query) as IBikeParkDocument[];

    // Get reviews for each bike park
    const bikeParkIds = bikeParks.map(park => park._id);
    const reviews = await Review.find({ bikeParkId: { $in: bikeParkIds } });

    // Group reviews by bike park
    const reviewsByPark = reviews.reduce((acc, review) => {
      const parkId = review.bikeParkId.toString();
      if (!acc[parkId]) {
        acc[parkId] = [];
      }
      acc[parkId].push(review);
      return acc;
    }, {} as Record<string, any[]>);

    // Add reviews to each bike park
    const bikeParksWithReviews = bikeParks.map((park) => {
      const parkId = park._id.toString();
      const parkReviews = reviewsByPark[parkId] || [];
      return {
        ...park.toObject(),
        Reviews: parkReviews
      };
    });

    // If location provided, filter by distance
    if (lat && lng) {
      const latitude = parseFloat(lat as string);
      const longitude = parseFloat(lng as string);
      const maxRadius = parseFloat(radius as string);
      
      // Calculate distance for each bike park
      const filteredParks = bikeParksWithReviews.filter(park => {
        const distance = calculateDistance(
          latitude,
          longitude,
          park.latitude,
          park.longitude
        );
        
        return distance <= maxRadius;
      });
      
      return res.status(200).json(filteredParks);
    }

    res.status(200).json(bikeParksWithReviews);
  } catch (error) {
    console.error('Error getting bike parks:', error);
    res.status(500).json({ message: 'Error getting bike parks', error });
  }
};

// Get a single bike park by ID
export const getBikeParkById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const bikePark = await BikePark.findById(id);

    if (!bikePark) {
      return res.status(404).json({ message: 'Bike park not found' });
    }

    // Get related data
    const [trails, reviews, events, photos] = await Promise.all([
      Trail.find({ bikeParkId: id }),
      Review.find({ bikeParkId: id }),
      Event.find({ 
        bikeParkId: id,
        endDate: { $gte: new Date() }
      }),
      PhotoVideo.find({ bikeParkId: id })
        .sort({ createdAt: -1 })
        .limit(10)
    ]);

    // Get recent check-ins
    const oneDayAgo = new Date();
    oneDayAgo.setDate(oneDayAgo.getDate() - 1);
    
    const recentCheckIns = await CheckIn.find({
      bikeParkId: id,
      createdAt: { $gte: oneDayAgo }
    })
      .sort({ createdAt: -1 })
      .limit(10);

    // Calculate average rating
    let averageRating = 0;
    
    if (reviews && reviews.length > 0) {
      const totalRating = reviews.reduce((sum, review) => sum + review.rating, 0);
      averageRating = totalRating / reviews.length;
    }

    // Add extra data to response
    const response = {
      ...bikePark.toObject(),
      Trails: trails,
      Reviews: reviews,
      Events: events,
      PhotoVideos: photos,
      averageRating,
      reviewCount: reviews ? reviews.length : 0,
      recentCheckIns,
    };

    res.status(200).json(response);
  } catch (error) {
    console.error('Error getting bike park details:', error);
    res.status(500).json({ message: 'Error getting bike park details', error });
  }
};

// Create a new bike park
export const createBikePark = async (req: Request, res: Response) => {
  try {
    const bikePark = new BikePark(req.body);
    await bikePark.save();
    res.status(201).json(bikePark);
  } catch (error) {
    res.status(400).json({ error: 'Error creating bike park' });
  }
};

// Update a bike park
export const updateBikePark = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const updates = req.body;
    
    const bikePark = await BikePark.findById(id);
    
    if (!bikePark) {
      return res.status(404).json({ message: 'Bike park not found' });
    }
    
    const updatedBikePark = await BikePark.findByIdAndUpdate(
      id,
      updates,
      { new: true }
    );
    
    res.status(200).json({
      message: 'Bike park updated successfully',
      bikePark: updatedBikePark,
    });
  } catch (error) {
    console.error('Error updating bike park:', error);
    res.status(500).json({ message: 'Error updating bike park', error });
  }
};

// Delete a bike park
export const deleteBikePark = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    
    const bikePark = await BikePark.findById(id);
    
    if (!bikePark) {
      return res.status(404).json({ message: 'Bike park not found' });
    }
    
    await BikePark.findByIdAndDelete(id);
    
    res.status(200).json({
      message: 'Bike park deleted successfully',
    });
  } catch (error) {
    console.error('Error deleting bike park:', error);
    res.status(500).json({ message: 'Error deleting bike park', error });
  }
};

// Utility function to calculate distance between two coordinates using Haversine formula
function calculateDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const R = 6371; // Radius of the earth in km
  const dLat = deg2rad(lat2 - lat1);
  const dLon = deg2rad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c; // Distance in km
  return distance;
}

function deg2rad(deg: number): number {
  return deg * (Math.PI / 180);
} 