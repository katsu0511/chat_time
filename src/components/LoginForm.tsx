'use client';

import useAuth from '@/lib/useAuth';
import { handleLogin } from '@/lib/auth';
import Input from './Input';
import Button from './Button';
import PageLink from './PageLink';

export default function LoginForm() {
  const { userid, setUserid, password, setPassword, error, setError, router } = useAuth();

  const login = async (e: React.FormEvent) => {
    e.preventDefault();
    handleLogin(userid, password, router, setError);
  };

  return (
    <form className="w-full pt-60" onSubmit={login}>
      <Input label='User ID' type='text' value={userid} onChange={(e) => setUserid(e.target.value)} />
      <Input label='Password' type='password' value={password} onChange={(e) => setPassword(e.target.value)}/>
      <Button usage='Login' error={error} />
      <PageLink usage='signup' />
    </form>
  );
}
