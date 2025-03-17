import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import dotenv from 'dotenv';
import path from 'path';
import { connectDB } from './config/database';

// Import routes
import authRoutes from './routes/authRoutes';
// Use require for JavaScript files
const bikeParkRoutes = require('./routes/bikeParkRoutes');
import reviewRoutes from './routes/reviewRoutes';
import checkInRoutes from './routes/checkInRoutes';
import trailRoutes from './routes/trailRoutes';
import photoVideoRoutes from './routes/photoVideoRoutes';
import eventRoutes from './routes/eventRoutes';

// Load environment variables
dotenv.config();

// Create Express app
const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

// Serve static files from uploads directory
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

// Connect to MongoDB
connectDB();

// API routes
app.use('/api/auth', authRoutes);
app.use('/api/bikeparks', bikeParkRoutes);
app.use('/api/reviews', reviewRoutes);
app.use('/api/checkins', checkInRoutes);
app.use('/api/trails', trailRoutes);
app.use('/api/media', photoVideoRoutes);
app.use('/api/events', eventRoutes);

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

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
}); 