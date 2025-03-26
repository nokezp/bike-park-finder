import { Trail } from '../models/Trail';

export const BikePark = {
  // ... existing code ...

  trails: async (parent: any) => {
    try {
      const trails = await Trail.find({ bikeParkId: parent.id });
      return trails.map(trail => ({
        id: trail.id,
        name: trail.name,
        difficulty: trail.difficulty,
        length: trail.length,
        verticalDrop: trail.elevation.loss, // Using elevation loss as vertical drop
        status: trail.status,
        features: trail.features,
        description: trail.description,
        imageUrl: trail.photos[0] // Using first photo as main image
      }));
    } catch (error) {
      console.error('Error fetching trails:', error);
      return [];
    }
  }
}; 