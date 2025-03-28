import { mutation } from './resolvers/mutation.js';
import { query } from './resolvers/query.js';
import { readFileSync, readdirSync } from 'fs';
import { join } from 'path';
export { EventModel } from './models/EventModel.js';

// Read all GraphQL type definition files from the types directory
const typeDefsPath = join(process.cwd(), 'src/graphql-modules/event/src/types');
const typeDefFiles = readdirSync(typeDefsPath).filter(file => file.endsWith('.graphql'));

// Concatenate all type definitions into a single string
const eventTypeDefs = typeDefFiles
  .map(file => readFileSync(join(typeDefsPath, file), 'utf-8'))
  .join('\n');

export const eventModule = {
  typeDefs: eventTypeDefs,
  resolvers: {
    Query: {
      ...query.Query,
    },
    Mutation: {
      ...mutation.Mutation,
    },
  }
}
