'use client';

import { useContext } from 'react';
import { ThemeContext } from '@/components/ThemeProviderWrapper';
import { FormControlLabel, RadioGroup, Radio, FormLabel } from '@mui/material';

export default function RadioGroupWrapper() {
  const context = useContext(ThemeContext);
  if (!context) return null;
  const { mode, theme, toggleMode } = context;

  return (
    <div className='flex items-center w-full h-100'>
      <FormLabel component='legend' sx={{ marginRight: 1, color: theme.palette.primary.contrastText }}>Theme: </FormLabel>
      <RadioGroup name='theme' value={mode} onChange={toggleMode} row>
        <FormControlLabel value='light' control={<Radio />} label='Light' />
        <FormControlLabel value='dark' control={<Radio />} label='Dark' />
      </RadioGroup>
    </div>
  );
}
