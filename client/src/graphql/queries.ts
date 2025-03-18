export const GET_BIKE_PARKS = `
  query GetBikeParks {
    bikeParks {
      id
      name
      description
      location
      features
      difficultyLevels
      rating
    }
  }
`;

export const GET_BIKE_PARK = `
  query GetBikePark($id: ID!) {
    bikePark(id: $id) {
      id
      name
      description
      location {
        address
        city
        state
        country
        coordinates {
          lat
          lng
        }
      }
      features
      difficultyLevels
      openingHours
      contactInfo {
        phone
        email
        website
      }
      images
      rating
      reviews {
        id
        rating
        comment
        user {
          id
          name
        }
      }
      createdAt
      updatedAt
    }
  }
`;

export const GET_USER_PROFILE = `
  query GetUserProfile {
    me {
      id
      username
      email
      name
      role
      createdAt
      updatedAt
    }
  }
`; 