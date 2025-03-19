import { authResolvers } from './authResolvers.js';
import { bikeParkResolvers } from './bikeParkResolvers.js';
import { reviewResolvers } from './reviewResolvers.js';

// Merge all resolvers
export const resolvers = {
  Query: {
    ...authResolvers.Query,
    ...bikeParkResolvers.Query,
    ...reviewResolvers.Query,
  },
  Mutation: {
    ...authResolvers.Mutation,
    ...bikeParkResolvers.Mutation,
    ...reviewResolvers.Mutation,
  },
  BikePark: {
    ...bikeParkResolvers.BikePark,
  },
}; 