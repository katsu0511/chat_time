'use client';

import type { Session, User } from 'next-auth';
import { useState, useEffect } from 'react';
import SendMessage from './SendMessage';

export default function SearchUsers({session}: {session: Session}) {
  const [friends, setFriends] = useState<React.ReactNode[]>([]);

  useEffect(() => {
    const getFriends = async () => {
      const res = await fetch(`/api/getFriends?id=${session.user.id}`);
      if (!res.ok) setFriends([]);
      const json: User[] = await res.json();
      const friends = json.map(friend => (
        <li key={friend.id} className='w-full h-[96px]'>
          <button className='w-full h-full p-2 cursor-pointer duration-300 hover:bg-blue-300 hover:shadow-xl'>
            <p className='w-full h-1/2 text-2xl leading-[40px] text-left'>{friend.name}</p>
            <p className='w-full h-1/2 text-lg leading-[40px] text-left'>{friend.userId}</p>
          </button>
        </li>
      ));
      setFriends(friends);
    };

    getFriends();
  }, [session.user.id]);

  return (
    <div className='flex w-full h-full border-blue-500 border-x-4'>
      <div className='w-3/10 h-full'>
        <ul>{friends}</ul>
      </div>
      <div className='w-7/10 h-full'>
        <div className='bg-blue-100 w-full h-19/20'></div>
        <SendMessage />
      </div>
    </div>
  );
}
