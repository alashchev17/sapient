import { colors, spacing, typography, shadows, breakpoints, radii } from '@sapiently/design-tokens';

export interface Theme {
  colors: typeof colors;
  spacing: typeof spacing;
  typography: typeof typography;
  shadows: typeof shadows;
  breakpoints: typeof breakpoints;
  radii: typeof radii;
}

export interface ThemeConfig {
  theme?: Partial<Theme>;
}
