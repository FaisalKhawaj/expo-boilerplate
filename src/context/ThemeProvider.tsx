import { Colors, ThemeColors } from '@/constants/Colors';
import React, {createContext, useContext, useState, useMemo} from 'react';

export type Theme = 'light' | 'dark';

interface ThemeContextProps {
  theme: Theme;
  colors: ThemeColors; // or Colors.dark since they share the same shape
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextProps | undefined>(undefined);

export const ThemeProvider: React.FC<{children: React.ReactNode}> = ({
  children,
}) => {
  const [theme, setTheme] = useState<Theme>('light');

  const toggleTheme = () =>
    setTheme(prevTheme => (prevTheme === 'light' ? 'dark' : 'light'));

  const value = useMemo(
    () => ({
      theme,
      colors: Colors[theme],
      toggleTheme,
    }),
    [theme],
  );

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
};

export const useTheme = (): ThemeContextProps => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
