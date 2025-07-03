'use client';

import useAuth from '@/lib/useAuth';
import { signIn } from 'next-auth/react';
import Input from './Input';
import Button from './Button';
import PageLink from './PageLink';

export default function LoginForm() {
  const { userid, setUserid, password, setPassword, error, setError, router } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

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

  return (
    <form className="w-[1200px] h-screen mx-auto my-0 py-30" onSubmit={handleSubmit}>
      <Input label='User ID' type='text' value={userid} onChange={(e) => setUserid(e.target.value)} />
      <Input label='Password' type='password' value={password} onChange={(e) => setPassword(e.target.value)}/>
      <Button usage='Login' error={error} />
      <PageLink usage='signup' />
    </form>
  );
}
