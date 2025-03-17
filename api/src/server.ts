import { createYoga } from 'graphql-yoga';
import { typeDefs } from './schema/schema.js';
import { resolvers } from './resolvers/resolvers.js';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import { makeExecutableSchema } from '@graphql-tools/schema';
import { bikeParkRouter } from './routes/bikeParkRoutes.js';
import { authRouter } from './routes/authRoutes.js';

// Load environment variables
dotenv.config();

const port = process.env.PORT || 3001;

// Create Express app
const app = express();

// CORS configuration
const corsOptions = {
  origin: ['http://localhost:3001',],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
};

// Middleware
app.use(cors(corsOptions));
app.use(express.json());

// Create GraphQL server
const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});

const yoga = createYoga({
  schema,
  graphiql: true,
  cors: corsOptions,
  context: async ({ request }) => {
    // Get the user token from the headers
    const token = request.headers.get('authorization')?.replace('Bearer ', '');
    
    // TODO: Add proper authentication
    return {
      user: token ? { userId: 'test-user' } : null
    };
  },
});

// Routes
app.use('/graphql', yoga);
app.use('/api/parks', bikeParkRouter);
app.use('/api/auth', authRouter);

// Health check
app.get('/health', (_req, res) => {
  res.json({ status: 'ok' });
});

// Root route
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to Bike Park Finder API' });
});

// Error handling middleware
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error(err.stack);
  res.status(500).json({
    message: 'Internal Server Error',
    error: process.env.NODE_ENV === 'development' ? err : undefined,
  });
});

// Connect to MongoDB and start server
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/bike-park-finder')
  .then(() => {
    console.log('Connected to MongoDB');
    app.listen(port, () => {
      console.log(`🚀 Server ready at http://localhost:${port}`);
      console.log(`📊 GraphQL Playground at http://localhost:${port}/graphql`);
    });
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
    process.exit(1);
  }); 