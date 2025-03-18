import { IncomingMessage } from 'node:http';
import jwt from 'jsonwebtoken';
import { User } from '../models/index.js';

// JWT secret from environment variables
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

// Context interface
export interface AuthContext {
  user: {
    id: string;
    role: string;
  } | null;
}

// Create GraphQL context with user authentication
export async function createContext({ request }: { request: IncomingMessage }): Promise<AuthContext> {
  // Get authorization header
  const auth = request.headers.authorization || '';

  // Check for Bearer token
  if (!auth || !auth.startsWith('Bearer ')) {
    return { user: null };
  }

  try {
    // Extract token
    const token = auth.split(' ')[1];
    
    // Verify token
    const decoded = jwt.verify(token, JWT_SECRET) as { id: string; role: string };
    
    // Find user
    const userDoc = await User.findById(decoded.id);
    if (!userDoc) {
      return { user: null };
    }
    
    // Return user context
    return {
      user: {
        id: userDoc.id, // Mongoose documents have an id getter
        role: userDoc.get('role') as string
      }
    };
  } catch (err) {
    // Return null if token is invalid
    return { user: null };
  }
} 