import React, { ReactNode } from 'react';

import { defaultTheme } from './defaultTheme';
import { ThemeContext } from './ThemeContext';

interface SapientProviderProps {
  children: ReactNode;
}

export const SapientProvider: React.FC<SapientProviderProps> = ({ children }) => {
  // TODO: might be used in the future for theme customization, if needed
  // const mergedTheme = mergeDeep(defaultTheme, theme) as Theme;

  return <ThemeContext.Provider value={defaultTheme}>{children}</ThemeContext.Provider>;
};
