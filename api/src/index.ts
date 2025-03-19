import 'dotenv/config';
import { createServer } from 'node:http';
import { createYoga } from 'graphql-yoga';
import { makeExecutableSchema } from '@graphql-tools/schema';
import mongoose from 'mongoose';

// Import schema and resolvers
import { typeDefs } from './schema/typeDefs.js';
import { resolvers } from './resolvers/index.js';

// Import authentication context
import { createContext } from './utils/auth.js';

// Environment variables
const PORT = process.env.PORT || 4000;
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/bike-park-finder';

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
    origin: ['http://localhost:5173'],
    credentials: true,
  },
});

// Create HTTP server
const server = createServer(yoga);

// Start server function
const startServer = () => {
  server.listen(PORT, () => {
    console.log(`🚀 Server is running at http://localhost:${PORT}/graphql`);
    if (!mongoose.connection.readyState) {
      console.warn('⚠️  Warning: MongoDB is not connected. Running in mock data mode.');
    }
  });
};

// Connect to MongoDB
mongoose.connect(MONGODB_URI)
  .then(() => {
    console.log('✅ Connected to MongoDB');
    startServer();
  })
  .catch((error) => {
    console.warn('⚠️  Failed to connect to MongoDB:', error.message);
    console.log('🔄 Starting server with mock data...');
    startServer();
  }); 