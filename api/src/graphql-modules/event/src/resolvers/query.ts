import { ApprovalStatus, EventFilter } from '../../../../core/generated-models';
import { AuthContext } from '../../../../utils/auth';
import { eventProvider } from '../providers/EventProvider.js';

export const query = {
  Query: {
    popularEventCategories: async () => {
      return eventProvider.getPopularEventCategories();
    },

    events: async (_: any, { filter }: { filter?: EventFilter }) => {
      return eventProvider.getEvents(filter);
    },

    event: async (_: any, { id }: { id: string }) => {
      return eventProvider.getEventById(id);
    },

    pendingEvents: async (_: unknown, { status }: { status?: ApprovalStatus }, context: AuthContext) => {
      if (!context.user || context.user.role !== 'admin') {
        throw new Error('Not authorized. Only admins can access pending events.');
      }
      return eventProvider.getPendingEvents(status);
    }
  },
};
