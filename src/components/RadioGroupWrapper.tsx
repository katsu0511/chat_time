'use client';

import { useContext } from 'react';
import { ThemeContext } from '@/components/ThemeProviderWrapper';
import { FormControlLabel, RadioGroup, Radio } from '@mui/material';

export default function RadioGroupWrapper() {
  const context = useContext(ThemeContext);
  if (!context) return null;
  const { mode, toggleMode } = context;

  return (
    <RadioGroup name='theme' value={mode} onChange={toggleMode} row>
      <FormControlLabel value='light' control={<Radio />} label='Light' />
      <FormControlLabel value='dark' control={<Radio />} label='Dark' />
    </RadioGroup>
  );
}
