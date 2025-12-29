import React from 'react';
import { TRPCReactProvider } from '@/trpc/client';
import { NuqsAdapter } from 'nuqs/adapters/next';

export const Provider = ({ children }: { children: React.ReactNode }) => {
  return (
    <TRPCReactProvider>
      <NuqsAdapter>{children}</NuqsAdapter>
    </TRPCReactProvider>
  );
};
