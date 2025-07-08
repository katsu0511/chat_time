'use client';

import { useState } from "react";
import type { User } from 'next-auth';
import { Input } from "@mui/material";
import { blue } from '@mui/material/colors';

export default function Friend() {
  const [users, setUsers] = useState<React.ReactNode[]>();

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
        <li key={value.id}>Name: {value.name}, User ID: {value.userid}</li>
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
