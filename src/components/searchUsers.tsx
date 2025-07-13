'use client';

import { useState } from 'react';
import type { User } from 'next-auth';
import { Button, Input } from '@mui/material';
import { blue } from '@mui/material/colors';

export default function SearchUsers() {
  const [users, setUsers] = useState<React.ReactNode[]>([]);

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
            <p className='text-sm w-full h-[24px] leading-6'>{value.userid}</p>
          </div>
          <div className='w-[72px] h-full pr-2'>
            {
              <Button
                variant='contained'
                color='secondary'
                disableElevation={true}
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
                Add
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
