'use client';

import { RecoilRoot } from 'recoil';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const Provider = ({ children }: { children: React.ReactNode }) => {
  const queryClient = new QueryClient();

  return (
    <RecoilRoot>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
    </RecoilRoot>
  );
};

export default Provider;
