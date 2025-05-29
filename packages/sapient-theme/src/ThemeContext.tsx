import { createContext } from 'react';
import { Theme } from './types';
import { defaultTheme } from './defaultTheme';

export const ThemeContext = createContext<Theme>(defaultTheme);
