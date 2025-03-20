import { Provider } from 'urql';
import { client } from '../lib/urql';

interface UrqlProviderProps {
  children: React.ReactNode;
}

export function UrqlProvider({ children }: UrqlProviderProps) {
  return <Provider value={client}>{children}</Provider>;
} 