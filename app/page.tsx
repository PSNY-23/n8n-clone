
import { requireAuth } from '@/lib/auth-utils';
import { caller } from '@/trpc/server';
import { LogoutButton } from './LogoutButton';

const Page = async () => {
  await requireAuth();
  const data = await caller.getUsers();
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center -mt-16">
      <p>Proteced server component</p>
      <p>{JSON.stringify(data)}</p>
      <LogoutButton/>
    </div>
  );
};

export default Page;
