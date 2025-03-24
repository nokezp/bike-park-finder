import { gql } from 'urql';

export const GetEventsDocument = gql(`
  query GetEvents($filter: EventFilter) {
    events(filter: $filter) {
      id
      attendeeCount
      capacity
      category
      date
      description
      featured
      imageUrl
      location
      organizer {
        name
        description
        imageUrl
      }
      price
      title
    }
  }
`);

export const GetEventDocument = gql(`
  query GetEvent($id: ID!) {
    event(id: $id) {
      id
      attendeeCount
      capacity
      category
      date
      description
      featured
      imageUrl
      location
      organizer {
        name
        description
        imageUrl
      }
      price
      title
    }
  }
`);
