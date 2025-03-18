export const LOGIN = `
  mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        id
        username
        email
        name
        role
      }
    }
  }
`;

export const REGISTER = `
  mutation Register($username: String!, $email: String!, $password: String!, $name: String) {
    register(username: $username, email: $email, password: $password, name: $name) {
      token
      user {
        id
        username
        email
        name
        role
      }
    }
  }
`;

export const CREATE_BIKE_PARK = `
  mutation CreateBikePark($input: CreateBikeParkInput!) {
    createBikePark(input: $input) {
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

export const UPDATE_BIKE_PARK = `
  mutation UpdateBikePark($id: ID!, $input: UpdateBikeParkInput!) {
    updateBikePark(id: $id, input: $input) {
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

export const DELETE_BIKE_PARK = `
  mutation DeleteBikePark($id: ID!) {
    deleteBikePark(id: $id)
  }
`;

export const ADD_REVIEW = `
  mutation AddReview($bikeParkId: ID!, $rating: Float!, $comment: String!) {
    addReview(bikeParkId: $bikeParkId, rating: $rating, comment: $comment) {
      id
      rating
      comment
      user {
        id
        name
      }
      createdAt
    }
  }
`; 