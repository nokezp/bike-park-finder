import { IResolvers } from '@graphql-tools/utils';
import { BikePark } from '../models/BikePark.js';

export const resolvers: IResolvers = {
  Query: {
    parks: async () => {
      try {
        return await BikePark.find({});
      } catch (error) {
        throw new Error('Failed to fetch parks');
      }
    },
    park: async (_, { id }) => {
      try {
        const park = await BikePark.findById(id);
        return park || null;
      } catch (error) {
        throw new Error('Failed to fetch park');
      }
    },
    searchParks: async (_, { query }) => {
      try {
        return await BikePark.find({
          $text: { $search: query }
        });
      } catch (error) {
        throw new Error('Failed to search parks');
      }
    },
  },
  Mutation: {
    createPark: async (_, { input }, { user }) => {
      try {
        const park = new BikePark({
          ...input,
          createdBy: user.userId
        });
        return await park.save();
      } catch (error) {
        throw new Error('Failed to create park');
      }
    },
    updatePark: async (_, { id, input }) => {
      try {
        const park = await BikePark.findByIdAndUpdate(
          id,
          { $set: input },
          { new: true }
        );
        if (!park) {
          throw new Error('Park not found');
        }
        return park;
      } catch (error) {
        throw new Error('Failed to update park');
      }
    },
    deletePark: async (_, { id }) => {
      try {
        const park = await BikePark.findByIdAndDelete(id);
        if (!park) {
          throw new Error('Park not found');
        }
        return true;
      } catch (error) {
        throw new Error('Failed to delete park');
      }
    },
  },
}; 