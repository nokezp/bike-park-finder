export const typeDefs = `
  type User {
    id: ID!
    username: String!
    email: String!
    name: String
    role: String!
    createdAt: String!
    updatedAt: String!
  }

  type Coordinates {
    latitude: Float
    longitude: Float
  }

  type BikePark {
    id: ID!
    name: String!
    description: String
    location: String!
    coordinates: Coordinates
    difficulty: String
    features: [String]
    amenities: [String]
    hasLiftAccess: Boolean
    hasTechnicalSections: Boolean
    hasJumps: Boolean
    hasDrops: Boolean
    createdBy: ID!
    createdAt: String!
    updatedAt: String!
  }

  type AuthPayload {
    token: String!
    user: User!
  }

  type Query {
    me: User
    bikeParks: [BikePark!]!
    bikePark(id: ID!): BikePark
    searchBikeParks(query: String!): [BikePark!]!
  }

  input CoordinatesInput {
    latitude: Float!
    longitude: Float!
  }

  input BikeParkInput {
    name: String!
    description: String
    location: String!
    coordinates: CoordinatesInput
    difficulty: String
    features: [String]
    amenities: [String]
    hasLiftAccess: Boolean
    hasTechnicalSections: Boolean
    hasJumps: Boolean
    hasDrops: Boolean
  }

  input UpdateBikeParkInput {
    name: String
    description: String
    location: String
    coordinates: CoordinatesInput
    difficulty: String
    features: [String]
    amenities: [String]
    hasLiftAccess: Boolean
    hasTechnicalSections: Boolean
    hasJumps: Boolean
    hasDrops: Boolean
  }

  type Mutation {
    register(username: String!, email: String!, password: String!, name: String): AuthPayload!
    login(email: String!, password: String!): AuthPayload!
    updateProfile(name: String, email: String): User!
    
    createBikePark(input: BikeParkInput!): BikePark!
    updateBikePark(id: ID!, input: UpdateBikeParkInput!): BikePark!
    deleteBikePark(id: ID!): Boolean!
  }
`; 