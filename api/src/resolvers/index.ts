import { authResolvers } from './authResolvers.js';
import { bikeParkResolvers } from './bikeParkResolvers.js';
import { eventResolvers } from './eventsResolvers.js';
import { reviewResolvers } from './reviewResolvers.js';

// Merge all resolvers
export const resolvers = {
  Query: {
    ...authResolvers.Query,
    ...bikeParkResolvers.Query,
    ...reviewResolvers.Query,
    ...eventResolvers.Query,
  },
  Mutation: {
    ...authResolvers.Mutation,
    ...bikeParkResolvers.Mutation,
    ...reviewResolvers.Mutation,
    ...eventResolvers.Mutation,
  },
  BikePark: {
    ...bikeParkResolvers.BikePark,
  },
};
