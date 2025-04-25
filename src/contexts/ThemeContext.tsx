
import React, { createContext, useContext, useEffect } from 'react';

type ThemeContextType = {
  isDark: boolean;
};

const ThemeContext = createContext<ThemeContextType>({ isDark: true });

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  useEffect(() => {
    // Ensure the dark theme is applied consistently
    document.documentElement.classList.add('dark');
    document.body.classList.add('bg-gray-950', 'text-gray-50');
  }, []);

  return (
    <ThemeContext.Provider value={{ isDark: true }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
