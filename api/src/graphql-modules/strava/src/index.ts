import { readFileSync, readdirSync } from 'fs';
import { join } from 'path';
import { query } from './resolvers/query.js';
import { mutation } from './resolvers/mutation.js';
import { strava } from './resolvers/strava.js';
export { StravaCredentialsModel } from './models/StravaModel.js';

// Read all GraphQL type definition files from the types directory
const typeDefsPath = join(process.cwd(), 'src/graphql-modules/strava/src/types');
const typeDefFiles = readdirSync(typeDefsPath).filter(file => file.endsWith('.graphql'));

// Concatenate all type definitions into a single string
const stravaTypeDefs = typeDefFiles
  .map(file => readFileSync(join(typeDefsPath, file), 'utf-8'))
  .join('\n');

export const stravaModule = {
  typeDefs: stravaTypeDefs,
  resolvers: {
    Query: {
      ...query.Query,
    },
    Mutation: {
      ...mutation.Mutation,
    },
    StravaAthlete: {
      ...strava.StravaAthlete,
    },
    StravaActivity: {
      ...strava.StravaActivity,
    },
    StravaMap: {
      ...strava.StravaMap,
    }
  }
}
