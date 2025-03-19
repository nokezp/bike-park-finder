import { gql } from '@urql/core';

export const GET_BIKE_PARKS = gql`
  query GetBikeParks {
    bikeParks {
      id
      name
      description
      location
      features
      difficulty
      rating
      imageUrl
      address
      coordinates {
        latitude
        longitude
      }
      status
      createdAt
      updatedAt
    }
  }
`; 