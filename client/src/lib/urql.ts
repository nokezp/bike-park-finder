import { createClient, cacheExchange, fetchExchange } from '@urql/core';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

export const client = createClient({
  url: `${API_URL}/graphql`,
  exchanges: [cacheExchange, fetchExchange],
  fetchOptions: () => {
    let token = '';
    if (typeof window !== 'undefined') {
      token = localStorage.getItem('token') || '';
    }
    return {
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        ...(token ? { 'Authorization': `Bearer ${token}` } : {}),
      },
    };
  },
}); 