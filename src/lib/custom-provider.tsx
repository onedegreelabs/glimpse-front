'use client';

import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import {useState} from 'react';
import {SessionProvider} from 'next-auth/react';
import {Session} from 'next-auth';

type CustomProviderType = React.PropsWithChildren<{
  session?: Session | null;
}>;

export function CustomProvider({children, session}: CustomProviderType) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <SessionProvider session={session}>{children}</SessionProvider>
    </QueryClientProvider>
  );
}
