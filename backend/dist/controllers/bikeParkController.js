"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteBikePark = exports.updateBikePark = exports.createBikePark = exports.getBikeParkById = exports.getAllBikeParks = void 0;
const BikePark_1 = __importDefault(require("../models/BikePark"));
const Trail_1 = __importDefault(require("../models/Trail"));
const Review_1 = __importDefault(require("../models/Review"));
const CheckIn_1 = __importDefault(require("../models/CheckIn"));
const PhotoVideo_1 = __importDefault(require("../models/PhotoVideo"));
const Event_1 = __importDefault(require("../models/Event"));
// Get all bike parks with filtering
const getAllBikeParks = async (req, res) => {
    try {
        const { search, difficulty, features, lat, lng, radius = 100, // Default radius in km
         } = req.query;
        const query = {};
        // Search by name
        if (search) {
            query.name = { $regex: search, $options: 'i' };
        }
        // Filter by difficulty level
        if (difficulty) {
            const difficultyLevels = difficulty.split(',');
            if (difficultyLevels.includes('beginner')) {
                query.hasBeginnerTrails = true;
            }
            if (difficultyLevels.includes('intermediate')) {
                query.hasIntermediateTrails = true;
            }
            if (difficultyLevels.includes('expert')) {
                query.hasExpertTrails = true;
            }
        }
        // Filter by features
        if (features) {
            const featuresList = features.split(',');
            if (featuresList.includes('jumps')) {
                query.hasJumps = true;
            }
            if (featuresList.includes('flow')) {
                query.hasFlowTrails = true;
            }
            if (featuresList.includes('technical')) {
                query.hasTechnicalSections = true;
            }
            if (featuresList.includes('lift')) {
                query.hasLiftAccess = true;
            }
        }
        // Get all bike parks with filters
        const bikeParks = await BikePark_1.default.find(query);
        // Get reviews for each bike park
        const bikeParkIds = bikeParks.map(park => park._id);
        const reviews = await Review_1.default.find({ bikeParkId: { $in: bikeParkIds } });
        // Group reviews by bike park
        const reviewsByPark = reviews.reduce((acc, review) => {
            const parkId = review.bikeParkId.toString();
            if (!acc[parkId]) {
                acc[parkId] = [];
            }
            acc[parkId].push(review);
            return acc;
        }, {});
        // Add reviews to each bike park
        const bikeParksWithReviews = bikeParks.map((park) => {
            const parkId = park._id.toString();
            const parkReviews = reviewsByPark[parkId] || [];
            return {
                ...park.toObject(),
                Reviews: parkReviews
            };
        });
        // If location provided, filter by distance
        if (lat && lng) {
            const latitude = parseFloat(lat);
            const longitude = parseFloat(lng);
            const maxRadius = parseFloat(radius);
            // Calculate distance for each bike park
            const filteredParks = bikeParksWithReviews.filter(park => {
                const distance = calculateDistance(latitude, longitude, park.latitude, park.longitude);
                return distance <= maxRadius;
            });
            return res.status(200).json(filteredParks);
        }
        res.status(200).json(bikeParksWithReviews);
    }
    catch (error) {
        console.error('Error getting bike parks:', error);
        res.status(500).json({ message: 'Error getting bike parks', error });
    }
};
exports.getAllBikeParks = getAllBikeParks;
// Get a single bike park by ID
const getBikeParkById = async (req, res) => {
    try {
        const { id } = req.params;
        const bikePark = await BikePark_1.default.findById(id);
        if (!bikePark) {
            return res.status(404).json({ message: 'Bike park not found' });
        }
        // Get related data
        const [trails, reviews, events, photos] = await Promise.all([
            Trail_1.default.find({ bikeParkId: id }),
            Review_1.default.find({ bikeParkId: id }),
            Event_1.default.find({
                bikeParkId: id,
                endDate: { $gte: new Date() }
            }),
            PhotoVideo_1.default.find({ bikeParkId: id })
                .sort({ createdAt: -1 })
                .limit(10)
        ]);
        // Get recent check-ins
        const oneDayAgo = new Date();
        oneDayAgo.setDate(oneDayAgo.getDate() - 1);
        const recentCheckIns = await CheckIn_1.default.find({
            bikeParkId: id,
            createdAt: { $gte: oneDayAgo }
        })
            .sort({ createdAt: -1 })
            .limit(10);
        // Calculate average rating
        let averageRating = 0;
        if (reviews && reviews.length > 0) {
            const totalRating = reviews.reduce((sum, review) => sum + review.rating, 0);
            averageRating = totalRating / reviews.length;
        }
        // Add extra data to response
        const response = {
            ...bikePark.toObject(),
            Trails: trails,
            Reviews: reviews,
            Events: events,
            PhotoVideos: photos,
            averageRating,
            reviewCount: reviews ? reviews.length : 0,
            recentCheckIns,
        };
        res.status(200).json(response);
    }
    catch (error) {
        console.error('Error getting bike park details:', error);
        res.status(500).json({ message: 'Error getting bike park details', error });
    }
};
exports.getBikeParkById = getBikeParkById;
// Create a new bike park
const createBikePark = async (req, res) => {
    try {
        const bikeParkData = req.body;
        const newBikePark = await BikePark_1.default.create(bikeParkData);
        res.status(201).json({
            message: 'Bike park created successfully',
            bikePark: newBikePark,
        });
    }
    catch (error) {
        console.error('Error creating bike park:', error);
        res.status(500).json({ message: 'Error creating bike park', error });
    }
};
exports.createBikePark = createBikePark;
// Update a bike park
const updateBikePark = async (req, res) => {
    try {
        const { id } = req.params;
        const updates = req.body;
        const bikePark = await BikePark_1.default.findById(id);
        if (!bikePark) {
            return res.status(404).json({ message: 'Bike park not found' });
        }
        const updatedBikePark = await BikePark_1.default.findByIdAndUpdate(id, updates, { new: true });
        res.status(200).json({
            message: 'Bike park updated successfully',
            bikePark: updatedBikePark,
        });
    }
    catch (error) {
        console.error('Error updating bike park:', error);
        res.status(500).json({ message: 'Error updating bike park', error });
    }
};
exports.updateBikePark = updateBikePark;
// Delete a bike park
const deleteBikePark = async (req, res) => {
    try {
        const { id } = req.params;
        const bikePark = await BikePark_1.default.findById(id);
        if (!bikePark) {
            return res.status(404).json({ message: 'Bike park not found' });
        }
        await BikePark_1.default.findByIdAndDelete(id);
        res.status(200).json({
            message: 'Bike park deleted successfully',
        });
    }
    catch (error) {
        console.error('Error deleting bike park:', error);
        res.status(500).json({ message: 'Error deleting bike park', error });
    }
};
exports.deleteBikePark = deleteBikePark;
// Utility function to calculate distance between two coordinates using Haversine formula
function calculateDistance(lat1, lon1, lat2, lon2) {
    const R = 6371; // Radius of the earth in km
    const dLat = deg2rad(lat2 - lat1);
    const dLon = deg2rad(lon2 - lon1);
    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c; // Distance in km
    return distance;
}
function deg2rad(deg) {
    return deg * (Math.PI / 180);
}
