import 'dotenv/config';
import { createServer } from 'node:http';
import { createYoga } from 'graphql-yoga';
import { makeExecutableSchema } from '@graphql-tools/schema';
import mongoose from 'mongoose';

// Import logger
import Logger from './utils/logger.js';

// Import schema and resolvers
import { typeDefs } from './schema/typeDefs.js';
import { resolvers } from './resolvers/index.js';

// Import authentication context
import { createContext } from './utils/auth.js';

// Environment variables
const PORT = process.env.PORT || 4000;
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/bike-park-finder';

// Log environment information for debugging
Logger.debug('Starting server with environment:', { 
  NODE_ENV: process.env.NODE_ENV,
  PORT,
  MONGODB_URI: MONGODB_URI.replace(/mongodb:\/\/.*@/, 'mongodb://[redacted]@') // Redact credentials
});

// Create executable schema
const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});

// Create GraphQL Yoga server
const yoga = createYoga({
  schema,
  context: createContext,
  graphiql: true,
  cors: {
    origin: ['http://localhost:3000', 'http://localhost:5173'],
    credentials: true,
  },
  // Add logging for GraphQL operations
  logging: {
    debug: (...args) => Logger.debug('GraphQL Debug:', ...args),
    info: (...args) => Logger.info('GraphQL Info: ' + args.join(' ')),
    warn: (...args) => Logger.error('GraphQL Warning: ' + args.join(' ')),
    error: (...args) => Logger.error('GraphQL Error: ' + args.join(' ')),
  }
});

// Create HTTP server
const server = createServer(yoga);

// Start server function
const startServer = () => {
  server.listen(PORT, () => {
    Logger.info(`🚀 Server is running at http://localhost:${PORT}/graphql`);
    if (!mongoose.connection.readyState) {
      Logger.warn('⚠️  Warning: MongoDB is not connected. Running in mock data mode.');
    }
  });
};

// Connect to MongoDB
mongoose.connect(MONGODB_URI)
  .then(() => {
    Logger.info('✅ Connected to MongoDB');
    startServer();
  })
  .catch((error) => {
    Logger.error('⚠️  Failed to connect to MongoDB:', error);
    Logger.info('🔄 Starting server with mock data...');
    startServer();
  }); 