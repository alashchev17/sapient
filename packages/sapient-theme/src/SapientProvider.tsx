import React, { ReactNode } from 'react';
import { mergeDeep } from '@sapiently/core';
import { ThemeContext } from './ThemeContext';
import { defaultTheme } from './defaultTheme';
import { Theme, ThemeConfig } from './types';

interface SapientProviderProps extends ThemeConfig {
  children: ReactNode;
}

export const SapientProvider: React.FC<SapientProviderProps> = ({ children, theme = {} }) => {
  const mergedTheme = mergeDeep(defaultTheme, theme) as Theme;
  
  return (
    <ThemeContext.Provider value={mergedTheme}>
      {children}
    </ThemeContext.Provider>
  );
};
