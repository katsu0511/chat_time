'use client';

import Link from 'next/link';
import { signIn } from 'next-auth/react';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

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
          className="bg-white border-blue-500 border-2 px-2 py-1"
          value={userid}
          onChange={(e) => setUserid(e.target.value)}
          required
        />
      </div>
      <div className="flex justify-center items-center py-2">
        <label className="block w-20">Password: </label>
        <input
          type="password"
          className="bg-white border-blue-500 border-2 px-2 py-1"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
      <div className="py-2">
        {error && <p>{error}</p>}
        <input type="submit" value="Login" className="block bg-white text-blue-500 border-blue-500 border-2 rounded-md h-10 w-20 mx-auto my-0 duration-300 hover:bg-blue-500 hover:text-white cursor-pointer" />
      </div>
      <div className="flex justify-center mt-10">
        <Link href={'./signup'} className="inline-block text-blue-500 duration-300 hover:opacity-6 cursor-pointer">&gt;&gt; Signup</Link>
      </div>
    </form>
  );
}
