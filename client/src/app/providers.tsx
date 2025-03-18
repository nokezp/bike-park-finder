'use client';

import { Provider } from 'urql';
import { client } from '@/lib/urql';
import { ThemeProvider } from 'next-themes';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider 
      attribute="class" 
      defaultTheme="system" 
      enableSystem
      disableTransitionOnChange
    >
      <Provider value={client}>
        {children}
      </Provider>
    </ThemeProvider>
  );
} 