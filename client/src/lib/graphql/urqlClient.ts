import { createClient, Operation, fetchExchange } from 'urql';
import { cacheExchange, UpdatesConfig } from '@urql/exchange-graphcache';
import { authExchange } from '@urql/exchange-auth';
import { CombinedError } from '@urql/core';
import { makeOperation } from '@urql/core';
import schema from './generated/urql-introspection';
import updateResolvers from './updateResolvers';

const API_URL = 'http://localhost:4000/graphql';

const isClient = typeof window !== 'undefined';

const getToken = () => {
  if (!isClient) {
    return null;
  };
  // eslint-disable-next-line no-undef
  const token = localStorage.getItem('token');
  return token;
};

export const setToken = (token: string) => {
  if (!isClient) {
    return null;

  };
  // eslint-disable-next-line no-undef
  localStorage.setItem('token', token);
};

export const removeToken = () => {
  if (!isClient) {
    return null;

  };
  // eslint-disable-next-line no-undef
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
      updates: updateResolvers as Partial<UpdatesConfig>,
      keys: {
        BikePark: (data) => data.id as string,
        SocialMedia: () => null,
        Price: () => null,
        OpeningHours: () => null,
        Contact: () => null,
        Coordinates: () => null,
        PaginatedBikeParks: () => null,
        Weather: () => null,
        Profile: () => null,
        Preferences: () => null,
        Stats: () => null,
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
