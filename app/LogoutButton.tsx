'use client';

import { Button } from '@/components/ui/button';
import { authClient } from '@/lib/auth-client';
import { useRouter } from 'next/navigation';

export const LogoutButton = () => {
  const router = useRouter();
  const handleClick = async () => {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          router.push('/login'); // redirect to login page
        },
      },
    });
  };
  return (
    <Button onClick={handleClick}>Logout</Button>
  )
};
