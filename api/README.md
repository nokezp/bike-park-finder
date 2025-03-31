# Bike Park Finder API

A GraphQL API for the Bike Park Finder application built with GraphQL Yoga and MongoDB.

## Features

- GraphQL API with Yoga
- MongoDB database with Mongoose ODM
- JWT authentication
- TypeScript for type safety

## Getting Started

### Prerequisites

- Node.js (v16+) 
- MongoDB (local instance or MongoDB Atlas)

### Installation

1. Clone the repository
2. Install dependencies:

```bash
npm install
```

3. Set up environment variables:
   - Create a `.env` file in the root directory
   - Add the following variables:

```
PORT=4000
MONGODB_URI=mongodb://localhost:27017/bike-park-finder-mac
JWT_SECRET=your-secret-key-change-in-production
NODE_ENV=development
```

### Development

Start the development server:

```bash
npm run dev
```

### Production

Build the project:

```bash
npm run build
```

Start the production server:

```bash
npm start
```

## API Documentation

Once the server is running, you can access the GraphQL playground at:

```
http://localhost:4000/graphql
```

### Main Queries

- `me`: Get the current authenticated user
- `bikeParks`: Get all bike parks
- `bikePark(id: ID!)`: Get a specific bike park
- `searchBikeParks(query: String!)`: Search bike parks by text

### Main Mutations

- `register(username: String!, email: String!, password: String!, name: String)`: Register a new user
- `login(email: String!, password: String!)`: Login and get authentication token
- `createBikePark(input: BikeParkInput!)`: Create a new bike park
- `updateBikePark(id: ID!, input: UpdateBikeParkInput!)`: Update a bike park
- `deleteBikePark(id: ID!)`: Delete a bike park

## Authentication

To authenticate requests, include the JWT token in the Authorization header:

```
Authorization: Bearer <your-token>
```

## License

This project is licensed under the ISC License. 