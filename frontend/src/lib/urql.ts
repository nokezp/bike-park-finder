import { createClient, dedupExchange, cacheExchange, fetchExchange } from 'urql';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/graphql';

export const client = createClient({
  url: API_URL,
  exchanges: [dedupExchange, cacheExchange, fetchExchange],
  fetchOptions: {
    credentials: 'include',
  },
}); 