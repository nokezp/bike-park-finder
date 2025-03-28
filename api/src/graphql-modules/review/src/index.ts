import { mutation } from './resolvers/mutation.js';
import { query } from './resolvers/query.js';
import { readFileSync, readdirSync } from 'fs';
import { join } from 'path';
import { review } from './resolvers/review.js';
export { ReviewModel } from './models/ReviewModel.js';

// Read all GraphQL type definition files from the types directory
const typeDefsPath = join(process.cwd(), 'src/graphql-modules/review/src/types');
const typeDefFiles = readdirSync(typeDefsPath).filter(file => file.endsWith('.graphql'));

// Concatenate all type definitions into a single string
const reviewTypeDefs = typeDefFiles
  .map(file => readFileSync(join(typeDefsPath, file), 'utf-8'))
  .join('\n');

export const reviewModule = {
  typeDefs: reviewTypeDefs,
  resolvers: {
    Query: {
      ...query.Query,
    },
    Mutation: {
      ...mutation.Mutation,
    },
    Review: {
      ...review.Review,
    },
  }
}
