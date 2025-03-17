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
      hasLiftAccess
      hasTechnicalSections
      hasJumps
      hasDrops
      createdAt
      updatedAt
    }
  }
`; 