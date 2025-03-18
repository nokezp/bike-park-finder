import { gql } from '@apollo/client';

export const GET_BIKE_PARKS = gql`
  query GetBikeParks {
    bikeParks {
      id
      name
      description
      location
      features
      difficulty
    }
  }
`; 