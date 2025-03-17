# Bike Park Finder API

Backend API for the Bike Park Finder application.

## Setup

1. Install dependencies:
```bash
npm install
```

2. Create a `.env` file in the root directory with the following variables:
```
PORT=3001
NODE_ENV=development
```

## Development

Run the development server:
```bash
npm run dev
```

The server will start on http://localhost:3001

## Build

Build the TypeScript code:
```bash
npm run build
```

## Production

Start the production server:
```bash
npm start
```

## API Endpoints

### Parks
- GET /api/parks - Get all parks
- GET /api/parks/:id - Get park by ID

### Auth
- POST /api/auth/register - Register a new user
- POST /api/auth/login - Login user
- POST /api/auth/forgot-password - Request password reset
- POST /api/auth/reset-password - Reset password 