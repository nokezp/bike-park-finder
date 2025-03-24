import { createClient, fetchExchange, Operation } from 'urql';
import { cacheExchange } from '@urql/exchange-graphcache';
import { authExchange } from '@urql/exchange-auth';
import { CombinedError } from '@urql/core';
import { makeOperation } from '@urql/core';

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

export const client = createClient({
  url: API_URL,
  fetchOptions: () => {
    const token = getToken();
    const headers = {
      ...defaultHeaders,
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    };
    return {
      headers,
      credentials: 'include',
    };
  },
  exchanges: [
    cacheExchange({
      keys: {
        BikePark: (data) => data.id as string,
        SocialMedia: (data) => data.facebook as string,
        Contact: (data) => data.email as string,
        Coordinates: (data) => data.latitude as string,
        OpeningHours: (data) => data.friday as string,
        Price: (data) => data.id as string,
      },
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
