import React from 'react';
import { ThemeProvider } from './ThemeProvider';
import { TRPCReactProvider } from '@/trpc/react';
import { headers } from 'next/headers';
import { ClerkProvider } from '@clerk/nextjs';

export default function Providers({ children }: { children: React.ReactNode; }) {
  return (
    <ClerkProvider>
      <TRPCReactProvider headers={headers()}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </TRPCReactProvider>
    </ClerkProvider>
  );
}
