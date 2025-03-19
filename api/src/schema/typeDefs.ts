import { readFileSync } from 'fs';
import { join } from 'path';

const typeDefs = readFileSync(join(process.cwd(), 'src/schema/schema.graphql'), 'utf-8');

export { typeDefs }; 