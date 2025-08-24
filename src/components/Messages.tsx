'use client';

import type { Session, User } from 'next-auth';
import { useState, useCallback, useEffect, useRef } from 'react';
import MessageContent from './MessageContent';
import SendMessage from './SendMessage';

export default function Messages({session}: {session: Session}) {
  const [friends, setFriends] = useState<React.ReactNode[]>([]);
  const [messages, setMessages] = useState<Message[]>([]);
  const [friendId, setFriendId] = useState<number>();
  const [socket, setSocket] = useState<WebSocket | null>(null);
  const messageContainerRef = useRef<HTMLDivElement>(null);

  const getMessages = useCallback(async (friendId: number) => {
    setFriendId(friendId);
    const res = await fetch(`/api/getMessages?id=${session.user.id}&friendId=${friendId}`);
    if (!res.ok) setMessages([]);
    const contents: Message[] = await res.json();
    setMessages(contents);
  }, [session.user.id]);

  useEffect(() => {
    const getFriends = async () => {
      const res = await fetch(`/api/getFriends?id=${session.user.id}`);
      if (!res.ok) {
        setMessages([]);
        return;
      }
      const json: User[] = await res.json();
      const friends = json.map(friend => (
        <li key={friend.id} className='w-full h-[96px]'>
          <button className={`w-full h-full p-2 cursor-pointer duration-300 ${friendId === Number(friend.id) && 'bg-[color:var(--color-secondary)] shadow-xl'} hover:bg-[color:var(--color-secondary)] hover:shadow-xl`} onClick={() => getMessages(Number(friend.id))}>
            <p className='w-full h-1/2 text-2xl leading-[40px] text-left'>{friend.name}</p>
            <p className='w-full h-1/2 text-lg leading-[40px] text-left'>{friend.userId}</p>
          </button>
        </li>
      ));
      setFriends(friends);
    };

    getFriends();
  }, [session.user.id, friendId, getMessages]);

  useEffect(() => {
    if (!friendId) return;
    getMessages(friendId);

    const ws = new WebSocket(process.env.NEXT_PUBLIC_URL as string);
    ws.onopen = () => {
      console.log('WebSocket connected');
      ws.send(JSON.stringify({ type: 'subscribe', userId: session.user.id, friendId }));
    };

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.type === 'message') setMessages(prev => [...prev, data.message]);
    };
    setSocket(ws);

    return () => ws.close();
  }, [friendId, session.user.id, getMessages]);

  useEffect(() => {
    messageContainerRef.current?.scrollTo({
      top: messageContainerRef.current.scrollHeight,
      behavior: 'auto'
    });
  }, [messages]);

  return (
    <div className='flex w-full h-full md:border-[color:var(--color-primary)] md:border-x-4'>
      <div className='w-[30%] h-full'>
        <ul>{friends}</ul>
      </div>
      <div className='w-[70%] h-full'>
        <div ref={messageContainerRef} className='bg-[color:var(--light-secondary)] w-full h-[calc(100%-40px)] overflow-y-auto'>
          {messages.map(message => (
            <MessageContent key={message.messageId} id={Number(session.user.id)} message={message} />
          ))}
        </div>
        {
          friendId === undefined
          ? <div className='bg-[color:var(--light-secondary)] w-full h-10'></div>
          : <SendMessage senderId={Number(session.user.id)} receiverId={friendId} socket={socket} />
        }
      </div>
    </div>
  );
}
