//This is not from documentation
//but a trick to make pages protected in both client and server components

import { headers } from 'next/headers';
import { redirect } from 'next/navigation';
import { auth } from './auth';

export const requireAuth = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect('/login');
  }

  return session;
};

export const requireUnauth = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (session) {
    redirect('/');
  }
};
