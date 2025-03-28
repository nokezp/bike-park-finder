import { createClient, fetchExchange, Operation } from 'urql';
import { cacheExchange } from '@urql/exchange-graphcache';
import { authExchange } from '@urql/exchange-auth';
import { CombinedError } from '@urql/core';
import { makeOperation } from '@urql/core';
import schema from '../lib/graphql/generated/urql-introspection';
import { create } from 'lodash';
import { GetReviewsDocument } from './graphql/generated/graphql-operations';

const API_URL = 'http://localhost:4000/graphql';

const isClient = typeof window !== 'undefined';

const getToken = () => {
  if (!isClient) return null;
  const token = localStorage.getItem('token');
  return token;
};

const setToken = (token: string) => {
  if (!isClient) return;
  localStorage.setItem('token', token);
};

const removeToken = () => {
  if (!isClient) return;
  localStorage.removeItem('token');
};

const addAuthToOperation = (operation: Operation) => {
  const token = getToken();
  if (!token) return operation;

  // Create new headers combining existing ones with auth
  const fetchOptions =
    typeof operation.context.fetchOptions === 'function' ? operation.context.fetchOptions() : operation.context.fetchOptions || {};

  const headers = {
    ...fetchOptions.headers,
    Authorization: `Bearer ${token}`,
  };

  return makeOperation(operation.kind, operation, {
    ...operation.context,
    fetchOptions: {
      ...fetchOptions,
      headers,
    },
  });
};

const defaultHeaders = {
  'Content-Type': 'application/json',
  Accept: 'application/json',
};

const urqlClient = createClient({
  url: API_URL,
  requestPolicy: 'cache-and-network',
  fetchOptions: () => {
    const token = getToken();
    const headers = {
      ...defaultHeaders,
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    };
    return {
      headers,
      credentials: 'include',
      suspense: false,
    };
  },
  exchanges: [
    cacheExchange({
      schema,
      // updates: updateResolvers as Partial<UpdatesConfig>,
      keys: {
        BikePark: (data) => data.id as string,
        SocialMedia: () => null,
        Price: () => null,
        OpeningHours: () => null,
        Contact: () => null,
        Coordinates: () => null,
        PaginatedBikeParks: () => null,
        Weather: () => null,
        WeatherCurrent: () => null,
      },
      fetchExchange,
      updates: {
        Mutation: {
          login: (result: { login?: { token: string } }, _args, cache) => {
            if (result.login?.token) {
              setToken(result.login.token);
              cache.invalidate('Query', 'me');
            }
          },
          logout: (_result, _args, cache) => {
            removeToken();
            cache.invalidate('Query', 'me');
          },
          createReview: (_result, _args, cache) => {
            cache.updateQuery({ query: GetReviewsDocument, variables: { bikeParkId: _args.bikeParkId, page: 1, limit: 5 } }, (data) => {
              if (!data?.reviews?.reviews) {
                return null;
              }

              const newReview = create({ ..._args, id: 'temp-id' });
              data.reviews.reviews.unshift(newReview);
              return data;
            }
            );
          }
        },
      },
    }),
    authExchange(async () => ({
      addAuthToOperation,
      didAuthError: (error: CombinedError) => {
        return error.graphQLErrors.some((e) => e.message.includes('Not authenticated'));
      },
      refreshAuth: async () => {
        removeToken();
      },
    })),
    fetchExchange,
  ],
});

export default urqlClient;
