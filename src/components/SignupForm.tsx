'use client';

import useAuth from '@/lib/useAuth';
import { handleSignup } from '@/lib/auth';
import Input from './Input';
import Button from './Button';
import PageLink from './PageLink';

export default function SignupForm() {
  const { name, setName, userid, setUserid, password, setPassword, error, setError, router } = useAuth();

  const signup = async(e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleSignup(name, userid, password, router, setError);
  };

  return (
    <form className="w-[1200px] h-screen mx-auto my-0 py-30" onSubmit={signup}>
      <Input label='Name' type='text' value={name} onChange={(e) => setName(e.target.value)}/>
      <Input label='User ID' type='text' value={userid} onChange={(e) => setUserid(e.target.value)} />
      <Input label='Password' type='password' value={password} onChange={(e) => setPassword(e.target.value)}/>
      <Button usage='Signup' error={error} />
      <PageLink usage='login' />
    </form>
  );
}
