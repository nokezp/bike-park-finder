"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.protect = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const User_1 = __importDefault(require("../models/User"));
const protect = async (req, res, next) => {
    let token;
    // Check if token exists in the Authorization header
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            // Get token from header
            token = req.headers.authorization.split(' ')[1];
            // Verify token
            const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET || 'bWlfc2VjcmV0X2tleV9leGFtcGxlXzEyMzQ1Njc4OTAhQkM=');
            // Find user by id and assign to req.user
            const user = await User_1.default.findById(decoded.id).select('-password');
            if (!user) {
                res.status(401).json({ message: 'User not found' });
                return;
            }
            // @ts-ignore
            req.user = user;
            next();
        }
        catch (error) {
            console.error('Authentication error:', error);
            res.status(401).json({ message: 'Not authorized, token failed' });
        }
    }
    else if (!token) {
        res.status(401).json({ message: 'Not authorized, no token' });
    }
};
exports.protect = protect;
