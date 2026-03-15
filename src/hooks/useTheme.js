import { useState, useEffect } from 'react';

export function useTheme() {
  const [theme, setTheme] = useState(() => localStorage.getItem('vp-theme') || 'dark');
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('vp-theme', theme);
  }, [theme]);
  return { theme, toggleTheme: () => setTheme(t => t === 'dark' ? 'light' : 'dark') };
}
