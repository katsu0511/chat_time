import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';
import { signIn } from 'next-auth/react';
import { createUser } from './actions';

export const handleLogin = async (
  userid: string,
  password: string,
  router: AppRouterInstance,
  setError: (error: string) => void
) => {
  const res = await signIn('credentials', {
    redirect: false,
    userid,
    password,
  });

  if (res?.ok) {
    router.push('/');
  } else {
    setError('Failed to login');
  }
};

export const handleSignup = async (
  name: string,
  userid: string,
  password: string,
  router: AppRouterInstance,
  setError: (error: string) => void
) => {
  const user = await createUser({name, userid, password});
  if (typeof user === 'string') {
    setError(user);
    return null;
  }
  handleLogin(userid, password, router, setError);
};
