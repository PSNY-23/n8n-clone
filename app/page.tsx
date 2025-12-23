'use client';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
// import { requireAuth } from '@/lib/auth-utils';
// import { caller } from '@/trpc/server';
import { LogoutButton } from './LogoutButton';
import { useTRPC } from '@/trpc/client';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

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

  const testAI = useMutation(trpc.testAI.mutationOptions({
    onSuccess: () => toast.success('AI job queued')
  }));
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center -mt-16">
      <p>Proteced server component</p>
      <p>{JSON.stringify(data)}</p>
      <Button disabled={create.isPending} onClick={() => create.mutate()}>
        Create workflow
      </Button>
      <LogoutButton />
      <div className="w-32 h-32 bg-blue-300 border p-4">
        <h1>Gemini ai test</h1>
        <div>{JSON.stringify(testAI.data)}</div>
        <Button disabled={testAI.isPending} onClick={() => testAI.mutate()}>
          Test AI
        </Button>
      </div>
    </div>
  );
};

export default Page;
