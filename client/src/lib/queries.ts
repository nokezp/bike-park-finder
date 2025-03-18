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
      hasLiftAccess
      hasTechnicalSections
      hasJumps
      hasDrops
      images
      createdAt
      updatedAt
    }
  }
`; 