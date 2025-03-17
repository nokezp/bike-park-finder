import { createClient, cacheExchange, fetchExchange } from '@urql/core';

export const client = createClient({
  url: 'http://localhost:3001/graphql',
  exchanges: [cacheExchange, fetchExchange],
}); 