import { mutation } from './resolvers/mutation.js';
import { query } from './resolvers/query.js';
import { join } from 'path';
import { readFileSync, readdirSync } from 'fs';
export { UserModel } from './models/UserModel.js';

// Read all GraphQL type definition files from the types directory
const typeDefsPath = join(process.cwd(), 'src/graphql-modules/auth/src/types');
const typeDefFiles = readdirSync(typeDefsPath).filter(file => file.endsWith('.graphql'));

// Concatenate all type definitions into a single string
const authTypeDefs = typeDefFiles
  .map(file => readFileSync(join(typeDefsPath, file), 'utf-8'))
  .join('\n');

export const authModule = {
  typeDefs: authTypeDefs,
  resolvers: {
    Query: {
      ...query.Query,
    },
    Mutation: {
      ...mutation.Mutation,
    },
  }
}
