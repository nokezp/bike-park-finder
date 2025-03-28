import { CreateEventInput, UpdateEventInput } from '../../../../core/generated-models';
import { Context } from '../../../../types';
import { eventProvider } from '../providers/EventProvider.js';

export const mutation = {
  Mutation: {
    createEvent: async (_: any, { input }: { input: CreateEventInput }, context: Context) => {
      if (!context.user) {
        throw new Error('Authentication required');
      }

      return eventProvider.createEvent(input);
    },

    updateEvent: async (_: any, { id, input }: { id: string; input: UpdateEventInput }, context: Context) => {
      if (!context.user) {
        throw new Error('Authentication required');
      }

      return eventProvider.updateEvent(id, input);
    },

    deleteEvent: async (_: any, { id }: { id: string }, context: Context) => {
      if (!context.user) {
        throw new Error('Authentication required');
      }

      return eventProvider.deleteEvent(id);
    },

    registerForEvent: async (_: any, { id }: { id: string }, context: Context) => {
      if (!context.user) {
        throw new Error('Authentication required');
      }

      return eventProvider.registerForEvent(id);
    },
  },
};
