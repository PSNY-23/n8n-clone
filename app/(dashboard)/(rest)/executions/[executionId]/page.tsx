import { requireAuth } from "@/lib/auth-utils";

interface PageParams {
  params: Promise<{
    executionId: string;
  }>;
}

const Page = async ({ params }: PageParams) => {
  await requireAuth();
  const { executionId } = await params;
  return <div>ExecutionId: {executionId}</div>;
};

export default Page;
