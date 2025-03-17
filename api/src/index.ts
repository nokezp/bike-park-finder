import './server';
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import { bikeParkRouter } from './routes/bikeParkRoutes';
import { authRouter } from './routes/authRoutes';

// Import routes
// import reviewRoutes from './routes/reviewRoutes';
// import checkInRoutes from './routes/checkInRoutes';
// import trailRoutes from './routes/trailRoutes';
// import photoVideoRoutes from './routes/photoVideoRoutes';
// import eventRoutes from './routes/eventRoutes';

// Load environment variables
dotenv.config();

// Create Express app
const app = express();
const port = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/parks', bikeParkRouter);
app.use('/api/auth', authRouter);

// Health check
app.get('/health', (_req, res) => {
  res.json({ status: 'ok' });
});

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/bike-park-finder')
  .then(() => {
    console.log('Connected to MongoDB');
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
  });

// API routes
// app.use('/api/reviews', reviewRoutes);
// app.use('/api/check-ins', checkInRoutes);
// app.use('/api/trails', trailRoutes);
// app.use('/api/events', eventRoutes);
// app.use('/api/photos', photoVideoRoutes);

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