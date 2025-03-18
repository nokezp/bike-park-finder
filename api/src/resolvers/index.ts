import { authResolvers } from './authResolvers.js';
import { bikeParkResolvers } from './bikeParkResolvers.js';

// Merge all resolvers
export const resolvers = {
  Query: {
    ...authResolvers.Query,
    ...bikeParkResolvers.Query,
  },
  Mutation: {
    ...authResolvers.Mutation,
    ...bikeParkResolvers.Mutation,
  },
}; 