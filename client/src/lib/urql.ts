import { createClient, fetchExchange } from 'urql';
import { cacheExchange } from '@urql/exchange-graphcache';
import { Data } from '@urql/exchange-graphcache';

const API_URL = 'http://localhost:4000/graphql';

export const client = createClient({
  url: API_URL,
  exchanges: [
    cacheExchange({
      keys: {
        BikePark: (data: Data) => data.id as string,
        Review: (data: Data) => data.id as string,
        User: (data: Data) => data.id as string,
      },
    }),
    fetchExchange,
  ],
  fetchOptions: () => {
    let token = '';
    if (typeof window !== 'undefined') {
      token = localStorage.getItem('token') || '';
    }
    return {
      headers: {
        Authorization: token ? `Bearer ${token}` : '',
      },
    };
  },
}); 