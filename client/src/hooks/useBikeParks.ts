import { gql } from 'urql';

export const GetBikeParksDocument = gql(`
  query GetBikeParks($filter: BikeParkFilter, $pagination: PaginationInput!) {
    bikeParks(filter: $filter, pagination: $pagination) {
      bikeParks {
        id
        name
        description
        location
        difficulty
        status
        features
        createdAt
        updatedAt
        createdBy
        coordinates {
          latitude
          longitude
        }
      }
      totalCount
      currentPage
      totalPages
      hasNextPage
    }
  }
`);

export const GetBikeParkDocument = gql(`
  query GetBikePark($id: ID!) {
    bikePark(id: $id) {
      id
      name
      contact {
        email
        phone
      }
      coordinates {
        latitude
        longitude
      }
      description
      difficulty
      facilities
      features
      imageUrl
      location
      openingHours {
        friday
        monday
        saturday
        sunday
        thursday
        tuesday
        wednesday
      }
      photos
      price {
        amount
        currency
      }
      rating
      rules
      status
      videos
      website
      socialMedia {
        facebook
        instagram
        twitter
        youtube
      }
      weather {
        current
        forecast
      }
    }
  }
`);

export const GetBikeParksByViewportDocument = gql(`
  query GetBikeParksByViewport($viewport: ViewportInput!, $searchQuery: String) {
    bikeParksByViewport(viewport: $viewport, searchQuery: $searchQuery) {
      id
      name
      description
      location
      difficulty
      status
      features
      createdAt
      updatedAt
      createdBy
      coordinates {
        latitude
        longitude
      }
    }
  }
`);
