'use client';

import { signOut } from 'next-auth/react';

export default function LogoutButton() {
  return <button onClick={() => signOut({ callbackUrl: '/login' })} className="bg-white text-blue-500 border-blue-500 border-2 rounded-md h-10 w-20 mx-auto my-0 duration-300 hover:bg-blue-500 hover:text-white cursor-pointer">Logout</button>;
}
