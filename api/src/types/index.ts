import { Request } from 'express';

export interface Context {
  req: Request;
  user?: any; // Using 'any' temporarily until we have proper user type
} 