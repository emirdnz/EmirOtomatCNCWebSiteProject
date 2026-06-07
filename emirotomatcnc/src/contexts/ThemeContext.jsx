import React, { createContext, useContext, useState, useEffect } from 'react';
import i18n from '../i18n';

const ThemeContext = createContext();

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

export const ThemeProvider = ({ children }) => {
  // Force light theme only. Do not use system preference.
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    // Ensure no 'dark' class is present and persist light preference
    document.documentElement.classList.remove('dark');
    try {
      localStorage.setItem('theme', 'light');
    } catch (e) {
      // ignore storage errors
    }
    // Remove any i18n listener usage — keep behavior simple
    return () => {};
  }, []);

  // Make toggle a no-op so UI components using it won't break
  const toggleTheme = () => {
    // intentionally do nothing; theme is forced light
    setIsDarkMode(false);
  };

  const value = {
    isDarkMode,
    toggleTheme,
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
};
