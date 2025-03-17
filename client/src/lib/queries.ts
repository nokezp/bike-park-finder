import { gql } from '@urql/core';

export const GET_PARKS = gql`
  query GetParks {
    parks {
      _id
      name
      description
      location
      coordinates {
        latitude
        longitude
      }
      difficulty
      features
      amenities
      images
      website
      contactPhone
      contactEmail
      hours
      pricing
      hasLiftAccess
      hasTechnicalSections
      hasJumps
      hasDrops
      createdAt
      updatedAt
    }
  }
`; 