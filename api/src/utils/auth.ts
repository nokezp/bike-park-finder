import jwt from 'jsonwebtoken';
import { UserModel } from '../graphql-modules/auth/src/index.js';

// JWT configuration
export const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';
export const JWT_EXPIRES_IN = '7d';

// Context interface
export interface AuthContext {
  user: {
    id: string;
    role: string;
  } | null;
}

// Create GraphQL context with user authentication
export async function createContext({ auth }: { auth: string | null }): Promise<AuthContext> {
  try {
    // Check for Bearer token
    if (!auth || !auth.startsWith('Bearer ')) {
      return { user: null };
    }

    // Extract token
    const token = auth.split(' ')[1];

    // Verify token
    const decoded = jwt.verify(token, JWT_SECRET) as { id: string; role: string };

    // Find user
    const userDoc = await UserModel.findById(decoded.id);
    if (!userDoc) {
      return { user: null };
    }

    // Return user context
    const context = {
      user: {
        id: userDoc.id,
        role: userDoc.get('role') as string,
      },
    };
    return context;
  } catch (err) {
    // Return null if token is invalid
    return { user: null };
  }
}
