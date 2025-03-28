import 'dotenv/config';
import { createServer } from 'node:http';
import { createYoga } from 'graphql-yoga';
import { makeExecutableSchema } from '@graphql-tools/schema';
import mongoose from 'mongoose';

// Import logger
import Logger from './utils/logger.js';

// Import authentication context
import { createContext } from './utils/auth.js';
import { bikeParkModule } from './graphql-modules/bike-park/src/index.js';
import { authModule } from './graphql-modules/auth/src/index.js';
import { reviewModule } from './graphql-modules/review/src/index.js';
import { eventModule } from './graphql-modules/event/src/index.js';
import { trailModule } from './graphql-modules/trail/src/index.js';

// Environment variables
const PORT = process.env.PORT || 4000;
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/bike-park-finder';

// Log environment information for debugging
Logger.debug('Starting server with environment:', {
  NODE_ENV: process.env.NODE_ENV,
  PORT,
  MONGODB_URI: MONGODB_URI.replace(/mongodb:\/\/.*@/, 'mongodb://[redacted]@'),
});

// Create executable schema
const schema = makeExecutableSchema({
  typeDefs: [
    bikeParkModule.typeDefs,
    authModule.typeDefs,
    reviewModule.typeDefs,
    eventModule.typeDefs,
    trailModule.typeDefs,
  ],
  resolvers: [
    bikeParkModule.resolvers,
    authModule.resolvers,
    reviewModule.resolvers,
    eventModule.resolvers,
    trailModule.resolvers,
  ],
});

// Create GraphQL Yoga server
const yoga = createYoga({
  schema,
  context: async ({ request }) => {
    const auth = request.headers.get('authorization');
    return createContext({ auth });
  },
  graphiql: true,
  cors: {
    origin: ['http://localhost:3000', 'http://localhost:5173'],
    credentials: true,
    allowedHeaders: ['Content-Type', 'Authorization'],
    methods: ['POST', 'OPTIONS', 'GET', 'HEAD'],
  },
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
mongoose
  .connect(MONGODB_URI)
  .then(() => {
    Logger.info('✅ Connected to MongoDB');
    startServer();
  })
  .catch((error) => {
    Logger.error('⚠️  Failed to connect to MongoDB:', error);
    Logger.info('🔄 Starting server with mock data...');
    startServer();
  });
