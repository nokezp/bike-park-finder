import { Provider } from 'urql';
import { ReactNode } from 'react';
import urqlClient from '../lib/urqlClient';

interface UrqlProviderProps {
  children: ReactNode;
}

export function UrqlProvider({ children }: UrqlProviderProps) {
  return <Provider value={urqlClient}>{children}</Provider>;
}
