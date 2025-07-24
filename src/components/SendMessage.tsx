'use client';

import { useState, useContext } from 'react';
import { ThemeContext } from '@/components/ThemeProviderWrapper';
import { Input, Button } from '@mui/material';

export default function SendMessage(props: {senderId: number, receiverId: number | undefined, onSent?: () => void}) {
  const [message, setMessage] = useState('');
  const context = useContext(ThemeContext);
  if (!context) return null;
  const { theme } = context;

  const sendMessage = async (senderId: number, receiverId: number | undefined, content: string) => {
    const res = await fetch('/api/sendMessage', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ senderId, receiverId, content }),
    });

    if (!res.ok) return null;
    setMessage('');
    props.onSent?.();
  };

  return (
    <div className='flex w-full h-1/20'>
      <Input
        disableUnderline
        disabled={ props.receiverId == undefined }
        onChange={(e) => setMessage(e.target.value)}
        sx={{
          display: 'block',
          width: '90%',
          height: '100%'
        }}
        inputProps={{
          sx: {
            display: 'block',
            border: '2px solid',
            borderColor: theme.palette.secondary.main,
            boxSizing: 'border-box',
            width: '100%',
            height: '100%',
            p: 1,
            appearance: 'none'
          }
        }}
      />
      <Button
        variant='contained'
        color='secondary'
        disableElevation={true}
        disabled={ props.receiverId == undefined }
        onClick={() => sendMessage(props.senderId, props.receiverId, message)}
        sx={{
          display: 'block',
          width: '10%',
          height: '100%',
          borderRadius: '0'
        }}
      >
        Send
      </Button>
    </div>
  );
}
