import { readFileSync, readdirSync } from 'fs';
import { join } from 'path';

// Read all GraphQL type definition files from the types directory
const typeDefsPath = join(process.cwd(), 'src/types');
const typeDefFiles = readdirSync(typeDefsPath).filter(file => file.endsWith('.graphql'));

// Concatenate all type definitions into a single string
const bikeParkTypeDefs = typeDefFiles
  .map(file => readFileSync(join(typeDefsPath, file), 'utf-8'))
  .join('\n');

export { bikeParkTypeDefs };
