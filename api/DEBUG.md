# Debugging Guide for Bike Park Finder API

This guide explains how to debug the Bike Park Finder GraphQL API.

## Setup

We've configured several tools to help you debug the API:

1. **VS Code Debugger** - Launch configurations are in `.vscode/launch.json`
2. **Logger Utility** - Custom logger at `src/utils/logger.ts`
3. **Nodemon with Inspect** - Debug script in `package.json`

## Methods for Debugging

### 1. Using VS Code Debugger

The easiest way to debug is using the VS Code debugger:

1. Open VS Code
2. Select "Run and Debug" from the sidebar
3. Choose "Debug API" from the dropdown menu
4. Press F5 or click the green play button

This will:
- Compile TypeScript to JavaScript
- Start the server with the Node.js inspector enabled
- Allow you to set breakpoints in your code
- Provide the debug console for examining variables

### 2. Using the Logger

The custom logger provides four logging levels:

```javascript
// In any file:
import Logger from '../utils/logger.js';

// Examples
Logger.debug('Detailed information', { someObject });
Logger.info('General information');
Logger.warn('Warning');
Logger.error('Error occurred', error);
```

Logs will be:
- Output to the console with color-coding
- Written to log files in the `logs/` directory

### 3. GraphQL Playground

The GraphQL playground at http://localhost:4000/graphql (or your configured port) provides:

- Interactive query testing
- Schema exploration
- Documentation
- Execution results

### 4. Debugging Network Issues

To debug network connections:

1. Check the server is running with `npm run dev`
2. Verify MongoDB is running and accessible
3. Check for CORS issues if receiving errors from the client
4. Test queries directly in the GraphQL playground before testing from the client

### 5. Using Node.js Inspector

To attach an external debugger:

1. Start the server with `npm run debug`
2. Open Chrome and navigate to `chrome://inspect`
3. Click "Open dedicated DevTools for Node"
4. Set breakpoints and debug

## Environment Configuration

Make sure your `.env` file is properly configured:

```
PORT=4000
MONGODB_URI=mongodb://localhost:27017/bike-park-finder
JWT_SECRET=your_secret_key
```

## Common Debugging Tasks

### Debugging Resolvers

Add breakpoints or logging to resolvers to track request handling:

```javascript
bikePark: async (_, { id }, context) => {
  Logger.debug('BikePark query for id:', id);
  // ... rest of resolver
}
```

### Debugging Authentication

To debug auth issues:

1. Check the JWT token in requests
2. Add logging to the `createContext` function
3. Verify the token validation process

### Database Queries

To debug database operations:

1. Enable Mongoose debug mode in your `.env` file with `DEBUG=mongoose:*`
2. Add logging before and after database operations
3. Check that MongoDB is running and accessible

## Troubleshooting

### Server Won't Start

Check:
- Port conflicts
- MongoDB connection
- Environment variables

### Resolvers Not Working

Debug strategies:
- Add logging at the beginning and end of resolvers
- Check the received parameters
- Verify database queries
- Test directly in GraphQL playground

### Type Errors

For TypeScript errors:
- Check your type definitions
- Ensure models match your schema
- Verify inputs are properly typed 