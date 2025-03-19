import { buildSchema } from 'graphql';

export const schema = buildSchema(`
  type Weather {
    temperature: String!
    icon: String!
  }

  type Contact {
    phone: String!
    email: String!
    website: String!
  }

  type Coordinates {
    lat: Float!
    lng: Float!
  }

  type User {
    id: ID!
    name: String!
    avatar: String
  }

  type Review {
    id: ID!
    rating: Float!
    comment: String!
    user: User!
  }

  type BikePark {
    id: ID!
    name: String!
    location: String!
    image: String
    rating: Float!
    tags: [String!]!
    weather: Weather
    description: String!
    difficulty: String!
    features: [String!]!
    openingHours: String!
    contact: Contact!
    coordinates: Coordinates!
    reviews: [Review!]!
  }

  type Query {
    getBikeParks: [BikePark!]!
    bikePark(id: ID!): BikePark
    me: User
  }
`); 