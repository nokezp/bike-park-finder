import { join } from 'path';
import { trail } from './resolvers/trail.js';
import { readdirSync, readFileSync } from 'fs';
export { TrailModel } from './models/TrailModel.js';

// Read all GraphQL type definition files from the types directory
const typeDefsPath = join(process.cwd(), 'src/graphql-modules/trail/src/types');
const typeDefFiles = readdirSync(typeDefsPath).filter(file => file.endsWith('.graphql'));

// Concatenate all type definitions into a single string
export const trailTypeDefs = typeDefFiles
  .map(file => readFileSync(join(typeDefsPath, file), 'utf-8'))
  .join('\n');

export const trailModule = {
  typeDefs: trailTypeDefs,
  resolvers: {
    Trail: {
      ...trail.Trail,
    }
  }
}
