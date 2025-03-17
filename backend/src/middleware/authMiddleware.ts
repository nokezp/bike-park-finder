import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/User';

interface DecodedToken {
  id: string;
  email: string;
  isAdmin?: boolean;
  iat: number;
  exp: number;
}

export const protect = async (req: Request, res: Response, next: NextFunction) => {
  let token;

  // Check if token exists in the Authorization header
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      // Get token from header
      token = req.headers.authorization.split(' ')[1];

      // Verify token
      const decoded = jwt.verify(
        token,
        process.env.JWT_SECRET || 'bWlfc2VjcmV0X2tleV9leGFtcGxlXzEyMzQ1Njc4OTAhQkM='
      ) as DecodedToken;

      // Find user by id and assign to req.user
      const user = await User.findById(decoded.id).select('-password');

      if (!user) {
        res.status(401).json({ message: 'User not found' });
        return;
      }

      // @ts-ignore
      req.user = user;
      next();
    } catch (error) {
      console.error('Authentication error:', error);
      res.status(401).json({ message: 'Not authorized, token failed' });
    }
  } else if (!token) {
    res.status(401).json({ message: 'Not authorized, no token' });
  }
}; 