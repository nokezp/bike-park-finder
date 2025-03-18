import { GraphQLError } from 'graphql';
import { BikePark } from '../models/index.js';
import { AuthContext } from '../utils/auth.js';
import mongoose from 'mongoose';

export const bikeParkResolvers = {
  Query: {
    bikeParks: async () => {
      try {
        return await BikePark.find();
      } catch (error: any) {
        throw new GraphQLError(`Error fetching bike parks: ${error.message}`);
      }
    },

    bikePark: async (_: unknown, args: { id: string }) => {
      try {
        const { id } = args;
        
        // Validate ObjectId
        if (!mongoose.Types.ObjectId.isValid(id)) {
          throw new GraphQLError('Invalid ID format');
        }
        
        const bikePark = await BikePark.findById(id);
        
        if (!bikePark) {
          throw new GraphQLError(`Bike park not found with id: ${id}`);
        }
        
        return bikePark;
      } catch (error: any) {
        throw new GraphQLError(`Error fetching bike park: ${error.message}`);
      }
    },

    searchBikeParks: async (_: unknown, args: { query: string }) => {
      try {
        const { query } = args;
        
        if (!query.trim()) {
          return await BikePark.find();
        }
        
        return await BikePark.find({ 
          $text: { $search: query } 
        });
      } catch (error: any) {
        throw new GraphQLError(`Error searching bike parks: ${error.message}`);
      }
    }
  },

  Mutation: {
    createBikePark: async (_: unknown, args: { input: any }, context: AuthContext) => {
      if (!context.user) {
        throw new GraphQLError('Not authenticated', {
          extensions: { code: 'UNAUTHENTICATED' }
        });
      }

      try {
        const { input } = args;
        
        const bikePark = new BikePark({
          ...input,
          createdBy: context.user.id
        });
        
        await bikePark.save();
        return bikePark;
      } catch (error: any) {
        throw new GraphQLError(`Error creating bike park: ${error.message}`);
      }
    },

    updateBikePark: async (_: unknown, args: { id: string; input: any }, context: AuthContext) => {
      if (!context.user) {
        throw new GraphQLError('Not authenticated', {
          extensions: { code: 'UNAUTHENTICATED' }
        });
      }

      try {
        const { id, input } = args;
        
        // Validate ObjectId
        if (!mongoose.Types.ObjectId.isValid(id)) {
          throw new GraphQLError('Invalid ID format');
        }
        
        // Check if bike park exists
        const bikePark = await BikePark.findById(id);
        if (!bikePark) {
          throw new GraphQLError(`Bike park not found with id: ${id}`);
        }
        
        // Check if user is authorized to update
        const isCreator = bikePark.createdBy.toString() === context.user.id;
        const isAdmin = context.user.role === 'admin';
        
        if (!isCreator && !isAdmin) {
          throw new GraphQLError('Not authorized to update this bike park', {
            extensions: { code: 'FORBIDDEN' }
          });
        }
        
        // Update bike park
        const updatedBikePark = await BikePark.findByIdAndUpdate(
          id,
          { $set: input },
          { new: true, runValidators: true }
        );
        
        return updatedBikePark;
      } catch (error: any) {
        throw new GraphQLError(`Error updating bike park: ${error.message}`);
      }
    },

    deleteBikePark: async (_: unknown, args: { id: string }, context: AuthContext) => {
      if (!context.user) {
        throw new GraphQLError('Not authenticated', {
          extensions: { code: 'UNAUTHENTICATED' }
        });
      }

      try {
        const { id } = args;
        
        // Validate ObjectId
        if (!mongoose.Types.ObjectId.isValid(id)) {
          throw new GraphQLError('Invalid ID format');
        }
        
        // Check if bike park exists
        const bikePark = await BikePark.findById(id);
        if (!bikePark) {
          throw new GraphQLError(`Bike park not found with id: ${id}`);
        }
        
        // Check if user is authorized to delete
        const isCreator = bikePark.createdBy.toString() === context.user.id;
        const isAdmin = context.user.role === 'admin';
        
        if (!isCreator && !isAdmin) {
          throw new GraphQLError('Not authorized to delete this bike park', {
            extensions: { code: 'FORBIDDEN' }
          });
        }
        
        // Delete bike park
        await BikePark.findByIdAndDelete(id);
        return true;
      } catch (error: any) {
        throw new GraphQLError(`Error deleting bike park: ${error.message}`);
        return false;
      }
    }
  }
}; 