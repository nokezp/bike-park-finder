import { readFileSync, readdirSync } from 'fs';
import { join } from 'path';

// Read all GraphQL type definition files from the types directory
const typeDefsPath = join(process.cwd(), 'src/graphql-modules/review/src/types');
const typeDefFiles = readdirSync(typeDefsPath).filter(file => file.endsWith('.graphql'));

// Concatenate all type definitions into a single string
const reviewTypeDefs = typeDefFiles
  .map(file => readFileSync(join(typeDefsPath, file), 'utf-8'))
  .join('\n');

export { reviewTypeDefs };
