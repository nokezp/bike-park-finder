import express from "express";
import { graphqlHTTP } from "express-graphql";
import { graphqlUploadExpress } from "graphql-upload";
import { makeExecutableSchema } from '@graphql-tools/schema';
import mongoose from 'mongoose';
import 'dotenv/config';

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
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/bike-park-finder-mac';

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

const app = express();

// Configure CORS
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:5173');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.header('Access-Control-Allow-Methods', 'POST, OPTIONS, GET, HEAD');
  res.header('Access-Control-Allow-Credentials', 'true');
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }
  next();
});

// Serve static files from the uploads directory
app.use('/uploads', express.static('uploads'));

// Configure file upload middleware - MUST be added before graphqlHTTP
app.use(graphqlUploadExpress({ 
  maxFileSize: 10000000, // 10 MB
  maxFiles: 10
}));

// Configure GraphQL endpoint
app.use(
  "/graphql",
  (req, res) => {
    // Extract auth token from request headers
    const auth = req.headers.authorization;
    
    return graphqlHTTP({
      schema,
      context: createContext({ auth }),
      graphiql: true,
    })(req, res);
  }
);

// Start server function
const startServer = () => {
  app.listen(PORT, () => {
    Logger.info(`🚀 Express server with graphql-upload is running at http://localhost:${PORT}/graphql`);
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
