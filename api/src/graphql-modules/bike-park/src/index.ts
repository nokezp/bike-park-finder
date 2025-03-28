import { readFileSync, readdirSync } from 'fs';
import { join } from 'path';
import { bikePark } from './resolvers/bikePark.js';
import { mutation } from './resolvers/mutation.js';
import { query } from './resolvers/query.js';
export { BikeParkModel } from './models/BikeParkModel.js';

// Read all GraphQL type definition files from the types directory
const typeDefsPath = join(process.cwd(), 'src/graphql-modules/bike-park/src/types');
const typeDefFiles = readdirSync(typeDefsPath).filter(file => file.endsWith('.graphql'));

// Concatenate all type definitions into a single string
const bikeParkTypeDefs = typeDefFiles
  .map(file => readFileSync(join(typeDefsPath, file), 'utf-8'))
  .join('\n');

export const bikeParkModule = {
  typeDefs: bikeParkTypeDefs,
  resolvers: {
    Query: {
      ...query.Query,
    },
    Mutation: {
      ...mutation.Mutation,
    },
    BikePark: {
      ...bikePark.BikePark,
    }
  }
}
