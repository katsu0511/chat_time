'use client';

import { useContext } from 'react';
import { ThemeContext } from '@/components/ThemeProviderWrapper';
import { FormControlLabel, RadioGroup, Radio, FormLabel } from '@mui/material';

export default function ThemeModeWrapper() {
  const context = useContext(ThemeContext);
  if (!context) return null;
  const { mode, theme, toggleMode } = context;

  return (
    <div className='flex flex-wrap justify-center items-center w-full h-auto my-10'>
      <FormLabel
        component='legend'
        sx={{
          color: theme.palette.primary.main,
          width: '100%',
          textAlign: 'center'
        }}
      >
        Theme
      </FormLabel>
      <RadioGroup
        name='theme'
        value={mode}
        onChange={toggleMode}
        sx={{
          display: 'flex',
          justifyContent: 'center',
          margin: '0 20px'
        }}
        row
      >
        <FormControlLabel value='light' control={<Radio />} label='Light' />
        <FormControlLabel value='dark' control={<Radio />} label='Dark' />
      </RadioGroup>
    </div>
  );
}
