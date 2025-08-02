'use client';

import { ThemeColor } from '@/lib/themeColor';
import { useContext } from 'react';
import { ThemeContext } from '@/components/ThemeProviderWrapper';
import { FormControlLabel, RadioGroup, Radio, FormLabel } from '@mui/material';

export default function ThemeColorWrapper() {
  const context = useContext(ThemeContext);
  if (!context) return null;
  const { color, theme, toggleColor } = context;

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
        Color
      </FormLabel>
      <RadioGroup
        name='color'
        value={color}
        onChange={(e) => toggleColor(e.target.value as ThemeColor)}
        sx={{
          display: 'flex',
          justifyContent: 'center',
          margin: '0 20px'
        }}
        row
      >
        <FormControlLabel value={ThemeColor.blue} control={<Radio />} label='Blue' />
        <FormControlLabel value={ThemeColor.red} control={<Radio />} label='Red' />
        <FormControlLabel value={ThemeColor.yellow} control={<Radio />} label='Yellow' />
        <FormControlLabel value={ThemeColor.purple} control={<Radio />} label='Purple' />
        <FormControlLabel value={ThemeColor.green} control={<Radio />} label='Green' />
        <FormControlLabel value={ThemeColor.orange} control={<Radio />} label='Orange' />
        <FormControlLabel value={ThemeColor.brown} control={<Radio />} label='Brown' />
        <FormControlLabel value={ThemeColor.pink} control={<Radio />} label='Pink' />
        <FormControlLabel value={ThemeColor.grey} control={<Radio />} label='Grey' />
      </RadioGroup>
    </div>
  );
}
