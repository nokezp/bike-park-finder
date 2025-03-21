import { gql, useQuery } from "urql";

const GetBikeParksDocument = gql(`
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

const GetBikeParkDocument = gql(`
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

// const CreateBikeParkDocument = gql(`
//   mutation CreateBikePark($input: CreateBikeParkInput!) {
//     createBikePark(input: $input) {
//       id
//       name
//       description
//       location
//       difficulty
//       status
//       features
//       createdAt
//       updatedAt
//       createdBy
//     }
//   }
// `);

// const UpdateBikeParkDocument = gql(`
//   mutation UpdateBikePark($id: ID!, $input: UpdateBikeParkInput!) {
//     updateBikePark(id: $id, input: $input) {
//       id
//       name
//       description
//       location
//       difficulty
//       status
//       features
//       createdAt
//       updatedAt
//       createdBy
//     }
//   }
// `);

// const DeleteBikeParkDocument = gql(`
//   mutation DeleteBikePark($id: ID!) {
//     deleteBikePark(id: $id)
//   }
// `);

export function useBikeParks(filter?: any, pagination = { page: 1, limit: 10 }) {
  const [{ data, error, fetching }, reexecuteQuery] = useQuery({
    query: GetBikeParksDocument,
    variables: { filter, pagination },
  });

  return {
    bikeParks: data?.bikeParks.bikeParks || [],
    totalCount: data?.bikeParks.totalCount || 0,
    currentPage: data?.bikeParks.currentPage || 1,
    totalPages: data?.bikeParks.totalPages || 1,
    hasNextPage: data?.bikeParks.hasNextPage || false,
    error,
    loading: fetching,
    refetch: reexecuteQuery,
  };
}

export function useBikePark(id: string | undefined) {
  const [{ data, error, fetching }, reexecuteQuery] = useQuery({
    query: GetBikeParkDocument,
    variables: { id },
    pause: !id,
  });

  return {
    bikePark: data?.bikePark,
    error,
    loading: fetching,
    refetch: reexecuteQuery,
  };
}

// export function useCreateBikePark() {
// //   const [{ data, error, fetching }, createBikePark] = useMutation(CreateBikeParkDocument);

// //   return {
// //     createBikePark,
// //     data: data?.createBikePark,
// //     error,
// //     loading: fetching,
// //   };
// // }

// // export function useUpdateBikePark() {
// //   const [{ data, error, fetching }, updateBikePark] = useMutation(UpdateBikeParkDocument);

// //   return {
// //     updateBikePark,
// //     data: data?.updateBikePark,
// //     error,
// //     loading: fetching,
// //   };
// // }

// // export function useDeleteBikePark() {
// //   const [{ data, error, fetching }, deleteBikePark] = useMutation(DeleteBikeParkDocument);

// //   return {
// //     deleteBikePark,
// //     data: data?.deleteBikePark,
// //     error,
// //     loading: fetching,
// //   };
// // } 