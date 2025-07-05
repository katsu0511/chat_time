'use client';

import { useContext } from 'react';
import { ThemeContext } from '@/components/ThemeProviderWrapper';
import { Input, Button } from '@mui/material';

export default function SendMessage() {
  const context = useContext(ThemeContext);
  if (!context) return null;
  const { theme } = context;

  return (
    <div className='flex w-full h-1/20'>
      <Input
        disableUnderline
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
