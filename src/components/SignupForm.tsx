'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createUser } from '@/lib/actions';
import { signIn } from 'next-auth/react';
import Input from './Input';
import Button from './Button';
import PageLink from './PageLink';

export default function SignupForm() {
  const [name, setName] = useState('');
  const [userid, setUserid] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const Signup = async(e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const user = await createUser({name, userid, password});
    if (typeof user === 'string') {
      setError(user);
      return null;
    }

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
    <form className="w-[1200px] h-screen mx-auto my-0 py-30" onSubmit={Signup}>
      <Input label='User ID' type='text' value={userid} onChange={(e) => setUserid(e.target.value)} />
      <Input label='Name' type='text' value={name} onChange={(e) => setName(e.target.value)}/>
      <Input label='Password' type='password' value={password} onChange={(e) => setPassword(e.target.value)}/>
      <Button usage='Signup' error={error} />
      <PageLink usage='login' />
    </form>
  );
}
