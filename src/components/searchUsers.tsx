'use client';

import { useState } from 'react';
import type { Session, User } from 'next-auth';
import { Button, Input } from '@mui/material';
import { blue } from '@mui/material/colors';

export default function SearchUsers(props: {session: Session, friendIds: number[]}) {
  const [users, setUsers] = useState<React.ReactNode[]>([]);

  const addFriend = async (id: number, friendId: number) => {
    const res = await fetch('/api/addFriend', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id, friendId }),
    });

    if (!res.ok) return null;
    const json: number = await res.json();
    if (json === 0)
      return null;
    else
      return json;
  };

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
      const json: User[] = await res.json();
      const infos = json.map(value => (
        <li key={value.id} className='flex w-[400px] h-[50px] mx-auto my-0 border-blue-500 border-b-1'>
          <div className='w-[328px] h-full text-left px-2'>
            <p className='text-xl w-full h-[25px]'>{value.name}</p>
            <p className='text-sm w-full h-[24px] leading-6'>{value.userId}</p>
          </div>
          <div className='w-[72px] h-full pr-2'>
            {
              value.id != props.session.user.id &&
              <Button
                variant='contained'
                color='secondary'
                disableElevation={true}
                disabled={props.friendIds.includes(value.id as unknown as number)}
                onClick={() => addFriend(props.session.user.id as unknown as number, value.id as unknown as number)}
                sx={{
                  display: 'block',
                  width: '64px',
                  height: '36px',
                  borderRadius: '5px',
                  padding: 0,
                  marginTop: '7px',
                  marginBottom: '6px'
                }}
              >
                {props.friendIds.includes(value.id as unknown as number) ? 'Friend' : 'Add'}
              </Button>
            }
          </div>
        </li>
      ));
      setUsers(infos);
    }
  };

  return (
    <div className='w-full h-full py-20'>
      <Input
        disableUnderline
        sx={{
          display: 'block',
          width: '400px',
          height: '50px',
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
      <ul className='block text-center py-10'>{users}</ul>
    </div>
  );
}
