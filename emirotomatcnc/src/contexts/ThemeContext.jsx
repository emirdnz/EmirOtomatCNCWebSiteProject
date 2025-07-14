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
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Tema ayarını localStorage'dan yükleme fonksiyonu
  const loadThemeFromStorage = () => {
    // Check if user has a saved theme preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      setIsDarkMode(savedTheme === 'dark');
    } else {
      // Check system preference
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      setIsDarkMode(prefersDark);
    }
  };

  useEffect(() => {
    // İlk yüklemede tema ayarını al
    loadThemeFromStorage();
    
    // Dil değiştiğinde tema ayarını koruyalım
    const handleLanguageChanged = () => {
      // Tema ayarını değiştirmeden koruyalım
      // Burada hiçbir şey yapmıyoruz, böylece tema değişmez
    };
    
    // i18n'in dil değişikliği olayını dinleyelim
    i18n.on('languageChanged', handleLanguageChanged);
    
    // Cleanup
    return () => {
      i18n.off('languageChanged', handleLanguageChanged);
    };
  }, []);

  useEffect(() => {
    // Apply theme to document
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDarkMode]);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
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
