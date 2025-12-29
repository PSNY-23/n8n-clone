import { useTRPC } from '@/trpc/client';
import { useMutation, useQueryClient, useSuspenseQuery } from '@tanstack/react-query';
import { toast } from 'sonner';

// Hook to fetch all workflow usign Suspense
export const useSuspenseWorkflows = () => {
  const trpc = useTRPC();
  return useSuspenseQuery(trpc.workflows.getMany.queryOptions());
};

// Hook to create a new workflow
export const useCreateWorkflow = () => {
  const trpc = useTRPC();
  const queryClient = useQueryClient();

  return useMutation(
    trpc.workflows.create.mutationOptions({
      onSuccess: data => {
        toast.success(`Workflow ${data.name} created`);
        queryClient.invalidateQueries(trpc.workflows.getMany.queryOptions());
        //we invalidate the old(all workflow data), because there is new workflow in the database which the local cache is unaware of.
      },
      onError: error => {
        toast.error(`Failed to create workflow: ${error.message}`);
      },
    })
  );
};
