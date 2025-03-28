import { TrailModel } from "../models/TrailModel.js";
import { GraphQLError } from 'graphql';

export class TrailProvider {
  /**
   * Get trails for a bike park
   */
  async getBikeParkTrails(bikePark: any) {
    try {
      const trails = await TrailModel.find({ bikeParkId: bikePark.id });
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
    } catch (error: any) {
      console.error('Error fetching trails:', error);
      return [];
    }
  }
}

export const trailProvider = new TrailProvider();
