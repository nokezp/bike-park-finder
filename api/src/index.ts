import 'dotenv/config';
import express from "express";
import { createServer } from 'node:http';
import { createYoga } from 'graphql-yoga';
import { makeExecutableSchema } from '@graphql-tools/schema';
import mongoose from 'mongoose';
import session from 'express-session';

// Import logger
import Logger from './utils/logger.js';

// Import authentication context
import { createContext } from './utils/auth.js';
import { bikeParkModule } from './graphql-modules/bike-park/src/index.js';
import { authModule } from './graphql-modules/auth/src/index.js';
import { reviewModule } from './graphql-modules/review/src/index.js';
import { eventModule } from './graphql-modules/event/src/index.js';
import { trailModule } from './graphql-modules/trail/src/index.js';
import { strava } from './graphql-modules/strava/src/resolvers/strava.js';
import { stravaModule } from './graphql-modules/strava/src/index.js';
import dotenv from 'dotenv';
import url from 'url';
import { stravaProvider } from './graphql-modules/strava/src/providers/StravaProvider.js';

dotenv.config();

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
    stravaModule.typeDefs,
  ],
  resolvers: [
    bikeParkModule.resolvers,
    authModule.resolvers,
    reviewModule.resolvers,
    eventModule.resolvers,
    trailModule.resolvers,
    stravaModule.resolvers,
  ],
});

// Create GraphQL Yoga server
const yoga = createYoga({
  schema,
  context: async ({ request }) => {
    const auth = request.headers.get('authorization');
    return createContext({ auth });
  },
  // context: ({ req, res }: any) => {
  //   // `req` here is the native Express `IncomingMessage`, not the `Request` from fetch API
  //   // Express session is available here
  //   return { req, res };
  // },
  cors: {
    origin: ['http://localhost:3000', 'http://localhost:5173', 'http://localhost:5174'],
    credentials: true,
  },
  // cors: {
  //   origin: ['http://localhost:3000', 'http://localhost:5173', 'http://localhost:5174'],
  //   credentials: true,
  //   allowedHeaders: ['Content-Type', 'Authorization'],
  //   methods: ['POST', 'OPTIONS', 'GET', 'HEAD'],
  // },
  // Configure multipart request handling for file uploads
  multipart: true
});

// Create HTTP server
const server = createServer(yoga);
const app = express();

// Use express-session middleware
app.use(session({
  secret: 'your-secret-key', // 🔐 Replace with a secure secret in production
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: false, // Set to true if using HTTPS
    httpOnly: true,
    maxAge: 24 * 60 * 60 * 1000, // 1 day
  }
}));

app.use((req, res, next) => {
  next();
});

app.get('/strava/callback', async (req, res) => {
  const parsedUrl = url.parse(req.url || '', true);
  const code = parsedUrl.query.code;
  if (!code || Array.isArray(code)) {
    res.writeHead(400).end("Missing or invalid code parameter");
    return;
  }

  stravaProvider.handleOAuthCallback(code, "68148e210b50afac213eccc9");
  res.redirect('http://localhost:5173/user-account?strava_connected=true');
});

app.use(yoga.graphqlEndpoint, yoga);

// Start server function
const startServer = () => {
  app.listen(PORT, () => {
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
