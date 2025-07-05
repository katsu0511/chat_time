'use client';

import { createContext, useState, useEffect, useMemo } from 'react';
import { PaletteMode, Theme, createTheme, ThemeProvider } from '@mui/material/styles';
import { grey, blue } from '@mui/material/colors';
import CssBaseline from '@mui/material/CssBaseline';

type ThemeContext = {
  mode: PaletteMode,
  theme: Theme,
  toggleMode: () => void
}

export const ThemeContext = createContext<ThemeContext | undefined>(undefined);

export function ThemeProviderWrapper({ children }: { children: React.ReactNode }) {
  const [mode, setMode] = useState<PaletteMode>('light');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('themeMode');
    if (saved === 'light' || saved === 'dark') {
      setMode(saved);
    }
    setMounted(true);
  }, []);

  const toggleMode = () => setMode(prev => {
    const newMode = prev === 'light' ? 'dark' : 'light';
    localStorage.setItem('themeMode', newMode);
    return newMode;
  });

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
          ...(mode === 'light'
            ? {
                primary: { main: blue[500], contrastText: '#000' },
                secondary: { main: blue[400], light: blue[100], contrastText: '#fff' },
                background: { default: '#fff' }
              }
            : {
                primary: { main: blue[500], contrastText: '#fff' },
                secondary: { main: blue[400], light: blue[100], contrastText: '#fff' },
                background: { default: grey[700] }
              }
          ),
        },
        components: {
          MuiButton: {
            styleOverrides: {
              root: {
                textTransform: 'none',
              },
            },
          },
        },
      }),
    [mode]
  );

  if (!mounted) return null;

  return (
    <ThemeContext.Provider value={{mode, theme, toggleMode}}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </ThemeContext.Provider>
  );
}
