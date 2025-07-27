'use client';

import { useState } from 'react';
import type { Session, User } from 'next-auth';
import { Input } from '@mui/material';
import { blue } from '@mui/material/colors';
import UserList from './UserList';

export default function SearchUsers(props: {session: Session, friendIds: number[]}) {
  const [users, setUsers] = useState<User[]>([]);

  const searchUsers = async (name: string) => {
    name = name.trim();
    if (!name) {
      setUsers([]);
      return;
    }

    const res = await fetch(`/api/getUsersByName?name=${name}`);
    if (!res.ok)
      setUsers([]);
    else {
      const users: User[] = await res.json();
      setUsers(users);
    }
  };

  return (
    <div className='w-full h-full py-20'>
      <Input
        disableUnderline
        sx={{
          display: 'block',
          width: '100%',
          maxWidth: '400px',
          height: '50px',
          padding: '0 20px',
          margin: '0 auto'
        }}
        inputProps={{
          sx: {
            display: 'block',
            border: '2px solid',
            borderColor: blue[500],
            boxSizing: 'border-box',
            width: '100%',
            height: '100%',
            p: 1,
            appearance: 'none'
          }
        }}
        onChange={(e) => searchUsers(e.target.value)}
      />
      <ul className='block text-center py-10'>
        {users.map(user => (
            <UserList key={user.id} user={user} session={props.session} friendIds={props.friendIds} />
        ))}
      </ul>
    </div>
  );
}
