'use client';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
// import { requireAuth } from '@/lib/auth-utils';
// import { caller } from '@/trpc/server';
import { LogoutButton } from './LogoutButton';
import { useTRPC } from '@/trpc/client';
import { Button } from '@/components/ui/button';

const Page = () => {
  // await requireAuth();
  // const data = await caller.getUsers();
  const trpc = useTRPC();
  const queryClient = useQueryClient();
  const { data } = useQuery(trpc.getWorkflows.queryOptions());
  const create = useMutation(
    trpc.createWorkflow.mutationOptions({
      onSuccess: () => {
        queryClient.invalidateQueries(trpc.getWorkflows.queryOptions());
      },
    })
  );
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center -mt-16">
      <p>Proteced server component</p>
      <p>{JSON.stringify(data)}</p>
      <Button disabled={create.isPending} onClick={() => create.mutate()}>
        Create workflow
      </Button>
      <LogoutButton />
    </div>
  );
};

export default Page;
