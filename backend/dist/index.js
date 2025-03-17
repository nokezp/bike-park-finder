"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const morgan_1 = __importDefault(require("morgan"));
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = __importDefault(require("path"));
const database_1 = require("./config/database");
// Import routes
const authRoutes_1 = __importDefault(require("./routes/authRoutes"));
// Use require for JavaScript files
const bikeParkRoutes = require('./routes/bikeParkRoutes');
const reviewRoutes_1 = __importDefault(require("./routes/reviewRoutes"));
const checkInRoutes_1 = __importDefault(require("./routes/checkInRoutes"));
const trailRoutes_1 = __importDefault(require("./routes/trailRoutes"));
const photoVideoRoutes_1 = __importDefault(require("./routes/photoVideoRoutes"));
const eventRoutes_1 = __importDefault(require("./routes/eventRoutes"));
// Load environment variables
dotenv_1.default.config();
// Create Express app
const app = (0, express_1.default)();
const PORT = process.env.PORT || 3001;
// Middleware
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use((0, morgan_1.default)('dev'));
// Serve static files from uploads directory
app.use('/uploads', express_1.default.static(path_1.default.join(__dirname, '../uploads')));
// Connect to MongoDB
(0, database_1.connectDB)();
// API routes
app.use('/api/auth', authRoutes_1.default);
app.use('/api/bikeparks', bikeParkRoutes);
app.use('/api/reviews', reviewRoutes_1.default);
app.use('/api/checkins', checkInRoutes_1.default);
app.use('/api/trails', trailRoutes_1.default);
app.use('/api/media', photoVideoRoutes_1.default);
app.use('/api/events', eventRoutes_1.default);
// Root route
app.get('/', (req, res) => {
    res.json({ message: 'Welcome to Bike Park Finder API' });
});
// Error handling middleware
app.use((err, req, res, next) => {
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
