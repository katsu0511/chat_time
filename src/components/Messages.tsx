'use client';

import type { Session, User } from 'next-auth';
import { useState, useEffect } from 'react';
import SendMessage from './SendMessage';

type Messages = {
  messageId: number
  senderId: number
  receiverId: number
  content: string
  createdAt: Date
};

export default function SearchUsers({session}: {session: Session}) {
  const [friends, setFriends] = useState<React.ReactNode[]>([]);
  const [messages, setMessages] = useState<React.ReactNode[]>([]);
  const [friendId, setFriendId] = useState<number>();

  useEffect(() => {
    const getFriends = async () => {
      const res = await fetch(`/api/getFriends?id=${session.user.id}`);
      if (!res.ok) setFriends([]);
      const json: User[] = await res.json();
      const friends = json.map(friend => (
        <li key={friend.id} className='w-full h-[96px]'>
          <button className='w-full h-full p-2 cursor-pointer duration-300 hover:bg-blue-300 hover:shadow-xl' onClick={() => getMessages(Number(friend.id))}>
            <p className='w-full h-1/2 text-2xl leading-[40px] text-left'>{friend.name}</p>
            <p className='w-full h-1/2 text-lg leading-[40px] text-left'>{friend.userId}</p>
          </button>
        </li>
      ));
      setFriends(friends);
    };

    const getMessages = async (friendId: number) => {
      setFriendId(friendId);
      const res = await fetch(`/api/getMessages?id=${session.user.id}&friendId=${friendId}`);
      if (!res.ok) setMessages([]);
      const json: Messages[] = await res.json();
      const contents = json.map(content => <div key={content.messageId}>{content.content} at {content.createdAt as unknown as string}</div>);
      setMessages(contents);
    };

    getFriends();
  }, [session.user.id]);

  return (
    <div className='flex w-full h-full border-blue-500 border-x-4'>
      <div className='w-3/10 h-full'>
        <ul>{friends}</ul>
      </div>
      <div className='w-7/10 h-full'>
        <div className='bg-blue-100 w-full h-19/20'>{messages}</div>
        <SendMessage senderId={session.user.id as unknown as number} receiverId={friendId} />
      </div>
    </div>
  );
}
