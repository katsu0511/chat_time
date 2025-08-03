'use client';

import { useContext } from 'react';
import { ThemeContext } from '@/components/ThemeProviderWrapper';
import ThemeWrapper from './ThemeWrapper';
import { ThemeColor } from '@/lib/themeColor';
import RadioButton from './RadioButton';

export default function ThemeColorWrapper() {
  const context = useContext(ThemeContext);
  if (!context) return null;
  const { color, toggleColor } = context;

  return (
    <ThemeWrapper label='Color' value={color} toggle={toggleColor}>
      {Object.values(ThemeColor).map((color) => (
        <RadioButton key={color} value={color} label={color.charAt(0).toLocaleUpperCase() + color.substring(1)} />
      ))}
    </ThemeWrapper>
  );
}
