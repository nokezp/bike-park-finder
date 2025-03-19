import { gql } from 'urql';

export const GetBikeParks = gql`
  query GetBikeParks {
    bikeParks {
      id
      location
      name
      updatedAt
    }
  }
`;

export const GetBikePark = gql`
  query GetBikePark($id: ID!) {
    bikePark(id: $id) {
      id
      name
      updatedAt
    }
  }
`;

export const GetUserProfile = gql`
  query GetUserProfile {
    me {
      createdAt
      email
      id
      name
      role
      updatedAt
      username
    }
  }
`; 