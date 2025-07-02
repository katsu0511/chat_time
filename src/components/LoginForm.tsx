'use client';

import { signIn } from 'next-auth/react';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Button from './Button';
import PageLink from './PageLink';

export default function LoginForm() {
  const [userid, setUserid] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

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
      <div className="flex justify-center items-center py-2">
        <label className="block w-20">User ID: </label>
        <input
          type="text"
          className="bg-white border-blue-500 border-2 px-2 py-1 outline-none appearance-none"
          value={userid}
          onChange={(e) => setUserid(e.target.value)}
          required
        />
      </div>
      <div className="flex justify-center items-center py-2">
        <label className="block w-20">Password: </label>
        <input
          type="password"
          className="bg-white border-blue-500 border-2 px-2 py-1 outline-none appearance-none"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
      <Button usage='Login' error={error} />
      <PageLink usage='signup' />
    </form>
  );
}
