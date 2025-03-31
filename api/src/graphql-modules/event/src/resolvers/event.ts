import { eventProvider } from '../providers/EventProvider.js';

export const event = {
  Event: {
    coordinates: async (event: any) => {
      return eventProvider.getCoordinatesByLocation(event.location);
    },
  },
};
