import express, { Request, Response } from 'express';

const router = express.Router();

// Mock user data - replace with database in production
const users = [
  {
    id: '1',
    email: 'test@example.com',
    password: 'password123', // In production, use hashed passwords
    name: 'Test User'
  }
];

// Register
router.post('/register', (req: Request, res: Response): void => {
  const { email, password, name } = req.body;

  if (!email || !password || !name) {
    res.status(400).json({ error: 'Missing required fields' });
    return;
  }

  if (users.find(u => u.email === email)) {
    res.status(409).json({ error: 'Email already exists' });
    return;
  }

  // In production, hash password before storing
  const newUser = {
    id: String(users.length + 1),
    email,
    password,
    name
  };

  users.push(newUser);

  // In production, send verification email
  res.status(201).json({ message: 'User registered successfully' });
});

// Login
router.post('/login', (req: Request, res: Response): void => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400).json({ error: 'Missing required fields' });
    return;
  }

  const user = users.find(u => u.email === email && u.password === password);

  if (!user) {
    res.status(401).json({ error: 'Invalid credentials' });
    return;
  }

  // In production, generate and return JWT token
  res.json({ message: 'Login successful' });
});

// Forgot Password
router.post('/forgot-password', (req: Request, res: Response): void => {
  const { email } = req.body;

  if (!email) {
    res.status(400).json({ error: 'Email is required' });
    return;
  }

  const user = users.find(u => u.email === email);

  if (!user) {
    res.status(404).json({ error: 'User not found' });
    return;
  }

  // In production, send password reset email
  res.json({ message: 'Password reset instructions sent to email' });
});

// Reset Password
router.post('/reset-password', (req: Request, res: Response): void => {
  const { token, password } = req.body;

  if (!token || !password) {
    res.status(400).json({ error: 'Missing required fields' });
    return;
  }

  // In production, verify token and update password
  res.json({ message: 'Password reset successful' });
});

export const authRouter = router; 