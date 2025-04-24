import { AuthContext } from '../../../../utils/auth.js';
import { bikeParkProvider } from '../providers/BikeParkProvider.js';
import { GraphQLError } from 'graphql';

export const mutation = {
  Mutation: {
    createBikePark: async (_: unknown, { input }: { input: any }, context: AuthContext) => {
      if (!context.user) {
        throw new Error('Not authenticated');
      }

      return bikeParkProvider.createBikePark(input, context);
    },

    updateBikePark: async (_: unknown, { id, input }: { id: string; input: any }, context: AuthContext) => {
      if (!context.user) {
        throw new Error('Not authenticated');
      }

      return bikeParkProvider.updateBikePark(id, input, context);
    },

    deleteBikePark: async (_: unknown, { id }: { id: string }, context: AuthContext) => {
      if (!context.user) {
        throw new Error('Not authenticated');
      }

      return bikeParkProvider.deleteBikePark(id, context);
    },

    uploadImage: async (_: unknown, { file }: { file: any }, context: AuthContext) => {
      try {
        // Optional: Check authentication if needed
        if (!context.user) {
          throw new GraphQLError('Not authenticated');
        }

        // Process the file upload
        return bikeParkProvider.uploadImage(file);
      } catch (error: any) {
        console.error('Error in uploadImage resolver:', error);
        throw new GraphQLError(`Failed to upload image: ${error.message}`);
      }
    },

    approveBikePark: async (_: unknown, { id }: { id: string }, context: AuthContext) => {
      if (!context.user) {
        throw new GraphQLError('Not authenticated');
      }

      if (context.user.role !== 'admin') {
        throw new GraphQLError('Not authorized. Only admins can approve bike parks.');
      }

      return bikeParkProvider.approveBikePark(id);
    },

    rejectBikePark: async (_: unknown, { id }: { id: string }, context: AuthContext) => {
      if (!context.user) {
        throw new GraphQLError('Not authenticated');
      }

      if (context.user.role !== 'admin') {
        throw new GraphQLError('Not authorized. Only admins can reject bike parks.');
      }

      return bikeParkProvider.rejectBikePark(id);
    },
  },
};
