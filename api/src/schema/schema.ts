import { gql } from 'apollo-server-express';

export const typeDefs = gql`
  type Coordinates {
    latitude: Float!
    longitude: Float!
  }

  type Park {
    _id: ID!
    name: String!
    description: String!
    location: String!
    coordinates: Coordinates!
    difficulty: String!
    features: [String!]!
    amenities: [String!]!
    hasLiftAccess: Boolean!
    hasTechnicalSections: Boolean!
    hasJumps: Boolean!
    hasDrops: Boolean!
    images: [String!]!
    createdBy: ID!
    createdAt: String!
    updatedAt: String!
  }

  type Query {
    parks: [Park!]!
    park(id: ID!): Park
    searchParks(query: String!): [Park!]!
  }

  type Mutation {
    createPark(input: CreateParkInput!): Park!
    updatePark(id: ID!, input: UpdateParkInput!): Park!
    deletePark(id: ID!): Boolean!
  }

  input CoordinatesInput {
    latitude: Float!
    longitude: Float!
  }

  input CreateParkInput {
    name: String!
    description: String!
    location: String!
    coordinates: CoordinatesInput!
    difficulty: String!
    features: [String!]!
    amenities: [String!]!
    hasLiftAccess: Boolean!
    hasTechnicalSections: Boolean!
    hasJumps: Boolean!
    hasDrops: Boolean!
    images: [String!]!
  }

  input UpdateParkInput {
    name: String
    description: String
    location: String
    coordinates: CoordinatesInput
    difficulty: String
    features: [String!]
    amenities: [String!]
    hasLiftAccess: Boolean
    hasTechnicalSections: Boolean
    hasJumps: Boolean
    hasDrops: Boolean
    images: [String!]
  }
`; 