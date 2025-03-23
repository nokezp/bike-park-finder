import { createClient, fetchExchange } from 'urql';
import { cacheExchange } from '@urql/exchange-graphcache';

const API_URL = 'http://localhost:4000/graphql';

export const client = createClient({
  url: API_URL,
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
    }),
    fetchExchange,
  ],
  fetchOptions: () => {
    let token = '';
    if (typeof window !== 'undefined') {
      // token = localStorage.getItem('token') || '';
    }
    return {
      headers: {
        Authorization: token ? `Bearer ${token}` : '',
      },
    };
  },
}); 