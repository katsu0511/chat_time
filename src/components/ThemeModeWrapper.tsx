'use client';

import { useContext } from 'react';
import { ThemeContext } from '@/components/ThemeProviderWrapper';
import ThemeWrapper from './ThemeWrapper';
import RadioButton from './RadioButton';

export default function ThemeModeWrapper() {
  const context = useContext(ThemeContext);
  if (!context) return null;
  const { mode, toggleMode } = context;

  return (
    <ThemeWrapper label='Theme' value={mode} toggle={toggleMode}>
      <RadioButton value='light' label='Light' />
      <RadioButton value='dark' label='Dark' />
    </ThemeWrapper>
  );
}
