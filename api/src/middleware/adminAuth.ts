import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { User, IUser } from '../models/User';

interface JwtPayload {
  userId: string;
}

interface AuthenticatedRequest extends Request {
  user?: {
    userId: string;
  };
}

const adminAuth = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');

    if (!token) {
      res.status(401).json({ error: 'Please authenticate' });
      return;
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key') as JwtPayload;
    const user = await User.findById(decoded.userId);

    if (!user || !user.isAdmin) {
      res.status(403).json({ error: 'Not authorized as admin' });
      return;
    }

    (req as AuthenticatedRequest).user = {
      userId: decoded.userId
    };
    next();
  } catch (error) {
    res.status(401).json({ error: 'Please authenticate' });
  }
};

export default adminAuth; 