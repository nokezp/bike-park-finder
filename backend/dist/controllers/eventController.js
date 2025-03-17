"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteEvent = exports.updateEvent = exports.createEvent = exports.getEventById = exports.getEventsByBikePark = void 0;
const Event_1 = __importDefault(require("../models/Event"));
const BikePark_1 = __importDefault(require("../models/BikePark"));
// Get all upcoming events for a bike park
const getEventsByBikePark = async (req, res) => {
    try {
        const { bikeParkId } = req.params;
        const { upcoming } = req.query;
        let query = { bikeParkId };
        // If upcoming is true, only show events that haven't ended yet
        if (upcoming === 'true') {
            query.endDate = { $gte: new Date() };
        }
        const events = await Event_1.default.find(query)
            .populate('bikeParkId', 'id name')
            .sort({ startDate: 1 });
        res.status(200).json(events);
    }
    catch (error) {
        console.error('Error getting events:', error);
        res.status(500).json({ message: 'Error getting events', error });
    }
};
exports.getEventsByBikePark = getEventsByBikePark;
// Get a single event by ID
const getEventById = async (req, res) => {
    try {
        const { id } = req.params;
        const event = await Event_1.default.findById(id)
            .populate('bikeParkId', 'id name address imageUrl');
        if (!event) {
            return res.status(404).json({ message: 'Event not found' });
        }
        res.status(200).json(event);
    }
    catch (error) {
        console.error('Error getting event:', error);
        res.status(500).json({ message: 'Error getting event', error });
    }
};
exports.getEventById = getEventById;
// Create a new event
const createEvent = async (req, res) => {
    try {
        const { bikeParkId } = req.params;
        const eventData = { ...req.body, bikeParkId };
        // Verify bike park exists
        const bikePark = await BikePark_1.default.findById(bikeParkId);
        if (!bikePark) {
            return res.status(404).json({ message: 'Bike park not found' });
        }
        // Validate dates
        const startDate = new Date(eventData.startDate);
        const endDate = new Date(eventData.endDate);
        if (endDate < startDate) {
            return res.status(400).json({ message: 'End date cannot be before start date' });
        }
        const newEvent = await Event_1.default.create(eventData);
        const eventWithPark = await Event_1.default.findById(newEvent._id)
            .populate('bikeParkId', 'id name');
        res.status(201).json({
            message: 'Event created successfully',
            event: eventWithPark,
        });
    }
    catch (error) {
        console.error('Error creating event:', error);
        res.status(500).json({ message: 'Error creating event', error });
    }
};
exports.createEvent = createEvent;
// Update an event
const updateEvent = async (req, res) => {
    try {
        const { id } = req.params;
        const updates = req.body;
        const event = await Event_1.default.findById(id);
        if (!event) {
            return res.status(404).json({ message: 'Event not found' });
        }
        // Validate dates if they're being updated
        if (updates.startDate || updates.endDate) {
            const startDate = new Date(updates.startDate || event.startDate);
            const endDate = new Date(updates.endDate || event.endDate);
            if (endDate < startDate) {
                return res.status(400).json({ message: 'End date cannot be before start date' });
            }
        }
        const updatedEvent = await Event_1.default.findByIdAndUpdate(id, updates, { new: true }).populate('bikeParkId', 'id name');
        res.status(200).json({
            message: 'Event updated successfully',
            event: updatedEvent,
        });
    }
    catch (error) {
        console.error('Error updating event:', error);
        res.status(500).json({ message: 'Error updating event', error });
    }
};
exports.updateEvent = updateEvent;
// Delete an event
const deleteEvent = async (req, res) => {
    try {
        const { id } = req.params;
        const event = await Event_1.default.findById(id);
        if (!event) {
            return res.status(404).json({ message: 'Event not found' });
        }
        await Event_1.default.findByIdAndDelete(id);
        res.status(200).json({
            message: 'Event deleted successfully',
        });
    }
    catch (error) {
        console.error('Error deleting event:', error);
        res.status(500).json({ message: 'Error deleting event', error });
    }
};
exports.deleteEvent = deleteEvent;
