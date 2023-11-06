import React, { createContext, FC, useContext } from 'react';
import { theme, Theme } from '../theme';

const ThemeContext = createContext(theme);

export const ThemeProvider: FC = ({ children }) => (
  <ThemeContext.Provider value={theme}>{children}</ThemeContext.Provider>
);

export const useTheme = (): Theme => useContext(ThemeContext);
