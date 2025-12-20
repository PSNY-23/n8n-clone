import { getQueryClient, trpc } from '@/trpc/server';
import { Client } from './client';
import { dehydrate, HydrationBoundary } from '@tanstack/react-query';
import { Suspense } from 'react';
export default function Home() {
  const queryClient = getQueryClient();
  void queryClient.prefetchQuery(trpc.getUsers.queryOptions());

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center -mt-16">
      <HydrationBoundary state={dehydrate(queryClient)}>
        <Suspense fallback={<p>Loading....</p>}>
          <Client />
        </Suspense>
      </HydrationBoundary>
    </div>
  );
}
