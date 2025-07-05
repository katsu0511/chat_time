'use client';

import { createContext, useState, useEffect, useMemo } from 'react';
import { createTheme, ThemeProvider, PaletteMode } from '@mui/material/styles';
import { amber, grey } from '@mui/material/colors';
import CssBaseline from '@mui/material/CssBaseline';

export const ThemeContext = createContext<(() => void) | undefined>(undefined);

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
            ? { primary: amber }
            : {
                primary: { main: grey[500], contrastText: '#fff' },
                background: { default: grey[400], paper: grey[400] },
              }
          ),
        },
      }),
    [mode]
  );

  if (!mounted) return null;

  return (
    <ThemeContext.Provider value={toggleMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </ThemeContext.Provider>
  );
}
