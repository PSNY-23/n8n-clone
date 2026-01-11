import {
  WorkflowsContainer,
  WorkflowsError,
  WorkflowsLoading,
  WrokflowsList,
} from '@/features/workflows/components/workflows';
import { workflowsParamsLoader } from '@/features/workflows/server/params-loader';
import { prefetchWorkflows } from '@/features/workflows/server/prefetch';
import { requireAuth } from '@/lib/auth-utils';
import { HydrateClient } from '@/trpc/server';
import type { SearchParams } from 'nuqs/server';
import { Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';

type Props = {
  searchParams: Promise<SearchParams>;
};

const Page = async ({ searchParams }: Props) => {
  await requireAuth();

  //Don't use the below line of code as validator
  const params = await workflowsParamsLoader(searchParams);
  
  // Skip prefetching - let client-side handle it with proper auth
  // prefetchWorkflows(params);
  //TODO: fix this prefethign error

  return (
    <WorkflowsContainer>
      <HydrateClient>
        <ErrorBoundary fallback={<WorkflowsError />}>
          <Suspense fallback={<WorkflowsLoading />}>
            <WrokflowsList />
          </Suspense>
        </ErrorBoundary>
      </HydrateClient>
    </WorkflowsContainer>
  );
};

export default Page;
