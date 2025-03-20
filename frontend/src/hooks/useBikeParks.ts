import { useQuery, useMutation } from 'urql';
import { gql } from '../gql/gql';

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
        createdBy {
          id
          username
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
      description
      location
      difficulty
      status
      features
      createdAt
      updatedAt
      createdBy {
        id
        username
      }
    }
  }
`);

const CreateBikeParkDocument = gql(`
  mutation CreateBikePark($input: CreateBikeParkInput!) {
    createBikePark(input: $input) {
      id
      name
      description
      location
      difficulty
      status
      features
      createdAt
      updatedAt
      createdBy {
        id
        username
      }
    }
  }
`);

const UpdateBikeParkDocument = gql(`
  mutation UpdateBikePark($id: ID!, $input: UpdateBikeParkInput!) {
    updateBikePark(id: $id, input: $input) {
      id
      name
      description
      location
      difficulty
      status
      features
      createdAt
      updatedAt
      createdBy {
        id
        username
      }
    }
  }
`);

const DeleteBikeParkDocument = gql(`
  mutation DeleteBikePark($id: ID!) {
    deleteBikePark(id: $id)
  }
`);

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

export function useBikePark(id: string) {
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

export function useCreateBikePark() {
  const [{ data, error, fetching }, createBikePark] = useMutation(CreateBikeParkDocument);

  return {
    createBikePark,
    data: data?.createBikePark,
    error,
    loading: fetching,
  };
}

export function useUpdateBikePark() {
  const [{ data, error, fetching }, updateBikePark] = useMutation(UpdateBikeParkDocument);

  return {
    updateBikePark,
    data: data?.updateBikePark,
    error,
    loading: fetching,
  };
}

export function useDeleteBikePark() {
  const [{ data, error, fetching }, deleteBikePark] = useMutation(DeleteBikeParkDocument);

  return {
    deleteBikePark,
    data: data?.deleteBikePark,
    error,
    loading: fetching,
  };
} 