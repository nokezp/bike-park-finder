import { EventFilter } from '../../../../core/generated-models';
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
  },
};
